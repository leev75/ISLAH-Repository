const express = require(`express`);
const cors = require(`cors`);

const cookieParser = require("cookie-parser");
const {
  getUsersByCategorie,
  getUsersByCategorieV2,
} = require("../controllers/users");

const router = express.Router();
router.use(express.json());
router.use(cors());
router.use(cookieParser());
const {
  hourlyReports,
  totalReports,
  login,
  validate,
  logout,
} = require(`../controllers/manager`);
const checkAuthManager = require("../middleware/checkAuthManager");

//manager login
router.post(`/login-manager`, login);

//update manger pssword
router.post("/GetUsers", checkAuthManager, getUsersByCategorie);
router.post("/GetUsersV2", checkAuthManager, getUsersByCategorieV2);
//validate
router.put(`/validate/`, checkAuthManager, validate);
//get hourly reports
router.get(`/hourly-reports`, checkAuthManager, hourlyReports);
//get total reports
router.post(`/total-reports`, checkAuthManager, totalReports);

//manager logout
// @desc Logout
// @route POST /api/auth/logout
// @access Private
router.get("/logout", checkAuthManager, logout);

module.exports = router;
