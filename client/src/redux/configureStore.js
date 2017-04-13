import { createStore, compose, applyMiddleware} from 'redux'
import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import ThunkMiddleware from 'redux-thunk'
import PromiseMiddleware from 'redux-promise'

import rootReducer from './reducers'
import FetchMiddleware from './middleware/redux-composable-fetch'
//import createFetchMiddleware from 'redux-composable-fetch'

// 创建多异步middleware
// const FetchMiddleware = createFetchMiddleware()

const finalCreateStore = compose(
  applyMiddleware(
    ThunkMiddleware,
    PromiseMiddleware,
    FetchMiddleware,

    routerMiddleware(hashHistory)
  )
)(createStore)


export default function configureStore(initialState){
  const store = finalCreateStore(rootReducer, initialState)
  return store
}