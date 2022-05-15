import { useCallback, useState } from "react";

export function CreateClientFormRow({onSave}) {
	let [client, setClient] = useState({});

	let setField = useCallback((name, value) => {
		setClient({...client, [name]: value});
	}, [client]);

	return (
		<tr>
				<td><input value={client.name} onChange={(e) => setField("name", e.target.value)}/></td>
				<td><input value={client.cpf} onChange={(e) => setField("cpf", e.target.value)}/></td>
				<td><input value={client.birthDate} onChange={(e) => setField("birthDate", e.target.value)}/></td>
			<td><button onClick={() => onSave(client)}>Criar</button></td>
		</tr>
	);
}
