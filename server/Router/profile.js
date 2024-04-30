const express = require("express");
const router = express.Router();

const checkAuthentication = require("../middleware/checkAuth");
const { profile } = require("../controllers/profile");

router.use(express.json());

router.get("/profile", checkAuthentication, profile);

module.exports = router;
