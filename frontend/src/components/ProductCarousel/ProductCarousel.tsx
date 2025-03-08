import { Carousel, Image } from "react-bootstrap"
import { useGetTopProductsQuery } from "../../slices/productsApiSlice"
import Loader from "../Loader/Loader"
import { Message } from "../Message/Message"
import { Link } from "react-router"
import { ProductType } from "../Product/Product.type"


export const ProductCarousel = () => {
	const {data: products, isLoading, error} = useGetTopProductsQuery()

	return isLoading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
		<Carousel pause="hover" className="bg-primary mb-4">
			{products.map((product: ProductType) => (
				<Carousel.Item key={product._id}>
					<Link to={`/product/${product._id}`}>
						<Image src={product.image} alt={product.name} fluid />
						<Carousel.Caption className="carousel-caption">
							<h2>{product.name} (${product.price})</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	)
}
