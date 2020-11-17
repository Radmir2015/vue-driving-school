before(() => {
  cy.url().then(url =>
    (Cypress.config().baseUrl !== url) && cy.visit('/')
  )
//   ((await cy.url()) !== Cypress.config().baseUrl) && cy.visit('/')
})

describe('Main root page', () => {
  it('has right first section (about) content', () => {
    cy.get('.text-h6').contains('Каменская автомобильная школа')
    cy.get('.v-card p').contains('Москва, Волоколамское шоссе, д. 88, стр. 3')
  })
})