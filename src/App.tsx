import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Nabvar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { JobDetailPage } from './pages/JobDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { webRoutes } from './utilities/web.routes';

function App() {
	return (
		<>
			<Router>
				<Nabvar />

				<Routes>
					<Route path={webRoutes.root} element={<HomePage />} />
					<Route path={webRoutes.login} element={<LoginPage />} />
					<Route path={webRoutes.register} element={<RegisterPage />} />
					<Route path={webRoutes.jobs + '/:id'} element={<JobDetailPage />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
