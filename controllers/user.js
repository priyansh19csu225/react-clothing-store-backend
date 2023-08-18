const { SUCCESS, SERVER_ERROR, NOT_FOUND } =
  require("../utils/config").STATUS_CODES;
const messageBundle = require("../locales/en");
const { returnEmail } = require("../utils/token");
const userOperations = require("../db/services/user_crud");
const jwt = require("../utils/token");
const userController = {
  async login(request, response) {
    const user = request.body;
    try {
      const doc = await userOperations.login(user);
      if (doc) {
        let token = jwt.generateToken(doc.emailid, doc._id.toString(), doc.isAdmin.toString() );
        response
          .status(SUCCESS)
          .json({
            message: messageBundle["login.welcome"],
            doc:doc,
            token: token,
          });
      } else {
        response
          .status(NOT_FOUND)
          .json({ message: messageBundle["login.invaliduser"] });
      }
    } catch (err) {
      response
        .status(SERVER_ERROR)
        .json({ message: messageBundle["login.invaliduser"] });
    }
  },
  async changepass(request, response) {
    let tokenId = request.headers["authorization"];
    const useremail = returnEmail(tokenId);
    const curr_password = request.body.pwd;
    const new_password = request.body.newpwd;
    const user = { email: useremail , pwd: curr_password }
    try {
      const doc = await userOperations.login(user);
        if(doc){
         const doc1 = await userOperations.changepass(useremail , new_password);
         if(doc1) {
          response
          .status(SUCCESS)
          .json({
            message: messageBundle["change.true"],
          });
         }else {
          response
            .status(SERVER_ERROR)
            .json({ message: messageBundle["change.fail"] });
        }
        }else {
          response
            .status(NOT_FOUND)
            .json({ message: messageBundle["login.invaliduserchange"] });
        }
    }catch (err) {
      response
        .status(SERVER_ERROR)
        .json({ message: messageBundle["login.invaliduserchange"] });
    }
  },
  register(request, response) {
    let userObject = {
      emailid: request.body.email,
      password: request.body.pwd,
      name: request.body.name,
    };
    const promise = userOperations.register(userObject);
    promise
      .then((doc) => {
        response
          .status(SUCCESS)
          .json({ message: messageBundle["register.welcome"], doc: doc });
      })
      .catch((err) => {
        response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["register.fail"] });
      });
  },
};

module.exports = userController;
