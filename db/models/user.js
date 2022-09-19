const { Schema, SchemaTypes } = require("../connect");
const mongoose = require("../connect");
const { SCHEMAS } = require("../../utils/config");
const userSchema = new Schema(
  {
    emailid: { type: SchemaTypes.String, required: true, unique: true },
    password: { type: SchemaTypes.String, required: true, min: 3, max: 25 },
    name: { type: SchemaTypes.String, required: true },
    isAdmin: {
      type: SchemaTypes.Boolean,
      default: false,
    },
    img: { type: SchemaTypes.String } // changed
  },
  { timestamps: true }
);
const UserModel = mongoose.model(SCHEMAS.USERS, userSchema);
module.exports = UserModel;
