import Loader from "../../components/Loader/Loader"
import { Message } from "../../components/Message/Message"
import { useGetUsersQuery } from "../../slices/usersApiSlice"
import UserTable from "../../components/UserTable/UserTable"

export const UserList = () => {
	const {data: users, refetch, isLoading, error} = useGetUsersQuery()

	const deleteHandler = async(id: string) => {
		console.log('delete')
	}

	if(isLoading) return <Loader />
	if(error) return <Message variant="danger">{error}</Message>

	return (
		<>
			<h1>Users List</h1>
			<UserTable users={users} deleteHandler={deleteHandler} />
		</>
	)
}