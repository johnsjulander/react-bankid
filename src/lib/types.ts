import { ChangeEvent } from 'react'

export interface SsnInputProps {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  'data-cy': string
}

export interface StateWrapperProps {
  children: JSX.Element
  isOpen?: boolean
  toggle: () => void
}

export interface ContainerProps {
  children: JSX.Element
}

export interface UserMessageProps {
  msg: string
  'data-cy': string
}

export interface SpinnerProps {
  'data-cy': string
}

export interface BankidButtonProps {
  type: 'submit'
  disabled: boolean
  children: JSX.Element
  'data-cy': string
}

export interface CancelButtonProps {
  type: 'submit'
  children: JSX.Element
  onClick: () => void
  'data-cy': string
}

export type CollectResponseErrorMessage =
  | 'alreadyInProgress'
  | 'invalidParameters'
  | 'unauthorized'
  | 'notFound'
  | 'requestTimeout'
  | 'unsupportedMediaType'
  | 'internalError'
  | 'Maintenance'

export type ErrorCollectResponse = {
  details?: string
  message?: CollectResponseErrorMessage
  errorCode?: CollectResponseErrorMessage
}
