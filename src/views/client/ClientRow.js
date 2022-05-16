import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Fragment, useCallback, useState } from 'react';
import { Editable, EditableContext } from '../../ui/Editable';

export function ClientRow({client: originalClient, onRemove, onUpdate}) {
	let [isEditing, setIsEditing] = useState(false);

	let formik;

	let startEditing = useCallback(() => {
		setIsEditing(true);
	}, []);

	let confirmEditing = useCallback(async (client) => {
		try {
			await onUpdate(diff(originalClient, client));
		} finally {
			setIsEditing(false);
			formik.setValues(client);
		}
	}, [originalClient, onUpdate, formik]);

	let cancelEditing = useCallback(() => {
		setIsEditing(false);
		formik.setValues(clone(originalClient));
	}, [originalClient, formik]);

	formik = useFormik({
		initialValues: clone(originalClient),
		onSubmit: confirmEditing,
		validationSchema: Yup.object().shape({
			name: Yup.string().required("Forneça o nome do cliente"),
			cpf: Yup.string().required("Forneça o CPF do cliente"),
			birthDate: Yup.date().required("Forneça a data de nascimento do cliente"),
		})
	});

	return (
		<tr>
			<EditableContext.Provider value={isEditing}>
				<td>
					<Editable value={formik.values.name} name="name" onChange={formik.handleChange}/>
					{isEditing && formik.errors.name && formik.touched.name
						&& <small className="d-block">{formik.errors.name}</small>}
				</td>
				<td>
					<Editable value={formik.values.cpf} name="cpf" onChange={formik.handleChange}/>
					{isEditing && formik.errors.cpf && formik.touched.cpf
						&& <small className="d-block">{formik.errors.cpf}</small>}
				</td>
				<td>
					<Editable value={formik.values.birthDate} name="birthDate" onChange={formik.handleChange}/>
					{isEditing && formik.errors.birthDate && formik.touched.birthDate
						&& <small className="d-block">{formik.errors.birthDate}</small>}
				</td>
			</EditableContext.Provider>
			<td>
				{!isEditing ?
						<Fragment>
							<button onClick={startEditing}>Editar</button>
							<button onClick={onRemove}>Excluir</button>
						</Fragment>
					:
						<Fragment>
							<button type="button" onClick={formik.handleSubmit}>Atualizar</button>
							<button type="button" onClick={cancelEditing}>Cancelar</button>
						</Fragment>
				}
			</td>
		</tr>
	);
}

function clone(value) {
	return JSON.parse(JSON.stringify(value));
}

function diff(original, modified) {
	return Object.entries(modified)
		.filter(([key, value]) => original[key] !== value)
		.reduce((acc, [key, value]) => ({...acc, [key]: value}), {});
}
