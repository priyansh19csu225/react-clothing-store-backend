const { SUCCESS, SERVER_ERROR, NOT_FOUND } =
  require("../utils/config").STATUS_CODES;
const messageBundle = require("../locales/en");
const { returnToken } = require("../utils/token");
const { findCart , cartdel} = require("../db/services/cart_crud");
const orderOperations = require("../db/services/order_crud");
const orderController = {
  async findOrder(request, response) {
    let tokenId = request.headers["authorization"];
    const id = returnToken(tokenId);
    const order = id;
    try {
      const doc = await orderOperations.findOrder(order);
      if (doc) {
        response
          .status(SUCCESS)
          .json({
            message: messageBundle["findOrder.success"],
            order: doc,
          });
      } else {
        response
          .status(NOT_FOUND)
          .json({ message: messageBundle["findOrder.fail"] });
      }
    } catch (err) {
      response
        .status(SERVER_ERROR)
        .json({ message: messageBundle["find.uncaught"] });
    }
  },
  async book(request, response) {
    let tokenId = request.headers["authorization"];
    const id = returnToken(tokenId);
    const doc = await findCart(id);
    if(!doc){
     response
    .status(SERVER_ERROR)
    .json({ message: messageBundle["book.false"] });
    return;}
      
    let amt = 0 ;
    for(let i=0 ; i< doc.products.length; i++){
      amt += doc.products[i].price * doc.products[i].quantity;
    }
    let orderObject = {
      userId: id,
      products: doc.products,
      amount: amt,
      status: "success"
    };
    const promise = orderOperations.book(orderObject);
  
    promise
      .then(await cartdel(id))
      .then((doc) => {
        response
          .status(SUCCESS)
          .json({ message: messageBundle["book.true"], doc: doc });
      })
      .catch((err) => {
        response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["book.false"] });
      });
      
  },
  async cancelorder(request, response) {
    const orderId = request.query.orderid;
    const promise = orderOperations.cancelorder(orderId);
  
    promise
      .then((doc) => {
        response
          .status(SUCCESS)
          .json({ message: messageBundle["cancelorder.true"], doc: doc });
      })
      .catch((err) => {
        response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["cancelorder.false"] });
      });
      
  },
};

module.exports = orderController;
