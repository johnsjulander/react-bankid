import React, { ChangeEvent, useEffect, useState } from 'react'
import {
  BankidButtonProps,
  BankidResponse,
  CancelButtonProps,
  ContainerProps,
  CurrentState,
  SpinnerProps,
  SsnInputProps,
  StateWrapperProps,
  UserMessageProps
} from './lib/types'
import getCurrentState from './lib/bankidResponseToState'
import { checkValidSwedishSSN } from './lib/check-valid-swedish-ssn'
import getMessageFromState from './lib/get-message-from-state'
import Spinner from './spinner'

interface IReactBankIDView {
  currentState: CurrentState
  hasSubmittedOnce: boolean
  isValidSSN: boolean
  BankidButton: JSX.Element | null
  CancelButton: JSX.Element | null
  SsnInput: JSX.Element | null
  StateWrapper?: (props: StateWrapperProps) => JSX.Element | null
  Container?: (props: ContainerProps) => JSX.Element | null
  UserMessage?: (props: UserMessageProps) => JSX.Element | null
  Spinner?: (props: SpinnerProps) => JSX.Element | null
  onCancelBankidAuth: () => void
}

function DefaultBankidButton({ children, ...props }: BankidButtonProps) {
  return <button {...props}>{children}</button>
}

function DefaultCancelButton({ children, ...props }: CancelButtonProps) {
  return <button {...props}>{children}</button>
}

function DefaultSsnInput(props: SsnInputProps) {
  return <input {...props} />
}

function DefaultStateWrapper({ children }: StateWrapperProps) {
  return <div>{children}</div>
}

function DefaultContainer({ children }: ContainerProps) {
  return <div>{children}</div>
}

function DefaultUserMessage(props: UserMessageProps) {
  return <div {...props}>{props.msg}</div>
}

function DefaultSpinner(props: SpinnerProps) {
  return (
    <div>
      <Spinner {...props} />
    </div>
  )
}

function ReactBankIDView(props: IReactBankIDView) {
  const spinnerProps = { 'data-cy': 'react-bankid-spinner' }

  const Spinner = props.Spinner ? props.Spinner(spinnerProps) : DefaultSpinner(spinnerProps)

  const userMessageProps = {
    'data-cy': 'react-bankid-user-message',
    msg: getMessageFromState(props.currentState)
  }
  const UserMessage = props.UserMessage
    ? props.UserMessage(userMessageProps)
    : DefaultUserMessage(userMessageProps)

  const stateWrapperProps = {
    toggle: () => props.onCancelBankidAuth(),
    isOpen: props.currentState.kind !== 'NotInitializedState',
    children: (
      <div>
        {props.currentState.kind === 'PendingState' && Spinner}
        {UserMessage}
        {props.CancelButton}
      </div>
    )
  }

  const StateWrapper =
    props.currentState.kind !== 'NotInitializedState'
      ? props.StateWrapper
        ? props.StateWrapper(stateWrapperProps)
        : DefaultStateWrapper(stateWrapperProps)
      : null

  const containerProps = {
    children: (
      <>
        {props.hasSubmittedOnce && !props.isValidSSN && (
          <div data-cy="react-bankid-ssn-input-warning-text" style={{ color: 'red', fontSize: 14 }}>
            {'Ogiltigt personnummer'}
          </div>
        )}
        {props.SsnInput}
        {StateWrapper}
        {props.BankidButton}
      </>
    )
  }

  const Container = props.Container
    ? props.Container(containerProps)
    : DefaultContainer(containerProps)

  return <>{Container}</>
}

interface IReactBankIDProps {
  onInitiateBankidAuth: (ssn: string) => void
  onCancelBankidAuth: () => void
  onCompleteBankidAuth: (completionData: any) => void
  bankidResponse?: BankidResponse
  isMobile: boolean
  SsnInput?: (props: SsnInputProps) => JSX.Element
  BankidButton?: (props: BankidButtonProps) => JSX.Element
  CancelButton?: (props: CancelButtonProps) => JSX.Element
  StateWrapper?: (props: StateWrapperProps) => JSX.Element
  Container?: (props: ContainerProps) => JSX.Element
  UserMessage?: (props: UserMessageProps) => JSX.Element
  Spinner?: (props: SpinnerProps) => JSX.Element
  bankidButtonText: string
}

export default function ReactBankID(props: IReactBankIDProps) {
  const [ssn, setSsn] = useState('')
  const [isValidSSN, setIsValidSSN] = React.useState(false)
  const [hasSubmittedOnce, setHasSubmittedOnce] = React.useState(false)

  const currentState = getCurrentState({
    bankidResponse: props.bankidResponse,
    isMobile: props.isMobile
  })

  useEffect(() => {
    if (currentState.kind === 'CompleteState' && props.bankidResponse) {
      props.onCompleteBankidAuth(props.bankidResponse.completionData)
    }
  }, [props.bankidResponse])

  const BankidButtonProps = {
    type: 'submit' as 'submit',
    disabled: !isValidSSN && hasSubmittedOnce,
    'data-cy': 'react-bankid-submit-action-btn',
    children: <span>{props.bankidButtonText}</span>
  }

  const BankidButton =
    currentState.kind === 'NotInitializedState'
      ? props.BankidButton
        ? props.BankidButton(BankidButtonProps)
        : DefaultBankidButton(BankidButtonProps)
      : null

  const cancelButtonProps = {
    type: 'submit' as 'submit',
    onClick: () => props.onCancelBankidAuth(),
    'data-cy': 'react-bankid-cancel-btn',
    children: <span>{'Avbryt'}</span>
  }

  const CancelButton =
    currentState.kind === 'PendingState' ||
    currentState.kind === 'FailedState' ||
    currentState.kind === 'ErrorState'
      ? props.CancelButton
        ? props.CancelButton(cancelButtonProps)
        : DefaultCancelButton(cancelButtonProps)
      : null

  const ssnInputProps = {
    value: ssn,
    placeholder: 'ÅÅÅÅMMDD-XXXX',
    'data-cy': 'react-bankid-ssn-input',
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      setSsn(event.target.value)
      setIsValidSSN(checkValidSwedishSSN(event.target.value))
    }
  }

  const SsnInput =
    currentState.kind === 'NotInitializedState'
      ? props.SsnInput
        ? props.SsnInput(ssnInputProps)
        : DefaultSsnInput(ssnInputProps)
      : null

  return (
    <div className="d-flex justify-content-center">
      <form
        onSubmit={e => {
          e.preventDefault()
          setHasSubmittedOnce(true)

          if (isValidSSN) {
            return props.onInitiateBankidAuth(ssn)
          }
        }}>
        <ReactBankIDView
          BankidButton={BankidButton}
          UserMessage={props.UserMessage}
          CancelButton={CancelButton}
          SsnInput={SsnInput}
          StateWrapper={props.StateWrapper}
          Spinner={props.Spinner}
          Container={props.Container}
          isValidSSN={isValidSSN}
          onCancelBankidAuth={props.onCancelBankidAuth}
          hasSubmittedOnce={hasSubmittedOnce}
          currentState={currentState}
        />
      </form>
    </div>
  )
}
