const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use("/api/user", userRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Backend Server is running and listening on port ${
      process.env.PORT || 5000
    }...`
  );
});
