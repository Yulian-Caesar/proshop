import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import ProductRoutes from './routes/productRoutes.js'
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';


const port = process.env.PORT || 5000;

connectDB() // connect MongoDB
const app = express();

app.get('/', (req, res) => {
	res.send('API is running...');
})

app.use('/api/products', ProductRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {console.log(`server running in in port ${port}`)})