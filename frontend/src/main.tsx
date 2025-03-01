import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store.tsx'
//import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import { Home as HomePage } from './pages/Home.tsx';
import { ProductDetail as ProductDetailPage } from './pages/ProductDetail.tsx';
import { Cart as CartPage } from './pages/Cart.tsx';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<App />}>
			<Route index={true} path='/' element={<HomePage />} />
			<Route path='/product/:productId' element={<ProductDetailPage />} />
			<Route path='/cart' element={<CartPage />} />
		</Route>,
	)
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
	<Provider store={store}>
    	<RouterProvider router={router} />
	</Provider>
  </StrictMode>,
)
