import { Box, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import reactLogo from './assets/react.svg';

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<Router>
				<div>
					<nav>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/about">About</Link>
							</li>
							<li>
								<Link to="/users">Users</Link>
							</li>
						</ul>
					</nav>

					<Routes>
						<Route path="/about" element={<About />} />
						<Route path="/users" element={<Users />} />
						<Route path="/" element={<Home />} />
					</Routes>
				</div>
			</Router>
			<Box display="flex" placeContent="center">
				<a href="https://vitejs.dev" target="_blank" rel="noreferrer">
					<img src="/vite.svg" className="logo" alt="Vite logo" />
				</a>
				<a href="https://reactjs.org" target="_blank" rel="noreferrer">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</Box>
			<h1>Vite + React</h1>
			<div className="card">
				<Button colorScheme="cyan" onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</Button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>
		</div>
	);
}
function Home() {
	return <h2>Home</h2>;
}

function About() {
	return <h2>About</h2>;
}

function Users() {
	return <h2>Users</h2>;
}
export default App;
