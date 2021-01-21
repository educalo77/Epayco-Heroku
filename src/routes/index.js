const router = require("express").Router();
const UserRoutes = require("./userRoutes");
const TransactionRoutes = require("./transactionRoutes");
const BalanceRoutes = require("./balanceRoutes");
const AuthRoutes = require("./authRoutes");

router.use("/users", UserRoutes);
router.use("/auth",AuthRoutes);
router.use("/transactions",TransactionRoutes);
router.use("/balance",BalanceRoutes);

module.exports = router;
