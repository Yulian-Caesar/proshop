import { useEffect, useState } from "react"
import { FormContainer } from "../components/FormContainer/FormContainer"
import { Button, Col, Form, Row } from "react-bootstrap"
import { Link, useLocation, useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { useRegisterMutation } from "../slices/usersApiSlice"
import { RootState } from "../store"
import { setCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"
import Loader from "../components/Loader/Loader"


export const Register = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [register, { isLoading }] = useRegisterMutation()

	const { userInfo } = useSelector((state: RootState) => state.auth);

	const { search } = useLocation()
	const searchParam = new URLSearchParams(search)
	const redirect = searchParam.get('redirect') || '/';

	useEffect(() => {
		if(userInfo) {
			navigate(redirect)
		}
	}, [userInfo, redirect, navigate])

	const submitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if(password !== confirmPassword) {
			return toast.error("Passwords do not match")
		}

		try {
			const res = await register({name, email, password}).unwrap();
			dispatch(setCredentials({ ...res }))
			navigate(redirect)
		} catch (err) {
			toast.error(err?.data?.message || err.error)
		}
		console.log('submit')
	}
	
	return (
		<FormContainer>
			<h1>Sign Up</h1>

			<Form onSubmit={submitHandler}>
				<Form.Group controlId="name" className="my-3">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="email" className="my-3">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="password" className="my-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Enter password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="confirmPassword" className="my-3">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>Register</Button>

				{ isLoading && <Loader />}
			</Form>

			<Row className="py-3">
				<Col>
					Already have an account? <Link to={redirect ? `/auth?redirect=${redirect}`: '/auth'}>Login</Link>
				</Col>
			</Row>

		</FormContainer>
	)
}
