describe('Documents page', () => {
  before(() => {
    cy.url().then(url => {
      if (Cypress.config().baseUrl == url)
        cy.contains('Документы').click()
      else if (Cypress.config().baseUrl + 'docs' != url)
        cy.visit('/docs')
    })
  })
  
  it('has expandable sections with download and preview buttons', () => {
    cy.get('div[aria-expanded]', { timeout: 10000 })
      .should('have.length.gte', 5)
      .contains('Образовательные программы')
      .parent()
      .should('have.attr', 'aria-expanded', 'false')
      .click()
      .should('have.attr', 'aria-expanded', 'true')
      .find('.container')
      .should('have.length.gte', 11)
      .find('a[href*=firebasestorage]:contains("Скачать")')
      .should('have.length.gte', 11)
      .eq(0)
      .prev()
      .click()
    
    cy.get('embed[src*="docs.google"]')
      .as('doc')
      .should('be.visible')
      
      // .its('0.contentDocument.body', { timeout: 15000 })
      // .then(cy.wrap)
      // .get('div[role="document"]')
      // .scrollTo('bottom')

    cy.get('.ml-2 > .v-btn__content')
      .click()

    cy.get('@doc')
      .should('not.be.visible')
  })
})