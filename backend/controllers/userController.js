import asyncHandler from "../middleware/asyncHandler.js";
import User  from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc	Auth user & get token
// @route	POST /api/users/auth
// @access	Public
const authUser = asyncHandler(async(req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email })

	if(user && ( await user.matchPassword(password) )) {
		generateToken(res, user._id)

		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin
		})
	} else {
		res.status(401)
		throw new Error("Invalid email or password")
	}
})

// @desc	Register user
// @route	POST /api/users
// @access	Public
const registerUser = asyncHandler(async(req, res) => {
	const { name, email, password } = req.body;

	const userExist = await User.findOne({email})

	if(userExist) {
		res.status(400)
		throw new Error('User already exist')
	} 

	const user = await User.create({
		email,
		name,
		password
	})

	if(user) {
		generateToken(res, user._id)

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin
		})
	} else {
		res.status(400)
		throw new Error("Invalid user data")
	}
})

// @desc	Logout user / clear cookie
// @route	POST /api/users/logout
// @access	Private
const logoutUser = asyncHandler(async(req, res) => {
	// Clear cookie
	res.cookie('jwt', '', {
		httpOnly: true,
		expires: new Date(0)
	})

	res.status(200).json({ message: 'Logged out successfully'})
})

// @desc	Get user profile
// @route	GET /api/users/profile
// @access	Private
const getUserProfile = asyncHandler(async(req, res) => {
	res.send('get user profile')
})

// @desc	Update user profile
// @route	PUT /api/users/profile
// @access	Private
const updateUserProfile = asyncHandler(async(req, res) => {
	res.send('update user profile')
})

// @desc	Get users
// @route	GET /api/users
// @access	Private/Admin
const getUsers = asyncHandler(async(req, res) => {
	res.send('get users')
})

// @desc	Get user by ID
// @route	GET /api/users/:id
// @access	Private/Admin
const getUserById = asyncHandler(async(req, res) => {
	res.send('get user by ID')
})

// @desc	Delete user
// @route	DELETE /api/users/:id
// @access	Private/Admin
const deleteUser = asyncHandler(async(req, res) => {
	res.send('delete user')
})

// @desc	Update user
// @route	PUT /api/users/:id
// @access	Private/Admin
const updateUser = asyncHandler(async(req, res) => {
	res.send('update user')
})

export {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	getUserById,
	deleteUser,
	updateUser
}