const express = require("express");
const router = require("./routes/url.route");
const createMongoConnection = require("./connection");

const app = express();
const PORT = 3455;

createMongoConnection();

app.use(express.json());
app.use("/url", router);
app.use("/", router);

app.listen(PORT, () => {
  console.log("Server is running on port 3455");
});
