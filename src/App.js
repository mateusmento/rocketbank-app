import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignIn } from './views/signin/SignIn';
import { Clients } from './views/client/Clients';
import { SignUp } from './views/signup/SignUp';
import { useCallback, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home } from './views/home/Home';
import jwtDecode  from 'jwt-decode';

export function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/signin" element={<SignIn/>}/>
				<Route path="/signup" element={<SignUp/>}/>
				<Route element={<Root/>}>
					<Route path="/" element={<Home/>}/>
					<Route path="/clients" element={<Clients/>}/>
					<Route path="*" element={
						<main style={{ padding: "1rem" }}>
							<p>Página não encontrada.</p>
						</main>
					}/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export function Root() {
	let location = useLocation();
	let navigate = useNavigate();

	let signout = useCallback((e) => {
		localStorage.removeItem("accessToken");
		navigate("/signin")
	}, [navigate]);

	let verifyAccessToken = useCallback((token) => {
		if (!token) navigate("/signin");
		let signoutTimeout = token.exp * 1000 - new Date().getTime();
		setTimeout(signout, signoutTimeout);
	}, [navigate, signout]);

	useEffect(() => {
		let token = localStorage.getItem("accessToken");
		verifyAccessToken(token && jwtDecode(token))
	}, [location, navigate, verifyAccessToken]);

	return (
		<div className="App">
			| <Link to="/">Home</Link>
			| <Link to="/clients">Clientes</Link>
			| <span onClick={signout}>Sair</span>
			<Outlet/>
		</div>
	);
}
