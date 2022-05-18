import { Button, TableCell, TableRow } from "@mui/material";
import { useFormik } from "formik";
import { Editable } from "../../ui/Editable";
import { Check, Cancel } from '@mui/icons-material';
import moment from 'moment';
import { clientValidation } from "./client-validation";

export function CreateClientFormRow({onCreate, onCancel}) {

	let formik = useFormik({
		initialValues: {},
		onSubmit: (values) => {
			values.birthDate = moment(values.birthDate, "DD/MM/YYYY").format("YYYY-MM-DD");
			onCreate(values)
		},
		validationSchema: clientValidation
	});

	return (
		<TableRow>
			<TableCell>
				<form id="create-form" onSubmit={formik.handleSubmit}></form>
				<Editable isEditing value={formik.values.name} name="name" onChange={formik.handleChange} form="create-form"/>
				{formik.errors.name && formik.submitCount > 0
						&& <small className="d-block">{formik.errors.name}</small>}
			</TableCell>
			<TableCell>
				<Editable isEditing value={formik.values.cpf} name="cpf" onChange={formik.handleChange} form="create-form"/>
				{formik.errors.cpf && formik.submitCount > 0
						&& <small className="d-block">{formik.errors.cpf}</small>}
			</TableCell>
			<TableCell>
				<Editable isEditing value={formik.values.birthDate} name="birthDate" onChange={formik.handleChange} form="create-form"/>
				{formik.errors.birthDate && formik.submitCount > 0
						&& <small className="d-block">{formik.errors.birthDate}</small>}
			</TableCell>
			<TableCell>
				<Button form="create-form" type="submit"> <Check/> </Button>
				<Button type="button" onClick={onCancel}> <Cancel/> </Button>
			</TableCell>
		</TableRow>
	);
}
