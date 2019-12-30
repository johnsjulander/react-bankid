import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import ReactBankIDWithDebugger from './ReactBankIDDebugger'
import ReactBankIDWithDebuggerCustom from './ReactBankIDDebuggerCustom'

ReactDOM.render(
  <>
    {console.log(window.location.pathname)}
    {window.location.pathname === '/custom' ||
    window.location.pathname === '/custom/authenticated' ? (
      <ReactBankIDWithDebuggerCustom />
    ) : (
      <ReactBankIDWithDebugger />
    )}
  </>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
