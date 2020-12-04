import { cypress_secret } from '../../../config'

describe('Events page', () => {
  before(() => {
    cy.url().then(url => {
      if (url.includes(Cypress.config().baseUrl))
        cy.contains('События').click()
      else if (Cypress.config().baseUrl + 'events' != url)
        cy.visit('/events')
    })

    cy.loggedIn().then(loggedIn =>
      !loggedIn && cy.login(cypress_secret.login, cypress_secret.password)
    )
  })

  it('events can be added and edited', () => {
    let randomValues = ['',''].map(() => Math.random().toString(36).replace(/[^a-z]+/g, ''))
        
    cy.wait(1000)
      .contains('Добавить')
      .click()

    cy.contains('Заголовок')
      .next()
      .as('input1')
      .type(randomValues[0])

    cy.contains('Основной текст')
      .next()
      .as('input2')
      .type(randomValues[1])

    cy.contains('Сохранить')
      .click()
      .wait(1000)

    cy.contains(randomValues[0])
      .parent()
      .find('.text-body-1')
      .should('contain', new Date().getFullYear())
      .parent()
      .find('button.align-self-center')
      .click()

    const inputs = [
      '.v-dialog__content--active > .v-dialog > .v-card > .v-card__text > .v-form > :nth-child(1) input',
      '.v-dialog__content--active > .v-dialog > .v-card > .v-card__text > .v-form > .v-textarea textarea'
    ]
    
    inputs.forEach((item, index) => {
      cy.get(item)
        .invoke('val')
        .should('be.eql', randomValues[index])
    })

    inputs.forEach((item, index) => {
      cy.get(item).clear().type([...randomValues].reverse()[index])
    })

    cy.get('.v-dialog__content--active > .v-dialog > .v-card > .v-card__actions > .success--text > .v-btn__content')
      .click()
      .wait(1000)

    cy.contains(randomValues[1])
      .parent()
      .find('button.align-self-center')
      .click()

    cy.get('.v-dialog__content--active > .v-dialog > .v-card > .v-card__actions > .error--text > .v-btn__content')
      .click()

    cy.contains('Предупреждение')
      .parent()
      .contains('Удалить')
      .click()

    cy.get(`:contains(${randomValues[1]})`)
      .should('have.length', 0)
  })
})