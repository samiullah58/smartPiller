const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");

const app = express();
dotenv.config().parsed;
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT;
// const dbUri = process.env.URI;

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send("this is smart piller");
});

require("./startup/route")(app);

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("dbUri:", process.env.URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectToDatabase();
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
