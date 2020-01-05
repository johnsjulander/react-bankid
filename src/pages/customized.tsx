import React, { useState } from 'react'
import DebugButtons from '../ReactBankIDDebugButtons'
import ReactBankID from '../ReactBankID'
import BankIDLogo from '../assets/bankid/bankid_white.svg'
import { Button, Card, Input, Modal, ModalBody, Spinner } from 'reactstrap'
import {
  BankidButtonProps,
  CancelButtonProps,
  ContainerProps,
  ErrorCollectResponse,
  SsnInputProps,
  StateWrapperProps,
  UserMessageProps
} from '../lib/types'
import { CollectResponse } from 'bankid/lib/bankid'

export default function ExampleCustomized() {
  const [state, setState] = useState<{ bankidResponse?: CollectResponse | ErrorCollectResponse }>(
    {}
  )

  return (
    <>
      <DebugButtons
        onSimulateChangeBankidResponse={(bankidResponse?: CollectResponse | ErrorCollectResponse) =>
          setState({ bankidResponse })
        }
      />
      <ReactBankID
        bankidButtonText={'Logga in med Mobilt BankID'}
        onCompleteBankid={() => {
          window.location.href = 'http://localhost:3000/customized/authenticated'
        }}
        Spinner={props => (
          <div>
            <Spinner {...props} className="text-primary" />
            <h1>Some damn h1</h1>
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
        onInitiateBankid={() =>
          setState({
            bankidResponse: {
              orderRef: '',
              status: 'pending',
              hintCode: 'noClient'
            }
          })
        }
        onCancelBankid={() => {
          setState({})
        }}
        bankidResponse={state.bankidResponse}
      />
    </>
  )
}
