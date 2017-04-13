import { combineReducers } from 'redux'

import list from '../components/Detail/DetailListRedux'

export default combineReducers({
  list
})

import * as listActions from '../components/Detail/DetailListRedux'

export {
  listActions
}