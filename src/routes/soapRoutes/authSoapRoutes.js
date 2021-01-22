const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const secret = process.env.EMAIL_SECRET
var url = 'http://localhost:8001/wscalc1?wsdl';
var soap = require('soap');

router.route("/login/email")
.post(function(req,res,next){  
  const { email, phone} = req.body;
  console.log("entra",email)
    soap.createClient(url, async function(err, client) {
        if (err) throw err;
        await client.emailLogin({email, phone},function(err,resp){
          if (err) throw err;
          console.log(resp);
          return res.send({token:jwt.sign({userId:resp.emailLogin.id},secret), name:resp.emailLogin.name, email:resp.emailLogin.email, userID:resp.emailLogin.id})
        })    
    });     
})

module.exports= router




        



  

  module.exports = router;