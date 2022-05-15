import axios from 'axios';
import { useEffect, useState } from 'react';
import { BASE_API_URL } from './config';

export function Clients() {
	let [clients, setClients] = useState([]);

	useEffect(() => {
		axios.get(BASE_API_URL + "clients")
			.then(({data}) => setClients(data));
	}, []);

	return (
		<table>
			<thead>
				<tr>
					<th>Nome</th>
					<th>CPF</th>
					<th>Data de nascimento</th>
				</tr>
			</thead>
			<tbody>
				{clients.map(client => (
					<tr>
						<td>{client.name}</td>
						<td>{client.cpf}</td>
						<td>{client.birthDate}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
