import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { Breadcrumb } from 'antd'
const BreadItem = Breadcrumb.Item

import { listActions } from './DetailRedux'
import DateRange from '../components/Detail/DateRange'
import DowjonesChart from '../components/Detail/DowjonesChart'
import DowjonesDetail from '../components/Detail/DowjonesDetail'

class Detail extends Component {
  static propTypes = {
    list: PropTypes.object,
    listActions: PropTypes.object
  }
  componentWillMount(){
    console.log('componentWillMount');
  }
  componentDidMount(){
    console.log('componentDidMount');
  }
  componentWillUpdate(){
    console.log('componentWillUpdate');
  }
  componentDidUpdate(){
    console.log('componentDidUpdate');
  }
  render(){
    const {
      location,
      list,
      listActions,
      push
    } = this.props
    console.log(1);
    console.log(this.props);
    return (
      <div>
        <Breadcrumb style={{ marginBottom:'16px' }}>
          <BreadItem><a href="/">Home</a></BreadItem>
          <BreadItem>Detail</BreadItem>
        </Breadcrumb>
        <DowjonesDetail  
          { ...list }
          loadDowjonesDetail={ listActions.loadDowjonesDetail }
          search={ location.search }
        />
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
  console.log(state);
  return {
    list: state.detail.list
  }
}, dispatch => {
  console.log(2);
  return {
    listActions: bindActionCreators(listActions, dispatch),
    push: bindActionCreators(push, dispatch)
  }
})(Detail)