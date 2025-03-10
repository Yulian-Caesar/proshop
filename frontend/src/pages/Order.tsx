import { Link, useParams } from "react-router"
import { useDeliverOrderMutation, useGetOrderDetailsQuery, useGetPayPalClientIdQuery, usePayOrderMutation } from "../slices/ordersApiSlice";
import Loader from "../components/Loader/Loader";
import { Message } from "../components/Message/Message";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { toast } from "react-toastify";


export const Order = () => {
	const { orderId } = useParams();

	const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
	const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
	const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
	const [ { isPending }, paypalDispatch] = usePayPalScriptReducer();
	const { data: paypal, isLoading: loadingPaypal, error: errorPaypal} = useGetPayPalClientIdQuery()
	const { userInfo } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		if(!errorPaypal && !loadingPaypal && paypal?.clientId) {
			const loadPaypalScript = async() => {
				paypalDispatch({
					type: 'resetOptions',
					value: {
						'client-id': paypal?.clientId,
						currency: 'USD',
					}
				})
				paypalDispatch({ type: 'setLoadingStatus', value: 'pending'})
			}
			if(order && !order.isPaid) {
				if(!window.paypal) {
					loadPaypalScript()
				}
			}
		}
	}, [errorPaypal, loadingPaypal, paypal?.clientId, paypalDispatch, order])

	function onApprove(data, actions) {
		return actions.order.capture().then(async function (details) {
			try {
				await payOrder({orderId, details}).unwrap();
				refetch()
				toast.success("Payment successful")
			} catch (err) {
				toast.error(err?.data?.message || err?.message)
			}
		})
	}

	function onError(err) {
		toast.error(err.message)
	}

	function createOrder(data, actions) {
		return actions.order.create({
			purchase_units: [
				{
					amount: {
						value: order.totalPrice
					}
				}
			]
		}).then((orderId) => orderId)
	}

	const deliverOrderHandler = async() => {
		try {
			await deliverOrder({orderId})
			refetch()
			toast.success("Order delivered")
		} catch (err) {
			toast.error(err?.data?.message || err?.message)
		}
	}

	if(isLoading) return <Loader />
	if(error) return <Message variant="danger">{error?.data?.message || error?.error}</Message>

	return (
		<>
			<h1>Order: {order._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p><strong>Name:</strong> {order.user.name}</p>
							<p><strong>Email:</strong> {order.user.email}</p>
							<p>
								<strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}{' '} 
								{order.shippingAddress.postalCode}, {order.shippingAddress.country}
							</p>
							{order.isDelivered ? (
								<Message variant="success">
									Delivered on {order.deliveredAt}
								</Message>
							) : (
								<Message variant="danger">
									Not Delivered
								</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p><strong>Method: </strong> {order.paymentMethod}</p>
							{order.isPaid ? (
								<Message variant="success">
									Paid on {order.paidAt}
								</Message>
							) : (
								<Message variant="danger">
									Not Paid
								</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{ order.orderItems.map((item, index) => (
								<ListGroup.Item key={index}>
									<Row>
										<Col md={1}>
											<Image src={item.image} alt={item.name} fluid rounded />
										</Col>
										<Col>
											<Link to={`/product/${item.product}`}>{item.name}</Link>
										</Col>
										<Col md={4}>
											{item.qty} x ${item.price} = ${item.qty * item.price}
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup.Item>

					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${order.itemsPrice}</Col>
								</Row>
								<Row>
									<Col>Shipping</Col>
									<Col>${order.shippingPrice}</Col>
								</Row>
								<Row>
									<Col>Tax</Col>
									<Col>${order.taxPrice}</Col>
								</Row>
								<Row>
									<Col>Total</Col>
									<Col>${order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							
							{!order.isPaid && (
								<ListGroup.Item>
									{loadingPaypal && <Loader />}
									{isPending ? <Loader /> : (
										<div>
											{/*<Button onClick={onApproveTest} style={{marginBottom: '10px'}}>
												Test Pay Order
											</Button>*/}
											<div>
												<PayPalButtons
													createOrder={createOrder}
													onApprove={onApprove}
													onError={onError}
												></PayPalButtons>
											</div>
										</div>
									)}
								</ListGroup.Item>
							)}
							{loadingDeliver && <Loader />}
							{userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
								<ListGroup.Item>
								<Button 
									type="button" 
									className="btn bnt-block" 
									onClick={deliverOrderHandler}
								>Mark As Delivered</Button>
								</ListGroup.Item>
							)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}
