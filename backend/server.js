import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import ProductRoutes from './routes/productRoutes.js'
import UserRoutes from './routes/userRoutes.js'
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';


const port = process.env.PORT || 5000;

connectDB() // connect MongoDB
const app = express();

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.send('API is running...');
})

app.use('/api/products', ProductRoutes)
app.use('/api/users', UserRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {console.log(`server running in in port ${port}`)})