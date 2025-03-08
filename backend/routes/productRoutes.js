import express from "express"
import { protect, admin } from "../middleware/authMiddleware.js";
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productController.js"
const router = express.Router()

router.route('/')
	.get(getProducts)
	.post(protect, admin, createProduct)

router.route('/:productId')
	.get(getProductById)
	.put(protect, admin, updateProduct)
	.delete(protect, admin, deleteProduct)

router.route('/:productId/reviews').post(protect, createProductReview)

export default router;