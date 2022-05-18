import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useCallback } from "react";
import { http } from "../../shared/http";
import * as Yup from 'yup';

export function SignUp({onSignUp}) {

	let signup = useCallback((user) => {
		http().post("/users", user)
			.then(({data}) => onSignUp(data));
	}, []);

	let formik = useFormik({
		initialValues: {},
		validateOnChange: true,
		onSubmit: signup,
		validationSchema: Yup.object().shape({
			name: Yup.string().required("Forneça seu nome"),
			email: Yup.string()
				.email("Email inválido")
				.required("Forneça seu email"),
			password: Yup.string()
				.required("Forneça uma senha")
				.min(8, "Senha precisa ter mínimo de 8 caracteres"),
		}),
	});


	return (
		<form onSubmit={formik.handleSubmit}>
			<Typography variant="h5" element="h3" marginLeft={3}>Crie uma nova conta</Typography>
			<TextField
				label="Nome"
				variant="outlined"
				size="small"
				fullWidth
				margin="normal"
				value={formik.values.name}
				onChange={formik.handleChange}
				error={formik.errors.name && formik.submitCount > 0}
				helperText={formik.submitCount > 0 && formik.errors.name}
				{...formik.getFieldProps("name")}
			/>
			<TextField
				label="Email"
				variant="outlined"
				size="small"
				fullWidth
				margin="normal"
				value={formik.values.email}
				onChange={formik.handleChange}
				error={formik.errors.email && formik.submitCount > 0}
				helperText={formik.submitCount > 0 && formik.errors.email}
				{...formik.getFieldProps("email")}
			/>
			<TextField
				type="password"
				label="Senha"
				variant="outlined"
				size="small"
				fullWidth
				margin="normal"
				value={formik.values.password}
				onChange={formik.handleChange}
				error={formik.errors.password && formik.submitCount > 0}
				helperText={formik.submitCount > 0 && formik.errors.password}
				{...formik.getFieldProps("password")}
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
