const { Router } = require("express");
const verify = require('./VerifyToken');
const User = require("../Model/Model");
const router = Router();

router.get('/', verify, async(req, res) => {

    //res.json({ post: { title: 'My First post', description: 'Random Data you shouldnt access' } });
    //res.json(req.user) 
    const oneUSer = await User.findOne({_id: req.user});
    res.json(oneUSer);
});

module.exports = router;