import { Button, Col, Row, Table } from "react-bootstrap"
import Loader from "../../components/Loader/Loader"
import { useGetProductsQuery } from "../../slices/productsApiSlice"
import { FaEdit, FaTrash } from "react-icons/fa"
import { Message } from "../../components/Message/Message"
import { Link } from "react-router"

export const ProductList = () => {
	const {data: products, isLoading, error} = useGetProductsQuery()

	const deleteHandler = (productId: string) => {
		console.log(productId)
	}

	return (
		<>
			<Row>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className="text-end">
					<Button className="btn-sm m-3">
						<FaEdit /> Create Product
					</Button>
				</Col>
			</Row>

			{isLoading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
				<>
					<Table striped hover responsive  className="table-sm">
						<thead>
							<tr>
								<td>ID</td>
								<td>NAME</td>
								<td>PRICE</td>
								<td>CATEGORY</td>
								<td>BRAND</td>
								<td></td>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.name}</td>
									<td>{product.price}</td>
									<td>{product.category}</td>
									<td>{product.brand}</td>
									<td>
										<Link to={`/admin/product/${product._id}/edit`}>
											<Button className="btn-sm mx-2" variant="light">
												<FaEdit />
											</Button>
										</Link>
										<Button className="btn-sm" variant="danger" onClick={() => deleteHandler(product._id)}>
											<FaTrash style={{color: 'white'}} />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</>
			)}
		</>
	)
}
