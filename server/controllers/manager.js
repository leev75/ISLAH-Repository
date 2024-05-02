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
  const { status,report_id } = req.body;
  
  console.log(status);
  console.log(report_id);

  // Update the status of the report
  const report = await prisma.raport.update({
    where: {
      report_id: report_id,
    },
    data: {
      status,
    },
  });

  /*if (status === "Completed" || status === `Rejected`) {
    if (status === `Completed`) {
      const time = 60 * 1000;
    } // 1 month in milliseconds
    else {
      const time = 30 * 1000; // 1 month in milliseconds}

      // Schedule deletion using setTimeout
      setTimeout(async () => {
        // Delete related records first
        await prisma.vote.deleteMany({
          where: {
            reportId: report_id,
          },
        });

        // Then delete the report
        await prisma.raport.delete({
          where: {
            report_id,
          },
        });
      }, time);
    }*/

  res.status(200).send(`validated`);
};
//logout
const logout = (req, res) => {
  res.clearCookie("managerToken");
  res.send("Logged out");
  res.redirect(`/`);
};
const totalReports = async (req, res) => {
  const authHeader = req.header("Authorization");
  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  try {
    const reportedCount = await prisma.raport.count({
      where: {
        categorie: decoded.categorie,
        status: "Reported",
      },
    });

    const inProgressCount = await prisma.raport.count({
      where: {
        categorie: decoded.categorie,
        status: "In_Progress",
      },
    });

    const rejectedCount = await prisma.raport.count({
      where: {
        categorie: decoded.categorie,
        status: "refused",
      },
    });

    const data = {
      labels: ["Reported", "In Progress", "Rejected"],
      counts: [reportedCount, inProgressCount, rejectedCount],
    };

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      labels: [],
      counts: [],
    });
  }
};

const hourlyReports = async (req, res) => {
  const authHeader = req.header("Authorization");
  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const oneHourAgo = new Date(Date.now() - 3600000); // 3600000 milliseconds = 1 hour
  const reports = await prisma.raport.findMany({
    where: {
      categorie: decoded.categorie,
      date: {
        gt: oneHourAgo,
      },
    },
  });
  res.status(200).json(reports.length);
};

module.exports = {
  hourlyReports,
  checkAuth,
  totalReports,
  login,
  validate,
  logout,
};
