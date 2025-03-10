import { Link, useNavigate, useParams } from 'react-router'
import Loader from '../../components/Loader/Loader'
import { useEffect, useState } from 'react'
import { Message } from '../../components/Message/Message'
import { FormContainer } from '../../components/FormContainer/FormContainer'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../slices/usersApiSlice'

export const UserEdit = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [isAdmin, setIsAdmin] = useState(false)
	const { userId } = useParams()
	const navigate = useNavigate()
	const { data: user, isLoading, error, refetch} = useGetUserDetailsQuery(userId)
	const [updateUser, { isLoading: loadingUpdate}] = useUpdateUserMutation()

	useEffect(() => {
		if(user) {
			setName(user.name)
			setEmail(user.email)
			setIsAdmin(user.isAdmin)
		}
	}, [user])



	if(isLoading) return <Loader />
	if(error) return <Message variant='danger'>{error?.data?.message || error?.error}</Message>

	const updateProductHandler = async(e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		
		
		try {
			await updateUser({
				_id: userId,
				name,
				email,
				isAdmin
			})
			toast.success("Update data successfully")
			refetch()
			navigate('/admin/userlist')
		} catch (err) {
			toast.error(err?.data?.message || err?.message)
		}
	}

	return (
		<>
			<Link to='/admin/userlist' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{loadingUpdate && <Loader />}

				{isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message || error?.error}</Message> : (
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
						<Form.Group controlId='email' className='my-2'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='isAdmin' className='my-2'>
							<Form.Check
								type='checkbox'
								label='Is Admin'
								checked={isAdmin}
								onChange={(e) => setIsAdmin(Boolean(e.target.value))}
							></Form.Check>
						</Form.Group>
						
						<Button type='submit' variant='primary' className='my-2'>Update</Button>
					</Form>
				)}
			</FormContainer>
		</>
	)
}
