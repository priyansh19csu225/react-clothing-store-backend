const { SUCCESS, SERVER_ERROR, NOT_FOUND } =
  require("../utils/config").STATUS_CODES;
const { returnToken } = require("../utils/token");  
const messageBundle = require("../locales/en");
const cartOperations = require("../db/services/cart_crud");

const cartController = {
  async findCart(request, response) {
    // const cart = request.params.userId;
    let tokenId = request.headers["authorization"];
    const id = returnToken(tokenId);
    const cart = id;
    console.log(cart);
    try {
      const doc = await cartOperations.findCart(cart);
      if (doc) {
        response
          .status(SUCCESS)
          .json({
            message: messageBundle["findCart.success"],
            cart: doc,
          });
      } else {
        response
          .status(NOT_FOUND)
          .json({ message: messageBundle["findCart.fail"] });
      }
    } catch (err) {
      response
        .status(SERVER_ERROR)
        .json({ message: messageBundle["find.uncaught"] });
    }
  },
  create(request, response) {
    // response.send("U r on Create product Section");
    let tokenId = request.headers["authorization"];
    const id = returnToken(tokenId);
    let cartObject = {
      userId: id,
      products: request.body,
      
    };
    const promise = cartOperations.create(cartObject);
    promise
      .then((doc) => {
        response
          .status(SUCCESS)
          .json({ message: messageBundle["cart.true"], doc: doc });
      })
      .catch((err) => {
        response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["cart.false"] });
      });
  },
  deletefromcart(request, response) {
    // response.send("U r on Create product Section");
    let tokenId = request.headers["authorization"];
    const id = returnToken(tokenId);
    let cartObject = {
      userId: id,
      products: request.body,
      
    };
    const promise = cartOperations.deletefromcart(cartObject);
    promise
      .then((doc) => {
        response
          .status(SUCCESS)
          .json({ message: messageBundle["cartproduct.true"], doc: doc });
      })
      .catch((err) => {
        response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["cartproduct.false"] });
      });
  },
  cartdel(request, response) {
    // response.send("U r on Create product Section");
    let tokenId = request.headers["authorization"];
    const id = returnToken(tokenId);
    console.log(id);
    const promise = cartOperations.cartdel(id);
    promise
      .then(() => {
        response
          .status(SUCCESS)
          .json({ message: messageBundle["cartdel.true"] });
      })
      .catch((err) => {
        response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["cartdel.fail"] , error : err });
      });
  },
};

module.exports = cartController;
