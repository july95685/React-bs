import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import Frame from '../layouts/Frame'
import Home from '../views/Home'
import Detail from '../views/Detail'
import Collection from '../views/Collection'

export default function configureRoutes(history) {
  return (
    <Router history={history}>
      <Route path="/" component={Frame} >
        <IndexRoute component={Home} />
        <Route path="/collection" component={Collection} />
        <Route path="/detail" component={Detail} />
      </Route>
    </Router>
  )
}