import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import Frame from '../layouts/Frame'
import Home from '../views/Home'
import Detail from '../views/Detail'

export default function configureRoutes(history) {
  return (
    <Router history={history}>
      <Route path="/" component={Frame} >
        <IndexRoute component={Home} />
        <Route path="/detail" component={Detail} />
      </Route>
    </Router>
  )
}