import { Button, Table } from 'react-bootstrap'
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router'

const UserTable = ({ users, deleteHandler }) => {
	return (
		<Table striped hover responsive  className="table-sm">
			<thead>
				<tr>
					<td>ID</td>
					<td>NAME</td>
					<td>EMAIL</td>
					<td>ADMIN</td>
					<td></td>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => (
					<tr key={user._id}>
						<td>{user._id}</td>
						<td>{user.name}</td>
						<td><a href={`mailto:${user.email}`}>{user.email}</a></td>
						<td>
							{ user.isAdmin ? (
								<FaCheck style={{color: 'green'}} />
							) : (
								<FaTimes style={{color: 'red'}} />
							)}
						</td>
						<td>
							<Link to={`/admin/user/${user._id}/edit`}>
								<Button className="btn-sm mx-2" variant="light">
									<FaEdit />
								</Button>
							</Link>
							<Button className="btn-sm" variant="danger" onClick={() => deleteHandler(user._id)}>
								<FaTrash style={{color: 'white'}} />
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}

export default UserTable