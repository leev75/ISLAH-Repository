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

//submit post
const submitReport = async (req, res) => {
  //const token = req.cookies.token;
  const authHeader = req.header("Authorization");
  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  //const {location, description, categorie, image} = req.body

  const { location, description, categorie } = req.body;
  const image = req.body.file;

  if (
    await prisma.raport.findFirst({
      where: {
        userId: decoded.userId,
        location,
        description,
        categorie,
      },
    })
  ) {
    return res.status(400).send(`this raport is already exists`);
  }

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

      const report = await prisma.raport.create({
        data: {
          userId: decoded.userId,
          location,
          description,
          categorie,
          image: await result.url, //cloudinary.url((await result).url, {width: 100, height: 150, crop: "fill"})
        },
      });
      res.status(200).json({ message: "Reported submitted successfully" });
    }
  );
};

const editReport = async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, `jwt-secret-key`);

  const updateFields = {};

  if (req.body.location) updateFields.location = req.body.location;

  if (req.body.categorie) updateFields.categorie = req.body.categorie;

  if (req.file.path) updateFields.image = req.file.path;

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
};

const deleteReport = async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  await prisma.raport.delete({
    where: {
      userId: decoded.userId,
      report_id: parseInt(req.params.id),
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
