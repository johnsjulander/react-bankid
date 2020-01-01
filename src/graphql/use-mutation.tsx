import {
  CreateBankIdSessionMutation,
  CreateBankIdSessionMutationVariables,
  CreateBankIdSessionDocument,
  InitSignBankIdSessionMutation,
  InitSignBankIdSessionMutationVariables,
  InitSignBankIdSessionDocument
} from './generated-graphql'
import { useMutation } from '@apollo/react-hooks'

export const useInitSignBankIdSession = () => {
  return useMutation<InitSignBankIdSessionMutation, InitSignBankIdSessionMutationVariables>(
    InitSignBankIdSessionDocument
  )
}

export const useCreateBankIdSession = () => {
  return useMutation<CreateBankIdSessionMutation, CreateBankIdSessionMutationVariables>(
    CreateBankIdSessionDocument
  )
}
