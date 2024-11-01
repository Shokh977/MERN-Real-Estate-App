const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

//Routes
const userRouter = require("./Routes/user.route");
const authRouter = require("./Routes/auth.route");
const listingRouter = require("./Routes/listing.route")


// database connection
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to the database");
  })
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("server is running");
});
