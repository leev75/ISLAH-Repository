const express = require(`express`);
const cors = require(`cors`);
const cookieParser = require("cookie-parser");
const multer = require(`multer`);
const cloudinary = require("cloudinary").v2;

const checkAuth = require(`../middleware/checkAuth`);
const {
  submitReport,
  editReport,
  deleteReport,
  getReport,
} = require(`../controllers/report`);

const router = express.Router();
router.use(express.json());
router.use(cors());
router.use(cookieParser());

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

//route that will be used by our protected routes
router.get("/", checkAuth, getReport);

//submit report
router.post(`/submit-report`, checkAuth, upload.single(`image`), submitReport);

//edit report
router.put("/edit-report/:id", checkAuth, upload.single(`image`), editReport);

//delete report
router.delete(`/delete-report/:id`, checkAuth, deleteReport);

module.exports = router;
