import Plottable from 'plottable'
import * as d3 from 'd3'

export let sparkline = new Plottable.Plots.Line()
export let plot = new Plottable.Plots.Line()

// 将每一个股票数据转成series
export function dataToSeries(data, startTime, endTime){
  const seriesData = data.series.map(e=>{
    const dateStr = String(e.Date)
    const year = dateStr.slice(0, 4)
    const month = dateStr.slice(4, 6)
    const day = dateStr.slice(6, 8)
    const date = new Date(Date.UTC(year, month, day))
    return {
      x: date,
      y: e.close
    }
  }).filter(e=>{
    if (e.x < startTime || e.x > endTime){
      return false
    }
    return true
  })

  return new Plottable.Dataset(seriesData, { name: data.meta.ticker })
}

// 将不同股票的数据加入坐标系中
export function addDataset(series, plot, sparkline){
  // 先清空
  plot.datasets([])
  sparkline.datasets([])
  
  series.forEach((e)=>{
    plot.addDataset(e)
    sparkline.addDataset(e)
  })
}

// 改编官网的示例代码
export function createChart(plot, sparkline){
  const xScale = new Plottable.Scales.Time()
  const xAxis = new Plottable.Axes.Numeric(xScale, 'bottom')
  xAxis.formatter(Plottable.Formatters.multiTime())
  const yScale = new Plottable.Scales.Linear()
  const yAxis = new Plottable.Axes.Numeric(yScale, 'left')
  const colorScale = new Plottable.Scales.Color()

  plot.x(function(d) { return d.x }, xScale).y(function(d) { return d.y }, yScale)
  plot.attr('stroke', function(d, i, dataset) { return dataset.metadata().name }, colorScale)
  plot.autorangeMode('y')

  const sparklineXScale = new Plottable.Scales.Time()
  const sparklineXAxis = new Plottable.Axes.Time(sparklineXScale, 'bottom')
  const sparklineYScale = new Plottable.Scales.Linear()
  sparkline.x(function(d) { return d.x }, sparklineXScale).y(function(d) { return d.y }, sparklineYScale)
  sparkline.attr('stroke', function(d, i, dataset) { return dataset.metadata().name }, colorScale)

  const dragBox = new Plottable.Components.XDragBoxLayer()
  dragBox.resizable(true)
  dragBox.onDrag(function(bounds) {
    const min = sparklineXScale.invert(bounds.topLeft.x)
    const max = sparklineXScale.invert(bounds.bottomRight.x)
    xScale.domain([min, max])
  })
  dragBox.onDragEnd(function(bounds) {
    if (bounds.topLeft.x === bounds.bottomRight.x) {
      xScale.domain(sparklineXScale.domain())
    }
  })

  xScale.onUpdate(function() {
    dragBox.boxVisible(true)
    const xDomain = xScale.domain()
    dragBox.bounds({
      topLeft: { x: sparklineXScale.scale(xDomain[0]), y: null },
      bottomRight: { x: sparklineXScale.scale(xDomain[1]), y: null }
    })
  })
  const miniChart = new Plottable.Components.Group([sparkline, dragBox])

  const pzi = new Plottable.Interactions.PanZoom(xScale, null)
  pzi.attachTo(plot)

  const legend = new Plottable.Components.Legend(colorScale)

  const chart = new Plottable.Components.Table([
      [null, legend             ],
      [yAxis, plot              ],
      [null , xAxis             ],
      [null , miniChart         ],
      [null , sparklineXAxis    ]
  ])
  chart.rowWeight(2, 0.2)

  return chart
}

// 添加crosshair
export function appendCrosshair(plot){

  const output = d3.select('#hoverFeedback')
  const outputDefaultText = 'Closest:'
  output.text(outputDefaultText)
  const crosshair = createCrosshair(plot)
  const pointer = new Plottable.Interactions.Pointer()
  pointer.onPointerMove(function(p) {
    const nearestEntity = plot.entityNearest(p)
    if (nearestEntity.datum == null) {
      return
    }
    crosshair.drawAt(nearestEntity.position)
    const datum = nearestEntity.datum
    output.text('Closest: (' + datum.x.toLocaleString() + ', ' + datum.y.toFixed(2) + ')')
  })
  pointer.onPointerExit(function() {
    crosshair.hide()
    output.text(outputDefaultText)
  })
  pointer.attachTo(plot)

  function createCrosshair(plot) {
    const crosshair = {}
    const crosshairContainer = plot.foreground().append('g').style('visibility', 'hidden')
    crosshair.vLine = crosshairContainer.append('line')
                      .attr('stroke', 'black')
                      .attr('y1', 0)
                      .attr('y2', plot.height())
    crosshair.circle = crosshairContainer.append('circle')
                      .attr('stroke', 'black')
                      .attr('fill', 'white')
                      .attr('r', 3)
    crosshair.drawAt = function(p) {
      crosshair.vLine.attr({
        x1: p.x,
        x2: p.x
      })
      crosshair.circle.attr({
        cx: p.x,
        cy: p.y
      })
      crosshairContainer.style('visibility', 'visible')
    }
    crosshair.hide = function() {
      crosshairContainer.style('visibility', 'hidden')
    }
    return crosshair
  }
}

