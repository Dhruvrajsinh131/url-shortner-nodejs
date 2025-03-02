const { Router } = require("express");
const { userSignUp, userLogin } = require("../controllers/user.controller");

const router = Router();

router.post("/signup", userSignUp);
router.post("/login", userLogin);

module.exports = router;
