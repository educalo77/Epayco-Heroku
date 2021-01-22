const router = require("express").Router();
var soap = require('soap');
var url = 'http://localhost:8001/wscalc1?wsdl';

router
  .route("/")
  .post((req, res) => {
    const { name, email, phone, document} = req.body;
    console.log("entro al soap");
    soap.createClient(url, async function(err, client) {
        if (err) throw err;
         await client.createUser({name,email,phone,document},function(err,resp){
          if (err) throw err;
          res.send(resp);
        })   
    });     
})


module.exports = router;