import {
  SubscribeBankIdSessionSubscription,
  SubscribeBankIdSessionSubscriptionVariables,
  SubscribeBankIdSessionDocument
} from './generated-graphql'
import { useSubscription } from '@apollo/react-hooks'
import {ApolloError} from 'apollo-client'

export const useSubscribeBankIdSession: () => { variables: SubscribeBankIdSessionSubscriptionVariables | undefined; loading: boolean; data?: SubscribeBankIdSessionSubscription | undefined; error?: ApolloError | undefined } = () => {
  return useSubscription<
    SubscribeBankIdSessionSubscription,
    SubscribeBankIdSessionSubscriptionVariables
  >(SubscribeBankIdSessionDocument)
}
