import { Route, Routes as ReactRoutes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProtectedRoute } from './components';

export function Routes() {
	return (
		<ReactRoutes>
			{
				// Public routes
			}
			<Route index path="" element={<HomePage />} />;
			<Route path="/login" element={<LoginPage />} />;
			<Route path="/register" element={<p>Register page</p>} />;
			<Route path="/jobs" element={<p>All Jobs page</p>} />;
			<Route path="/companies" element={<p>Companies page</p>} />;
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

