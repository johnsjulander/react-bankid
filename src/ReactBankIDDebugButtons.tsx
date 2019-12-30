import React from 'react'
import allPossibleStates from './lib/all-possible-states'
import { IGetCurrentState } from './lib/bankidResponseToState'

function DebugButtons(props: { onSimulateChangeState: (state: IGetCurrentState) => void }) {
  return (
    <div style={{ padding: 12 }}>
      {allPossibleStates.map(state => {
        return state.bankidResponse ? (
          <button
            data-cy={state['data-cy']}
            key={JSON.stringify(state)}
            style={{ margin: 8 }}
            onClick={() => props.onSimulateChangeState(state)}>{`${state.bankidResponse.status ??
            'error'} - ${state.bankidResponse.hintCode ??
            state.bankidResponse.errorCode ??
            ''}`}</button>
        ) : (
          <button
            data-cy={state['data-cy']}
            key={JSON.stringify(state)}
            style={{ margin: 8 }}
            onClick={() => props.onSimulateChangeState(state)}>
            {'Not initialized'}
          </button>
        )
      })}
    </div>
  )
}

export default DebugButtons
