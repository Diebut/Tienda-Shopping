const express = require("express");
const { auth, isAdmin } = require("../middleware/auth");
const productController = require("../controllers/productController");

const router = express.Router();

router.post("/",auth, isAdmin,  productController.createProduct);
router.delete("/:id",auth, isAdmin, productController.deleteProduct);
router.get("/", productController.getAllProducts);
router.get("/find/:id", productController.getProductById);
router.put("/:id",auth, isAdmin,  productController.updateProduct);

module.exports = router;

