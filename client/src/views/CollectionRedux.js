import { combineReducers } from 'redux'

import list from '../components/Collection/CollectionListRedux'

export default combineReducers({
  list
})

import * as listActions from '../components/Collection/CollectionListRedux'

export {
  listActions
}