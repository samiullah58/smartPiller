const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send("this is smart piller");
});

require("./startup/route")(app);

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_CON_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MONGODB_CON_STRING:", process.env.MONGODB_CON_STRING);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectToDatabase();
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
