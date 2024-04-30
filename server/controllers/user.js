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

      const token = generateToken(res,newUser.user_id);
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

const change_password = async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const { oldpass, newpass, re_newpass } = req.body;

  const user = await prisma.user.findUnique({
    where: { user_id: decoded.userId },
  });

  bcrypt.compare(oldpass, user.password, async (err, result) => {
    if (err) return res.status(500).send(err);
    if (!result) return res.status(401).send(`wrong password, try again`);

    if (newpass === re_newpass) {
      await prisma.user.update({
        where: { user_id: decoded.userId },
        data: { password: bcrypt.hashSync(newpass, 10) },
      });
      res
        .status(200)
        .json({ oldpass, newpass, message: "password updated successfully" });
      //send(`password updated successfully`);
    }
  });
};

const change_name = async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const { name } = decoded;
  const { new_name } = req.body;

  await prisma.user.update({
    where: { user_id: decoded.userId },
    data: { name: new_name },
  });
  res
    .status(200)
    .send({ message: `name updated successfully`, new_name, name });
};

const change_tel = async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const { new_phone_number } = req.body;

  await prisma.user.update({
    where: { user_id: decoded.userId },
    data: { name: new_phone_number },
  });
  res.status(200).send(`phone number updated successfully`);
};

module.exports = {
  register,
  login,
  change_name,
  change_password,
  change_tel,
};
