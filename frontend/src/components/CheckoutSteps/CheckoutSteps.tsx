import { Nav } from "react-bootstrap"
import { Link } from "react-router"


export const CheckoutSteps = ({ step1 = false, step2 = false, step3 = false, step4 = false }) => {
	return (
		<Nav className="justify-content-center mb-4">
			<Nav.Item>
				<Nav.Link as={Link} to="/auth" disabled={!step1}>Sign In</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link as={Link} to="/shipping" disabled={!step2}>Shipping</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link as={Link} to="/payment" disabled={!step3}>Payment</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link as={Link} to="/placeorder" disabled={!step4}>Place Order</Nav.Link>
			</Nav.Item>
		</Nav>
	)
}
