import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Nabvar } from './components/Navbar';
import HomePage from './pages/HomePage/HomePage';

import { JobDetailPage } from './pages/JobDetailPage';

import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import { webRoutes } from './utilities/web.routes';

function App() {
	return (
		<>
			<Router>
				<Nabvar />

				<Routes>
					<Route path={webRoutes.root} element={<HomePage />} />
					<Route path={webRoutes.login} element={<SignIn />} />
					<Route path={webRoutes.register} element={<SignUp />} />
					<Route path={webRoutes.jobs + '/:id'} element={<JobDetailPage />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
