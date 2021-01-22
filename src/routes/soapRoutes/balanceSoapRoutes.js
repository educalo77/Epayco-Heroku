const router = require("express").Router();
var soap = require('soap');
var url = 'http://localhost:8001/wscalc1?wsdl';

router
  .route("/")
  .post((req, res) => { 
    const {userId} = req.body;
    console.log("balance", userId);
    if(userId === undefined) return res.sendStatus(400)
    soap.createClient(url, async function(err, client) {
        if (err) throw err;
         await client.balanceGet({userId},function(err,resp){
          if (err) throw err;
          console.log(resp);
          
          res.send(resp.balancegetres);
        }) 
    });     
  })

module.exports = router;