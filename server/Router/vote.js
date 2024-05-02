const express = require(`express`);
const cors = require(`cors`);
const cookieParser = require("cookie-parser");

const checkAuthentication = require("../middleware/checkAuth");
const { submitVote } = require(`../controllers/vote`);

const router = express.Router();
router.use(express.json());
router.use(cors());
router.use(cookieParser());

//post/remove a new vote

router.post("/", checkAuthentication, submitVote);

module.exports = router;
