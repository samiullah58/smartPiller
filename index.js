// const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");

// dotenv.config({ path: __dirname + "/.env" });

// console.log(process.env.NODE_ENV);

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send("This is smart piller");
});

require("./startup/route")(app);

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectToDatabase();
app.listen(process.env.PORT, () => {
  console.log(`Server started on port: ${process.env.PORT}`);
});
