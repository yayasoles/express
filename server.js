const express = require("express");
const queryRouter = require("./routes/quries");
const commandRouter = require("./routes/command");
const { getConnectionManager } = require("typeorm");
require("dotenv").config();

const port = 3000;

const app = express();
const db = process.env.DB.toString();
app.use(express.json());
const connectionManager = getConnectionManager();
const connection = connectionManager.has("default")
  ? connectionManager.get("default")
  : connectionManager.create({
      host: "db",
      type: "postgres",
      port: 5432,
      username: "postgres",
      password: "yaya@1984",
      database: "test1",
      entities: [__dirname + "/entities/*.js"],
      synchronize: true,
      // name: "default",
    });

connection
  .initialize()
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  });
// Routes
app.use("/", queryRouter);
app.use("/", commandRouter);
