import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as React from 'react'
import * as ApolloReactComponents from '@apollo/react-components'
import * as ApolloReactHoc from '@apollo/react-hoc'
export type Maybe<T> = T | null
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** Date custom scalar type */
  Date: any
  /** DateTime custom scalar type */
  DateTime: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
}

export type AddReceiptToFileResult = {
  __typename?: 'AddReceiptToFileResult'
  /** URL to download signed file with appended receipt */
  id: Scalars['ID']
  url: Scalars['String']
}

export type AuthPayload = {
  __typename?: 'AuthPayload'
  token: Scalars['String']
  user: User
}

export type BankIdAddReceiptToFileInput = {
  /** The base64-encoded signature string returned from BankID */
  signature: Scalars['String']
  /** The base64-encoded ocspResponse string returned from BankID */
  ocspResponse: Scalars['String']
  /** URL to download signed file */
  fileUrl?: Maybe<Scalars['String']>
}

export type BankIdCertificate = {
  __typename?: 'BankIdCertificate'
  id: Scalars['ID']
  issuedBy?: Maybe<Organization>
  validFrom?: Maybe<Scalars['Date']>
  validTo?: Maybe<Scalars['Date']>
}

export enum BankIdErrorCode {
  AlreadyInProgress = 'alreadyInProgress',
  InvalidParameters = 'invalidParameters',
  Unauthorized = 'unauthorized',
  NotFound = 'notFound',
  RequestTimeout = 'requestTimeout',
  UnsupportedMediaType = 'unsupportedMediaType',
  InternalError = 'internalError',
  Maintenance = 'Maintenance'
}

export enum BankIdHintCode {
  ExpiredTransaction = 'expiredTransaction',
  CertificateErr = 'certificateErr',
  UserCancel = 'userCancel',
  Cancelled = 'cancelled',
  StartFailed = 'startFailed',
  OutstandingTransaction = 'outstandingTransaction',
  NoClient = 'noClient',
  Started = 'started',
  UserSign = 'userSign'
}

export type BankIdMutation = {
  __typename?: 'BankIdMutation'
  sessions?: Maybe<BankIdSessionsMutation>
  session?: Maybe<BankIdSessionMutation>
  verifySignature?: Maybe<BankIdSignatureVerification>
  addReceiptToFile: AddReceiptToFileResult
  verifyReceipt?: Maybe<BankIdSignatureVerification>
}

export type BankIdMutationSessionArgs = {
  id: Scalars['ID']
}

export type BankIdMutationVerifySignatureArgs = {
  input: BankIdVerifySignatureInput
}

export type BankIdMutationAddReceiptToFileArgs = {
  input: BankIdAddReceiptToFileInput
}

export type BankIdMutationVerifyReceiptArgs = {
  fileUrl: Scalars['String']
}

