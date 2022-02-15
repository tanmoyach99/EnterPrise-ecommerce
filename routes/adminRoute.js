const express = require("express");
const adminRouter = express.Router();

const { authCheck, adminCheck } = require("../middlewares/authMiddle");

const { orders, orderStatus } = require("../controllers/adminController");

adminRouter.get("/admin/orders", authCheck, adminCheck, orders);
adminRouter.put("/admin/orderStatus", authCheck, adminCheck, orderStatus);

module.exports = adminRouter;
