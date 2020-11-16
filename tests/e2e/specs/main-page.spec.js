describe('Main root page', () => {
  it('has right first section (about) content', () => {
    cy.contains('.text-h6', 'Каменская автомобильная школа')
    cy.contains('.v-card p', 'Москва, Волоколамское шоссе, д. 88, стр. 3')
  })
})