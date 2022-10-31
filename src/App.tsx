
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Nabvar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { JobDetailPage } from './pages/JobDetailPage';
import { LoginPage } from './pages/LoginPage';


function App() {

	return (
		<>
			<Router>
				<Nabvar />

				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/jobs/:id" element={<JobDetailPage />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;

