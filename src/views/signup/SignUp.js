import { Button, TextField, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { http } from "../../shared/http";

export function SignUp({onSignUp}) {
	let [name, setName] = useState("");
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");

	let signup = useCallback((e) => {
		e.preventDefault();
		http().post("/users", {name, email, password})
			.then(({data}) => onSignUp(data));
	}, [name, email, password, onSignUp]);

	return (
		<form onSubmit={signup}>
			<Typography variant="h5" element="h3" marginLeft={3}>Crie uma nova conta</Typography>
			<TextField
				label="Nome"
				variant="outlined"
				size="small"
				fullWidth
				margin="normal"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<TextField
				label="Email"
				type="email"
				variant="outlined"
				size="small"
				fullWidth
				margin="normal"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<TextField
				type="password"
				label="Senha"
				variant="outlined"
				size="small"
				fullWidth
				margin="normal"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button
				type="submit"
				variant="contained"
				sx={{ display: "block", ml: "auto", mt: 2 }}
			>
				Criar
			</Button>
		</form>
	);
}