export type BankIdSession = {
  __typename?: 'BankIdSession'
  id: Scalars['ID']
  status?: Maybe<BankIdSessionStatus>
  name?: Maybe<Scalars['String']>
  givenName?: Maybe<Scalars['String']>
  surname?: Maybe<Scalars['String']>
  deviceIpAddress: Scalars['String']
  certNotBefore?: Maybe<Scalars['String']>
  certNotAfter?: Maybe<Scalars['String']>
  orderRef?: Maybe<Scalars['String']>
  signature?: Maybe<Scalars['String']>
  ocspResponse?: Maybe<Scalars['String']>
  userVisibleData?: Maybe<Scalars['String']>
  userNonVisibleData?: Maybe<Scalars['String']>
  hintCode?: Maybe<BankIdHintCode>
  errorCode?: Maybe<BankIdErrorCode>
  details?: Maybe<Scalars['String']>
  response?: Maybe<Scalars['String']>
  completionData?: Maybe<Scalars['String']>
  user?: Maybe<User>
  createdAt: Scalars['DateTime']
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type BankIdSessionMutation = {
  __typename?: 'BankIdSessionMutation'
  cancel?: Maybe<Scalars['Boolean']>
  initiateSign: BankIdSession
  initiateAuth: BankIdSession
}

export type BankIdSessionsInput = {
  ssn: Scalars['String']
  userVisibleData?: Maybe<Scalars['String']>
  userNonVisibleData?: Maybe<Scalars['String']>
}

export type BankIdSessionsMutation = {
  __typename?: 'BankIdSessionsMutation'
  create: BankIdSession
}

export type BankIdSessionsMutationCreateArgs = {
  input: BankIdSessionsInput
}

export enum BankIdSessionStatus {
  WaitingForInitialization = 'waitingForInitialization',
  Initializing = 'initializing',
  Pending = 'pending',
  Failed = 'failed',
  Complete = 'complete',
  Error = 'error'
}

export type BankIdSignatureVerification = {
  __typename?: 'BankIdSignatureVerification'
  id: Scalars['ID']
  ocspResponseStatus?: Maybe<OcspResponseStatus>
  issuer?: Maybe<Organization>
  signedAt?: Maybe<Scalars['DateTime']>
  userVisibleData?: Maybe<Scalars['String']>
  /**
   * When file is signed, expectes computed message digest (sha256) of the binary
   * representation of the document matches message digest of binary representation
   * of document in fileUrl.
   */
  userNonVisibleData?: Maybe<Scalars['String']>
  signee?: Maybe<User>
  device?: Maybe<Device>
  /** A optional message digest of the binary representation of the document. */
  sha256Hash?: Maybe<Scalars['String']>
  verificationResult?: Maybe<BankIdVerificationResult>
}

export type BankIdVerificationResult = {
  __typename?: 'BankIdVerificationResult'
  /** Verify the signature */
  signature?: Maybe<VerificationResult>
  /**
   * Verify the certificates in the certificate chain up to the self signed root.
   * Note that certificates may have expired at the time of verification if it is
   * later than the time of use.
   */
  certificateChain?: Maybe<VerificationResult>
  /** Verify the status of the ocspResponse to be ok. */
  statusOcspResponse?: Maybe<VerificationResult>
  /** Verify the signature of the ocspResponse */
  signatureOcspResponse?: Maybe<VerificationResult>
  /**
   * Verify the certificate of the ocspResponse signer and that it is issued by the
   * same CA as the user certificate in question.
   */
  certificateOcspResponse?: Maybe<VerificationResult>
  /** Verify the nonce included in the ocspResponse to be correct by matching it with a hash computed of the signature */
  nouceOcspResponse?: Maybe<VerificationResult>
  /**
   * When present in userNonVisibleData: Verify computed message digest (sha256) of
   * the binary representation of the document matches message digest of binary
   * representation of document in fileUrl
   */
  fileSha256Hash?: Maybe<VerificationResult>
}

export type BankIdVerifySignatureInput = {
  /** The base64-encoded signature string returned from BankID */
  signature: Scalars['String']
  /** The base64-encoded ocspResponse string returned from BankID */
  ocspResponse: Scalars['String']
  /** URL to download signed file */
  fileUrl?: Maybe<Scalars['String']>
}

export type CreateFileInput = {
  filename: Scalars['String']
  mimeType: Scalars['String']
}

export type Device = {
  __typename?: 'Device'
  type?: Maybe<Scalars['String']>
  version?: Maybe<Scalars['String']>
}

export type File = {
  __typename?: 'File'
  id: Scalars['ID']
  filename: Scalars['String']
  mimeType: Scalars['String']
  storageProvider: Scalars['String']
  bucketName: Scalars['String']
  signedUrlRead?: Maybe<Scalars['String']>
  signedUrlWrite?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type FilesMutation = {
  __typename?: 'FilesMutation'
  create: File
}

export type FilesMutationCreateArgs = {
  input?: Maybe<CreateFileInput>
}

export type Mutation = {
  __typename?: 'Mutation'
  bankId?: Maybe<BankIdMutation>
  login: AuthPayload
  me?: Maybe<UserMutation>
  files?: Maybe<FilesMutation>
}

export type MutationLoginArgs = {
  email: Scalars['String']
}

export type OcspResponseStatus = {
  __typename?: 'OcspResponseStatus'
  code: Scalars['Int']
  value: Scalars['String']
}

export type Organization = {
  __typename?: 'Organization'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  organizationNumber?: Maybe<Scalars['String']>
  bankIdCertificate?: Maybe<BankIdCertificate>
}

export type Query = {
  __typename?: 'Query'
  me?: Maybe<User>
}

export type Subscription = {
  __typename?: 'Subscription'
  bankIdSession: BankIdSession
}

export type SubscriptionBankIdSessionArgs = {
  id: Scalars['ID']
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  surName?: Maybe<Scalars['String']>
  givenName?: Maybe<Scalars['String']>
  ssn?: Maybe<Scalars['String']>
  bankIdCertificate?: Maybe<BankIdCertificate>
  email?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  files?: Maybe<Array<Maybe<File>>>
  createdAt: Scalars['DateTime']
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type UserMutation = {
  __typename?: 'UserMutation'
  files?: Maybe<FilesMutation>
}

export type VerificationResult = {
  __typename?: 'VerificationResult'
  description?: Maybe<Scalars['String']>
  status?: Maybe<VerificationResultStatus>
  error?: Maybe<Scalars['String']>
}

export enum VerificationResultStatus {
  Success = 'success',
  Failure = 'failure',
  Error = 'error'
}

export type CancelBankIdSessionMutationVariables = {
  id: Scalars['ID']
}

export type CancelBankIdSessionMutation = { __typename?: 'Mutation' } & {
  bankId: Maybe<
    { __typename?: 'BankIdMutation' } & {
      session: Maybe<
        { __typename?: 'BankIdSessionMutation' } & Pick<BankIdSessionMutation, 'cancel'>
      >
    }
  >
}

export type CreateBankIdSessionMutationVariables = {
  input: BankIdSessionsInput
}

export type CreateBankIdSessionMutation = { __typename?: 'Mutation' } & {
  bankId: Maybe<
    { __typename?: 'BankIdMutation' } & {
      sessions: Maybe<
        { __typename?: 'BankIdSessionsMutation' } & {
          create: { __typename?: 'BankIdSession' } & Pick<
            BankIdSession,
            | 'id'
            | 'status'
            | 'name'
            | 'givenName'
            | 'surname'
            | 'deviceIpAddress'
            | 'certNotBefore'
            | 'certNotAfter'
            | 'orderRef'
            | 'signature'
            | 'ocspResponse'
            | 'userVisibleData'
            | 'userNonVisibleData'
            | 'createdAt'
            | 'updatedAt'
          >
        }
      >
    }
  >
}

export type InitAuthBankIdSessionMutationVariables = {
  id: Scalars['ID']
}

export type InitAuthBankIdSessionMutation = { __typename?: 'Mutation' } & {
  bankId: Maybe<
    { __typename?: 'BankIdMutation' } & {
      session: Maybe<
        { __typename?: 'BankIdSessionMutation' } & {
          initiateAuth: { __typename?: 'BankIdSession' } & Pick<
            BankIdSession,
            | 'id'
            | 'status'
            | 'name'
            | 'givenName'
            | 'surname'
            | 'deviceIpAddress'
            | 'certNotBefore'
            | 'certNotAfter'
            | 'orderRef'
            | 'signature'
            | 'ocspResponse'
            | 'userVisibleData'
            | 'userNonVisibleData'
            | 'createdAt'
            | 'updatedAt'
          >
        }
      >
    }
  >
}

export type InitSignBankIdSessionMutationVariables = {
  id: Scalars['ID']
}

export type InitSignBankIdSessionMutation = { __typename?: 'Mutation' } & {
  bankId: Maybe<
    { __typename?: 'BankIdMutation' } & {
      session: Maybe<
        { __typename?: 'BankIdSessionMutation' } & {
          initiateSign: { __typename?: 'BankIdSession' } & Pick<
            BankIdSession,
            | 'id'
            | 'status'
            | 'name'
            | 'givenName'
            | 'surname'
            | 'deviceIpAddress'
            | 'certNotBefore'
            | 'certNotAfter'
            | 'orderRef'
            | 'signature'
            | 'ocspResponse'
            | 'userVisibleData'
            | 'userNonVisibleData'
            | 'createdAt'
            | 'updatedAt'
          >
        }
      >
    }
  >
}

export type SubscribeBankIdSessionSubscriptionVariables = {
  id: Scalars['ID']
}

export type SubscribeBankIdSessionSubscription = { __typename?: 'Subscription' } & {
  bankIdSession: { __typename?: 'BankIdSession' } & Pick<
    BankIdSession,
    | 'id'
    | 'status'
    | 'name'
    | 'givenName'
    | 'surname'
    | 'deviceIpAddress'
    | 'certNotBefore'
    | 'certNotAfter'
    | 'orderRef'
    | 'signature'
    | 'ocspResponse'
    | 'userVisibleData'
    | 'userNonVisibleData'
    | 'hintCode'
    | 'errorCode'
    | 'details'
    | 'response'
    | 'completionData'
    | 'createdAt'
    | 'updatedAt'
  >
}

export const CancelBankIdSessionDocument = gql`
  mutation CancelBankIdSession($id: ID!) {
    bankId {
      session(id: $id) {
        cancel
      }
    }
  }
`
export type CancelBankIdSessionMutationFn = ApolloReactCommon.MutationFunction<
  CancelBankIdSessionMutation,
  CancelBankIdSessionMutationVariables
>
export type CancelBankIdSessionComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CancelBankIdSessionMutation,
    CancelBankIdSessionMutationVariables
  >,
  'mutation'
>

export const CancelBankIdSessionComponent = (props: CancelBankIdSessionComponentProps) => (
  <ApolloReactComponents.Mutation<CancelBankIdSessionMutation, CancelBankIdSessionMutationVariables>
    mutation={CancelBankIdSessionDocument}
    {...props}
  />
)

export type CancelBankIdSessionProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<CancelBankIdSessionMutation, CancelBankIdSessionMutationVariables>
  | TChildProps
export function withCancelBankIdSession<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CancelBankIdSessionMutation,
    CancelBankIdSessionMutationVariables,
    CancelBankIdSessionProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CancelBankIdSessionMutation,
    CancelBankIdSessionMutationVariables,
    CancelBankIdSessionProps<TChildProps>
  >(CancelBankIdSessionDocument, {
    alias: 'cancelBankIdSession',
    ...operationOptions
  })
}
export type CancelBankIdSessionMutationResult = ApolloReactCommon.MutationResult<
  CancelBankIdSessionMutation
>
export type CancelBankIdSessionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CancelBankIdSessionMutation,
  CancelBankIdSessionMutationVariables
>
export const CreateBankIdSessionDocument = gql`
  mutation CreateBankIdSession($input: BankIdSessionsInput!) {
    bankId {
      sessions {
        create(input: $input) {
          id
          status
          name
          givenName
          surname
          deviceIpAddress
          certNotBefore
          certNotAfter
          orderRef
          signature
          ocspResponse
          userVisibleData
          userNonVisibleData
          createdAt
          updatedAt
        }
      }
    }
  }
`
export type CreateBankIdSessionMutationFn = ApolloReactCommon.MutationFunction<
  CreateBankIdSessionMutation,
  CreateBankIdSessionMutationVariables
>
export type CreateBankIdSessionComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateBankIdSessionMutation,
    CreateBankIdSessionMutationVariables
  >,
  'mutation'
>

export const CreateBankIdSessionComponent = (props: CreateBankIdSessionComponentProps) => (
  <ApolloReactComponents.Mutation<CreateBankIdSessionMutation, CreateBankIdSessionMutationVariables>
    mutation={CreateBankIdSessionDocument}
    {...props}
  />
)

export type CreateBankIdSessionProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<CreateBankIdSessionMutation, CreateBankIdSessionMutationVariables>
  | TChildProps
export function withCreateBankIdSession<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateBankIdSessionMutation,
    CreateBankIdSessionMutationVariables,
    CreateBankIdSessionProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateBankIdSessionMutation,
    CreateBankIdSessionMutationVariables,
    CreateBankIdSessionProps<TChildProps>
  >(CreateBankIdSessionDocument, {
    alias: 'createBankIdSession',
    ...operationOptions
  })
}
export type CreateBankIdSessionMutationResult = ApolloReactCommon.MutationResult<
  CreateBankIdSessionMutation
>
export type CreateBankIdSessionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateBankIdSessionMutation,
  CreateBankIdSessionMutationVariables
>
export const InitAuthBankIdSessionDocument = gql`
  mutation InitAuthBankIdSession($id: ID!) {
    bankId {
      session(id: $id) {
        initiateAuth {
          id
          status
          name
          givenName
          surname
          deviceIpAddress
          certNotBefore
          certNotAfter
          orderRef
          signature
          ocspResponse
          userVisibleData
          userNonVisibleData
          createdAt
          updatedAt
        }
      }
    }
  }
`
export type InitAuthBankIdSessionMutationFn = ApolloReactCommon.MutationFunction<
  InitAuthBankIdSessionMutation,
  InitAuthBankIdSessionMutationVariables
>
export type InitAuthBankIdSessionComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    InitAuthBankIdSessionMutation,
    InitAuthBankIdSessionMutationVariables
  >,
  'mutation'
>

export const InitAuthBankIdSessionComponent = (props: InitAuthBankIdSessionComponentProps) => (
  <ApolloReactComponents.Mutation<
    InitAuthBankIdSessionMutation,
    InitAuthBankIdSessionMutationVariables
  >
    mutation={InitAuthBankIdSessionDocument}
    {...props}
  />
)

export type InitAuthBankIdSessionProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<
      InitAuthBankIdSessionMutation,
      InitAuthBankIdSessionMutationVariables
    >
  | TChildProps
export function withInitAuthBankIdSession<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    InitAuthBankIdSessionMutation,
    InitAuthBankIdSessionMutationVariables,
    InitAuthBankIdSessionProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    InitAuthBankIdSessionMutation,
    InitAuthBankIdSessionMutationVariables,
    InitAuthBankIdSessionProps<TChildProps>
  >(InitAuthBankIdSessionDocument, {
    alias: 'initAuthBankIdSession',
    ...operationOptions
  })
}
export type InitAuthBankIdSessionMutationResult = ApolloReactCommon.MutationResult<
  InitAuthBankIdSessionMutation
