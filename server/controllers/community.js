const jwt = require(`jsonwebtoken`);

const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();

//home community page
const GetcommunityByDate = async (req, res) => {
  const sortBy = req.query.sortBy || `date`;

  try {
    const reports = await prisma.raport.findMany({
      include: {
        user: true,
      },
      orderBy: {
        [sortBy]: "desc",
      },
    });

    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const GetcommunityByVote = async (req, res) => {
  const sortBy = req.query.sortBy;

  try {
    if (sortBy === "votes") {
      const reports = await prisma.raport.findMany({
        orderBy: {
          nbr_Of_Votes: "desc",
        },
      });

      res.json(reports);
    } else if (sortBy === "date") {
      const reports = await prisma.raport.findMany({
        orderBy: {
          date: "desc",
        },
      });

      res.json(reports);
    } else {
      const reports = await prisma.raport.findMany();

      res.json(reports);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { GetcommunityByDate, GetcommunityByVote };
