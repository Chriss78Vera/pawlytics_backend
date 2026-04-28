require("dotenv").config();

const app = require("./app");
const { connectMongo } = require("./infrastructure/database/mongo/connection");
const {
  connectPostgres,
  syncPostgres
} = require("./infrastructure/database/postgres/sequelize");

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await connectMongo();

    await connectPostgres();
    await syncPostgres();

    app.listen(PORT, () => {
      console.log(`Servidor Pawlytics ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error iniciando Pawlytics:", error);
    process.exit(1);
  }
}

main();