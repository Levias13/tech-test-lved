function ShoppingCart() {
    this.items = [];

    this.addItem = function (item) {
        if(this.getItemIndex(item.id) >= 0){
            console.log(`Error: The item id [${item.id}] already exist. Item skipped.`);
        }else{
            if(item.quantity < 0 || item.price < 0){
                console.log(`Error: The quantity and price can not be negative values. Item Skipped.`);
            }else{
                this.items.push(item);
            }
        }
    };
    
    this.calculateTotalPrice = function () {
        let itemCount = 0;
        let totalPrice = 0;
        let discount = 0;
        this.items.forEach((item) => {
            totalPrice += item.price * item.quantity;

            itemCount += item.quantity;
        });
        if (itemCount >= 5 && itemCount < 10) {
            discount = 5;
        } else if (itemCount >= 10 && itemCount < 20) {
            discount = 10;
        } else if (itemCount >= 20) {
            discount = 20;
        }
        return totalPrice * ( 1 - discount / 100);
    };

    this.removeItem = function (itemId) {
        let index = this.getItemIndex(itemId);
        if(index >= 0){
            this.items.splice(index, 1);
        }else{
            console.log(`Error: The item id [${itemId}] can not be removed because it does not exist.`)
        }
    };

    this.updateItemQuantity = function (itemId, quantity) { 
        let index = this.getItemIndex(itemId);
        if(index >= 0){
            if( quantity >= 0){
                index = this.getItemIndex(itemId);
                this.items[index].quantity = quantity;
            }else{
                console.log(`Error: Item quantity can not be updated because is a negative value`);
            }
        }else{
            console.log(`Error: Item quantity can not be updated because the ID [${itemId}] does not exist.`);
        }
    };

    this.getItemIndex = function(itemId){
        return this.items.findIndex((obj => obj.id == itemId));
    };

    this.applyCoupon = function(code, totalPrice){
        let discount = 0;
        switch (code) {
            case 10:
                discount = 10;
                break;
            case 15:
                discount = 15;
                break;
            default:
                console.log(`Error: Invalid coupon id [${code}]`)
                discount = 0;
                break;
          }
          return totalPrice * ( 1 - discount / 100);
    }
}

module.exports = {
    ShoppingCart
}