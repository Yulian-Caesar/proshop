import { FaTrash } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router"
import { RootState } from "../store";
import { Button, Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { Message } from "../components/Message/Message";
import { addToCart } from "../slices/cartSlice";
import { ProductType } from "../components/Product/Product.type";

export const Cart = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cart = useSelector((state: RootState) => state.cart);
	const { cartItems } = cart;

	const addToCartHandler = (product: ProductType, qty: number) => {
		dispatch(addToCart({...product, qty}))
	}

	return (
		<Row>
			<Col md={8}>
				<h1 style={{marginBottom: '20px'}}>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message>Your cart is empty <Link to='/'>Go Back</Link></Message>
				) : (
					<ListGroup variant="flush">
						{cartItems.map(item => (
							<ListGroup.Item key={item._id}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={4}>
										<Link to={`/product/${item._id}`}>{item.name}</Link>
									</Col>
									<Col md={2}>${item.price}</Col>
									<Col md={2}>
										<Form.Control 
											as='select' 
											value={item.qty}
											onChange={(e) => addToCartHandler(item, +(e.target.value))}
										>
											{Array.from({ length: item.countInStock }, (_, i) => i + 1).map(x => (
												<option key={x} value={x}>{x}</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button type="button" variant="light">
											<FaTrash />
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Subtotal ({ cartItems.reduce((acc, item) => acc + item.qty, 0) }) items</h2>
							${cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0).toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button 
								type="button" 
								className="btn-block" 
								disabled={cartItems.length === 0}
							>
								Proceed To Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	)
}
