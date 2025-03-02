const { Router } = require("express");
const {
  generateNewShortUrl,
  getOriginalUrl,
  getAnalytics,
} = require("../controllers/url.controller");

const router = Router();

router.post("/", generateNewShortUrl);
router.get("/analytics/:shortid", getAnalytics);
router.get("/:shortid", getOriginalUrl);

module.exports = router;
