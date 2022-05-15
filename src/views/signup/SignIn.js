import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../../config";

const http = axios.create({baseURL: BASE_API_URL});

export function SignIn() {
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");
	let navigate = useNavigate();

	let signin = useCallback((e) => {
		e.preventDefault();
		http.post("/auth/signin", {username: email, password})
			.then(({data}) => {
				localStorage.setItem("accessToken", data.accessToken)
				navigate("/clients");
			});
	}, [email, password, navigate]);

	return (
		<form onSubmit={signin}>
			<input className="d-block" value={email} onChange={(e) => setEmail(e.target.value)}/>
			<input className="d-block" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
			<button type="submit">Sign In</button>
		</form>
	);
}
