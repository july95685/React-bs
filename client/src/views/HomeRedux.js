import { combineReducers } from 'redux'

import list from '../components/Home/PreviewListRedux'

export default combineReducers({
  list
})

import * as listActions from '../components/Home/PreviewListRedux'

export {
  listActions
}