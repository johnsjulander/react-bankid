import {IGetCurrentState} from './bankidResponseToState'

const allPossibleStates = [
  {
    isMobile: true
  },
  {
    bankidResponse: { status: 'pending', hintCode: 'outstandingTransaction' },
    isMobile: true
  },
  {
    bankidResponse: { status: 'pending', hintCode: 'noClient' },
    isMobile: true
  },
  {
    bankidResponse: { status: 'pending', hintCode: 'started' },
    isMobile: true
  },
  {
    bankidResponse: { status: 'pending', hintCode: 'userSign' },
    isMobile: true
  },
  {
    bankidResponse: { status: 'pending', hintCode: 'unknown' },
    isMobile: true
  },
  {
    bankidResponse: { status: 'failed', hintCode: 'expiredTransaction' },
    isMobile: true
  },
  {
    bankidResponse: { status: 'failed', hintCode: 'certificateErr' },
    isMobile: true
  },
  {
    bankidResponse: { status: 'failed', hintCode: 'userCancel' },
    isMobile: true
  },
  {
    bankidResponse: { status: 'failed', hintCode: 'cancelled' },
    isMobile: true
  },
  {
    bankidResponse: { status: 'failed', hintCode: 'startFailed' },
    isMobile: true
  },
  {
    bankidResponse: { status: 'failed', hintCode: 'unknown' },
    isMobile: true
  },
  {
    bankidResponse: { errorCode: 'alreadyInProgress' },
    isMobile: true
  },
  {
    bankidResponse: { errorCode: 'invalidParameters' },
    isMobile: true
  },
  {
    bankidResponse: { errorCode: 'unknown' },
    isMobile: true
  },
  {
    bankidResponse: { errorCode: 'unauthorized' },
    isMobile: true
  },
  {
    bankidResponse: { errorCode: 'notFound' },
    isMobile: true
  },
  {
    bankidResponse: { errorCode: 'requestTimeout' },
    isMobile: true
  },
  {
    bankidResponse: { errorCode: 'unsupportedMediaType' },
    isMobile: true
  },
  {
    bankidResponse: { errorCode: 'internalError' },
    isMobile: true
  },
  {
    bankidResponse: { errorCode: 'Maintenance' },
    isMobile: true
  },
  {
    bankidResponse: { status: 'complete', completionData: {} },
    isMobile: true
  },
] as IGetCurrentState[]

export default allPossibleStates
