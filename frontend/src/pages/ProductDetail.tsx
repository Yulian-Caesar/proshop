import { Link, useNavigate, useParams } from "react-router"
import { Rating } from "../components/Rating/Rating";
import { Button, Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader/Loader";
import { Message } from "../components/Message/Message";
import { useState } from "react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";


export const ProductDetail = () => {
	const { productId } = useParams();
	const [qty, setQty] = useState(1);
	const { data: product, isLoading, error } = useGetProductDetailsQuery(productId)
	const dispatch = useDispatch();
	const navigate = useNavigate()

	const addToCartHandler = () => {
		dispatch(addToCart({...product, qty}))
		navigate('/cart')
	}

	if (isLoading) return <Loader />
	if(error) return <Message variant="danger">{error?.data?.message || error.error}</Message>
	if(!product) return <div>Product not found</div>

	return (
		<>
			<Link to='/' className='btn btn-light my-3'>Go Back</Link>
			<Row>
				<Col md={5}>
					<Image src={product.image} alt={product.name} fluid />
				</Col>
				<Col md={4}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h3>{product.name}</h3>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating value={product.rating} text={`${product.numReviews} reviews`} />
						</ListGroup.Item>
						<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
						<ListGroup.Item>Description: ${product.description}</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<Row>
									<Col>Price:</Col>
									<Col><strong>${product.price}</strong></Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Status:</Col>
									<Col><strong>
										{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
									</strong></Col>
								</Row>
							</ListGroup.Item>

							{product.countInStock > 0 && (
								<ListGroup.Item>
									<Row>
										<Col>Qty</Col>
										<Form.Control
											as='select'
											value={qty}
											onChange={(e) => setQty(+e.target.value)}
										>
											{Array.from({ length: product.countInStock }, (_, i) => i + 1).map(x => (
												<option key={x} value={x}>{x}</option>
											))}
										</Form.Control>
									</Row>
								</ListGroup.Item>
							)}

							<ListGroup.Item>
								<Button 
									className='btn-block' 
									type='button' 
									disabled={product.countInStock === 0}
									onClick={addToCartHandler}
								>
									Add To Cart
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}
