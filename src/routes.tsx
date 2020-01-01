import { Switch, Route } from 'react-router-dom'
import React from 'react'
import ExampleBase from './pages/base'
import ExampleBaseGraphql from './pages/base-graphql'
import ExampleCustomized from './pages/customized'

function Routes() {
  return (
    <Switch>
      <Route exact path={['/', '/base']} component={ExampleBase} />
      <Route exact path="/base-graphql" component={ExampleBaseGraphql} />
      <Route exact path="/customized" component={ExampleCustomized} />
    </Switch>
  )
}

export default Routes
