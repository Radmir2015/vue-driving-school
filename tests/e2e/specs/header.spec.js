// https://docs.cypress.io/api/introduction/api.html

describe('Site\'s header', () => {
  before(() => {
    cy.url().then(url => (Cypress.config().baseUrl !== url) && cy.visit('/'))
  })

  it('has right title name', () => {
    cy.get('a[href="/about"]')
      .contains('ДОСААФ Каменка')
  })

  it('has right number of navigation links', () => {
    cy.get('.container > a.v-btn')
      .should('have.length', 3)
  })

  context('Categories Menu and Login Button', () => {
    beforeEach(() => {
      cy.get('.container > button.v-btn')
        .as('menuLogin')
        .should('have.length', 2)
    })
  
    it('has categories menu button and working dropdown menu', () => {
      cy.get('@menuLogin')
        .first()
        .as('login')
        .should('have.text', ' Категории ')
        .and('have.attr', 'aria-expanded', 'false')
        .click()
        .should('have.attr', 'aria-expanded', 'true')
  
      cy.get('[role=menu]')
        .find('a')
        .should('have.length', 5)
        .should($menuLink => expect($menuLink.text().startsWith('Категория')).eql(true))

      cy.get('@login')
        .trigger('mouseleave')
    })
  
    it('has popping out login form', () => {
      cy.get('@menuLogin')
        .last()
        .contains(/Вы?ход/)
        .click()
        .then(() =>
          cy.contains('Вход для администраторов')
            .type('{esc}')
            .should('not.be.visible')
        )

      cy.focused()
        .blur()
    })
  })
})
