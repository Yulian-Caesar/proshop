import { Button, Col, Row, Table } from "react-bootstrap"
import Loader from "../../components/Loader/Loader"
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from "../../slices/productsApiSlice"
import { FaEdit, FaTrash } from "react-icons/fa"
import { Message } from "../../components/Message/Message"
import { Link, useParams } from "react-router"
import { toast } from "react-toastify"
import Paginate from "../../components/Paginate/Paginate"

export const ProductList = () => {
	const { pageNumber } = useParams()
	const {data: data, isLoading, error, refetch} = useGetProductsQuery({ pageNumber })
	const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation()
	const [deleteProduct, { isLoading: loadingDelete}] = useDeleteProductMutation()

	const createProductHandler = async() => {
		if(window.confirm("Are you sure you want to create a new product?")) {
			try {
				await createProduct()
				refetch()
			} catch (err) {
				toast.error(err?.data?.message || err.error)
			}
		}
	}

	const deleteHandler = async(productId: string) => {
		if(window.confirm("Are you sure you want to delete that product?")) {
			try {
				await deleteProduct(productId)
				toast.success("Product deleted successfully")
				refetch()
			} catch (err) {
				toast.error(err?.data?.message || err.error)
			}
		}
	}

	return (
		<>
			<Row>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className="text-end">
					<Button className="btn-sm m-3" onClick={createProductHandler}>
						<FaEdit /> Create Product
					</Button>
				</Col>
			</Row>
			{loadingCreate && <Loader />}
			{loadingDelete && <Loader />}
			{isLoading ? <Loader /> : error ? <Message variant="danger">{error?.data?.message || error?.error}</Message> : (
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
							{data.products.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.name}</td>
									<td>${product.price}</td>
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
					<Paginate pages={data.pages} page={data.page} isAdmin={true} />
				</>
			)}
		</>
	)
}
