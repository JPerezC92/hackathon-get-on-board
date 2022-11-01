import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

interface ProtectedRouteProps {
	redirectPath?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children: any;
}

export function ProtectedRoute(props: ProtectedRouteProps) {
	const { redirectPath = '/login' } = props;
	// From useAuth()
	// { user } => undefined, null, object
	const { user } = useAuth();
	console.log(user)

	if (user === null) return <Navigate to={redirectPath} replace />;
	return props.children;
}

export function OnlyGuestRoute(props: ProtectedRouteProps) {
	const { redirectPath = '/' } = props;
	const { user } = useAuth();
	console.log(user)

	if (user !== null) return <Navigate to={redirectPath} replace />;
	return props.children;
}