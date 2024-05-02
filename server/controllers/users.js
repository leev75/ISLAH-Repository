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

const getUsersByCategorieV2 = async (req, res) => {
  const categorie = req.body.categorie;

  const users = await prisma.user.findMany({
    where: {
      reports: {
        some: {
          categorie,
        },
      },
    },
    distinct: ["user_id"],
  });

  res.status(200).send(users);
};

module.exports = { getUsersByCategorie, getUsersByCategorieV2 };
