const router = require("express").Router();
const User = require("../models/user");
const CryptoJs = require("crypto-js")


router.post("/register", async (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(500).json("Missing Some Sign Up fields");
    }
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJs.AES.encrypt(
        req.body.password,
        process.env.PASS_SECRET_KEY
      ).toString(),
    });

    try {
        const savedUser = await newUser.save();
        console.log(savedUser);
        res.status(201).json(savedUser);
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("User does not exist")

        const hashedPassword = CryptoJs.AES.decrypt(user.password, process.env.PASS_SECRET_KEY);
        const password = hashedPassword.toString(CryptoJs.enc.Utf8);

        password !== req.body.password &&
            res.status(401).json("Wrong Credentials")
        
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;
