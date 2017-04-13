import React, { Component, PropTypes } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'

const { RangePicker } = DatePicker

class DataRange extends Component {
  static propTypes = {
    startTime: PropTypes.object,
    endTime: PropTypes.object,
    setTimeRanges: PropTypes.func
  }

  handleChange = (date, dateStr)=> {
    const { setTimeRanges } = this.props

    setTimeRanges(date.map(e=>e.toDate()))
  }

  render(){
    const { startTime, endTime } = this.props

    const dateFormat = 'YYYY/MM/DD'
    const start = moment(startTime, dateFormat)
    const end = moment(endTime, dateFormat)

    return (
      <RangePicker
        style={{ marginBottom:'16px' }}
        defaultValue={[start, end]}
        onChange= { this.handleChange }
        format={dateFormat}
      />
    )
  }
}

export default DataRange