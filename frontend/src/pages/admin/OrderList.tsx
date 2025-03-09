
import Loader from "../../components/Loader/Loader"
import { useGetOrdersQuery } from "../../slices/ordersApiSlice"
import { Message } from "../../components/Message/Message"
import { OrderTable } from "../../components/OrderTable/OrderTable"

export const OrderList = () => {
	const {data: orders, isLoading, error} = useGetOrdersQuery()

	if(isLoading) return <Loader />
	if(error) return <Message variant="danger">{error?.data?.message || error?.error}</Message>

	return (
		<>
			<h1>Order List</h1>
			<OrderTable orders={orders} />
		</>
	)
}
