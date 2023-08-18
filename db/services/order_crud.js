const { cancelorder } = require("../../controllers/order");
const OrderModel = require("../models/order");
module.exports = {
  book(orderObject) {
    let promise = OrderModel.create(orderObject);
    return promise;
  },
  async findOrder(userid){
    const doc = await OrderModel.find({userId : userid}).sort({ createdAt: -1 })
    if(doc) {
      return doc;
    }
    else{
      return null;
    }
  },
  async cancelorder(orderId){
    const doc = await OrderModel.updateOne({ _id : orderId },{ $set: { "status" : "Cancelled" } });
    if(doc) {
      return doc;
    }
    else{
      return null;
    }
  }
};
