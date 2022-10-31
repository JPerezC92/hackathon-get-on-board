
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Nabvar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';


function App() {

	return (
		<>
			<Router>
				<Nabvar />

				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;

