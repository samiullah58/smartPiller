const cors = require('cors');
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
// const PORT = process.env.PORT;
// const dbURI = process.env.MONGODB_CON_STRING; // Access the environment variable here

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send("this is smart piller");
});

require("./startup/route")(app);

async function connectToDatabase() {
  try {
    await mongoose.connect(
      "mongodb+srv://samiullahbcs5th5450:4AXD84NKo5l2Rquo@cluster0.awsc1pv.mongodb.net/smartPiller?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectToDatabase()
  .then(() => {
    app.listen(4000, () => {
      console.log(`Server started on port: 4000`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
