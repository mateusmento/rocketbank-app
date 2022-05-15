import axios from "axios";
import { useCallback, useState } from "react";
import { BASE_API_URL } from "../../config";

const http = axios.create({baseURL: BASE_API_URL});

export function SignIn() {
	let [email, setEmail] = useState();
	let [password, setPassword] = useState();

	let signin = useCallback(() => {
		http.post("/auth/signin", {username: email, password})
			.then(({data}) => localStorage.setItem("accessToken", data.accessToken));
	}, [email, password]);

	return (
		<form onSubmit={signin}>
			<input className="d-block" value={email} onChange={setEmail}/>
			<input className="d-block" value={password} onChange={setPassword}/>
			<button type="submit">Sign In</button>
		</form>
	);
}
