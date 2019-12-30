import { IGetCurrentState } from './bankidResponseToState'

const allPossibleStates = [
  {
    isMobile: true,
    'data-cy': 'react-bankid-debug-not-initialized-btn'
  },
  {
    bankidResponse: { status: 'pending', hintCode: 'outstandingTransaction' },
    'data-cy': 'react-bankid-debug-outstanding-transaction-btn',
    isMobile: true
  },
  {
    bankidResponse: { status: 'pending', hintCode: 'noClient' },
    'data-cy': 'react-bankid-debug-no-client-btn',
    isMobile: true
  },
  {
    bankidResponse: { status: 'pending', hintCode: 'started' },
    'data-cy': 'react-bankid-debug-started-btn',
    isMobile: true
  },
  {
    bankidResponse: { status: 'pending', hintCode: 'userSign' },
    'data-cy': 'react-bankid-debug-user-sign-btn',
    isMobile: true
  },
  {
    bankidResponse: { status: 'pending', hintCode: 'unknown' },
    'data-cy': 'react-bankid-debug-unknown-btn',
    isMobile: true
  },
  {
    bankidResponse: { status: 'failed', hintCode: 'expiredTransaction' },
    'data-cy': 'react-bankid-debug-expired-transaction-btn',
    isMobile: true
  },
  {
    bankidResponse: { status: 'failed', hintCode: 'certificateErr' },
    'data-cy': 'react-bankid-debug-certificate-err-btn',
    isMobile: true
  },
  {
    bankidResponse: { status: 'failed', hintCode: 'userCancel' },
    'data-cy': 'react-bankid-debug-user-cancel-btn',
    isMobile: true
  },
  {
    bankidResponse: { status: 'failed', hintCode: 'cancelled' },
    'data-cy': 'react-bankid-debug-cancelled-btn',
    isMobile: true
  },
  {
    bankidResponse: { status: 'failed', hintCode: 'startFailed' },
    'data-cy': 'react-bankid-debug-start-failed-btn',
    isMobile: true
  },
  {
    bankidResponse: { status: 'failed', hintCode: 'unknown' },
    'data-cy': 'react-bankid-debug-unknown-btn',
    isMobile: true
  },
  {
    bankidResponse: { errorCode: 'alreadyInProgress' },
    'data-cy': 'react-bankid-debug-already-in-progress-btn',
    isMobile: true
  },
  {
    bankidResponse: { errorCode: 'invalidParameters' },
    'data-cy': 'react-bankid-debug-invalid-parameters-btn',
    isMobile: true
  },
  {
    bankidResponse: { errorCode: 'unknown' },
    'data-cy': 'react-bankid-debug-unknown-btn',
    isMobile: true
  },
  {
    bankidResponse: { errorCode: 'unauthorized' },
    'data-cy': 'react-bankid-debug-unauthorized-btn',
    isMobile: true
  },
  {
    bankidResponse: { errorCode: 'notFound' },
    'data-cy': 'react-bankid-debug-not-found-btn',
    isMobile: true
  },
  {
    bankidResponse: { errorCode: 'requestTimeout' },
    'data-cy': 'react-bankid-debug-request-timeout-btn',
    isMobile: true
  },
  {
    bankidResponse: { errorCode: 'unsupportedMediaType' },
    'data-cy': 'react-bankid-debug-unsupported-media-type-btn',
    isMobile: true
  },
  {
    bankidResponse: { errorCode: 'internalError' },
    'data-cy': 'react-bankid-debug-internal-error-btn',
    isMobile: true
  },
  {
    bankidResponse: { errorCode: 'Maintenance' },
    'data-cy': 'react-bankid-debug-maintenance-btn',
    isMobile: true
  },
  {
    bankidResponse: { status: 'complete', completionData: {} },
    'data-cy': 'react-bankid-debug-complete-btn',
    isMobile: true
  }
] as (IGetCurrentState & { 'data-cy': string })[]

export default allPossibleStates
