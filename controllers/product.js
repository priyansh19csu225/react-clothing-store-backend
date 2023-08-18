const { SUCCESS, SERVER_ERROR, NOT_FOUND } =
  require("../utils/config").STATUS_CODES;
const messageBundle = require("../locales/en");
const productOperations = require("../db/services/product_crud");
const productController = {
  async display(request, response){
    const qNew = request.query.new;
  const qCategory = request.query.category;
  try{
    const doc = await productOperations.display(qNew, qCategory);
    if (doc) {
      response
        .status(SUCCESS)
        .json({
          message: messageBundle["find.success"],
          product: doc,
        });
    } else {
      response
        .status(NOT_FOUND)
        .json({ message: messageBundle["find.fail"] });
    }
  } catch (err) {
    response
      .status(SERVER_ERROR)
      .json({ message: messageBundle["find.uncaught"] , error :err });
  }
},
  async find(request, response) {
    const product = request.params.title;
    try {
      const doc = await productOperations.find(product);
      if (doc) {
        response
          .status(SUCCESS)
          .json({
            message: messageBundle["find.success"],
            product: doc,
          });
      } else {
        response
          .status(NOT_FOUND)
          .json({ message: messageBundle["find.fail"] });
      }
   
    } catch (err) {
      response
        .status(SERVER_ERROR)
        .json({ message: messageBundle["find.uncaught"] });
    }
  },
  async findByid(request, response) {
    const product = request.params.id;
    try {
      const doc = await productOperations.findByid(product);
      if (doc) {

        response
          .status(SUCCESS)
          .json({
            message: messageBundle["find.success"],
            product: doc,
          });
      } else {
        response
          .status(NOT_FOUND)
          .json({ message: messageBundle["find.fail"] });
      }
   
    } catch (err) {
      response
        .status(SERVER_ERROR)
        .json({ message: messageBundle["find.uncaught"] });
    }
  },
  async deleteproduct(request, response) {
    const product = request.body.deleteid;
    try {
      const doc = await productOperations.deleteproduct(product);
      if (doc) {
        response
          .status(SUCCESS)
          .json({
            message: messageBundle["deleteproduct.success"],
            product: doc,
          });
      } else {
        response
          .status(NOT_FOUND)
          .json({ message: messageBundle["deleteproduct.fail"] });
      }
    } catch (err) {
      response
        .status(SERVER_ERROR)
        .json({ message: messageBundle["deleteproduct.fail"] });
    }
  },
  create(request, response) {
    let productObject = {
      title: request.body.title,
      desc: request.body.desc,
      img: request.body.image,
      categories: request.body.categories,
      size: request.body.size,
      color: request.body.color,
      price: request.body.price,
      instock: request.body.instock
      
    };
    const promise = productOperations.create(productObject);
    promise
      .then((doc) => {
        response
          .status(SUCCESS)
          .json({ message: messageBundle["create.true"], doc: doc });
      })
      .catch((err) => {
        response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["create.false"] });
      });
  },
};

module.exports = productController;
