const { getUser } = require("../service/auth");

module.exports.restrictToLoggedInUsersOnly = async (req, res, next) => {
  console.log("req.cookie", req.cookies);

  const userId = req.cookies?.uid;

  if (!userId)
    return res.status(403).json({
      success: false,
      message: "Unauthorised",
    });

  const user = getUser(userId);

  if (!user)
    return res.status(403).json({
      success: false,
      message: "Unauthorised",
    });

  req.user = user;
  next();
};
