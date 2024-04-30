const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const managers = [
  {
    key: "AlgerieTelecom2024",
    password: "isla7_telecom2024",
    categorie: "Telecominication",
  },
  {
    key: "Sonelgaz2024",
    password: "isla7_elecgaz2024",
    categorie: "Electricity / Gaz",
  },
  {
    key: "Ona2024",
    password: "isla7_ona2024",
    categorie: "ONA",
  },
  {
    key: "ElDjazairiaWater2024",
    password: "isla7_water2024",
    categorie: "Water",
  },
];

async function main() {
  for (const manager of managers) {
    await prisma.manager.create({
      data: {
        key: manager.key,
        password: await bcrypt.hash(manager.password, 10),
        categorie: manager.categorie,
      },
    });
  }
}

main();
