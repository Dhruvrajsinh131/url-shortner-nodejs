const { nanoid } = require("nanoid");
const URL = require("../models/url.model");

module.exports.generateNewShortUrl = async (req, res) => {
  const { redirectUrl } = req.body;

  if (!redirectUrl) return res.status(200).json({ error: "Url is required" });
  const shortId = nanoid(8);
  await URL.create({
    shortId: shortId,
    redirectUrl: redirectUrl,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.status(200).json({ id: shortId });
};

module.exports.getOriginalUrl = async (req, res) => {
  const { shortid } = req.params;

  const entry = await URL.findOneAndUpdate(
    {
      shortId: shortid,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );

  res.redirect(entry.redirectUrl);
};

module.exports.getAnalytics = async (req, res) => {
  const { shortid } = req.params;

  const result = await URL.findOne({
    shortId: shortid,
  });

  res.status(200).json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};
