import * as Yup from 'yup';
import { cpf } from 'br-validations';
import moment from 'moment';

export const clientValidation = Yup.object().shape({
	name: Yup.string().required("Forneça o nome do cliente"),
	cpf: Yup.string()
		.required("Forneça o CPF do cliente")
		.test("cpf", "CPF inválido", (value) => cpf.validate(value || '')),
	birthDate: Yup.string()
		.required("Forneça a data de nascimento do cliente")
		.test("date", "Data inválida", (value) => moment(value, "DD/MM/YYYY").isValid()),
});
