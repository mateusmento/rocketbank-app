import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { http } from "../../shared/http";


export function SignIn() {
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");
	let navigate = useNavigate();

	let signin = useCallback((e) => {
		e.preventDefault();
		http().post("/auth/signin", {email, password})
			.then(({data}) => {
				localStorage.setItem("accessToken", data.accessToken)
				navigate("/clients");
			});
	}, [email, password, navigate]);

	return (
		<form onSubmit={signin}>
			<input className="d-block" value={email} onChange={(e) => setEmail(e.target.value)}/>
			<input className="d-block" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
			<Link className="d-block" to="/signup">Criar uma nova conta</Link>
			<button type="submit">Entrar</button>
		</form>
	);
}
