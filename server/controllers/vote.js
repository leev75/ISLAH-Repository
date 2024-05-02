const jwt = require(`jsonwebtoken`);

const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const submitVote = async (req, res) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.userId;
    const reportId = req.body.reportId;

    if (!reportId) {
      res.status(400).json({ error: "Report ID is required" });
      return;
    }

    // Check if user has already voted on this report
    const existingVote = await prisma.vote.findFirst({
      where: {
        userId,
        reportId,
      },
    });

    if (existingVote) {
      // User has already voted, delete the vote
      await prisma.vote.delete({
        where: {
          userId,
          reportId,
        },
      });
    } else {
      // User has not voted before, create a new vote
      await prisma.vote.create({
        data: {
          userId,
          reportId,
        },
      });
    }

    // Update the report's vote count
    const raport = await prisma.raport.update({
      where: {
        report_id: reportId,
      },
      data: {
        nbr_Of_Votes: {
          increment: existingVote ? -1 : 1,
        },
      },
    });

    if (existingVote) {
      res.status(200).json({ Votes: raport.nbr_Of_Votes });
    } else {
      res.status(201).json({ Votes: raport.nbr_Of_Votes });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
};
module.exports = { submitVote };
