import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';
import { Nabvar } from '../components/Navbar';
import { HomePage } from '../pages/HomePage';
import { JobDetailPage } from '../pages/JobDetailPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { webRoutes } from '../utilities/web.routes';
import { ProtectedRoute } from './components';

export function Router() {
	return (
		<BrowserRouter>
			<Nabvar />

			<ReactRoutes>
				{
					// Public routes
				}
				<Route index path={webRoutes.root} element={<HomePage />} />
				<Route path={webRoutes.login} element={<LoginPage />} />
				<Route path={webRoutes.register} element={<RegisterPage />} />
				<Route path={webRoutes.jobs + '/:id'} element={<JobDetailPage />} />
				<Route path={webRoutes.companies} element={<p>Companies page</p>} />;
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
		</BrowserRouter>
	);
}
