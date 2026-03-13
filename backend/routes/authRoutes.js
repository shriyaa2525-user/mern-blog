const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async(req, res) => {
    try{
        const{ username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.json({message: "User Created"});
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

router.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign(
            { id: user._id },
            "secretkey",
            { expiresIn: "1d" }
        );

        res.json({token});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;