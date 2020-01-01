import React from 'react'
import allPossibleStates from './lib/all-possible-states'
import { CollectResponse } from 'bankid/lib/bankid'
import { ErrorCollectResponse } from './lib/types'
import { isErrorResponse } from './lib/get-message-bankid-response'

function DebugButtons(props: {
  onSimulateChangeBankidResponse: (bankidResponse?: CollectResponse | ErrorCollectResponse) => void
}) {
  return (
    <div style={{ padding: 12 }}>
      {allPossibleStates.map(state => {
        const { bankidResponseError, bankidResponse } = !state.bankidResponse
          ? { bankidResponseError: undefined, bankidResponse: undefined }
          : isErrorResponse(state.bankidResponse)
          ? { bankidResponseError: state.bankidResponse, bankidResponse: undefined }
          : { bankidResponseError: undefined, bankidResponse: state.bankidResponse }

        return bankidResponse ? (
          <button
            data-cy={state['data-cy']}
            key={JSON.stringify(state)}
            style={{ margin: 8 }}
            onClick={() =>
              props.onSimulateChangeBankidResponse(bankidResponse)
            }>{`${bankidResponse.status ?? 'error'} - ${bankidResponse.hintCode ??
            (bankidResponseError && bankidResponseError.errorCode) ??
            ''}`}</button>
        ) : (
          <button
            data-cy={state['data-cy']}
            key={JSON.stringify(state)}
            style={{ margin: 8 }}
            onClick={() => props.onSimulateChangeBankidResponse(bankidResponse)}>
            {'Not initialized'}
          </button>
        )
      })}
    </div>
  )
}

export default DebugButtons
