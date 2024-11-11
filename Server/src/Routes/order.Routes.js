const router = require("express").Router();
const {createOrder, updateOrder, deleteOrder, getAllOrders, getOrderById} = require("../controllers/orderController");
const { isAdmin } = require("../middleware/auth");

router.post("/", createOrder);
router.put("/:id", isAdmin, updateOrder);
router.delete("/:id", isAdmin, deleteOrder);
router.get("/", isAdmin, getAllOrders);
router.get("/findOne/:id", isAdmin, getOrderById);

module.exports = router;
