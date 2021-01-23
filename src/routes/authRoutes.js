const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();
const secret = process.env.EMAIL_SECRET || 'cat123';

router.route("/login/email").post(function(req,res,next){  
    passport.authenticate("local", function (err, user, info) {
        console.log(err, user, info, 'login')
        if(err)return next(err)
        if(info) return res.send(info)
        if (!user) return res.send({ mensaje: "no encontrado" })   
        return res.send({ token: jwt.sign({ userId: user.id }, secret), name: user.name, email: user.email })
    })(req,res,next)
})

module.exports= router