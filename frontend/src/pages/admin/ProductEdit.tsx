import { Link, useNavigate, useParams } from 'react-router'
import { useGetProductDetailsQuery, useUdpateProductMutation } from '../../slices/productsApiSlice'
import Loader from '../../components/Loader/Loader'
import { useEffect, useState } from 'react'
import { Message } from '../../components/Message/Message'
import { FormContainer } from '../../components/FormContainer/FormContainer'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'

export const ProductEdit = () => {
	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [image, setImage] = useState('')
	const [brand, setBrand] = useState('')
	const [category, setCategory] = useState('')
	const [countInStock, setCountInStock] = useState(0)
	const [description, setDescription] = useState('')

	const { productId } = useParams()
	const navigate = useNavigate()
	const { data: product, isLoading, error, refetch} = useGetProductDetailsQuery(productId)
	const [updateProduct, { isLoading: loadingUpdate}] = useUdpateProductMutation()

	useEffect(() => {
		if(product) {
			setName(product.name)
			setPrice(product.price)
			setImage(product.image)
			setBrand(product.brand)
			setCategory(product.category)
			setCountInStock(product.countInStock)
			setDescription(product.description)
		}
	}, [product])



	if(isLoading) return <Loader />
	if(error) return <Message variant='danger'>{error}</Message>

	const updateProductHandler = async(e) => {
		e.preventDefault()
		const updatedProduct = {
			_id: productId,
			name,
			price,
			image,
			brand,
			category,
			countInStock,
			description
		}
		
		const result = await updateProduct(updatedProduct)
		if(result.error) {
			toast.error(result.error)
		} else {
			toast.success("Product updated")
			navigate('/admin/productlist')
		}

	}

	return (
		<>
			<Link to='/admin/productlist' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{loadingUpdate && <Loader />}

				{isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
					<Form onSubmit={updateProductHandler}>
						<Form.Group controlId='name' className='my-2'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='price' className='my-2'>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter price'
								value={price}
								onChange={(e) => setPrice(+e.target.value)}
							></Form.Control>
						</Form.Group>
						{/* Image Input placeholder */}
						<Form.Group controlId='brand' className='my-2'>
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter brand'
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='countInStock' className='my-2'>
							<Form.Label>Count In Stock</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter count In Stock'
								value={countInStock}
								onChange={(e) => setCountInStock(+e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='category' className='my-2'>
							<Form.Label>Category</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter category'
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='description' className='my-2'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter description'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Button type='submit' variant='primary' className='my-2'>Update</Button>
					</Form>
				)}
			</FormContainer>
		</>
	)
}
