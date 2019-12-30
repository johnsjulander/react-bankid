import { CurrentState, PendingState } from './types'
import { errorCodesToRfa, failedHintCodeToRfa, pendingHintCodeToRfa, RFAtoText } from './msgs'

export default function getMessageFromState(state: CurrentState) {
  return state.kind === 'PendingState'
    ? RFAtoText(pendingHintCodeToRfa(state.hintCode))
    : state.kind === 'FailedState'
    ? RFAtoText(failedHintCodeToRfa(state.hintCode))
    : state.kind === 'ErrorState'
    ? RFAtoText(errorCodesToRfa(state.errorCode))
    : state.kind === 'CompleteState'
    ? 'Inloggning slutförd'
    : null
}
