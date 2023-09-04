describe('SL001', () => {
    it('Test add items to shopping cart', () => { 
        cy.fixture('ShoppingCartTestData').then(data => {
            const username = data.username
            const password = data. password
            const itemId = data.id
           
            cy
            .navigateToSauceDemo()
            .login(username, password)
            .getItemProperties(itemId)
            .addItemToCart(itemId)
            .goToShoppinCart()
            .verifyItemOnShoppingCart();

            console.log('dummy log');
        })
   })
});