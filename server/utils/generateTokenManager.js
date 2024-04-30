const jwt = require(`jsonwebtoken`);

const generateTokenManager = (res, manager) => {
  const managerToken = jwt.sign(
    {
      key: manager.key,
      categorie: manager.categorie,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "30d",
    }
  );

  res.cookie("managerAuthToken", managerToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  return managerToken;
};

module.exports = generateTokenManager;
