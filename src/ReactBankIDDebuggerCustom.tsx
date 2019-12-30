import React, { useState } from 'react'
import DebugButtons from './ReactBankIDDebugButtons'
import { IGetCurrentState } from './lib/bankidResponseToState'
import ReactBankID from './ReactBankID'
import BankIDLogo from './assets/bankid/bankid_white.svg'
import { Button, Card, Input, Modal, ModalBody, Spinner } from 'reactstrap'
import {
  BankidButtonProps,
  CancelButtonProps,
  ContainerProps,
  SsnInputProps,
  StateWrapperProps,
  UserMessageProps
} from './lib/types'

export default function ReactBankIDWithDebuggerCustom() {
  const [state, setState] = useState<IGetCurrentState>({ isMobile: false })

  return (
    <>
      <DebugButtons onSimulateChangeState={(state: IGetCurrentState) => setState(state)} />
      <ReactBankID
        bankidButtonText={'Logga in med Mobilt BankID'}
        onCompleteBankidAuth={() => {
          window.location.href = 'http://localhost:3000/custom/authenticated'
        }}
        Spinner={props => (
          <div>
            <Spinner {...props} className="text-primary" />
          </div>
        )}
        UserMessage={(props: UserMessageProps) => <h3 {...props}>{props.msg}</h3>}
        SsnInput={(props: SsnInputProps) => <Input {...props} className="mb-3" />}
        BankidButton={({ children, ...props }: BankidButtonProps) => (
          <Button {...props} color="primary">
            <>
              {children}
              <img className="ml-2" width={24} src={BankIDLogo} alt="Bank ID logo" />
            </>
          </Button>
        )}
        CancelButton={({ children, ...props }: CancelButtonProps) => (
          <Button {...props}>{children}</Button>
        )}
        Container={({ children, ...props }: ContainerProps) => (
          <Card
            className="d-flex justify-content-center align-items-center text-center p-5"
            {...props}>
            {children}
          </Card>
        )}
        StateWrapper={({ children, ...props }: StateWrapperProps) => (
          <Modal {...props} toggle={() => props.toggle()}>
            <ModalBody className="d-flex justify-content-center align-items-center text-center">
              {children}
            </ModalBody>
          </Modal>
        )}
        onInitiateBankidAuth={() =>
          setState({
            isMobile: true,
            bankidResponse: {
              status: 'pending',
              hintCode: 'noClient'
            }
          })
        }
        onCancelBankidAuth={() => {
          setState({
            isMobile: true
          })
        }}
        isMobile={state.isMobile}
        bankidResponse={state.bankidResponse}
      />
    </>
  )
}
