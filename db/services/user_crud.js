const UserModel = require("../models/user");
const encryption = require("../../utils/encrypt");
module.exports = {
  register(userObject) {
    userObject.password = encryption.generateHash(userObject.password);
    let promise = UserModel.create(userObject);
    return promise;
  },
  async changepass(email,newpwd) {
    newpwd = encryption.generateHash(newpwd);
    const doc = await UserModel.updateOne({"emailid" : email} , { $set : { "password" : newpwd}});
    if (doc){;
      return doc;
    } else {
      return null;
    }
  },
  async login({ email, password }) {
    const doc = await UserModel.findOne({ emailid: email });
    if (doc) {
      if (encryption.compareHash(doc.password, password)) {
        console.log(doc._id.toString());
        return doc;
      } else {
        return null;
      }
    }
    return null;
  },
};
