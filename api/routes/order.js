const express = require("express");
const router = express.Router();
const { book , findOrder, cancelorder  } = require("../../controllers/order");
const { DETAILS, BOOK , CANCEL } = require("../../utils/config").ROUTES.ORDER;
router.post(BOOK, book);
router.get(DETAILS ,findOrder);
router.get(CANCEL , cancelorder);
module.exports = router;
