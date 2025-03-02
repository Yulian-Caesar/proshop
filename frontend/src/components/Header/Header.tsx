import {Navbar, Nav, Container, Badge, NavDropdown} from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store';
import { logout } from '../../slices/authSlice'
import { useLogoutMutation } from '../../slices/usersApiSlice'

export const Header = () => {
	const { cartItems } = useSelector((state: RootState) => state.cart)
	const { userInfo } = useSelector((state: RootState) => state.auth)
	const [logoutApiCall] = useLogoutMutation()

	const dispatch = useDispatch();
	const navigate = useNavigate()

	const logoutHandler = async() => {
		try {
			await logoutApiCall().unwrap()
			dispatch(logout())
			navigate('/auth')
		} catch (err) {
			console.log(err)
		}
	}

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
							{userInfo? (
								<NavDropdown title={userInfo.name} id='username'>
									<NavDropdown.Item>
										<Link to='/profile' style={{color: 'inherit', textDecoration: 'none'}}>Profile</Link>
									</NavDropdown.Item>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<Link to='/auth' className='nav-link'><FaUser /> Sign In</Link>
							)}							
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}
