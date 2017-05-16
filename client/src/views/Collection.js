import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { Breadcrumb } from 'antd'
const BreadItem = Breadcrumb.Item

import { listActions } from './CollectionRedux'
import CollectionList from '../components/Collection/CollectionList'


const ref = new Wilddog("https://july95685.wilddogio.com/");



class Collection extends Component {

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
    console.log(this.props);

    return (
      <div>
        <Breadcrumb style={{ marginBottom:'16px' }}>
          <BreadItem><a href="/">Home</a></BreadItem>
          <BreadItem>collection  </BreadItem>
        </Breadcrumb>
        <CollectionList
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
    list: state.collection.list
  }
}, dispatch => {
  return {
    listActions: bindActionCreators(listActions, dispatch),
    push: bindActionCreators(push, dispatch)
  }
})(Collection)
