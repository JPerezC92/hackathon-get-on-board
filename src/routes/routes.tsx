import { Route, Routes as ReactRoutes } from 'react-router-dom';
import { ProtectedRoute } from './components';

export function Routes() {
	return (
		<ReactRoutes>
			{
				// Public routes
			}
			<Route index path="" element={<p>Home page</p>} />;
			<Route path="/login" element={<p>Login page</p>} />;
			<Route path="/register" element={<p>Register page</p>} />;
			<Route path="/jobs" element={<p>All Jobs page</p>}></Route>;
			<Route path="/companies" element={<p>Companies page</p>}></Route>
			{
				// Protected routes
			}
			<Route
				path="/profile"
				element={
					<ProtectedRoute>
						<p>My protected profile</p>
					</ProtectedRoute>
				}
			/>
		</ReactRoutes>
	);
}

