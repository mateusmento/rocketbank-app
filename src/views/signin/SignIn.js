import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../../shared/http";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import { Box, Card, Tab, Tabs, Typography } from "@mui/material";
import { SignUp } from "../signup/SignUp";
import { useFormik } from "formik";
import * as Yup from 'yup';

export function SignIn() {
	let [currentTab, setCurrentTab] = useState("signin");
	let [email, setEmail] = useState("");

	let onSignUp = useCallback(({email}) => {
		setEmail(email);
		setCurrentTab("signin");
	}, []);

	return (
	<Box bgcolor="rgb(0, 166, 255)" width="100%" position="absolute" top="0" bottom="0">
		<Grid container>
			<Grid item container xs={7} sx={{paddingTop: 30, paddingLeft: 5}}>
				<Grid item xs={3}>
					<img src="/logo.png" alt="Rocket Bank Logo" style={{width: "100%", marginTop: -25}}/>
				</Grid>
				<Grid item xs={9}>
					<Typography variant="h1" component="h2" color="#eee">
						Rocketbank
					</Typography>
					<Typography variant="h5" component="h5" color="#ddd">
						Transformação Digital ao alcance da sua empresa
					</Typography>
				</Grid>
			</Grid>
			<Grid item xs={5}>
				<Card sx={{minWidth: 300, marginTop: 18, marginRight: 10}}>
					<Tabs value={currentTab} onChange={(e, tab) => setCurrentTab(tab)}>
						<Tab label="Entrar" value="signin" {...a11yProps(1)} sx={{flex: 1}}/>
						<Tab label="Criar Conta" value="signup" {...a11yProps(2)} sx={{flex: 1}}/>
					</Tabs>
					<TabPanel value={currentTab} index="signin">
						<Box sx={{paddingY: 10, paddingX: 15}}>
							<SignInForm email={email}/>
						</Box>
					</TabPanel>
					<TabPanel value={currentTab} index="signup">
						<Box sx={{paddingY: 6, paddingX: 15}}>
							<SignUp onSignUp={onSignUp}/>
						</Box>
					</TabPanel>
				</Card>
			</Grid>
		</Grid>
	</Box>
	);
}

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function SignInForm({email: receivedEmail}) {
	let navigate = useNavigate();

	let signin = useCallback((credentials) => {
		http().post("/auth/signin", credentials)
			.then(({data}) => {
				localStorage.setItem("accessToken", data.accessToken)
				navigate("/");
			});
	}, [navigate]);

	let formik = useFormik({
		initialValues: {},
		validateOnChange: true,
		onSubmit: signin,
		validationSchema: Yup.object().shape({
			email: Yup.string()
				.email("Email inválido")
				.required("Forneça seu email"),
			password: Yup.string().required("Forneça sua senha")
		}),
	});

	useEffect(() => {
		formik.setFieldValue("email", receivedEmail);
	}, [receivedEmail]);

	return (
		<form onSubmit={formik.handleSubmit}>
			<Typography variant="h5" element="h3" marginLeft={3}>Entre com sua conta</Typography>
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
				Entrar
			</Button>
		</form>
	);
}
