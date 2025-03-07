import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js"

// @desc	Fetch all products
// @route	GET /api/products
// @access	Public
const getProducts = asyncHandler(async(req, res) => {
	const products = await Product.find({})
	res.json(products);
})

// @desc	Fetch single product
// @route	GET /api/products/:productId
// @access	Public
const getProductById = asyncHandler(async(req, res) => {
	const product = await Product.findById(req.params.productId)

	if(product) {
		 res.json(product);
	} else {
		res.status(404)
		throw new Error('Resource not found')
	}
})

// @desc	Create a product
// @route	POST /api/products
// @access	Private/Admin
const createProduct = asyncHandler(async(req, res) => {
	const product = new Product({
		name: 'Sample Name',
		price: 0,
		user: req.user._id,
		image: '/images/sample.jpg',
		brand: 'Sample Brand',
		category: 'Sample Category',
		description: 'Sample Description',
		countInStock: 0,
		rating: 0,
		numReviews: 0,
	})

	const createdProduct = await product.save()

	res.status(201).json(createdProduct)
})

export {getProducts, getProductById, createProduct}