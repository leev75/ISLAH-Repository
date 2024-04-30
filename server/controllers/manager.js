const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcrypt`);
const generateTokenManager = require("../utils/generateTokenManager");
const { PrismaClient } = require(`@prisma/client`);
const { create } = require("yallist");
const prisma = new PrismaClient();
const { jwtDecode } = require("jwt-decode");

//check auth
function checkAuth(req, res, next) {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.key = decoded.Key;
    next();
  } catch (error) {
    res.status(401).send("Not authorized, please log in");
  }
}

//manager login
const login = async (req, res) => {
  try {
    const { key, password } = req.body;

    const manager = await prisma.manager.findUnique({
      where: {
        key,
      },
    });

    if (!manager) {
      return res.status(400).send(`Invalid key`);
    }

    //checking the manager password
    const isPasswordMatch = await bcrypt.compare(password, manager.password);
    if (!isPasswordMatch) {
      return res.status(401).send("كلمة مرور خاطئة");
    }

    //saving token in cookies and sending it back to client side
    const KeyToken = manager;
    const managerToken = generateTokenManager(res, KeyToken);
    const decodedToken = jwtDecode(managerToken);
    res.status(200).send({
      message: "you've logged in successfully",
      managerToken,
      categorie: decodedToken.categorie,
    });
    //res.cookie("token", token)
  } catch (error) {
    console.error(error);
    res.status(500).send("حدث خطأ أثناء معالجة طلبك");
  }
};

//validation
const validate = async (req, res) => {
  const validate = req.query.status;

  await prisma.raport.update({
    where: {
      report_id: parseInt(req.params.id),
    },
    data: {
      status: validate,
    },
  });
  res.status(200).send(`validated`);
};

//logout
const logout = (req, res) => {
  res.clearCookie("managerToken");
  res.send("Logged out");
  res.redirect(`/`);
};

module.exports = { checkAuth, login, validate, logout };
