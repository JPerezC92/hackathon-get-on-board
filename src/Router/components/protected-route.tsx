import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
	redirectPath?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children: any;
}

export function ProtectedRoute(props: ProtectedRouteProps) {
	const { redirectPath = '/login' } = props;
	// From useAuth()
	// { user } => undefined, null, object
	const { user } = { user: {} };

	if (user === null) return <Navigate to={redirectPath} replace />;
	return props.children;
}

