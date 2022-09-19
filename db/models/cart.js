const { Schema, SchemaTypes } = require("../connect");
const mongoose = require("../connect");
const { SCHEMAS } = require("../../utils/config");
const cartSchema = new Schema(
  {
    userId: { type: SchemaTypes.ObjectId , ref: SCHEMAS.USERS ,required: true },
    products: [
      {
        productId: {
          type: SchemaTypes.Number,
        },
        quantity: {
          type: SchemaTypes.Number,
          default: 1,
        },
        title : {
          type: SchemaTypes.String,
        },
        price: {
          type: SchemaTypes.Number,
        },
      }
    ],
  },
  { timestamps: true }
);
const CartModel = mongoose.model(SCHEMAS.CART, cartSchema);
module.exports = CartModel;
