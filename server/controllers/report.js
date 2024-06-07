const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const { path } = require("path");

const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

//homepage
const homepage = async (req, res) => {
  //console.log(req.user_id)
  const user = await prisma.user.findUnique({
    where: { user_id: req.user_id },
  });
  //res.json(user);
  res.json("SUP! You are authenticated");
};

const submitReport = async (req, res) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const { location, description, categorie } = req.body;

    // Check for existing report
    const existingReport = await prisma.raport.findFirst({
      where: {
        userId: decoded.userId,
        location,
        description,
        categorie,
      },
    });

    if (existingReport) {
      return res.status(400).send("This report already exists");
    }

    // Process the image upload
    cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "reports",
        public_id: `report-${decoded.userId}-${Date.now()}`,
      },
      async (err, result) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ success: false, message: "Image upload failed" });
        }

        try {
          // Create the report in the database
          const report = await prisma.raport.create({
            data: {
              userId: decoded.userId,
              location,
              description,
              categorie,
              image: result.url,
            },
          });

          // Update the number of reports for the user
          await prisma.user.update({
            where: {
              user_id: decoded.userId,
            },
            data: {
              nbr_of_reports: { increment: 1 },
            },
          });

          res.status(200).json({ message: "Report submitted successfully" });
        } catch (dbError) {
          console.error(dbError);
          res.status(500).send("Database operation failed");
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(400).send("Error processing your request");
  }
};

const editReport = async (req, res) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const updateFields = {};

    if (req.body.location) updateFields.location = req.body.location;

    if (req.body.categorie) updateFields.categorie = req.body.categorie;

    if (req.file) updateFields.image = req.file.path;

    if (req.body.description) updateFields.description = req.body.description;

    if (!updateFields) return res.status(400).send("No data provided");

    if (updateFields.image) {
      cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "reports", // optional, specify a folder for the image
          public_id: `report-${decoded.userId}-${Date.now()}`, // optional, specify a public ID for the image
        },
        async (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: "Error",
            });
          }

          const report = await prisma.raport.update({
            where: {
              userId: decoded.userId,
              report_id: parseInt(req.params.id),
            },
            data: {
              location: updateFields.location,
              description: updateFields.description,
              categorie: updateFields.categorie,
              image: (await result).url, //cloudinary.url((await result).url, {width: 100, height: 150, crop: "fill"})
              edited: true,
            },
          });
          console.log(report);
          res.status(200).send(`Reported submitted successfully`);
        }
      );
    }

    await prisma.raport.update({
      where: {
        userId: decoded.userId,
        report_id: parseInt(req.params.id),
      },
      data: {
        ...updateFields,
        edited: true,
      },
    });
    res.status(200).send("Report updated successfully");
  } catch (error) {
    res.status(400).send("error");
  }
};

const deleteReport = async (req, res) => {
  const authHeader = req.header("Authorization");
  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const report_id = parseInt(req.params.id);

  console.log(report_id);

  await prisma.vote.deleteMany({
    where: {
      reportId: report_id,
    },
  });

  await prisma.raport.delete({
    where: {
      userId: decoded.userId,
      report_id,
    },
  });

  res.status(200).send("The Report has been deleted");
};

const getReport = async (req, res) => {
  const report = await prisma.raport.findUnique({
    where: {
      report_id: parseInt(req.params.id),
    },
  });
  res.status(200).send(report);
};

module.exports = {
  homepage,
  submitReport,
  editReport,
  deleteReport,
  getReport,
};
