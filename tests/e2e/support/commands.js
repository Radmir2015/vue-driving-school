// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (email, password) => { 
  cy.get('.container > button.v-btn')
    .contains(/Вы?ход/)
    .click()

  cy.contains('Вход для администраторов')
    .as('popup')

  cy.contains('Логин')
    .next()
    .type(email)

  cy.contains('Пароль')
    .next()
    .type(password, { log: false })
    .should(el$ => {
      if (el$.val() !== password) {
        throw new Error('Different value of typed password')
      }
    })

  cy.get('.v-card__actions > .v-btn > .v-btn__content')
    .click()

  cy.get('@popup')
    .should('not.be.visible')

  cy.wait(1000)

  return cy.get('.container > button.v-btn')
    .contains(/Вы?ход/)
    .then($elem => $elem.text().includes('Выход'))
})

Cypress.Commands.add("logout", () => {
  return cy.get('.container > button.v-btn')
    .contains(/Вы?ход/)
    .click()
})

Cypress.Commands.add("loggedIn", () => {
  return cy.get('.container > button.v-btn')
    .contains(/Вы?ход/)
    .then($elem => $elem.text().includes('Выход'))
})

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
