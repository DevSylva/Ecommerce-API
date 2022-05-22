const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
const authRoute = require("./routes/auth");
const cors = require("cors");

dotenv.config();

// mongodb connect
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

// routes endpoints
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/auth", authRoute);
  

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Backend Server is running and listening on port ${
      process.env.PORT || 5000
    }...`
  );
});
