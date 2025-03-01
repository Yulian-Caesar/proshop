import { CartItemType, CartStateType } from "../slices/cartSlice"

export const updateCart = (state: CartStateType) => {
	// Calculate items price
	state.itemsPrice = +state.cartItems.reduce((acc: number, item: CartItemType) => {
		return acc + (item.price * item.qty)
	}, 0).toFixed(2)

	// Calculate shipping price (If order is over $100 than free, else $10 shipping)
	state.shippingPrice = state.itemsPrice > 100 ? 0 : 10

	// Calculate tax price (15% tax)
	state.taxPrice = +(0.15 * state.itemsPrice).toFixed(2)

	// Calculate total price
	state.totalPrice = +(state.itemsPrice + state.shippingPrice + state.taxPrice).toFixed(2)

	localStorage.setItem("cart", JSON.stringify(state))

	return state;
}