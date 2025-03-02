import { useEffect, useState } from "react"
import { FormContainer } from "../components/FormContainer/FormContainer"
import { CheckoutSteps } from "../components/CheckoutSteps/CheckoutSteps"
import { Button, Col, Form } from "react-bootstrap"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { savePaymentMethod } from "../slices/cartSlice"

export const Payment = () => {
	const { shippingAddress } = useSelector((state: RootState) => state.cart)

	const [paymentMethod, setPaymentMethod] = useState('PayPal');

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(savePaymentMethod(paymentMethod))
		navigate('/placeorder')
	}

	useEffect(() => {
		if(!shippingAddress) {
			navigate('/shipping')
		}
	}, [navigate, shippingAddress])

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend'>Select Method</Form.Label>
					<Col>
						<Form.Check
							type="radio"
							className="my-2"
							label="PayPal or Credit Card"
							id="PayPal"
							name="paymentMethod"
							value="PayPal"
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
					</Col>
				</Form.Group>

				<Button type="submit" variant="primary" className="my-2">Continue</Button>
			</Form>
		</FormContainer>
	)
}
