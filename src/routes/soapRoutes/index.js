const router = require("express").Router();
const UserRoutes = require("./userSoapRoutes");
const authSoapRoutes = require("./authSoapRoutes");
const TransactionSoapRoutes = require("./transactionSoapRoutes");
const BalanceSoapRoutes = require("./balanceSoapRoutes");

router.use("/users",UserRoutes);
router.use("/auth",authSoapRoutes);
router.use("/transactions",TransactionSoapRoutes);
router.use("/balance",BalanceSoapRoutes);

module.exports = router;
