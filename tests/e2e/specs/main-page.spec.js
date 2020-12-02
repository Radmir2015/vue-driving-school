
describe('Main root page', () => {
  before(() => {
    cy.url().then(url => (Cypress.config().baseUrl !== url) && cy.visit('/'))
  })

  it('has right first section (about) content', () => {
    cy.get('.text-h6').contains('Каменская автомобильная школа')
    cy.get('.v-card p').contains('Москва, Волоколамское шоссе, д. 88, стр. 3')
  })

  it('has appropriate content in the second section (categories)', () => {
    cy.contains('Доступные категории')

    const contentOfTable = [
      'Категория', 'Стоимость', 'Автопарк', 'Документы (условия)', '25000',
      'Паспорт, медицинская справка, фото (3.5 x 4.5), водительское удостоверение, аттестат или диплом об образовании, стаж вождение не менее 1 года'
    ]
    
    cy.get('.col-md-8 > .v-card') // table
      .within($table => {
        contentOfTable.forEach(element => cy.contains(element))

        cy.get('i.mdi-eye-outline')
        .should('have.length', 6)
      })
  })

  it('has 5 working categories tabs with images', () => {
    const categories = [ 'А', 'В', 'С', 'D', 'E' ]
    const imagesLoadedInCategory = [ 2, 4, 6, 10, 13 ]
    const tabTexts = [ 'Машина', 'Площадка' ]

    cy.get('.v-window.v-item-group.v-tabs-items')
      .as('categoriesTabs')
    
    categories.forEach((category, index) => {
      cy.contains( `Категория ${category}`)
        .click()
      
      cy.get('@categoriesTabs')
        .find('.v-image__image.v-image__image--cover')
        .should('have.length.gte', imagesLoadedInCategory[index])

      tabTexts.forEach(text =>
        cy.get('@categoriesTabs').contains(text)
      )
    })
  })

  it('has right stuff section', () => {
    cy.contains('Мастера')
    cy.contains('Преподаватели')
    cy.contains('Начальник учреждения')

    cy.get('.v-card__subtitle:contains("Cтаж работы в автошколе")')
      .should('have.length.gte', 5)
  })

  it('has right contact section', () => {
    const contactInformation = [
      'Контактные данные', 'Карта',
      'Адрес ПОУ Каменская АШ ДОСААФ России', 'График работы',
      'Перерыв', 'Телефон', 'Email'
    ]

    contactInformation.forEach(chunk =>
      cy.contains(chunk)
    )

    cy.get('iframe[src*="yandex.ru/map-widget"]')
      .should('have.length', 1)
  })
})