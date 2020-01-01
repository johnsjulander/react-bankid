import React, { useEffect, useState } from 'react'
import ReactBankID from '../ReactBankID'
import {
  useCancelBankIdSession,
  useCreateBankIdSession,
  useInitSignBankIdSession
} from '../graphql/use-mutation'
import { useSubscription } from '@apollo/react-hooks'
import {
  SubscribeBankIdSessionDocument,
  SubscribeBankIdSessionSubscription,
  SubscribeBankIdSessionSubscriptionVariables
} from '../graphql/generated-graphql'
import { FailedHintCode, PendingHintCode } from 'bankid/lib/bankid'

function ExampleBaseGraphqlContainer(props: any) {
  const subscription = useSubscription<
    SubscribeBankIdSessionSubscription,
    SubscribeBankIdSessionSubscriptionVariables
  >(SubscribeBankIdSessionDocument, { variables: { id: props.bankIdSessionId } })
  const [initSignBankIdSession] = useInitSignBankIdSession()
  const [cancelBankIdSession] = useCancelBankIdSession()

  useEffect(() => {
    if (
      subscription?.variables?.id !== '' &&
      props.bankIdSessionId !== '' &&
      props.bankIdSessionId !== null
    ) {
      initSignBankIdSession({ variables: { id: props.bankIdSessionId } })
    }
  }, [props.bankIdSessionId])

  const bankIdResponse = !subscription.data
    ? undefined
    : {
        orderRef: subscription.data?.bankIdSession?.orderRef || '',
        hintCode: subscription.data?.bankIdSession?.hintCode as FailedHintCode | PendingHintCode,
        errorCode: subscription.data?.bankIdSession?.errorCode,
        status: subscription.data?.bankIdSession?.status as 'pending' | 'failed' | 'complete',
        ...(subscription.data?.bankIdSession?.completionData
          ? { completionData: JSON.parse(subscription.data?.bankIdSession?.completionData) }
          : {})
      }

  return (
    <div>
      <ReactBankID
        onCompleteBankidAuth={() => {
          window.location.href = 'http://localhost:3000/authenticated'
        }}
        bankidButtonText={'Logga in med Mobilt BankID'}
        onInitiateBankidAuth={props.onInitiateBankidAuth}
        onCancelBankidAuth={() => cancelBankIdSession({ variables: { id: props.bankIdSessionId } })}
        bankidResponse={bankIdResponse}
      />
    </div>
  )
}

export default function ExampleBaseGraphql() {
  const [bankIdSessionId, setBankidSessionId] = useState<string | null>('')
  const [createBankIdSession] = useCreateBankIdSession()

  return (
    <ExampleBaseGraphqlContainer
      bankIdSessionId={bankIdSessionId}
      onInitiateBankidAuth={async (ssn: string) => {
        const { data } = await createBankIdSession({
          variables: { input: { ssn, userVisibleData: 'some-visible-data' } }
        })
        const sessionId = data?.bankId?.sessions?.create?.id || null
        setBankidSessionId(sessionId)
      }}
    />
  )
}
