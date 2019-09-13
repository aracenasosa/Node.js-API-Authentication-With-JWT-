const { Router } = require("express");
const router = Router();
const User = require("../Model/Model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  { registerValidation, loginValidation } = require('../Validations');

// Routes
router.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.post("/register", async (req, res) => {
    
    const { Username, Email, Password } = req.body;

    // Register Validation
    const { error } = registerValidation(req.body);
    if (error) 
    {
        return res.status(400).send(error.details[0].message);
    } 
    else 
    {
        //Email Validation
        const emailExist = await User.findOne({Email});

        if(emailExist) return res.status(400).send('Email Already Exists!');

        //Hash Passwords
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        const user = new User({
            Username,
            Email,
            Password: hashedPassword
        });
        try {
            await user.save();
            res.json({
                _id: user._id
            });
        } catch (err) {
            res.status(400).send(err);
        }
    }
});

router.post("/login", async(req, res) => {

    const { Username, Email, Password } = req.body;
    
    //Validate the data
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

     //Email Exists
     const user = await User.findOne({Email});
     if(!user) return res.status(400).send('Invalid Email!');

     //Password Is Correct or Not
     const validPass = await bcrypt.compare(Password, user.Password);
     if(!validPass) return res.status(400).send('Invalid Password!');

     //Create and assign a token
     const token = jwt.sign({ _id: user._id }, 'frerefewgfrgr');
     res.header('auth-token', token).send(token);

});

module.exports = router;