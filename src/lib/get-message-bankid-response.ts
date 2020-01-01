import { errorCodesToRfa, failedHintCodeToRfa, pendingHintCodeToRfa, RFAtoText } from './msgs'
import { CollectResponse, FailedHintCode, PendingHintCode } from 'bankid/lib/bankid'
import { CollectResponseErrorMessage, ErrorCollectResponse } from './types'

export function isErrorResponse(
  bankIdResponse: CollectResponse | ErrorCollectResponse
): bankIdResponse is ErrorCollectResponse {
  return (
    (bankIdResponse as ErrorCollectResponse).errorCode != undefined ||
    (bankIdResponse as ErrorCollectResponse).message != undefined
  )
}

export default function getMessageBankIdResponse(
  bankIdResponse?: CollectResponse | ErrorCollectResponse
) {
  if (!bankIdResponse) {
    return null
  }

  if (isErrorResponse(bankIdResponse)) {
    return RFAtoText(
      errorCodesToRfa(
        (bankIdResponse.errorCode || bankIdResponse.message) as CollectResponseErrorMessage
      )
    )
  }

  return bankIdResponse.status === 'pending' && bankIdResponse.hintCode !== undefined
    ? RFAtoText(pendingHintCodeToRfa(bankIdResponse.hintCode as PendingHintCode)) || 'Laddar...'
    : bankIdResponse.status === 'failed'
    ? RFAtoText(failedHintCodeToRfa(bankIdResponse.hintCode as FailedHintCode))
    : bankIdResponse.status === 'complete'
    ? 'BankID autentisering avklarad'
    : null
}
