import { CollectResponse } from 'bankid/lib/bankid'
import { ErrorCollectResponse } from './types'

const allPossibleStates = [
  {
    'data-cy': 'react-bankid-debug-not-initialized-btn'
  },
  {
    bankidResponse: { orderRef: '', status: 'pending', hintCode: 'outstandingTransaction' },
    'data-cy': 'react-bankid-debug-outstanding-transaction-btn'
  },
  {
    bankidResponse: { orderRef: '', status: 'pending', hintCode: 'noClient' },
    'data-cy': 'react-bankid-debug-no-client-btn'
  },
  {
    bankidResponse: { orderRef: '', status: 'pending', hintCode: 'started' },
    'data-cy': 'react-bankid-debug-started-btn'
  },
  {
    bankidResponse: { orderRef: '', status: 'pending', hintCode: 'userSign' },
    'data-cy': 'react-bankid-debug-user-sign-btn'
  },
  {
    bankidResponse: { orderRef: '', status: 'pending', hintCode: 'unknown' },
    'data-cy': 'react-bankid-debug-unknown-btn'
  },
  {
    bankidResponse: { orderRef: '', status: 'failed', hintCode: 'expiredTransaction' },
    'data-cy': 'react-bankid-debug-expired-transaction-btn'
  },
  {
    bankidResponse: { orderRef: '', status: 'failed', hintCode: 'certificateErr' },
    'data-cy': 'react-bankid-debug-certificate-err-btn'
  },
  {
    bankidResponse: { orderRef: '', status: 'failed', hintCode: 'userCancel' },
    'data-cy': 'react-bankid-debug-user-cancel-btn'
  },
  {
    bankidResponse: { orderRef: '', status: 'failed', hintCode: 'cancelled' },
    'data-cy': 'react-bankid-debug-cancelled-btn'
  },
  {
    bankidResponse: { orderRef: '', status: 'failed', hintCode: 'startFailed' },
    'data-cy': 'react-bankid-debug-start-failed-btn'
  },
  {
    bankidResponse: { orderRef: '', status: 'failed', hintCode: 'unknown' },
    'data-cy': 'react-bankid-debug-unknown-btn'
  },
  {
    bankidResponse: { errorCode: 'alreadyInProgress' },
    'data-cy': 'react-bankid-debug-already-in-progress-btn'
  },
  {
    bankidResponse: { errorCode: 'invalidParameters' },
    'data-cy': 'react-bankid-debug-invalid-parameters-btn'
  },
  {
    bankidResponse: { errorCode: 'unknown' },
    'data-cy': 'react-bankid-debug-unknown-btn'
  },
  {
    bankidResponse: { errorCode: 'unauthorized' },
    'data-cy': 'react-bankid-debug-unauthorized-btn'
  },
  {
    bankidResponse: { errorCode: 'notFound' },
    'data-cy': 'react-bankid-debug-not-found-btn'
  },
  {
    bankidResponse: { errorCode: 'requestTimeout' },
    'data-cy': 'react-bankid-debug-request-timeout-btn'
  },
  {
    bankidResponse: { errorCode: 'unsupportedMediaType' },
    'data-cy': 'react-bankid-debug-unsupported-media-type-btn'
  },
  {
    bankidResponse: { errorCode: 'internalError' },
    'data-cy': 'react-bankid-debug-internal-error-btn'
  },
  {
    bankidResponse: { errorCode: 'Maintenance' },
    'data-cy': 'react-bankid-debug-maintenance-btn'
  },
  {
    bankidResponse: { orderRef: '', status: 'complete', completionData: {} },
    'data-cy': 'react-bankid-debug-complete-btn'
  }
] as { bankidResponse?: CollectResponse | ErrorCollectResponse; 'data-cy': string }[]

export default allPossibleStates
