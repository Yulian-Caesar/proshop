
import Loader from "../../components/Loader/Loader"
import { useGetOrdersQuery } from "../../slices/ordersApiSlice"
import { Message } from "../../components/Message/Message"
import { OrderTable } from "../../components/OrderTable/OrderTable"

export const OrderList = () => {
	const {data: orders, isLoading, error} = useGetOrdersQuery()

	if(isLoading) return <Loader />
	if(error) return <Message variant="danger">{error}</Message>

	return (
		<>
			<OrderTable orders={orders} />
		</>
	)
}
