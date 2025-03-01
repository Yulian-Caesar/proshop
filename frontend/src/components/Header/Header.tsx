import {Navbar, Nav, Container, Badge} from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import logo from '../../assets/logo.png'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import { RootState } from '../../store';

export const Header = () => {
	const { cartItems } = useSelector((state: RootState) => state.cart)

	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
				<Container>
					<Link to='/' className='navbar-brand'>
						<img src={logo} alt="ProShop" />
						ProShop
					</Link>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ms-auto'>
							<Link to='/cart' className='nav-link'>
								<FaShoppingCart /> Cart
								{cartItems.length > 0 && (
									<Badge pill bg='success' style={{marginLeft: '5px'}}>
										{cartItems.reduce((acc, item) => acc + +item.qty, 0)}
									</Badge>
								)}
							</Link>
							<Link to='/login' className='nav-link'><FaUser /> Sign In</Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}
