import { useFormik } from "formik";
import * as Yup from "yup";

export function CreateClientFormRow({onCreate}) {

	let formik = useFormik({
		initialValues: {},
		onSubmit: onCreate,
		validationSchema: Yup.object().shape({
			name: Yup.string().required("Forneça o nome do cliente"),
			cpf: Yup.string().required("Forneça o CPF do cliente"),
			birthDate: Yup.date().required("Forneça a data de nascimento do cliente"),
		})
	});

	return (
		<tr>
			<td>
				<input value={formik.values.name} name="name" onChange={formik.handleChange}/>
				{formik.errors.name && formik.touched.name
						&& <small className="d-block">{formik.errors.name}</small>}
			</td>
			<td>
				<input value={formik.values.cpf} name="cpf" onChange={formik.handleChange}/>
				{formik.errors.cpf && formik.touched.cpf
						&& <small className="d-block">{formik.errors.cpf}</small>}
			</td>
			<td>
				<input value={formik.values.birthDate} name="birthDate" onChange={formik.handleChange}/>
				{formik.errors.birthDate && formik.touched.birthDate
						&& <small className="d-block">{formik.errors.birthDate}</small>}
			</td>
			<td>
				<button type="button" onClick={formik.handleSubmit}>Criar</button>
			</td>
		</tr>
	);
}
