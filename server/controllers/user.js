const jwt = require(`jsonwebtoken`);
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { PrismaClient } = require(`@prisma/client`);
const generateToken = require("../utils/generateToken");
const prisma = new PrismaClient();

const register = async (req, res) => {
  const { name, password, phoneNumber } = req.body;

  // First, check if the phoneNumber already exists in the database
  const existingUser = await prisma.user.findUnique({
    where: {
      phoneNumber: phoneNumber,
    },
  });

  // If an existing user is found, send an error response
  if (existingUser) {
    return res
      .status(401)
      .send("رقم الهاتف موجود بالفعل. الرجاء استخدام رقم هاتف مختلف");
  }

  // If no user is found with the phoneNumber, proceed with hashing the password and creating the new user
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      return res.status(400).send("Error not expected - hash failed");
    }

    try {
      const newUser = await prisma.user.create({
        data: {
          name: name,
          phoneNumber: phoneNumber,
          password: hashedPassword,
        },
      });

      const token = generateToken(res, newUser.user_id);
      return res
        .status(201)
        .json({ message: "تم تسجيل المستخدم بنجاح", token });
    } catch (error) {
      // Handle potential errors, such as issues with the database operation
      console.error("Registration error:", error);
      return res.status(500).send("An error occurred during registration");
    }
  });
};

const login = async (req, res) => {
  try {
    const { phoneNumber, password, rememberMe } = req.body;
    //const expiresIn = rememberMe ? "30d" : "1h"; // Example: 30 days if "Remember Me" is checked

    if (!phoneNumber || !password) {
      return res.status(400).send("مطلوب رقم الهاتف وكلمة المرور");
    }

    // Input validation can be more extensive based on your requirements
    const user = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (!user) {
      return res.status(400).send("رقم الهاتف غير صحيح");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send("كلمة مرور خاطئة");
    }

    const userId = user.user_id;
    const token = generateToken(res, userId);
    res.status(200).json({ message: "تم", token });
  } catch (error) {
    console.error(error);
    res.status(500).send("حدث خطأ أثناء معالجة طلبك");
  }
};

const changeInfo = async (req, res) => {
  const authHeader = req.header("Authorization");
  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const userId = decoded.userId;

  const { newName, newPhoneNumber, newPassword } = req.body;

  if (!newName && !newPhoneNumber && !newPassword) {
    return res.status(401).json("No data provided");
  }

  try {
    // update name
    if (newName) {
      await prisma.user.update({
        where: { user_id: userId },
        data: { name: newName },
      });
    }

    // update phone number
    if (newPhoneNumber) {
      await prisma.user.update({
        where: { user_id: userId },
        data: { phoneNumber: newPhoneNumber },
      });
    }

    // update password
    if (newPassword) {
      const user = await prisma.user.findUnique({
        where: { user_id: userId },
      });

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { user_id: userId },
        data: { password: hashedPassword },
      });
    }

    res.status(200).send(`Info updated successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error updating info: ${error.message}`);
  }
};

const getReport = async (req, res) => {
  const authHeader = req.header("Authorization");
  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const reports = await prisma.raport.findMany({
    where: {
      userId: decoded.userId,
    },
  });
  res.status(200).send(reports);
};

module.exports = {
  register,
  login,
  changeInfo,
  getReport,
};
