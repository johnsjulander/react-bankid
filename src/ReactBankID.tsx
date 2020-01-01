import React, { ChangeEvent, useEffect, useState } from 'react'
import {
  BankidButtonProps,
  CancelButtonProps,
  ContainerProps,
  ErrorCollectResponse,
  SpinnerProps,
  SsnInputProps,
  StateWrapperProps,
  UserMessageProps
} from './lib/types'
import { checkValidSwedishSSN } from './lib/check-valid-swedish-ssn'
import Spinner from './spinner'
import normalizeSwedishSsn from './lib/normalize-swedish-ssn'
import { CollectResponse } from 'bankid/lib/bankid'
import getMessageBankIdResponse, { isErrorResponse } from './lib/get-message-bankid-response'

interface IReactBankIDView {
  hasSubmittedOnce: boolean
  isValidSSN: boolean
  BankidButton: JSX.Element | null
  CancelButton: JSX.Element | null
  bankidResponse?: CollectResponse
  bankidResponseError?: ErrorCollectResponse
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
    msg: getMessageBankIdResponse(props.bankidResponse || props.bankidResponseError)
  }
  const UserMessage = props.UserMessage
    ? props.UserMessage(userMessageProps)
    : DefaultUserMessage(userMessageProps)

  const stateWrapperProps = {
    toggle: () => props.onCancelBankidAuth(),
    isOpen: Boolean(props.bankidResponse || props.bankidResponseError),
    children: (
      <div>
        {props.bankidResponse &&
          !isErrorResponse(props.bankidResponse) &&
          props?.bankidResponse?.status === 'pending' &&
          Spinner}
        {UserMessage}
        {props.CancelButton}
      </div>
    )
  }

  const StateWrapper =
    props.bankidResponse || props.bankidResponseError
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
  bankidResponse?: CollectResponse | ErrorCollectResponse
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
  const [isValidSSN, setIsValidSSN] = React.useState(true)
  const [hasSubmittedOnce, setHasSubmittedOnce] = React.useState(false)

  const { bankidResponseError, bankidResponse } = !props.bankidResponse
    ? { bankidResponseError: undefined, bankidResponse: undefined }
    : isErrorResponse(props.bankidResponse)
    ? { bankidResponseError: props.bankidResponse, bankidResponse: undefined }
    : { bankidResponseError: undefined, bankidResponse: props.bankidResponse }

  useEffect(() => {
    if (bankidResponse?.status === 'complete') {
      props.onCompleteBankidAuth(bankidResponse.completionData)
    }
  }, [props.bankidResponse])

  const BankidButtonProps = {
    type: 'submit' as 'submit',
    disabled: !isValidSSN && hasSubmittedOnce,
    'data-cy': 'react-bankid-submit-action-btn',
    children: <span>{props.bankidButtonText}</span>
  }

  const BankidButton = !props.bankidResponse
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
    ['pending', 'failed'].includes(bankidResponse?.status || '') || bankidResponseError
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

  const SsnInput = !props.bankidResponse
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
            return props.onInitiateBankidAuth(normalizeSwedishSsn(ssn))
          }
        }}>
        <ReactBankIDView
          bankidResponse={bankidResponse}
          bankidResponseError={bankidResponseError}
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
        />
      </form>
    </div>
  )
}
