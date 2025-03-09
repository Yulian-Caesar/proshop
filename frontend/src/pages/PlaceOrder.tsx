import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router"
import { RootState } from "../store"
import { useEffect } from "react"
import { CheckoutSteps } from "../components/CheckoutSteps/CheckoutSteps"
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap"
import { Message } from "../components/Message/Message"
import { useCreateOrderMutation } from "../slices/ordersApiSlice"
import Loader from "../components/Loader/Loader"
import { clearCartItems } from "../slices/cartSlice"
import { toast } from "react-toastify"

export const PlaceOrder = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const cart = useSelector((state: RootState) => state.cart)
	const [createOrder, { isLoading, error }] = useCreateOrderMutation()

	const placeOrderHandler = async() => {
		try {
			const res = await createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			}).unwrap()
			dispatch(clearCartItems())
			navigate(`/order/${res._id}`)
		} catch (err) {
			toast.error(err)
		}
	}

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
				<Col md={8}>
					<ListGroup variant="flush">

						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address: </strong>
								{cart.shippingAddress.address},{' '}
								{cart.shippingAddress.city}{' '}
								{cart.shippingAddress.postalCode},{' '}
								{cart.shippingAddress.country}, 
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{cart.paymentMethod}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Orders Items</h2>
							{cart.cartItems.length === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ListGroup variant="flush">
									{cart.cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image src={item.image} alt={item.name} fluid rounded />
												</Col>
												<Col>
													<Link to={`/product/${item._id}`}>{item.name}</Link>
												</Col>
												<Col md={4}>
													{item.qty} x ${item.price} = ${item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>

					</ListGroup>
				</Col>

				<Col md={4}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Order Summary</h2>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Items:</Col>
								<Col>${cart.itemsPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Shipping:</Col>
								<Col>${cart.shippingPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Tax:</Col>
								<Col>${cart.taxPrice}</Col>
							</Row>
						</ListGroup.Item>
						<ListGroup.Item>
							<Row>
								<Col>Total:</Col>
								<Col>${cart.totalPrice}</Col>
							</Row>
						</ListGroup.Item>

						<ListGroup.Item>
							{error && <Message variant="danger">{error?.data?.message || error?.error}</Message> }
						</ListGroup.Item>

						<ListGroup.Item>
							<Button 
								type="button" 
								className="btn-block"
								disabled={cart.cartItems.length === 0}
								onClick={placeOrderHandler}
							>
								Place Order
							</Button>
							{isLoading && <Loader /> }
						</ListGroup.Item>
					</ListGroup>
				</Col>

			</Row>
		</>
	)
}