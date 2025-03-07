import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { useProfileMutation } from "../slices/usersApiSlice"
import { useEffect, useState } from "react"
import { Button, Col, Form, Row, Table } from "react-bootstrap"
import Loader from "../components/Loader/Loader"
import { toast } from "react-toastify"
import { setCredentials } from "../slices/authSlice"
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice"
import { Message } from "../components/Message/Message"
import { FaTimes } from "react-icons/fa"
import { Link } from "react-router"
import { OrderTable } from "../components/OrderTable/OrderTable"

export const Profile = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const { userInfo } = useSelector((state: RootState) => state.auth)
	const dispatch = useDispatch()

	const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation()
	const { data: orders, isLoading: loadingOrders, error: errorOrders } = useGetMyOrdersQuery();

	const submitHandler = async(e) => {
		e.preventDefault()

		if(password !== confirmPassword) return toast.error("Password do not match")

		try {
			const res = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap()
			dispatch(setCredentials(res))
			toast.success("Profile updated successfully")
		} catch (err) {
			toast.error(err?.data?.message || err?.error)
		}
	}


	useEffect(() => {
		if(userInfo) {
			setName(userInfo.name)
			setEmail(userInfo.email)
		}
	}, [userInfo])
	

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>

				<Form onSubmit={submitHandler}>
					<Form.Group controlId="name" className="my-2">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="name"
							placeholder="Enter name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="email" className="my-2">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="password" className="my-2">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="confirmPassword" className="my-2">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Button type="submit" variant="primary" className="my-2">Update</Button>
					{ loadingUpdateProfile && <Loader />}
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
				{loadingOrders ? <Loader /> : errorOrders ? (
					<Message variant="danger">{errorOrders?.data?.message || errorOrders.error || 'Something wrong'}</Message>
				) : (
					<OrderTable orders={orders} showUserColumn={false} />
				)}
			</Col>
		</Row>
	)
}
