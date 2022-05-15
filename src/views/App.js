import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
	let location = useLocation();
	let navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem("accessToken"))
			navigate("/signin");
	}, [location, navigate]);

	return (
		<div className="App">
			Welcome
			<Outlet/>
		</div>
	);
}

export default App;
