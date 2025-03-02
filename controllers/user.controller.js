const { v4: uuidv4 } = require("uuid");

const USER = require("../models/user.model");
const { setUser, getUser } = require("../service/auth");

module.exports.userSignUp = async (req, res) => {
  const result = await USER.create(req.body);

  res.status(200).json({
    success: true,
    date: result,
  });
};
module.exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  const result = await USER.findOne({ email, password });

  if (!result)
    return res.status(404).json({
      success: true,
      message: "Invalid credantials",
    });

  const sessionId = uuidv4();

  setUser(sessionId, result);
  res.cookie("uid", sessionId);

  return res.status(200).json({
    success: true,
    date: result,
  });
};
