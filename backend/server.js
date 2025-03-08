import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import ProductRoutes from './routes/productRoutes.js'
import UserRoutes from './routes/userRoutes.js'
import OrderRoutes from './routes/orderRoutes.js'
import UploadRoutes from './routes/uploadRoutes.js'
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';


const port = process.env.PORT || 5000;

connectDB() // connect MongoDB
const app = express();

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cookie parser middleware
app.use(cookieParser())


app.get('/', (req, res) => {
	res.send('API is running...');
})

app.use('/api/products', ProductRoutes)
app.use('/api/users', UserRoutes)
app.use('/api/orders', OrderRoutes)
app.use('/api/upload', UploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID }))

const __dirname = path.resolve() // Set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if(process.env.NODE_ENV === 'production'){
	// set static folder
	app.use(express.static(path.join(__dirname, '/frontend/dist')));

	// any route that is not api route, will be redirected to index.html
	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
	);
} else {
	app.get('/', (req, res) => {
		res.send('API is running...');
	})
}

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {console.log(`server running in in port ${port}`)})