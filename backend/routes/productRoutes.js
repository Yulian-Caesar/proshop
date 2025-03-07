import express from "express"
import { protect, admin } from "../middleware/authMiddleware.js";
import { createProduct, getProductById, getProducts } from "../controllers/productController.js"
const router = express.Router()

router.route('/')
	.get(getProducts)
	.post(protect, admin, createProduct)
router.route('/:productId').get(getProductById)

export default router;