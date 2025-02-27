import express from "express"
import { getProductById, getProducts } from "../controllers/productController.js"
const router = express.Router()

router.route('/').get(getProducts)
router.route('/:productId').get(getProductById)

export default router;