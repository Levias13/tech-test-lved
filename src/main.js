let {ShoppingCart} = require('../src/ShoppingCart.js')

/*
Usage example of the ShoppingCart object and its elements
*/
// Create a new ShoppingCart object and add four items to it
let cart = new ShoppingCart();
cart.addItem({ id: "apple", price: 2, quantity: 1 });
cart.addItem({ id: "orange", price: 1, quantity: 1 });
cart.addItem({ id: "banana", price: 1, quantity: 2 });
cart.addItem({ id: "pineapple", price: 3, quantity: 1 });

//cart.removeItem("apple");
//cart.updateItemQuantity("banana", -1)

// Print the ShoppingCart total price to the console
console.log({ totalPrice: cart.calculateTotalPrice() });
// Add the fifth element
cart.addItem({ id: "grape", price: 1, quantity: 1 });
// Print the ShoppingCart total price to the console
console.log({ totalPrice: cart.calculateTotalPrice() });
//console.log({ "totalPrice coupon applied": cart.applyCoupon(9,cart.calculateTotalPrice()) });