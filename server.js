const { appConfig, dbConfig } = require("./config");
const app = require("./app");
const connectDb = require("./db/mongodb");

async function initApp(appConfig, dbConfig) {
  const port = appConfig.appPort;

  try {
    await connectDb(dbConfig).then(() => {
      app.listen(port, () => console.log(`Server running on port: ${port}`));
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

initApp(appConfig, dbConfig);
