const router = require("express").Router();

router.get("/all", (req, res) => {
  res.json("ohayo");
});

module.exports = router;
