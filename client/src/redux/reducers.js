import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
 
import home from '../views/HomeRedux'
import detail from '../views/DetailRedux'
import collection from '../views/CollectionRedux'

export default combineReducers({
  home,
  detail,
  collection,
  routing: routerReducer
})