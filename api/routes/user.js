const express = require("express");
const router = express.Router();
const { show, login, register, changepass } = require("../../controllers/user");
const { LOGIN, REGISTER, PROFILE , CHANGE } = require("../../utils/config").ROUTES.USER;
router.get(PROFILE, show);
router.post(LOGIN, login);
router.post(REGISTER, register);
router.post(CHANGE, changepass);
module.exports = router;
