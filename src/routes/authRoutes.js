const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const secret = process.env.EMAIL_SECRET

router.route("/login/email").post(function(req,res,next){  
    passport.authenticate("local",function(err,user,info){
        if(err)return next(err)
        if(info) return res.send(info)
        if(!user) return res.send({mensaje:"no encontrado"})       
        return res.send({token:jwt.sign({userId:user.id},secret), name:user.name, email:user.email})
    })(req,res,next)
})

module.exports= router