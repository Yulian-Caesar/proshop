
//const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';
const BASE_URL = ''; // because we use proxy
const PRODUCT_URL = '/api/products';
const USERS_URL = '/api/users';
const ORDERS_URL = '/api/orders';
const PAYPAL_URL = '/api/config/paypal';

export {
	BASE_URL,
	PRODUCT_URL,
	USERS_URL,
	ORDERS_URL,
	PAYPAL_URL,
}