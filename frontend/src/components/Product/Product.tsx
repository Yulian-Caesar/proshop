import { Card, CardTitle } from 'react-bootstrap'
import { ProductType } from './Product.type'
import { Link } from 'react-router'
import { Rating } from '../Rating/Rating'

export const Product = ({ product }: {product: ProductType}) => {
	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/product/${product._id}`}>
				<Card.Img src={product.image} variant='top' />
			</Link>

			<Card.Body>
				<Link to={`/product/${product._id}`}>
					<CardTitle as='div' className='product-title'>
						<strong>{product.name}</strong>
					</CardTitle>
				</Link>

				<Card.Text as='div'>
					<Rating value={product.rating} text={`${product.numReviews} reviews`} />
				</Card.Text>

				<Card.Text as='h3'>${product.price}</Card.Text>
			</Card.Body>

		</Card>
	)
}
