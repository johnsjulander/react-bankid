describe('Scenarios', function() {
  describe('Default components', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
    it('should be able to authenticate', () => {
      cy.get('[data-cy=react-bankid-ssn-input]').click()
      cy.get('[data-cy=react-bankid-ssn-input]').type('8711131436')
      cy.get('[data-cy=react-bankid-submit-action-btn]')
        .contains('Logga in med Mobilt BankID')
        .click()

      cy.get('[data-cy=react-bankid-user-message]').should('have.text', 'Starta BankID-appen.')
      cy.get('[data-cy=react-bankid-spinner]').should('be.visible')
      cy.get('[data-cy=react-bankid-cancel-btn]')
        .contains('Avbryt')
        .click()

      cy.get('[data-cy=react-bankid-debug-user-sign-btn]').click()
      cy.get('[data-cy=react-bankid-spinner]').should('be.visible')
      cy.get('[data-cy=react-bankid-user-message]').should(
        'have.text',
        'Skriv in din säkerhetskod i BankIDappen och välj Legitimera eller Skriv under.'
      )
      cy.get('[data-cy=react-bankid-cancel-btn]')
        .contains('Avbryt')
        .click()

      cy.get('[data-cy=react-bankid-debug-complete-btn]').click()
      cy.url().should('eq', 'http://localhost:3000/authenticated')
    })

    it('should warn about incorrect ssn values', () => {
      cy.get('[data-cy=react-bankid-ssn-input]').click()
      cy.get('[data-cy=react-bankid-ssn-input]').type('8711131435')
      cy.get('[data-cy=react-bankid-submit-action-btn]')
        .contains('Logga in med Mobilt BankID')
        .click()

      cy.get('[data-cy=react-bankid-submit-action-btn]').should('be.disabled')
      cy.get('[data-cy=react-bankid-ssn-input-warning-text]').contains('Ogiltigt personnummer')
      cy.get('[data-cy=react-bankid-ssn-input]').click()
      cy.get('[data-cy=react-bankid-ssn-input]')
        .clear()
        .type('8711131436')
      cy.get('[data-cy=react-bankid-ssn-input-text]').should('not.exist')
      cy.get('[data-cy=react-bankid-submit-action-btn]').should('be.not.disabled')
    })

    it('should allow user to restart when reached a failed state', () => {
      cy.get('[data-cy=react-bankid-ssn-input]').click()
      cy.get('[data-cy=react-bankid-ssn-input]').type('8711131436')
      cy.get('[data-cy=react-bankid-submit-action-btn]').click()

      cy.get('[data-cy=react-bankid-cancel-btn]')
        .contains('Avbryt')
        .click()
      cy.get('[data-cy=react-bankid-debug-user-cancel-btn]').click()
      cy.get('[data-cy=react-bankid-spinner]').should('not.exist')

      cy.get('[data-cy=react-bankid-user-message]').should('have.text', 'Åtgärden avbruten.')

      cy.get('[data-cy=react-bankid-cancel-btn]')
        .contains('Avbryt')
        .click()

      cy.get('[data-cy=react-bankid-ssn-input]').should('have.value', '8711131436')
      cy.get('[data-cy=react-bankid-submit-action-btn]')
        .contains('Logga in med Mobilt BankID')
        .click()

      cy.get('[data-cy=react-bankid-user-message]').should('have.text', 'Starta BankID-appen.')
      cy.get('[data-cy=react-bankid-spinner]').should('be.visible')
      cy.get('[data-cy=react-bankid-cancel-btn]')
        .contains('Avbryt')
        .click()

      cy.get('[data-cy=react-bankid-debug-complete-btn]').click()
      cy.url().should('eq', 'http://localhost:3000/authenticated')
    })

    it('should be able to swap out components', () => {
      cy.get('[data-cy=react-bankid-ssn-input]').click()
      cy.get('[data-cy=react-bankid-ssn-input]').type('8711131436')
      cy.get('[data-cy=react-bankid-submit-action-btn]').contains('Logga in med Mobilt BankID')
    })
  })

  describe('Custom components', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/customized')
    })
    it('should be able to authenticate', () => {
      cy.get('[data-cy=react-bankid-ssn-input]').click()
      cy.get('[data-cy=react-bankid-ssn-input]').type('8711131436')
      cy.get('[data-cy=react-bankid-submit-action-btn]')
        .contains('Logga in med Mobilt BankID')
        .click()

      cy.get('[data-cy=react-bankid-user-message]').should('have.text', 'Starta BankID-appen.')
      cy.get('[data-cy=react-bankid-spinner]').should('be.visible')
      cy.get('[data-cy=react-bankid-cancel-btn]')
        .contains('Avbryt')
        .click()

      cy.get('[data-cy=react-bankid-debug-user-sign-btn]').click()
      cy.get('[data-cy=react-bankid-spinner]').should('be.visible')
      cy.get('[data-cy=react-bankid-user-message]').should(
        'have.text',
        'Skriv in din säkerhetskod i BankIDappen och välj Legitimera eller Skriv under.'
      )
      cy.get('[data-cy=react-bankid-cancel-btn]')
        .contains('Avbryt')
        .click()

      cy.get('[data-cy=react-bankid-debug-complete-btn]').click()
      cy.url().should('eq', 'http://localhost:3000/customized/authenticated')
    })

    it('should warn about incorrect ssn values', () => {
      cy.get('[data-cy=react-bankid-ssn-input]').click()
      cy.get('[data-cy=react-bankid-ssn-input]').type('8711131435')
      cy.get('[data-cy=react-bankid-submit-action-btn]')
        .contains('Logga in med Mobilt BankID')
        .click()

      cy.get('[data-cy=react-bankid-submit-action-btn]').should('be.disabled')
      cy.get('[data-cy=react-bankid-ssn-input-warning-text]').contains('Ogiltigt personnummer')
      cy.get('[data-cy=react-bankid-ssn-input]').click()
      cy.get('[data-cy=react-bankid-ssn-input]')
        .clear()
        .type('8711131436')
      cy.get('[data-cy=react-bankid-ssn-input-text]').should('not.exist')
      cy.get('[data-cy=react-bankid-submit-action-btn]').should('be.not.disabled')
    })

    it('should allow user to restart when reached a failed state', () => {
      cy.get('[data-cy=react-bankid-ssn-input]').click()
      cy.get('[data-cy=react-bankid-ssn-input]').type('8711131436')
      cy.get('[data-cy=react-bankid-submit-action-btn]').click()

      cy.get('[data-cy=react-bankid-cancel-btn]')
        .contains('Avbryt')
        .click()
      cy.get('[data-cy=react-bankid-debug-user-cancel-btn]').click()
      cy.get('[data-cy=react-bankid-spinner]').should('not.exist')

      cy.get('[data-cy=react-bankid-user-message]').should('have.text', 'Åtgärden avbruten.')

      cy.get('[data-cy=react-bankid-cancel-btn]')
        .contains('Avbryt')
        .click()

      cy.get('[data-cy=react-bankid-ssn-input]').should('have.value', '8711131436')
      cy.get('[data-cy=react-bankid-submit-action-btn]')
        .contains('Logga in med Mobilt BankID')
        .click()

      cy.get('[data-cy=react-bankid-user-message]').should('have.text', 'Starta BankID-appen.')
      cy.get('[data-cy=react-bankid-spinner]').should('be.visible')
      cy.get('[data-cy=react-bankid-cancel-btn]')
        .contains('Avbryt')
        .click()

      cy.get('[data-cy=react-bankid-debug-complete-btn]').click()
      cy.url().should('eq', 'http://localhost:3000/customized/authenticated')
    })

    it('should be able to swap out components', () => {
      cy.get('[data-cy=react-bankid-ssn-input]').click()
      cy.get('[data-cy=react-bankid-ssn-input]').type('8711131436')
      cy.get('[data-cy=react-bankid-submit-action-btn]').contains('Logga in med Mobilt BankID')
    })
  })
})
