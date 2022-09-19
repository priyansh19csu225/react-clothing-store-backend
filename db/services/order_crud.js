const { cancelorder } = require("../../controllers/order");
const OrderModel = require("../models/order");
module.exports = {
  book(orderObject) {
    let promise = OrderModel.create(orderObject);
    return promise;
  },
  async findOrder(userid){
    console.log(userid);
    // const doc = await OrderModel.findOne({ userId : userid});
    const doc = await OrderModel.find({userId : userid})
    if(doc) {
      return doc;
    }
    else{
      return null;
    }
  },
  async cancelorder(orderObject){
    // console.log(userid);
    // const doc = await OrderModel.findOne({ userId : userid});
    console.log(orderObject);
    const doc = await OrderModel.updateOne({$and: [{'userId': orderObject.userid}, {'amount': orderObject.amount}]},{ $set: { "status" : "Cancelled" } });
    if(doc) {
      return doc;
    }
    else{
      return null;
    }
  }
};
