import { useFormik } from 'formik';
import { Fragment, useCallback, useState } from 'react';
import { Editable, EditableContext } from '../../ui/Editable';
import { Button, TableCell, TableRow } from '@mui/material';
import { Edit, Delete, Check, Cancel } from '@mui/icons-material';
import moment from 'moment';
import { clientValidation } from './client-validation';

export function ClientRow({client: originalClient, onRemove, onUpdate}) {
	let [isEditing, setIsEditing] = useState(false);

	let formik;

	let formattedOriginalClient = useCallback(() => ({
		...originalClient,
		birthDate: moment(originalClient.birthDate, "YYYY-MM-DD").format("DD/MM/YYYY"),
	}), [originalClient]);

	let startEditing = useCallback(() => {
		setIsEditing(true);
	}, []);

	let confirmEditing = useCallback(async (client) => {
		try {
			let patch = diff(formattedOriginalClient(), client);
			if (patch.birthDate)
				patch.birthDate = moment(patch.birthDate, "DD/MM/YYYY").format("YYYY-MM-DD");
			await onUpdate(patch);
		} finally {
			setIsEditing(false);
			formik.setValues(client);
		}
	}, [formattedOriginalClient, onUpdate, formik]);

	let cancelEditing = useCallback(() => {
		setIsEditing(false);
		formik.setValues(formattedOriginalClient());
	}, [formattedOriginalClient, formik]);

	formik = useFormik({
		initialValues: formattedOriginalClient(),
		onSubmit: confirmEditing,
		validationSchema: clientValidation
	});

	return (
		<TableRow>
			<EditableContext.Provider value={isEditing}>
				<TableCell>
					<Editable value={formik.values.name} name="name" onChange={formik.handleChange}/>
					{isEditing && formik.errors.name && formik.touched.name
						&& <small className="d-block">{formik.errors.name}</small>}
				</TableCell>
				<TableCell>
					<Editable value={formik.values.cpf} name="cpf" onChange={formik.handleChange}/>
					{isEditing && formik.errors.cpf && formik.touched.cpf
						&& <small className="d-block">{formik.errors.cpf}</small>}
				</TableCell>
				<TableCell>
					<Editable value={formik.values.birthDate} name="birthDate" onChange={formik.handleChange}/>
					{isEditing && formik.errors.birthDate && formik.touched.birthDate
						&& <small className="d-block">{formik.errors.birthDate}</small>}
				</TableCell>
			</EditableContext.Provider>
			<TableCell>
				{!isEditing ?
						<Fragment>
							<Button type="button" onClick={startEditing}><Edit/></Button>
							<Button type="button" onClick={onRemove}><Delete/></Button>
						</Fragment>
					:
						<Fragment>
							<Button type="submit" onClick={formik.handleSubmit}><Check/></Button>
							<Button type="button" onClick={cancelEditing}><Cancel/></Button>
						</Fragment>
				}
			</TableCell>
		</TableRow>
	);
}

function diff(original, modified) {
	return Object.entries(modified)
		.filter(([key, value]) => original[key] !== value)
		.reduce((acc, [key, value]) => ({...acc, [key]: value}), {});
}
