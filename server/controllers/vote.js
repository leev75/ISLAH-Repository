const jwt = require(`jsonwebtoken`);

const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();

const submitVote = async (req, res) => {
  //const token = req.cookies.token;
  //const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  //req.body.reportId;
  const { reportId } = req.body;
  console.log(reportId);

  const userId = 72;

  const existingVote = await prisma.vote.findUnique({
    where: {
      reportId,
      userId: userId,
    },
  });

  if (existingVote) {
    await prisma.vote.delete({
      where: {
        reportId,
        userId: userId,
      },
    });

    await prisma.raport.update({
      where: {
        report_id: reportId,
        userId: userId,
      },
      data: {
        nbr_Of_Votes: {
          decrement: 1,
        },
      },
    });

    res.status(200).send(`The vote has been removed`);
  } else {
    await prisma.vote.create({
      data: {
        reportId,
        userId: userId,
      },
    });

    await prisma.raport.update({
      where: {
        report_id: reportId,
        userId: userId,
      },
      data: {
        nbr_Of_Votes: {
          increment: 1,
        },
      },
    });

    res.status(201).send("Your vote has been registered");
  }
};

//get user votes
const getUserVotes = async (userId) => {
  return await prisma.vote.findMany({
    where: {
      userId,
    },
    include: {
      report: true,
    },
  });
};

//get number of votes
const getReportVotes = async (reportId) => {
  return await prisma.vote.count({
    where: {
      reportId,
    },
  });
};

module.exports = { submitVote, getUserVotes, getReportVotes };
