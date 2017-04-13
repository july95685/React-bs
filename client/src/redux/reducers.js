import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
 
import home from '../views/HomeRedux'
import detail from '../views/DetailRedux'

export default combineReducers({
  home,
  detail,
  routing: routerReducer
})