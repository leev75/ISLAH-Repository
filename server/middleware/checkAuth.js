const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const jwt = require(`jsonwebtoken`);

const checkAuthentication = async (req, res, next) => {
  try {
    // Extract token from cookies
    const authHeader = req.header("Authorization");

    // Check if token exists
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    /*if (!token || !token1) {
      return res.status(401).json({ error: "the token are not provided" });
    }*/
    if (!token) {
      return res.status(401).json({ error: "the token are not provided" });
    }

    // Verify token
    //const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Replace 'your_secret_key' with your
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { userId } = decoded;
    // Add user ID to request object
    //req.user_id = userId;
    req.user_id = userId;

    const user = await prisma.user.findUnique({
      where: { user_id: req.user_id },
    });

    // Proceed to next middleware
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = checkAuthentication;
