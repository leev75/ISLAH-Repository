const express = require(`express`);
const cors = require(`cors`);

const cookieParser = require("cookie-parser");
const { getUsersByCategorie } = require("../controllers/users");

const router = express.Router();
router.use(express.json());
router.use(cors());
router.use(cookieParser());
const { login, validate, logout } = require(`../controllers/manager`);
const checkAuthManager = require("../middleware/checkAuthManager");

//manager login
router.post(`/login-manager`, login);

//update manger pssword
router.post("/GetUsers", checkAuthManager, getUsersByCategorie);
//validate
router.put(`/validate/:id`, checkAuthManager, validate);

//manager logout
// @desc Logout
// @route POST /api/auth/logout
// @access Private
router.get("/logout", checkAuthManager, logout);

module.exports = router;
