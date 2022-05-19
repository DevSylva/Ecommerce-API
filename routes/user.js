const router = require("express").Router();

router.get("/usertest", (req, res) => {
    res.send("Hello world!")
})

router.post("/userpostest", (req, res) => {
    const user = req.body.username;
    res.json("your username is " + user)
})

module.exports = router