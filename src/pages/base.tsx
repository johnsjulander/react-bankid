import React, { useState } from 'react'
import DebugButtons from '../ReactBankIDDebugButtons'
import ReactBankID from '../ReactBankID'
import { CollectResponse } from 'bankid/lib/bankid'
import { ErrorCollectResponse } from '../lib/types'

export default function ExampleBase() {
  const [state, setState] = useState<{ bankidResponse?: CollectResponse | ErrorCollectResponse }>(
    {}
  )

  return (
    <div>
      <DebugButtons
        onSimulateChangeBankidResponse={(bankidResponse?: CollectResponse | ErrorCollectResponse) =>
          setState({ bankidResponse })
        }
      />
      <ReactBankID
        onCompleteBankid={() => {
          window.location.href = 'http://localhost:3000/authenticated'
        }}
        bankidButtonText={'Logga in med Mobilt BankID'}
        onFailedButtonClick={() => {
          console.log('clicked failed button. Insert session-restart here')
        }}
        onInitiateBankid={() =>
          setState({
            bankidResponse: {
              orderRef: '',
              status: 'pending',
              hintCode: 'noClient'
            }
          })
        }
        onCancelBankid={() => setState({})}
        bankidResponse={state.bankidResponse}
      />
    </div>
  )
}
