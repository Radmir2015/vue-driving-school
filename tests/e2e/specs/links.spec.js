const linkBase = {
    'втошкол': { 'href': '/about', 'contains': 'Учредителем ПОУ Каменской АШ' },
    'Документы': { 'href': '/docs', 'contains': 'Здесь можно найти документы и положения автошколы' },
    /* события и мероприятия */'тия': { 'href': '/events', 'contains': 'Уроки мужества посвященные Дню неизвестного солдата' },
    'Отзывы': { 'href': '/reviews', 'contains': 'Отправить отзыв' },
    'программы': { 'href': '/docs#course', 'contains': 'ОБРАЗОВАТЕЛЬНАЯ ПРОГРАММА ПРОФ. ПОДГОТОВКИ СЕ 2017Г' },
    'услуги': { 'href': '/docs#paid-service', 'contains': 'ПОЛОЖЕНИЕ О ПЛАТНЫХ ОБРАЗОВАТЕЛЬНЫХ УСЛУГАХ' },
    'Положения': { 'href': '/docs#regulations', 'contains': 'ПОЛОЖЕНИЕ О ПРОМЕЖУТОЧНОЙ АТТЕСТАЦИИ' },
    'Локальные документы': { 'href': '/docs#local', 'contains': 'ПРАВИЛА ВНУТРЕННЕГО РАСПОРЯДКА' },
}

const headerLinks = {
    'Автошкола': 'втошкол',
    'Документы': 'Документы',
    'События': 'тия',
}

describe('Links in menu and header targets appropriate view', () => {
    before(() => {
        cy.url().then(url => (Cypress.config().baseUrl !== url) && cy.visit('/'))
    })

    context('Drawer links', () => {
        beforeEach(() => {
            cy.get('.v-app-bar__nav-icon > .v-btn__content')
                .click()

            cy.get('.v-navigation-drawer__content')
                .find('a.v-list-item')
                .as('drawerLinks')
        })

        it('opens right webpages', () => {
            cy.get('@drawerLinks')
                .then(links => {
                    for (const [index, link] of [...links].entries()) {
                        console.log(link.text)

                        const webpageInfo = linkBase[Object.keys(linkBase).find(x => link.text.includes(x))]

                        console.log(webpageInfo)

                        cy.get('.v-app-bar__nav-icon > .v-btn__content')
                            .then(appBar => index > 0 && appBar.click())

                        // cy.visit(link.href)
                        cy.wrap(link)
                            .click()
                            .should('contains.attr', 'href', webpageInfo.href) 

                        cy.url()
                            .should('include', webpageInfo.href)

                        cy.contains(webpageInfo.contains, { matchCase: false })

                        if (webpageInfo.href.includes('/docs#')) {
                            cy.get('.v-app-bar__nav-icon > .v-btn__content')
                                .then(appBar => index > 0 && appBar.click())

                            cy.wrap(links.eq(0)).click()
                        }
                    }
                })
        })
    })

    context('Header Links', () => {
        beforeEach(() => {
            cy.get('.container > a.v-btn')
                .as('headerLinks')
        })

        Object.entries(headerLinks).forEach(([routeName, nameForBase]) => {
            it(`opens right page (${routeName})`, () => {
                const webpageInfo = linkBase[nameForBase]

                cy.get('@headerLinks')
                    .contains(routeName)
                    .parent()
                    .click()
                    .should('contains.attr', 'href', webpageInfo.href)

                cy.url()
                    .should('include', webpageInfo.href)

                cy.contains(webpageInfo.contains, { matchCase: false })
                
            })
        })
    })
})