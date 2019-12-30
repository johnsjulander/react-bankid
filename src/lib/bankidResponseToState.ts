import {
  BankidResponse,
  CompleteState,
  CurrentState,
  ErrorState,
  FailedState,
  NotInitializedState,
  PendingState
} from './types'

export interface IGetCurrentState {
  bankidResponse?: BankidResponse
  isMobile: boolean
}

export default function getCurrentState({
  bankidResponse,
  isMobile
}: IGetCurrentState): CurrentState {
  if (!bankidResponse) {
    return {
      kind: 'NotInitializedState',
      status: 'NotInitializedState',
      isMobile
    } as NotInitializedState
  }

  if (bankidResponse.errorCode) {
    return { kind: 'ErrorState', errorCode: bankidResponse.errorCode } as ErrorState
  }

  if (bankidResponse.status === 'pending') {
    return {
      kind: 'PendingState',
      status: 'PendingState',
      isMobile,
      hintCode: bankidResponse.hintCode
    } as PendingState
  }

  if (bankidResponse.status === 'failed') {
    return {
      kind: 'FailedState',
      status: 'FailedState',
      isMobile,
      hintCode: bankidResponse.hintCode
    } as FailedState
  }

  if (bankidResponse.status === 'complete') {
    return {
      kind: 'CompleteState',
      status: 'CompleteState',
      completionData: bankidResponse.completionData
    } as CompleteState
  }

  return {
    kind: 'NotInitializedState',
    status: 'NotInitializedState',
    isMobile
  } as NotInitializedState
}
