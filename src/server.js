require("dotenv").config();

const buildApp = require("./app");
const { connectMongo } = require("./Infraestructura/database/mongo/connection");
const {
  connectPostgres,
  syncPostgres
} = require("./Infraestructura/database/postgres/sequelize");

const PORT = process.env.PORT || 3000;

async function start() {
  await connectMongo();
  await connectPostgres();
  await syncPostgres();

  const app = buildApp();

  app.listen(PORT, () => {
    console.log(`Servidor Pawlytics ejecutandose en http://localhost:${PORT}`);
  });
}

start().catch((error) => {
  console.error("Error iniciando Pawlytics:", error);
  process.exit(1);
});
