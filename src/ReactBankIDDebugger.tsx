import React, {useState} from 'react'
import DebugButtons from './ReactBankIDDebugButtons'
import {IGetCurrentState} from './lib/bankidResponseToState'
import ReactBankID from './ReactBankID'

export default function ReactBankIDWithDebugger() {
  const [state, setState] = useState<IGetCurrentState>({ isMobile: false })

  return (
    <>
      <DebugButtons onSimulateChangeState={(state: IGetCurrentState) => setState(state)} />
      <ReactBankID onInitiateBankidAuth={() => setState({
        isMobile: true,
        bankidResponse: {
          status: 'pending',
          hintCode: 'noClient',
        }})} isMobile={state.isMobile} bankidResponse={state.bankidResponse} />
    </>
  )
}
