const router = require("express").Router();

const {
  getOneByUserId
} = require("../controllers/balanceControllers");

router
  .route("/")
  .get((req, res) => { 
    const userId = req.user ? req.user.userId : false
    userId ?
    getOneByUserId(userId)
    .then((users) => res.json(users).status(200))
    .catch((err) => res.status(404).json(err))
    :
    res.sendStatus(401)
  ;}
);

module.exports = router;