import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import ProductRoutes from './routes/productRoutes.js'
import connectDB from './config/db.js';


const port = process.env.PORT || 5000;

connectDB() // connect MongoDB
const app = express();

app.get('/', (req, res) => {
	res.send('API is running...');
})

app.use('/api/products', ProductRoutes)

app.listen(port, () => {console.log(`server running in in port ${port}`)})