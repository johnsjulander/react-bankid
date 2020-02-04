import React from 'react'
// import 'bootstrap/dist/css/bootstrap.css'
// import './styles.css'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'
import { HttpLink } from 'apollo-link-http'
import { BrowserRouter as Router } from 'react-router-dom'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import Routes from './routes'
import { getMainDefinition } from 'apollo-utilities'

const httpLink = new HttpLink({ uri: 'http://zigned-backend-live.herokuapp.com/' })

const wsLink = new WebSocketLink({
  uri: `ws://zigned-backend-live.herokuapp.com/graphql`,
  options: {
    reconnect: true
  }
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({ link, cache: new InMemoryCache() })

const renderApp = () => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Router>
        <Routes />
      </Router>
    </ApolloProvider>,
    document.getElementById('root') // eslint-disable-line no-undef
  )
}

renderApp()

serviceWorker.unregister()
