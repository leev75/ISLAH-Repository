const express = require("express");
const cors = require(`cors`);
const cookieParser = require("cookie-parser");
const router = express.Router();
router.use(express.json());
router.use(cors());
router.use(cookieParser());
const {
  register,
  login,
  changeInfo,
  getReport,
} = require("../controllers/user");

const checkAuthentication = require("../middleware/checkAuth");

//route that will be used by our protected routes
//user register
router.post(`/register`, register);
router.post(`/login-user`, login);

router.put(`/profile/change_Info`, checkAuthentication, changeInfo);
router.get(`/profile`, checkAuthentication, getReport);

module.exports = router;
