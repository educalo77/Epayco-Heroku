const router = require("express").Router();
var soap = require('soap');
const user = require("../../../../soap/src/models/user");

var url = 'http://localhost:8001/wscalc1?wsdl';

router
  .route("/")
  .post((req, res) => {
    soap.createClient(url, async function(err, client) {
      if (err) throw err;      
        const {userId} = req.body;
        if(userId === undefined) return res.sendStatus(400)
         await client.transactionsGet({userId},function(err,resp){
        console.log(resp);
        if(resp.transactionsres?.transactionsres) res.send(resp.transactionsres)
          res.send([])
      })   
    });  
  })

router
  .route("/confirmpayment")
  .post((req, res) => {
    const {userId, amount} = req.body;
    console.log(userId,amount);
    soap.createClient(url, async function(err, client) {
      if (err) throw err;
      await client.paymentConfirm({userId, amount},function(err,resp){
        if (err) throw err;
        res.send(resp)
      })
    });  
  })

router
  .route("/recharge")
  .post((req, res) => {
    const {userId, amount} = req.body;
    
     soap.createClient(url, async function(err, client) {
      if (err) throw err;
        await client.rechargeAction({userId,amount},function(err,resp){
        if (err) throw err;
        res.send(resp)
      })  
    
    });   
  })

  router
  .route("/payment")
  .post((req, res) => {
    const {userId, amount} = req.body;
    soap.createClient(url, async function(err, client) {
      if (err) throw err;
        await client.paymentAction({userId,amount},function(err,resp){
          if (err) throw err;
          res.send(resp)

        })  
    });  
  })

  module.exports = router;