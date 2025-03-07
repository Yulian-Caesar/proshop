import { ProductType } from "../components/Product/Product.type";
import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => ({
				url: PRODUCT_URL
			}),
			keepUnusedDataFor: 5
		}),
		getProductDetails: builder.query<ProductType, string>({
			query: (productId) => ({
				url: `${PRODUCT_URL}/${productId}`
			}),
			keepUnusedDataFor: 5
		}),
		createProduct: builder.mutation({
			query: () => ({
				url: PRODUCT_URL,
				method: 'POST'
			}),
			invalidatesTags: ['Product']
		})
	})
})

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation } = productsApiSlice