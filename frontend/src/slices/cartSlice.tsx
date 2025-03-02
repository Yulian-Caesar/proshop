import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../components/Product/Product.type";
import { updateCart } from "../utils/cartUtils";

export type CartItemType = ProductType & {
	qty: number;
};

export type CartStateType = {
	cartItems: CartItemType[];
	shippingAddress: {
		address: string,
		city: string,
		postalCode: string,
		country: string,
	};
	paymentMethod: string;
	itemsPrice: number;
	shippingPrice: number;
	taxPrice: number;
	totalPrice: number;
};

const initialState: CartStateType = localStorage.getItem('cart') 
	? JSON.parse(localStorage.getItem('cart') as string) 
	: {
		cartItems: [],
		shippingAddress: {
			address: '',
			city: '',
			postalCode: '',
			country: '',
		},
		paymentMethod: 'Paypal',
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
		},
		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter(item => item._id !== action.payload)
			return updateCart(state)
		},
		saveShippingAddress: (state, action) => {
			state.shippingAddress = action.payload;
			return updateCart(state)
		},
		savePaymentMethod: (state, action) => {
			state.paymentMethod = action.payload;
			return updateCart(state)
		}
	}
})

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod } = cartSlice.actions;

export default cartSlice.reducer;