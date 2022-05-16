import { useCallback, useEffect, useState } from 'react';
import { http } from '../../shared/http';
import { ClientRow } from './ClientRow';
import { CreateClientFormRow } from './CreateClientFormRow';

export function Clients() {
	let [clients, setClients] = useState([]);
	let [page, setPage] = useState(1);
	let [pageSize] = useState(10);
	let [isNewClientFormOpen, setIsNewClientFormOpen] = useState(false);

	useEffect(() => {
		http().get("/clients", {params: {page, size: pageSize}})
			.then(({data}) => setClients(data));
	}, [page, pageSize]);

	let toggleNewClientForm = useCallback(() => {
		setIsNewClientFormOpen(!isNewClientFormOpen)
	}, [isNewClientFormOpen]);

	let createClient = useCallback((client) => {
		http().post("/clients", client)
			.then(({data}) => setClients([...clients, data]));
		setIsNewClientFormOpen(false);
	}, [clients]);

	let updateClient = useCallback(async (id, patch) => {
		await http().patch("clients/" + id, patch);
	}, []);

	let removeClient = useCallback((id) => {
		http().delete("/clients/" + id)
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
					{isNewClientFormOpen && <CreateClientFormRow onCreate={createClient}/>}
				</tbody>
			</table>
			<button onClick={toggleNewClientForm}>Novo Cliente</button>
			<button onClick={() => setPage(page - 1)}>Anterior</button>
			<button onClick={() => setPage(page + 1)}>Próxima</button>
		</div>
	);
}
