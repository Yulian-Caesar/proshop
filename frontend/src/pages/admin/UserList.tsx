import Loader from "../../components/Loader/Loader"
import { Message } from "../../components/Message/Message"
import { useDeleteUserMutation, useGetUsersQuery } from "../../slices/usersApiSlice"
import UserTable from "../../components/UserTable/UserTable"
import { toast } from "react-toastify"

export const UserList = () => {
	const {data: users, refetch, isLoading, error} = useGetUsersQuery()
	const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation()

	const deleteHandler = async(userId: string) => {
		if(window.confirm("Are you sure you want to delete user?")) {
			try {
				await deleteUser(userId)
				toast.success("User deleted")
				refetch()
			} catch (err) {
				toast.error(err?.data?.message || err?.message)
			}
		}
	}

	return (
		<>
			<h1>Users List</h1>
			{loadingDelete && <Loader />}

			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<UserTable users={users} deleteHandler={deleteHandler} />
			)}
		</>
	)
}