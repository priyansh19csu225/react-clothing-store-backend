const express = require("express");
const router = express.Router();
const checkauth = require("../../utils/middlewares/auth1");
const { create , findCart } = require("../../controllers/cart");
const { CARTADD, CARTVIEW  } = require("../../utils/config").ROUTES.CART;
router.post(CARTADD, create);
router.get(CARTVIEW,  checkauth ,findCart);
module.exports = router;
