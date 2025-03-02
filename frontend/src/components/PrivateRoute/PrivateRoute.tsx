import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Navigate, Outlet } from 'react-router'

export const PrivateRoute = () => {
	const { userInfo } = useSelector((state: RootState) => state.auth)
	
	return userInfo ? <Outlet /> : <Navigate to='/auth' replace />
	
}
