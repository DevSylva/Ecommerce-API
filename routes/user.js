const router = require("express").Router();

router.post("/add", (req, res) => {
    res.send("Hello world!")
})

module.exports = router