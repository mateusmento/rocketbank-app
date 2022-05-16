import { useCallback, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

export function Home() {
	let location = useLocation();
	let navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem("accessToken"))
			navigate("/signin");
	}, [location, navigate]);

	let signout = useCallback((e) => {
		localStorage.removeItem("accessToken");
		navigate("/signin")
	}, [navigate]);

	return (
		<div className="App">
			Bem vindo
			| <Link to="/">Home</Link>
			| <Link to="/clients">Clientes</Link>
			| <span onClick={signout}>Sair</span>
			<Outlet/>
		</div>
	);
}
