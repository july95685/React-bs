import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { Breadcrumb } from 'antd'
const BreadItem = Breadcrumb.Item

import { listActions } from './DetailRedux'
import DateRange from '../components/Detail/DateRange'
import DowjonesChart from '../components/Detail/DowjonesChart'

class Detail extends Component {
  static propTypes = {
    list: PropTypes.object,
    listActions: PropTypes.object
  }

  render(){
    const {
      location,
      list,
      listActions,
      push
    } = this.props

    return (
      <div>
        <Breadcrumb style={{ marginBottom:'16px' }}>
          <BreadItem><a href="/">Home</a></BreadItem>
          <BreadItem>Detail</BreadItem>
        </Breadcrumb>
        <DateRange 
          startTime={ list.startTime }
          endTime={ list.endTime }
          setTimeRanges={ listActions.setTimeRanges }
        />
        <DowjonesChart
          { ...list }
          loadDowjonesDetail={ listActions.loadDowjonesDetail }
          search={ location.search }
        />
      </div>
    )
  }
}

export default connect(state => {
  return {
    list: state.detail.list
  }
}, dispatch => {
  return {
    listActions: bindActionCreators(listActions, dispatch),
    push: bindActionCreators(push, dispatch)
  }
})(Detail)