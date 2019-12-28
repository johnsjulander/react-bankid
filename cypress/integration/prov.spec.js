describe('test_name', function() {

  describe('Not initialized', function() {
    it('Desktop - Must enter their personal number and start the BankID app manually on their mobile device.', function() {
      cy.visit('http://localhost:3000/?')
      cy.get('.react-bankid-ssn-input').click()
      cy.get('.react-bankid-ssn-input').type('8711131436')
      cy.get('.react-bankid-submit-bankid-action-btn').click()
      cy.get('.react-bankid-user-message')
        .should('have.value', 'Starta BankID-appen')
      cy.get('react-bankid-lds-ring')
        .should('be', 'visible')


    })

    it('Desktop - Users that select Mobile BankID, and the RP does not support QR code, must enter their personal number start the BankID app manually on their mobile device.', function() {

    })

    it('Desktop - Users that select Mobile BankID, and the RP does not support QR code, must enter their personal number start the BankID app manually on their mobile device', function() {

    })

    it('Mobile - Users should be asked if they want to login or sign using “Mobile BankID on this device” or “Mobile BankID on another device, RFA20', function() {

    })

    it('Mobile - Users that select to use this device do not need to enter their personal number and the RP must start the BankID app on the mobile device', function() {

    })

    it('Mobile - Users that select to use another device, and the RP does not support QR code, must enter their personal number and start the BankID app manually on the other device', function() {

    })

    it('Mobile -  Users that select to use another device, and the RP does not support QR code, must enter their personal number and start the BankID app manually on the other device.', function() {

    })
  })

  describe('PendingState', function() {
    it('The RP service displays a progress indicator.', function() {

    })

    it('Message displayed to the user is continuously updated during state transitions', function() {

    })
  })
})
