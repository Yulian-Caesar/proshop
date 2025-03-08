export type ProductType = {
	_id: string,
    name: string,
    image: string,
    description: string,
    brand: string,
    category: string,
    price: number,
    countInStock: number,
    rating: number,
    numReviews: number,
	reviews: ReviewType[]
}

type ReviewType = {
	name: string,
	comment: string,
	rating: number,
	user: string,
	createdAt: string
}