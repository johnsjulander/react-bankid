import React from 'react'
import {CurrentState} from './types'
import getMessageFromState from './get-message-from-state'

interface IUserMessageProps {
  currentState: CurrentState
}

export default function UserMessage(props: IUserMessageProps) {
  return <div className="react-bankid-user-message">{getMessageFromState(props.currentState)}</div>
}
