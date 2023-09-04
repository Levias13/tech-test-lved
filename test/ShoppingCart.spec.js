let { ShoppingCart } = require('../src/ShoppingCart.js')

let cart;

const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

beforeEach(() => {
    cart = new ShoppingCart();
});

afterAll(() => {
    consoleLogSpy.mockRestore();
});

describe("add item function", () => {
    test("it should add items to the cart", () => {
        const apple = { id: "apple", price: 2, quantity: 1 };
        const orange = { id: "orange", price: 1, quantity: 1 };
        const expectedLenght = 2;

        cart.addItem(apple);
        cart.addItem(orange);
        expect(cart.items).toHaveLength(expectedLenght);
    });

    test("it should skip adding an item with an existing ID", () => {
        const apple1 = { id: "apple", price: 2, quantity: 1 };
        const apple2 = { id: "apple", price: 1, quantity: 1 };
        const expectedLenght = 1;

        cart.addItem(apple1);
        cart.addItem(apple2);
        expect(cart.items).toHaveLength(expectedLenght);
        expect(consoleLogSpy).toHaveBeenCalledWith(`Error: The item id [${apple2.id}] already exist. Item skipped.`);
    });

    test('it should not add an item with a negative quantity', () => {
        const apple = { id: "apple", quantity: -1, price: 10 };
        const expectedLenght = 0;
        cart.addItem(apple);
        expect(cart.items).toHaveLength(expectedLenght);
    });

    test('it should not add an item with a negative price', () => {
        const apple = { id: "apple", quantity: 2, price: -5 };
        const expectedLenght = 0;
        cart.addItem(apple);
        expect(cart.items).toHaveLength(expectedLenght);
    });
});

describe("remove item function", () => {

    test("it should remove items from the cart", () => {
        const apple = { id: "apple", quantity: 2, price: 5 };
        const banana = { id: "banana", price: 1, quantity: 3 };

        cart.items = [
            apple, banana
        ];

        expect(cart.items).toContainEqual(apple);
        cart.removeItem(apple.id);
        expect(cart.items).not.toContainEqual(apple);
    });

    test("it should not be able to remove non-existing ID and should log an error message", () => {
        const itemId = "apple";
        cart.removeItem(itemId);

        expect(consoleLogSpy).toHaveBeenCalledWith(`Error: The item id [${itemId}] can not be removed because it does not exist.`);
    });
});

describe("update quantity item function", () => {

    test("should update item quantity when quantity is non-negative", () => {
        const item = { id: "apple", quantity: 2, price: 5 };
        cart.items = [
            item
        ];

        const expectedResult = { id: "apple", quantity: 1, price: 5 };

        cart.updateItemQuantity(item.id, 1);
        expect(cart.items).toContainEqual(expectedResult);
    });

    test("it should not update item quantity with a negative value and should log an error message", () => {
        const item = { id: "apple", quantity: 2, price: 5 };
        cart.items = [
            item
        ];

        cart.updateItemQuantity(item.id, -1);
        expect(cart.items).toContainEqual(item);
        expect(consoleLogSpy).toHaveBeenCalledWith(`Error: Item quantity can not be updated because is a negative value`);
    });

    test("it should not update item quantity with a non-existing ID and should log an error message", () => {
        const item = { id: "apple", quantity: 2, price: 5 };
        cart.items = [
            item
        ];

        const itemId = "orange";

        cart.updateItemQuantity(itemId, 1);
        expect(cart.items).toContainEqual(item);
        expect(consoleLogSpy).toHaveBeenCalledWith(`Error: Item quantity can not be updated because the ID [${itemId}] does not exist.`);
    });
});

describe('get item index function', () => {
    test('it should return the index of an existing item', () => {
        const item = { id: "apple", quantity: 2, price: 10 };
        cart.addItem(item);
        expect(cart.getItemIndex(item.id)).toBe(0);
    });

    test('it should return -1 for a non-existing item', () => {
        expect(cart.getItemIndex("apple")).toBe(-1);
    });
});

describe('apply coupon function', () => {

    const dataSet = [
        [10, 100, 90],
        [15, 85, 72.25],
        [20, 1253.87, 1253.87]
    ];

    it.each(dataSet)('it should apply discount to the totalPrice', (couponCode, totalPrice, expectedResult) => {
        const actualResult = cart.applyCoupon(couponCode, totalPrice);
        expect(actualResult).toBe(expectedResult);
    });
});

describe('calculate total price function', () => {
    const dataSet = [
        [{ id: "apple", quantity: 4, price: 1 }, 4],
        [{ id: "apple", quantity: 5, price: 1 }, 4.75],
        [{ id: "apple", quantity: 9, price: 1 }, 8.549999999999999],
        [{ id: "apple", quantity: 10, price: 1 }, 9],
        [{ id: "apple", quantity: 19, price: 1 }, 17.1],
        [{ id: "apple", quantity: 20, price: 1 }, 16]
    ];

    it.each(dataSet)('it should apply discount to the totalPrice', (item, expectedResult) => {
        cart.items = [
            item
        ];
        const actualResult = cart.calculateTotalPrice();
        expect(actualResult).toBe(expectedResult);
    });
});