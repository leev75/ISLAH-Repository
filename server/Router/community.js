const express = require(`express`);
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

const {
  GetcommunityByDate,
  GetcommunityByVote,
} = require(`../controllers/community`);
const checkAuthentication = require("../middleware/checkAuth");

//home community page
router.get("/Date", checkAuthentication, GetcommunityByDate);
//home community page
router.get("/Vote", checkAuthentication, GetcommunityByVote);

module.exports = router;
