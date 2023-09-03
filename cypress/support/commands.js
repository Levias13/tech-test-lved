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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('navigateToSauceDemo', () => {
    cy.visit('/');
})

Cypress.Commands.add('login', (username, password) => {
    cy.get('[data-test="username"]').type(username).should('have.value', username)
    .get('[data-test="password"]').type(password).should('have.value', password)
    .get('[data-test="login-button"]').click()
    .url().should('include', '/inventory.html');
})

Cypress.Commands.add('addItemToCart', (id) => {
    cy.get(`[data-test="${id}"]`).click();
    cy.get('.shopping_cart_badge').should('contain', 1);
})

Cypress.Commands.add('goToShoppinCart', () => {
    cy.get('#shopping_cart_container').click()
    .url().should('include', '/cart.html')
    .get('#cart_contents_container').should('exist');

})

Cypress.Commands.add('getItemProperties', (id) => {
    //price
    cy.xpath(`//button[@id='${id}']//preceding-sibling::div[@class='inventory_item_price']`).then(($element)=> {
        const price = $element.text();
        cy.wrap(price).as('price');
    })

    //description
    cy.xpath(`//button[@id='${id}']//ancestor::div[@class='pricebar']//preceding-sibling::div[@class='inventory_item_label']//div[@class='inventory_item_desc']`).then(($element)=> {
        const description = $element.text();
        cy.wrap(description).as('description');
    })

    //name
    cy.xpath(`//button[@id='${id}']//ancestor::div[@class='pricebar']//preceding-sibling::div[@class='inventory_item_label']//div[@class='inventory_item_name']`).then(($element)=> {
        const name = $element.text();
        cy.wrap(name).as('name');
    })
})

Cypress.Commands.add('verifyItemOnShoppingCart', () => {
    cy.get('@name').then(name => {
        cy.get('.inventory_item_name').should('have.text', name);
    })

    cy.get('@description').then(description => {
        cy.get('.inventory_item_desc').should('have.text', description);
    })

    cy.get('@price').then(price => {
        cy.get('.inventory_item_price').should('have.text', price);
    })
})