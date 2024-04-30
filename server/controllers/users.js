const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();

const getUsersByCategorie = async (req, res) => {
  const users = await prisma.raport.findMany({
    where: {
      categorie: req.body.categorie,
    },
    include: {
      user: true,
    },
  });
  res.status(200).send(users);
};

module.exports = { getUsersByCategorie };
