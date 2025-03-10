import { Link, useNavigate, useParams } from "react-router"
import { Rating } from "../components/Rating/Rating";
import { Button, Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { useCreateReviewMutation, useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader/Loader";
import { Message } from "../components/Message/Message";
import { FormEvent, useState } from "react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toast } from "react-toastify";
import { Meta } from "../components/Meta/Meta";


export const ProductDetail = () => {
	const { id: productId } = useParams();
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');
	const { data: product, refetch, isLoading, error } = useGetProductDetailsQuery(productId)
	const [createReview, { isLoading: loadingProductReview } ] = useCreateReviewMutation()
	const { userInfo } = useSelector((state: RootState) => state.auth)
	const dispatch = useDispatch();
	const navigate = useNavigate()

	const addToCartHandler = () => {
		dispatch(addToCart({...product, qty}))
		navigate('/cart')
	}

	const submitHandler = async(e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		
		try {
			await createReview({
				_id: productId,
				rating,
				comment
			}).unwrap()
			refetch()
			toast.success("Review Submitted")
			setRating(0)
			setComment('')
		} catch (err) {
			toast.error(err?.data?.message || err?.message)
		}
	}

	if(!product) return <div>Product not found</div>

	return (
		<>
			<Link to='/' className='btn btn-light my-3'>Go Back</Link>
			{isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message || error?.error}</Message> : (
				<>
					<Meta title={product.name} />
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
					<Row className="review">
						<Col md={6}>
							<h2>Reviews</h2>
							{product.reviews.length === 0 && <Message>No Reviews</Message>}
							<ListGroup variant="flush">
								{product.reviews.map(review => (
									<ListGroup.Item key={review.user}>
										<strong>{review.name}</strong>
										<Rating value={review.rating} />
										<p>{review.createdAt.substring(0, 10)}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>Write a Customer Review</h2>
									{loadingProductReview && <Loader />}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId="rating" className="my-2">
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as='select'
													value={rating}
													onChange={(e) => setRating(+e.target.value)}
												>
													<option value=''>Select...</option>
													<option value='1'>1 - Poor</option>
													<option value='2'>2 - Fair</option>
													<option value='3'>3 - Good</option>
													<option value='4'>4 - Very Good</option>
													<option value='5'>5 - Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId="comment" className="my-2">
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as='textarea'
													value={comment}
													onChange={(e) => setComment(e.target.value)}
												></Form.Control>
											</Form.Group>
											<Button
												disabled={loadingProductReview}
												type="submit"
												variant="primary"
											>Submit</Button>
										</Form>
									) : (
										<Message>
											Please <Link to='/auth'>sign in</Link> to write a review
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	)
}
