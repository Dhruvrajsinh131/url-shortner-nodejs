const express = require("express");
const router = require("./routes/url.route");
const userRouter = require("./routes/user.route");
const createMongoConnection = require("./connection");
const cookieParser = require("cookie-parser");
const { restrictTo, checkForAuthentication } = require("./middlewares/auth");

const app = express();
const PORT = 3455;

createMongoConnection();

app.use(cookieParser());

app.use(checkForAuthentication);

app.use(express.json());
app.use("/url", restrictTo(["NORMAL"]), router);
app.use("/user", userRouter);
app.use("/", router);

app.listen(PORT, () => {
  console.log("Server is running on port 3455");
});
