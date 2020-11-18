// before(() => {
//     cy.url().then(url => !url.includes(Cypress.config().baseUrl) && cy.visit('/'))
// })

describe('Navigation Drawer', () => {
  before(() => {
    cy.url().then(url => !url.includes(Cypress.config().baseUrl) && cy.visit('/'))
//   it('opens when click the icon', () => {
    cy.get('.v-navigation-drawer__content')
        .as('drawer')
        .should('not.be.visible')

    cy.get('.v-app-bar__nav-icon > .v-btn__content')
        .click()

    cy.get('@drawer')
        .should('be.visible')
//   })
  })

  after(() => {
    cy.get('.v-navigation-drawer__content')
      .as('drawer')
      .should('be.visible')

    cy.get('.v-app-bar__nav-icon > .v-btn__content')
      .click({ force: true })

    cy.get('@drawer')
      .should('not.be.visible')
  })

  it('has login button and links to other site\'s sections', () => {
    cy.get('.v-navigation-drawer__content')
      .as('drawer')
      .should('contains', /Вы?ход/)
      .find('a.v-list-item')
      .should('have.length', 8)
      .find('.v-list-item__action > .v-icon')
      .should('have.length', 8)
  })

  it('has working night mode toggler', () => {
    cy.get('.v-application')
      .as('app')
      .should('have.class', 'theme--light')

    cy.get('.v-navigation-drawer__content')
      .contains('Тёмная тема')
      .as('toggler')
      .click()
      
    cy.get('@app')
      .should('have.class', 'theme--dark')

    cy.get('@toggler')
      .click()

    cy.get('@app')
      .should('have.class', 'theme--light')
  })
})