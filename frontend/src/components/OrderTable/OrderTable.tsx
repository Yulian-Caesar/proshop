import { Button, Table } from "react-bootstrap"
import { FaTimes } from "react-icons/fa"
import { Link } from "react-router"

export const OrderTable = ({ orders, showUserColumn = true }) => {
	return (
		<Table striped hover responsive  className="table-sm">
			<thead>
				<tr>
					<td>ID</td>
					{showUserColumn && <td>USER</td>}
					<td>DATE</td>
					<td>TOTAL</td>
					<td>PAID</td>
					<td>DELIVERED</td>
					<td></td>
				</tr>
			</thead>
			<tbody>
				{orders.map((order) => (
					<tr key={order._id}>
						<td>{order._id}</td>
						{showUserColumn && <td>{order.user && order.user.name}</td>}
						<td>{order.createdAt.substring(0, 10)}</td>
						<td>${order.totalPrice}</td>
						<td>
							{ order.isPaid ? (
								order.paidAt.substring(0, 10)
							) : (
								<FaTimes style={{color: 'red'}} />
							)}
						</td>
						<td>
							{ order.isDelivered ? (
								order.deliveredAt.substring(0, 10)
							) : (
								<FaTimes style={{color: 'red'}} />
							)}
						</td>
						<td>
							<Link to={`/order/${order._id}`}>
								<Button className="btn-sm" variant="light">Details</Button>
							</Link>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}
