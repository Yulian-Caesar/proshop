import { Col, Row } from "react-bootstrap"
import { Product } from "../components/Product/Product"
import { ProductType } from "../components/Product/Product.type"
import { useEffect, useState } from "react"
import axios from "axios"

export const Home = () => {
	const [products, setProducts] = useState<ProductType[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchProducts = async() => {
			try {
				const {data} = await axios.get(`/api/products`);
				setProducts(data)
			} catch (error) {
				console.log(error)
			}
			setIsLoading(false)
		}
		fetchProducts()
	}, [])

	if(isLoading) return <h1>Loading...</h1>

	return (
		<>
			<h1>Latest Products</h1>
			<Row>
				{products.map(product => (
					<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</>
	)
}