>
export type InitAuthBankIdSessionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  InitAuthBankIdSessionMutation,
  InitAuthBankIdSessionMutationVariables
>
export const InitSignBankIdSessionDocument = gql`
  mutation InitSignBankIdSession($id: ID!) {
    bankId {
      session(id: $id) {
        initiateSign {
          id
          status
          name
          givenName
          surname
          deviceIpAddress
          certNotBefore
          certNotAfter
          orderRef
          signature
          ocspResponse
          userVisibleData
          userNonVisibleData
          createdAt
          updatedAt
        }
      }
    }
  }
`
export type InitSignBankIdSessionMutationFn = ApolloReactCommon.MutationFunction<
  InitSignBankIdSessionMutation,
  InitSignBankIdSessionMutationVariables
>
export type InitSignBankIdSessionComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    InitSignBankIdSessionMutation,
    InitSignBankIdSessionMutationVariables
  >,
  'mutation'
>

export const InitSignBankIdSessionComponent = (props: InitSignBankIdSessionComponentProps) => (
  <ApolloReactComponents.Mutation<
    InitSignBankIdSessionMutation,
    InitSignBankIdSessionMutationVariables
  >
    mutation={InitSignBankIdSessionDocument}
    {...props}
  />
)

export type InitSignBankIdSessionProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<
      InitSignBankIdSessionMutation,
      InitSignBankIdSessionMutationVariables
    >
  | TChildProps
