const router = require("express").Router();
const {userAll, userDelete, getUserId, getUserOrders, updateUser } = require("../controllers/userController")
const {isUser, isAdmin, auth} = require("../middleware/auth")

router.get("/",isAdmin, userAll)
router.get("/:userId", isUser, getUserOrders);
router.get("/find/:id", auth, getUserId )
router.put("/:id", isUser, updateUser)
// router.get("/stats", isAdmin, getMonthlyIncome);
router.delete("/:id",isAdmin, userDelete)

module.exports = router;