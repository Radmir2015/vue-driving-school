import { cypress_secret } from '../../../config'

describe('Documents page', () => {
  before(() => {
    cy.url().then(url => {
      if (url.includes(Cypress.config().baseUrl))
        cy.contains('Документы').click()
      else if (Cypress.config().baseUrl + 'docs' != url)
        cy.visit('/docs')
    })
  })
  
  it('has expandable sections with download and preview buttons', () => {
    cy.get('div[aria-expanded]', { timeout: 15000 })
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

    cy.get('.ml-2 > .v-btn__content')
      .click()

    cy.get('@doc')
      .should('have.length', 0)
  })

  context('Admin mode', () => {
    beforeEach(() => {
      cy.loggedIn().then(loggedIn =>
        !loggedIn && cy.login(cypress_secret.login, cypress_secret.password)
      )
    })
    
    it('should be editable by admin (already created docs)', () => {
      cy.get('.v-expansion-panel > .v-expansion-panel-header > .v-expansion-panel-header__icon > .d-flex > .align-self-center')
        .should('have.length', 5)
        .eq(0)
        .click()

      cy.contains('Редактирование документов')
        .as('edit')

      cy.get('.v-dialog__content--active > .v-dialog > .v-card > .v-card__title')
        .contains('Закрыть')
        .click()
      
      cy.get('@edit')
        .should('not.be.visible')
    })

    it('new docs can be added and edited', () => {
      cy.contains('Добавить')
        .click()

      let randomValues = ['',''].map(() => Math.random().toString(36).replace(/[^a-z]+/g, ''))

      cy.get('.v-dialog__content--active input[type=text]').each(($elem, index) => {
        cy.wrap($elem).type(randomValues[index])
      })

      cy.get('.v-dialog__content--active > .v-dialog > .v-card > .v-card__actions > .success--text > .v-btn__content')
        .click()

      cy.contains(randomValues[0])
        .parent()
        .find('button.align-self-center')
        .click()

      cy.get('.v-dialog__content--active input[type=text]').each(($elem, index) => {
        // expect($elem).value().to.be.equal(randomValues[index])
        cy.wrap($elem)
          .invoke('val')
          .should('be.eql', randomValues[index])
      }).then(() => {
        randomValues.reverse()
      })

      cy.get('.v-dialog__content--active input[type=text]').each(($elem, index) => {
        cy.wrap($elem).clear().type(randomValues[index])
      })

      cy.get('.v-dialog__content--active > .v-dialog > .v-card > .v-card__actions > .success--text > .v-btn__content')
        .click()

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
})