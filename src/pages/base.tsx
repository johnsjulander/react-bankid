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
        onCompleteBankidAuth={() => {
          window.location.href = 'http://localhost:3000/authenticated'
        }}
        bankidButtonText={'Logga in med Mobilt BankID'}
        onInitiateBankidAuth={() =>
          setState({
            bankidResponse: {
              orderRef: '',
              status: 'pending',
              hintCode: 'noClient'
            }
          })
        }
        onCancelBankidAuth={() => setState({})}
        bankidResponse={state.bankidResponse}
      />
    </div>
  )
}
