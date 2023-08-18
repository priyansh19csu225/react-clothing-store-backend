const { Schema, SchemaTypes } = require("../connect");
const mongoose = require("../connect");
const { SCHEMAS } = require("../../utils/config");

const orderSchema = new Schema(
  {
    userId: { type: SchemaTypes.ObjectId , ref: SCHEMAS.USERS ,required: true },
    products: [
      {
        productId: {
          type: SchemaTypes.Number, ref: SCHEMAS.CART
        },
        quantity: {
          type: SchemaTypes.Number, ref: SCHEMAS.CART 
        },
        title : {
          type: SchemaTypes.String, ref: SCHEMAS.CART
        },
        price: {
          type: SchemaTypes.Number, ref: SCHEMAS.CART
        },
      }
    ],
    amount: { type: SchemaTypes.Number, required: true },
    address: { type: SchemaTypes.Object, required: false },
    status: { type: SchemaTypes.String, default: "pending" },
  },
  { timestamps: true }
);
const OrderModel = mongoose.model(SCHEMAS.ORDERS, orderSchema);
module.exports = OrderModel;
