const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const authorizationHeaderValue = req.headers["authorization"];

  req.user = null;

  if (
    !authorizationHeaderValue ||
    authorizationHeaderValue.startsWith("Bearer")
  ) {
    return next();
  }

  const token = authorizationHeaderValue.split("Bearer ")[1];

  const user = getUser(token);

  req.user = user;
  next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(404).json({ errMessage: "Unauthorized" });
    }

    return next();
  };
}

module.exports = { checkForAuthentication, restrictTo };
