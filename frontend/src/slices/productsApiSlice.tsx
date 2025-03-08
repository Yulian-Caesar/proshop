import { ProductType } from "../components/Product/Product.type";
import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: ({ pageNumber }) => ({
				url: PRODUCT_URL,
				params: {
					pageNumber
				}
			}),
			//providesTags: ['Products'],
			keepUnusedDataFor: 5,
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
		}),
		udpateProduct: builder.mutation({
			query: (data) => ({
				url: `${PRODUCT_URL}/${data._id}`,
				method: 'PUT',
				body: data 
			}),
			//invalidatesTags: ['Products']
		}),
		uploadProductImage: builder.mutation({
			query: (data) => ({
				url: UPLOAD_URL,
				method: 'POST',
				body: data 
			})
		}),
		deleteProduct: builder.mutation({
			query: (productId) => ({
				url: `${PRODUCT_URL}/${productId}`,
				method: 'DELETE'
			})
		}),
		createReview: builder.mutation({
			query: (data) => ({
				url: `${PRODUCT_URL}/${data._id}/reviews`,
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['Product']
		}),
	})
})

export const { 
	useGetProductsQuery, 
	useGetProductDetailsQuery, 
	useCreateProductMutation, 
	useUdpateProductMutation,
	useUploadProductImageMutation,
	useDeleteProductMutation,
	useCreateReviewMutation
} = productsApiSlice