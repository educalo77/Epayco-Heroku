const router = require("express").Router();
const jwt = require('jsonwebtoken');

const {
  payment,
  recharge,
  getAllByUserId
} = require("../controllers/transactionControllers");
const {confirmPay} = require("../mailmodel/confirmPay.js");
const {
  getOne,  
} = require("../controllers/userControllers");
const secret = process.env.EMAIL_SECRET || 'secret';

router
  .route("/")
  .get((req, res) => {
    const userId = req.user ? req.user.userId : false
    userId?
    getAllByUserId(userId)
      .then((user) => res.json(user).status(201))
      .catch((err) => res.status(400).json(err))
    :
    res.sendStatus(401)
  })



router
  .route("/confirmpayment")
  .post((req, res) => {
    const userId = req.user ? req.user.userId : false
    const {amount} = req.body;
    userId?
      jwt.verify(amount.token, secret, (error, data) => {
      if (error) res.sendStatus(401)
      else {
        getOne(data.id)
          .then((user) =>{
            if(!user.compare(amount.phone.toString())){ 
            return res.status(401)
            }          
            return payment(data.id, data.amount)
           })
          .then((user) => res.json(user).status(201))
          .catch((err) => {            
            res.status(400)}
          );
      }
    })
    :
    res.sendStatus(401)
  })

router
  .route("/recharge")
  .post((req, res) => {
    const userId = req.user ? req.user.userId : false
    const {amount} = req.body;
    userId?
    recharge(userId, amount)
      .then((user) => res.json(user).status(201))
      .catch((err) => res.status(400).json(err))
    :
    res.sendStatus(401)
  })

  router
  .route("/payment")
  .post((req, res) => {
    const userId = req.user ? req.user.userId : false
    const {amount} = req.body;
    userId?
    getOne(userId)
      .then((user)=>{
        return confirmPay({user,amount})}
      )
      .then((email) => res.send(email))
      .catch((err) => res.status(400).json(err))
    :
    res.sendStatus(401)
  })

  module.exports = router;