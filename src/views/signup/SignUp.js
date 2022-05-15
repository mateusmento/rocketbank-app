import axios from "axios";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../../config";

const http = axios.create({baseURL: BASE_API_URL});

export function SignUp() {
	let [name, setName] = useState("");
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");
	let navigate = useNavigate();

	let signup = useCallback((e) => {
		e.preventDefault();
		http.post("/users", {name, email, password})
			.then(({data}) => navigate("/signin"));
	}, [name, email, password, navigate]);

	return (
		<form onSubmit={signup}>
			<input className="d-block" value={name} onChange={(e) => setName(e.target.value)}/>
			<input className="d-block" value={email} onChange={(e) => setEmail(e.target.value)}/>
			<input className="d-block" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
			<Link className="d-block" to="/signin">Já tenho uma conta</Link>
			<button type="submit">Criar</button>
		</form>
	);
}
