const CartModel = require("../models/cart");
module.exports = {
  async create(cartObject) {
    let cart = await CartModel.findOne({ userId: cartObject.userId });
    if (cart) {
      await CartModel.deleteOne({ userId: cartObject.userId });
    }
    const newCart = await CartModel.create(cartObject);
    return newCart;
  },
  async findCart(userid) {
    const doc = await CartModel.findOne({ userId: userid });
    if (doc) {
      return doc;
    } else {
      return null;
    }
  },
  async cartdel(userid){
    let promise = await CartModel.deleteOne({userId : userid});
    return promise;
  }
};
