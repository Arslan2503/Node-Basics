const mongoose = require("mongoose");

require("dotenv").config();

mongoose
  .connect(process.env.mongoDBUrl, {
    dbName: process.env.dbName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {})
  .catch((err) => console.log(err.message));

mongoose.connection.on("connected", () => {
  console.log("Db Connected");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Db DisConnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
