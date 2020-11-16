// https://docs.cypress.io/api/introduction/api.html

before(() => {  
  cy.visit(Cypress.env('BASE_URL'))
})

describe('Site\'s header', () => {
  it('has right title name', () => {
    cy.contains('a[href="/about"]', 'ДОСААФ Каменка')
  })

  it('has right number of navigation links', () => {
    cy.get('.container > a.v-btn')
      .should('have.length', 3)
  })

  it('has categories menu and login button', () => {
    cy.get('.container > button.v-btn')
      .should('have.length', 2)
  })
})
