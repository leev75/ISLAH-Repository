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
  logout,
  change_name,
  change_password,
  change_tel,
} = require("../controllers/user");

const checkAuthentication = require("../middleware/checkAuth");

//route that will be used by our protected routes
router.get("/check", checkAuthentication);
//user register
router.post(`/register`, register);
router.post(`/login-user`, login);

router.put(`/profile/change-password`, checkAuthentication, change_password);
router.put(`/profile/change-name`, checkAuthentication, change_name);
router.put(`/profile/change-phone-number`, checkAuthentication, change_tel);

module.exports = router;
