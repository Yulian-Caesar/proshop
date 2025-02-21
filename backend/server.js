import express from 'express';
import { products } from './data/products.js';
const port = 5000;

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