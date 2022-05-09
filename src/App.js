import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
import Home from './pages/Home';
import Result from './pages/Result';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<DefaultLayout />}>
						<Route index element={<Home />} />
						<Route path='result' element={<Result />} />
					</Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
