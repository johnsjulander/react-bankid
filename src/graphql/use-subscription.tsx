import {
  SubscribeBankIdSessionSubscription,
  SubscribeBankIdSessionSubscriptionVariables,
  SubscribeBankIdSessionDocument
} from './generated-graphql'
import { useSubscription } from '@apollo/react-hooks'

export const useSubscribeBankIdSession = () => {
  return useSubscription<
    SubscribeBankIdSessionSubscription,
    SubscribeBankIdSessionSubscriptionVariables
  >(SubscribeBankIdSessionDocument)
}
