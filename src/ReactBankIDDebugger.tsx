import React, { useState } from 'react'
import DebugButtons from './ReactBankIDDebugButtons'
import { IGetCurrentState } from './lib/bankidResponseToState'
import ReactBankID from './ReactBankID'

export default function ReactBankIDWithDebugger() {
  const [state, setState] = useState<IGetCurrentState>({ isMobile: false })

  return (
    <div>
      <DebugButtons onSimulateChangeState={(state: IGetCurrentState) => setState(state)} />
      <ReactBankID
        onCompleteBankidAuth={() => {
          window.location.href = 'http://localhost:3000/authenticated'
        }}
        bankidButtonText={'Logga in med Mobilt BankID'}
        onInitiateBankidAuth={() =>
          setState({
            isMobile: true,
            bankidResponse: {
              status: 'pending',
              hintCode: 'noClient'
            }
          })
        }
        onCancelBankidAuth={() =>
          setState({
            isMobile: true
          })
        }
        isMobile={state.isMobile}
        bankidResponse={state.bankidResponse}
      />
    </div>
  )
}