export function withInitSignBankIdSession<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    InitSignBankIdSessionMutation,
    InitSignBankIdSessionMutationVariables,
    InitSignBankIdSessionProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    InitSignBankIdSessionMutation,
    InitSignBankIdSessionMutationVariables,
    InitSignBankIdSessionProps<TChildProps>
  >(InitSignBankIdSessionDocument, {
    alias: 'initSignBankIdSession',
    ...operationOptions
  })
}
export type InitSignBankIdSessionMutationResult = ApolloReactCommon.MutationResult<
  InitSignBankIdSessionMutation
>
export type InitSignBankIdSessionMutationOptions = ApolloReactCommon.BaseMutationOptions<
  InitSignBankIdSessionMutation,
  InitSignBankIdSessionMutationVariables
>
export const SubscribeBankIdSessionDocument = gql`
  subscription SubscribeBankIdSession($id: ID!) {
    bankIdSession(id: $id) {
      id
      status
      name
      givenName
      surname
      deviceIpAddress
      certNotBefore
      certNotAfter
      orderRef
      signature
      ocspResponse
      userVisibleData
      userNonVisibleData
      hintCode
      errorCode
      details
      response
      completionData
      createdAt
      updatedAt
    }
  }
`
export type SubscribeBankIdSessionComponentProps = Omit<
  ApolloReactComponents.SubscriptionComponentOptions<
    SubscribeBankIdSessionSubscription,
    SubscribeBankIdSessionSubscriptionVariables
  >,
  'subscription'
>

export const SubscribeBankIdSessionComponent = (props: SubscribeBankIdSessionComponentProps) => (
  <ApolloReactComponents.Subscription<
    SubscribeBankIdSessionSubscription,
    SubscribeBankIdSessionSubscriptionVariables
  >
    subscription={SubscribeBankIdSessionDocument}
    {...props}
  />
)

export type SubscribeBankIdSessionProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<
      SubscribeBankIdSessionSubscription,
      SubscribeBankIdSessionSubscriptionVariables
    >
  | TChildProps
export function withSubscribeBankIdSession<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    SubscribeBankIdSessionSubscription,
    SubscribeBankIdSessionSubscriptionVariables,
    SubscribeBankIdSessionProps<TChildProps>
  >
) {
  return ApolloReactHoc.withSubscription<
    TProps,
    SubscribeBankIdSessionSubscription,
    SubscribeBankIdSessionSubscriptionVariables,
    SubscribeBankIdSessionProps<TChildProps>
  >(SubscribeBankIdSessionDocument, {
    alias: 'subscribeBankIdSession',
    ...operationOptions
  })
}
export type SubscribeBankIdSessionSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  SubscribeBankIdSessionSubscription
>
