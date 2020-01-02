import { Switch, Route } from 'react-router-dom'
import React from 'react'
import ExampleBase from './pages/base'
import ExampleBaseGraphql from './pages/base-graphql'
import ExampleCustomized from './pages/customized'

function Routes() {
  return (
    <Switch>
      <Route exact path={['/', '/base', '/authenticated']} component={ExampleBase} />
      <Route exact path={'/base-graphql/:type'} component={ExampleBaseGraphql} />
      <Route
        exact
        path={['/customized', '/customized/authenticated']}
        component={ExampleCustomized}
      />
    </Switch>
  )
}

export default Routes
