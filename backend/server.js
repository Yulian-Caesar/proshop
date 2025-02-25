import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { products } from './data/products.js';
import connectDB from './config/db.js';


const port = process.env.PORT || 5000;

connectDB() // connect MongoDB
const app = express();

app.get('/', (req, res) => {
	res.send('hello world');
})

app.get('/api/products', (req, res) => {
	res.json(products);
})

app.get('/api/products/:productId', (req, res) => {
	const product = products.find(product => product._id === req.params.productId)
	res.json(product);
})

app.listen(port, () => {console.log(`server running in in port ${port}`)})