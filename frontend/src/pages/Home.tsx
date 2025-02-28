import { Col, Row } from "react-bootstrap"
import { Product } from "../components/Product/Product"
import { ProductType } from "../components/Product/Product.type"
//import { useEffect, useState } from "react"
//import axios from "axios"
import { useGetProductsQuery } from "../slices/productsApiSlice"
import Loader from "../components/Loader/Loader"
import { Message } from "../components/Message/Message"

export const Home = () => {
	const { data: products, isLoading, error } = useGetProductsQuery('222');

	if (isLoading) return <Loader />
	//if(error) return <div>{{error?.data?.message || error.error}}</div>
	if(error) return <Message variant="danger">{error?.data?.message || error.error}</Message>
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
