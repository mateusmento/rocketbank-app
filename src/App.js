import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignIn } from './views/signin/SignIn';
import { Clients } from './views/client/Clients';
import { SignUp } from './views/signup/SignUp';
import { Home } from './views/home/Home';

export function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/signin" element={<SignIn/>}/>
				<Route path="/signup" element={<SignUp/>}/>
				<Route path="/" element={<Home/>}>
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
