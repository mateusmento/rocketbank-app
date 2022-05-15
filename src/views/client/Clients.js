import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { BASE_API_URL } from '../../config';
import { ClientRow } from './ClientRow';
import { CreateClientFormRow } from './CreateClientFormRow';

const http = axios.create({baseURL: BASE_API_URL});

export function Clients() {
	let [clients, setClients] = useState([]);
	let [isNewClientFormOpen, setIsNewClientFormOpen] = useState(false);

	useEffect(() => {
		http.get("/clients")
			.then(({data}) => setClients(data));
	}, []);

	let toggleNewClientForm = useCallback(() => {
		setIsNewClientFormOpen(!isNewClientFormOpen)
	}, [isNewClientFormOpen]);

	let createClient = useCallback((client) => {
		http.post("/clients", client)
			.then(({data}) => setClients([...clients, data]));
		setIsNewClientFormOpen(false);
	}, [clients]);

	let updateClient = useCallback((id, patch) => {
		http.patch("clients/" + id, patch)
			.then(({data: client}) => {
				let i = clients.findIndex(c => c.id === client.id);
				clients[i] = client;
				setClients([...clients]);
			});
	}, [clients]);

	let removeClient = useCallback((id) => {
		http.delete("/clients/" + id)
			.then(() => setClients(clients.filter(c => c.id !== id)));
	}, [clients]);

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Nome</th>
						<th>CPF</th>
						<th>Data de nascimento</th>
					</tr>
				</thead>
				<tbody>
					{clients.map(client =>
						<ClientRow
							key={client.id}
							client={client}
							onUpdate={(patch) => updateClient(client.id, patch)}
							onRemove={() => removeClient(client.id)}
						/>
					)}
					{isNewClientFormOpen && <CreateClientFormRow onSave={createClient}/>}
				</tbody>
			</table>
			<button onClick={toggleNewClientForm}>Novo Cliente</button>
		</div>
	);
}
