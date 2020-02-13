import React, { ChangeEvent, useEffect, useState } from 'react'
import {
  BankidButtonProps,
  CancelButtonProps,
  ContainerProps,
  ErrorCollectResponse,
  FailedButtonProps,
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
  showFailedMessage: boolean
  isValidSSN: boolean
  BankidButton: JSX.Element | null
  CancelButton: JSX.Element | null
  FailedButton: JSX.Element | null
  bankidResponse?: CollectResponse
  bankidResponseError?: ErrorCollectResponse
  SsnInput: JSX.Element | null
  StateWrapper?: (props: StateWrapperProps) => JSX.Element | null
  Container?: (props: ContainerProps) => JSX.Element | null
  UserMessage?: (props: UserMessageProps) => JSX.Element | null
  Spinner?: (props: SpinnerProps) => JSX.Element | null
  onCancelBankid: () => void
}

function DefaultBankidButton({ children, ...props }: BankidButtonProps) {
  return <button {...props}>{children}</button>
}

function DefaultCancelButton({ children, ...props }: CancelButtonProps) {
  return <button {...props}>{children}</button>
}

function DefaultFailedButton({ children, ...props }: CancelButtonProps) {
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
    toggle: () => props.onCancelBankid(),
    isOpen:
      props?.bankidResponse?.status === 'pending' ||
      ((props.bankidResponse?.status === 'failed' || props.bankidResponseError) &&
        props.showFailedMessage),
    children: (
      <div>
        {props?.bankidResponse?.status === 'pending' && Spinner}
        {(props.bankidResponse?.status === 'failed' || props.bankidResponseError) &&
        !props.showFailedMessage
          ? null
          : UserMessage}
        {props?.bankidResponse?.status === 'pending' && props.CancelButton}
        {(props.bankidResponse?.status === 'failed' || props.bankidResponseError) &&
        props.showFailedMessage &&
        props.FailedButton}
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
        {((props.bankidResponse?.status === 'failed' || props.bankidResponseError) &&
          !props.showFailedMessage) ||
        (!props.bankidResponse && !props.bankidResponseError)
          ? props.SsnInput
          : null}
        {StateWrapper}
        {((props.bankidResponse?.status === 'failed' || props.bankidResponseError) &&
          !props.showFailedMessage) ||
        (!props.bankidResponse && !props.bankidResponseError)
          ? props.BankidButton
          : null}
      </>
    )
  }

  const Container = props.Container
    ? props.Container(containerProps)
    : DefaultContainer(containerProps)

  return <>{Container}</>
}

interface IReactBankIDProps {
  onInitiateBankid: (ssn: string) => void
  onCancelBankid: () => void
  onFailedButtonClick: () => void
  onCompleteBankid: (completionData: any) => void
  bankidResponse?: CollectResponse | ErrorCollectResponse
  SsnInput?: (props: SsnInputProps) => JSX.Element
  BankidButton?: (props: BankidButtonProps) => JSX.Element
  CancelButton?: (props: CancelButtonProps) => JSX.Element
  FailedButton?: (props: FailedButtonProps) => JSX.Element
  StateWrapper?: (props: StateWrapperProps) => JSX.Element
  Container?: (props: ContainerProps) => JSX.Element
  UserMessage?: (props: UserMessageProps) => JSX.Element
  Spinner?: (props: SpinnerProps) => JSX.Element
  bankidButtonText: string
  showInput?: boolean
}

export default function ReactBankID(props: IReactBankIDProps) {
  const [ssn, setSsn] = useState('')
  const [isValidSSN, setIsValidSSN] = React.useState(true)
  const [hasSubmittedOnce, setHasSubmittedOnce] = React.useState(false)
  const [showFailedMessage, setShowFailedMessage] = React.useState(false)

  const { bankidResponseError, bankidResponse } = !props.bankidResponse
    ? { bankidResponseError: undefined, bankidResponse: undefined }
    : isErrorResponse(props.bankidResponse)
      ? { bankidResponseError: props.bankidResponse, bankidResponse: undefined }
      : { bankidResponseError: undefined, bankidResponse: props.bankidResponse }

  useEffect(() => {
    if (bankidResponse?.status === 'complete') {
      props.onCompleteBankid(bankidResponse.completionData)
    }

    if (bankidResponse?.status === 'failed' || bankidResponseError) {
      setShowFailedMessage(true)
    }
  }, [props.bankidResponse])

  const BankidButtonProps = {
    type: 'submit' as 'submit',
    disabled: !isValidSSN && hasSubmittedOnce,
    'data-cy': 'react-bankid-submit-action-btn',
    children: <span>{props.bankidButtonText}</span>
  }

  const BankidButton = props.BankidButton
    ? props.BankidButton(BankidButtonProps)
    : DefaultBankidButton(BankidButtonProps)

  const cancelButtonProps = {
    type: 'button' as 'button',
    onClick: () => props.onCancelBankid(),
    'data-cy': 'react-bankid-cancel-btn',
    children: <span>{'Avbryt'}</span>
  }

  const CancelButton = props.CancelButton
    ? props.CancelButton(cancelButtonProps)
    : DefaultCancelButton(cancelButtonProps)

  const failedButtonProps = {
    type: 'button' as 'button',
    onClick: () => {
      setShowFailedMessage(false)
      props.onFailedButtonClick()
    },
    'data-cy': 'react-bankid-failed-btn',
    children: <span>{'Tillbaka'}</span>
  }

  const FailedButton = props.FailedButton
    ? props.FailedButton(failedButtonProps)
    : DefaultFailedButton(failedButtonProps)

  const ssnInputProps = {
    value: ssn,
    placeholder: 'ÅÅÅÅMMDD-XXXX',
    'data-cy': 'react-bankid-ssn-input',
    onChange: (event: ChangeEvent<HTMLInputElement>) => {
      setSsn(event.target.value)
      setIsValidSSN(checkValidSwedishSSN(event.target.value))
    }
  }

  const SsnInput = props.SsnInput ? props.SsnInput(ssnInputProps) : DefaultSsnInput(ssnInputProps)
  const showInput = props.showInput ?? true

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          setHasSubmittedOnce(true)

          if (isValidSSN) {
            return props.onInitiateBankid(normalizeSwedishSsn(ssn))
          }
        }}>
        <ReactBankIDView
          bankidResponse={bankidResponse}
          bankidResponseError={bankidResponseError}
          BankidButton={showInput ? BankidButton : null}
          showFailedMessage={showFailedMessage}
          FailedButton={showInput ? FailedButton : null}
          UserMessage={props.UserMessage}
          CancelButton={showInput ? CancelButton : null}
          SsnInput={showInput ? SsnInput : null}
          StateWrapper={props.StateWrapper}
          Spinner={props.Spinner}
          Container={props.Container}
          isValidSSN={isValidSSN}
          onCancelBankid={props.onCancelBankid}
          hasSubmittedOnce={hasSubmittedOnce}
        />
      </form>
    </div>
  )
}
