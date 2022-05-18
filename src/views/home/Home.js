import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthUserContext } from "../../App";

export function Home() {
	let user = useContext(AuthUserContext);

	return (
		<Box sx={{width: "fit-content", mt: 20, marginX: "auto"}}>
			<img src="/logo.png" alt="Rocket Bank Logo"/>
			<Typography variant="h5" element="h3" sx={{mt: 2, textAlign: "center"}}>
				Bem vindo, {user.name}
			</Typography>
		</Box>
	);
}
