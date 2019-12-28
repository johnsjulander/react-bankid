import React, {useState} from 'react'
import DebugButtons from './ReactBankIDDebugButtons'
import {BankidResponse, CurrentState} from './lib/types'
import getCurrentState, {IGetCurrentState} from './lib/bankidResponseToState'
import UserMessage from './lib/user-message'
import Spinner from './spinner'

interface IReactBankIDView {
  ssn: string
  onSsnChange: (ssn: string) => void
  currentState: CurrentState
}

function ReactBankIDView(props: IReactBankIDView) {
  return (
    <>
      <div className="react-bankid-identify-bankid-title">{'Identifiera dig med Mobilt BankID'}</div>
      <input disabled={props.currentState.kind !== 'NotInitializedState'} className="react-bankid-ssn-input" type="text" onChange={(e) => props.onSsnChange(e.target.value)} />
      {props.currentState.kind === 'PendingState' && <div><Spinner /></div>}
      <div><UserMessage currentState={props.currentState} /></div>
      <button type="submit" className="react-bankid-submit-bankid-action-btn">{props.currentState.status === 'NotInitializedState' ? 'Fortsätt' : 'Avbryt'}</button>
    </>
  )
}

interface IReactBankIDProps {
  onInitiateBankidAuth: (ssn: string) => void
  bankidResponse?: BankidResponse,
  isMobile: boolean
}

export default function ReactBankID(props: IReactBankIDProps) {
  const [ssn, setSsn] = useState('')

  return (
    <form onSubmit={() => props.onInitiateBankidAuth(ssn)}>
      <ReactBankIDView
        currentState={getCurrentState({ bankidResponse: props.bankidResponse, isMobile: props.isMobile })}
        ssn={ssn}
        onSsnChange={(newSsn: string) => setSsn(newSsn)}
      />
    </form>
  )
}

