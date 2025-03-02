import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { RootState } from "../store"
import { useEffect } from "react"
import { CheckoutSteps } from "../components/CheckoutSteps/CheckoutSteps"
import { Col, Row } from "react-bootstrap"

export const PlaceOrder = () => {
	const navigate = useNavigate()
	const cart = useSelector((state: RootState) => state.cart)

	useEffect(() => {
		if(!cart.shippingAddress.address) {
			navigate('/shipping')
		} else if (!cart.paymentMethod) {
			navigate('/payment')
		}
	}, [navigate, cart.paymentMethod, cart.shippingAddress.address])

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>Column</Col>
				<Col md={4}>Column</Col>
			</Row>
		</>
	)
}