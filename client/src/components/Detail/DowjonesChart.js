import React, { Component, PropTypes } from 'react'
import { Spin, message } from 'antd'

import { 
  dataToSeries,
  addDataset, 
  createChart,
  appendCrosshair,
  sparkline, 
  plot 
} from '../../utils/chart'

class DowjonesChart extends Component {
  static proptypes = {
    search: PropTypes.string,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    selectedDowjones: PropTypes.array,
    startTime: PropTypes.object,
    endTime: PropTypes.object,
    loadDowjonesDetail: PropTypes.func
  }

  chart = createChart(plot, sparkline)

  componentDidMount(){
    const { 
      search,
      loadDowjonesDetail
    } = this.props
    const items = search.trim().slice(1).split('&')
    loadDowjonesDetail(items)

    this.chart.renderTo('#chart')
  }

  componentWillReceiveProps(props){
    const {
      loading,
      selectedDowjones,
      startTime,
      endTime
    } = props

    console.log(startTime)

    if (!loading) {
      let series = selectedDowjones.map(e=>
        dataToSeries(e, startTime, endTime)
      )
      addDataset(series, plot, sparkline)
      appendCrosshair(plot)
    }
  }

  render(){
    const {
      loading,
      error
    } = this.props

    const svg = <svg id='chart' />
    const spin = (
      <Spin size='large'>
        <div
          style={{ height: 200}} 
        />
      </Spin>
    )

    if (error){
      message.error('加载数据错误！')
    }

    return (
      <div style={{ width: '80%', height: '600px', margin: '20px auto' }}>
        {
          loading? spin: ''
        }
        { svg }
      </div>
    )
  }
}

export default DowjonesChart