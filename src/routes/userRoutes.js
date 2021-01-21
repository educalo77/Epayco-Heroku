const router = require("express").Router();

const {
  createOne,
  getOne,
  
} = require("../controllers/userControllers");

router
  .route("/")
  .post((req, res) => { 
    const { name, email, phone, document} = req.body;
    createOne(name, email, phone, document)
      .then((user) => res.json(user).status(201))
      .catch((err) => res.status(400).json(err));
  })
  .get((req, res) => {
    const userId = req.user ? req.user.userId : false
    userId?
    getOne(userId)
      .then((user) => res.json(user))
      .catch((err) => res.status(404).json(err))
    :
    res.sendStatus(401)  
  })

  

  module.exports = router;