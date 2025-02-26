import { Link, useParams } from "react-router"
import { Rating } from "../components/Rating/Rating";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ProductType } from "../components/Product/Product.type";
import axios from "axios";


export const ProductDetail = () => {
	const [product, setProduct] = useState<ProductType | null>(null)
	const [isLoading, setLoading] = useState(true)
	const {productId} = useParams();
	//const product = products.find(product => product._id === productId)

	useEffect(() => {
		const fetchProduct = async() => {
			try {
				const {data} = await axios.get(`/api/products/${productId}`)
				setProduct(data)
			} catch (error) {
				console.log(error)
			}
			setLoading(false)
		}
		fetchProduct()
	}, [productId])

	if (isLoading) return <h2>Loadign...</h2>
	if (!product) return <h2>Product not found</h2>

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
							<ListGroup.Item>
								<Button className='btn-block' type='button' disabled={product.countInStock === 0}>Add To Cart</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}
