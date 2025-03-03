import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import store from './store.tsx'
//import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import { Home as HomePage } from './pages/Home.tsx';
import { ProductDetail as ProductDetailPage } from './pages/ProductDetail.tsx';
import { Cart as CartPage } from './pages/Cart.tsx';
import { Login as LoginPage } from './pages/Login.tsx';
import { Register as RegisterPage } from './pages/Register.tsx';
import { Shipping as ShippingPage } from './pages/Shipping.tsx';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute.tsx';
import { Payment as PaymentPage } from './pages/Payment.tsx';
import { PlaceOrder as  PlaceOrderPage } from './pages/PlaceOrder.tsx';
import { Order as OrderPage } from './pages/Order.tsx';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<App />}>
			<Route index={true} path='/' element={<HomePage />} />
			<Route path='/product/:productId' element={<ProductDetailPage />} />
			<Route path='/cart' element={<CartPage />} />
			<Route path='/auth' element={<LoginPage />} />
			<Route path='/register' element={<RegisterPage />} />

			<Route path='' element={<PrivateRoute />}>
				<Route path='/shipping' element={<ShippingPage />} />
				<Route path='/payment' element={<PaymentPage />} />
				<Route path='/placeorder' element={<PlaceOrderPage />} />
				<Route path='/order/:orderId' element={<OrderPage />} />
			</Route>
		</Route>,
	)
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
	<Provider store={store}>
		<PayPalScriptProvider deferLoading={true}>
    		<RouterProvider router={router} />
		</PayPalScriptProvider>
	</Provider>
  </StrictMode>,
)
