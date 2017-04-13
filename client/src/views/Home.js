import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { Breadcrumb } from 'antd'
const BreadItem = Breadcrumb.Item

import { listActions } from './HomeRedux'
import PreviewList from '../components/Home/PreviewList'

class Home extends Component {
  static propTypes = {
    list: PropTypes.object,
    listActions: PropTypes.object
  }

  render(){
    const {
      list,
      listActions,
      push
    } = this.props

    return (
      <div className="home">
        <Breadcrumb style={{ marginBottom:'16px' }}>
          <BreadItem>Home</BreadItem>
        </Breadcrumb>
        <PreviewList
          {...list}
          {...listActions}
          push={push}
        />
      </div>
    )
  }
}

export default connect(state => {
  return {
    list: state.home.list
  }
}, dispatch => {
  return {
    listActions: bindActionCreators(listActions, dispatch),
    push: bindActionCreators(push, dispatch)
  }
})(Home)