import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import routes from './routes'
import configureStore from './redux/configureStore'

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render((
  <Provider store={store}>
    {routes(history)}    
  </Provider>
), document.getElementById('root'))