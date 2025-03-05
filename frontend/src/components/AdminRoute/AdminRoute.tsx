import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Navigate, Outlet } from 'react-router'

export const AdminRoute = () => {
	const { userInfo } = useSelector((state: RootState) => state.auth)
	
	return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to='/auth' replace />
	
}
