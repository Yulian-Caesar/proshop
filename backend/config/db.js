import mongoose from "mongoose";

const connectDB = async() => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI)
		console.log(`Mongo DB connected on ${conn.connection.host}`)
	} catch (error) {
		console.log(`Something wrong`)
		process.exit(1)
	}
}

export default connectDB;