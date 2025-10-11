const mongoose = require("mongoose");

async function connectDb({ dbHost, dbPort, dbName, dbServer }) {
  const uri =
    dbServer === "IP" ? `mongodb://${dbHost}:${dbPort}/${dbName}` : dbHost;
  await mongoose.connect(uri, { useNewUrlParser: true });
}

mongoose.connection.on("open", () => {
  console.log("DB connection successfully established");
});

module.exports = connectDb;
