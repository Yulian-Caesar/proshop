import { Card, CardTitle } from 'react-bootstrap'
import { ProductType } from './Product.type'

export const Product = ({ product }: {product: ProductType}) => {
	return (
		<Card className='my-3 p-3 rounded'>
			<a href={`/product/${product._id}`}>
				<Card.Img src={product.image} variant='top' />
			</a>

			<Card.Body>
				<a href={`/product/${product._id}`}>
					<CardTitle as='div'>
						<strong>{product.name}</strong>
					</CardTitle>
				</a>

				<Card.Text as='h3'>${product.price}</Card.Text>
			</Card.Body>

		</Card>
	)
}
