const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors());

const db = require("./models");
const PORT = process.env.PORT || 3001;

process.on("uncaughtException", function (err) {
  console.log(err);
  var stack = err.stack;
});

const usersRouter = require("./routes/users");
app.use("/auth", usersRouter);

db.sequelize
  .sync()
  .then((req) => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
