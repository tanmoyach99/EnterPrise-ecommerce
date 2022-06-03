const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;
app.get("/", (req, res) => {
  res.send("app is working");
});

// const authRoutes = require("./routes/auth");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(`db connection err`, err));

//middleware

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//routes middleware
// app.use("/api", authRoutes);
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

//router routes
// app.get("/api", (req, res) => {
//   res.json({
//     data: "what..........??",
//   });
// });

app.listen(port, () => console.log(`server is running on ${port}`));
