const { deleteproduct } = require("../../controllers/product");
const ProductModel = require("../models/product");
module.exports = {
  create(productObject) {
    let promise = ProductModel.create(productObject);
    return promise;
  },
  async find(title){
    console.log(title);
    const doc = await ProductModel.findOne({ "title" : { 
      "$regex": "^" + title + "\\b", "$options": "i"
  } });
    if(doc) {
      return doc;
    }
    else{
      return null;
    }
  },
  async findByid(id){
    // console.log(title);
    const doc = await ProductModel.findOne({ "_id" : id });
    if(doc) {
      return doc;
    }
    else{
      return null;
    }
  },
  async deleteproduct(title){
    const doc = await ProductModel.deleteOne({ "title" : title });
      return doc;
  },
  async display(qNew , qCategory){

    let products;

    if(qNew,qCategory) {
      products = await ProductModel.find({
        categories: {
          $in: [qCategory],
        },
      }).sort({ createdAt: -1 });
    }
    else if (qCategory) {
      products = await ProductModel.find({
        categories: {
          $in: [qCategory],
        },
      }).sort({ createdAt: 1 });
    } 
    else if (qNew) {
      products = await ProductModel.find().sort({ createdAt: -1 });
    } 
    else {
      products = await ProductModel.find().sort({ createdAt: 1 });
    }

    return products;
  }

};
