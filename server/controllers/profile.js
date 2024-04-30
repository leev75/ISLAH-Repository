const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const profile = async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const sortBy = req.query.sortBy || date;

  try {
    const user = await prisma.user.findUnique({
      where: {
        user_id: decoded.userId,
      },
      include: {
        reports: {
          orderBy: {
            [sortBy]: "desc",
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { profile };

// router.get(/, checkAuth, async (req, res) => {
//     const token = req.cookies.token
//     const decoded = jwt.verify(token, jwt-secret-key)

//     const sortBy = req.query.sortBy;

//     try {
//       if (sortBy === 'votes') {
//         const reports = await prisma.raport.findMany({
//             where: {
//                 user_id : decoded.userId
//             },
//             orderBy: {
//                 nbr_Of_Votes: 'desc',
//             }
//         });

//         res.json(reports);
//       } else if (sortBy === 'date') {
//         const reports = await prisma.raport.findMany({
//             where: {
//                 user_id : decoded.userId
//             },
//             orderBy: {
//                 date: 'desc',
//             }
//         });

//         res.json(reports);
//       } else {
//         const reports = await prisma.raport.findMany({
//             where: {
//                 user_id : decoded.userId
//             },
//         });

//         res.json(reports);
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
// })
