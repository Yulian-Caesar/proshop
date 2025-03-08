import { Col, Row } from "react-bootstrap"
import { Product } from "../components/Product/Product"
import { useGetProductsQuery } from "../slices/productsApiSlice"
import Loader from "../components/Loader/Loader"
import { Message } from "../components/Message/Message"
import { Link, useParams } from "react-router"
import Paginate from "../components/Paginate/Paginate"
import { ProductCarousel } from "../components/ProductCarousel/ProductCarousel"
import { ProductType } from "../components/Product/Product.type"
import { Meta } from "../components/Meta/Meta"

export const Home = () => {
	const { pageNumber, keyword } = useParams()
	const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });

	if (isLoading) return <Loader />
	//if(error) return <div>{{error?.data?.message || error.error}}</div>
	if(error) return <Message variant="danger">{error?.data?.message || error.error}</Message>
	return (
		<>
			{ !keyword ? <ProductCarousel /> : <Link to='/' className="btn btn-light mb-4">Go Back</Link>}
			<Meta title="Welcome to Proshop" />
			<h1>Latest Products</h1>
			<Row>
				{data.products.map((product: ProductType) => (
					<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
						<Product product={product} />
					</Col>
				))}
			</Row>
			<Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
		</>
	)
}
