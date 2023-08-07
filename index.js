const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");

const app = express();
dotenv.config().parsed;
const port = process.env.PORT;
const dbUri = process.env.URI;
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send("this is smart piller");
});

require("./startup/route")(app);

async function connectToDatabase() {
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("dbUri:", dbUri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectToDatabase();
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
