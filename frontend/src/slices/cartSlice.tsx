import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../components/Product/Product.type";
import { updateCart } from "../utils/cartUtils";

export type CartItemType = ProductType & {
	qty: number;
};

export type CartStateType = {
	cartItems: CartItemType[];
	itemsPrice: number;
	shippingPrice: number;
	taxPrice: number;
	totalPrice: number;
};

const initialState: CartStateType = localStorage.getItem('cart') 
	? JSON.parse(localStorage.getItem('cart') as string) 
	: {
		cartItems: [],
		itemsPrice: 0,
		shippingPrice: 0,
		taxPrice: 0,
		totalPrice: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const item = action.payload;

			const existItem = state.cartItems.find(x => x._id === item._id)

			if(existItem) {
				state.cartItems = state.cartItems.map(x => x._id === existItem._id ? item : x)
				existItem.qty += 1
			} else {
				state.cartItems = [...state.cartItems, item]
			}

			return updateCart(state)
		}
	}
})

export const {addToCart} = cartSlice.actions;

export default cartSlice.reducer;