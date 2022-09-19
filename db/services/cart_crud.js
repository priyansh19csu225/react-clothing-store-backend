const CartModel = require("../models/cart");
module.exports = {
  async create(cartObject) {
    // let promise = CartModel.create(cartObject);
    // return promise;
   
      let cart = await CartModel.findOne({ userId: cartObject.userId });
      
      if (cart) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(p => p.productId == cartObject.products.productId);
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          productItem.quantity = cartObject.products.quantity;
          cart.products[itemIndex] = productItem;
        } else {
          //product does not exists in cart, add new item
          
          cart.products.push(cartObject.products);
      
        }
        cart = await cart.save();
        
        return cart;
    
      } else {
        //no cart for user, create new cart
        const newCart = await CartModel.create(cartObject);
        
  
        return newCart;
      }
    
  
  },
  async deletefromcart(cartObject){
    console.log("inside deletefromcart");
    let cart = await CartModel.findOne({ userId: cartObject.userId });
    if (cart) {
      //cart exists for user
      console.log("inside if deletefromcart");
      let itemIndex = cart.products.findIndex(p => p.productId == cartObject.products.productId);
      if (itemIndex > -1) {
        //product exists in the cart, update the cart
        console.log("inside itemindexloop");
        let productItem = cart.products[itemIndex-1];
        cart.products.pop(productItem);
      } else {
        //product does not exists in cart, add new item
        
     return cart;
    
      }
      cart = await cart.save();
      
      return cart;
  
    } else {
      //no cart for user
      return null;
    }
  },
  async findCart(userid){
    console.log(userid);
    const doc = await CartModel.findOne({ userId : userid});
    if(doc) {
      return doc;
    }
    else{
      return null;
    }
  },
  async cartdel(userid){
    let promise = await CartModel.deleteOne({userId : userid});
    return promise;
  }
};
