import { BrowserRouter, Route, Routes as ReactRoutes } from 'react-router-dom';
import { Nabvar } from '../components/Navbar';
import { HomePage } from '../pages/HomePage';
import { JobDetailPage } from '../pages/JobDetailPage';
import { LoginPage } from '../pages/LoginPage';
import MyAccount from '../pages/myAccount/MyAccount';
import Recover from '../pages/recover/Recover';
import { RegisterPage } from '../pages/RegisterPage';
import SignIn from '../pages/signIn/SignIn';
import SignUp from '../pages/signUp/SignUp';
import { webRoutes } from '../utilities/web.routes';
import { OnlyGuestRoute, ProtectedRoute } from './components';

export function Router() {
	return (
		<BrowserRouter>
			<Nabvar />

			<ReactRoutes>
				{
					// Public routes
				}
				<Route index path={webRoutes.root} element={<HomePage />} />
				<Route path={webRoutes.login} element={<OnlyGuestRoute><SignIn /></OnlyGuestRoute>} />
				<Route path={webRoutes.register} element={<OnlyGuestRoute><SignUp /></OnlyGuestRoute>} />
				<Route path={webRoutes.register} element={<OnlyGuestRoute><Recover /></OnlyGuestRoute>} />
				<Route path={webRoutes.jobs + '/:id'} element={<JobDetailPage />} />
				<Route path={webRoutes.companies} element={<p>Companies page</p>} />;
				{
					// Protected routes
				
				}
				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<MyAccount/>
						</ProtectedRoute>

					}
				/>
			</ReactRoutes>
		</BrowserRouter>
	);
}
