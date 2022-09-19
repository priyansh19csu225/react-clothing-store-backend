const express = require("express");
const router = express.Router();
const { payment } = require("../../controllers/payment");
const { PAY } = require("../../utils/config").ROUTES.PAYMENT;
router.post(PAY, payment);
module.exports = router;
