import { useCallback, useEffect, useState } from 'react';
import { http } from '../../shared/http';
import { ClientRow } from './ClientRow';
import { CreateClientFormRow } from './CreateClientFormRow';
import { Grid, Button, Table, TableBody, TableCell, TableHead, TableRow, Box } from '@mui/material';
import { Add } from '@mui/icons-material';

const pageSize = 5;

export function Clients() {
	let [clients, setClients] = useState([]);
	let [page, setPage] = useState(0);
	let [isNewClientFormOpen, setIsNewClientFormOpen] = useState(false);
	let [pagesCount, setPagesCount] = useState(0);

	useEffect(() => {
		http().get("/clients", {params: {page: page, size: pageSize}})
			.then(({data}) => {
				setClients(data.content);
				setPagesCount(Math.ceil(data.totalCount / pageSize));
			});
	}, [page]);

	let refreshPage = useCallback(() => {
		setPage(0);
	}, []);

	let createClient = useCallback((client) => {
		http().post("/clients", client)
			.then(({data}) => setClients([...clients, data]));
		setIsNewClientFormOpen(false);
		refreshPage();
	}, [clients, refreshPage]);

	let updateClient = useCallback(async (id, patch) => {
		let {data: client} = await http().patch("clients/" + id, patch);
		let i = clients.findIndex(c => c.id === id);
		clients[i] = client;
		setClients([...clients]);
	}, [clients]);

	let removeClient = useCallback((id) => {
		http().delete("/clients/" + id)
			.then(() => setClients(clients.filter(c => c.id !== id)));
	}, [clients]);

	let showNewClientForm = useCallback(() => {
		setIsNewClientFormOpen(true);
	}, []);

	let hideNewClientForm = useCallback(() => {
		setIsNewClientFormOpen(false);
	}, []);

	return (
		<Grid container justifyContent="center">
			<Grid item>
				<Table size="small" sx={{width: 900, marginTop: 5}}>
					<TableHead>
						<TableRow>
							<TableCell>Nome</TableCell>
							<TableCell>CPF</TableCell>
							<TableCell>Data de nascimento</TableCell>
							<TableCell>
								<Button>
									<Add onClick={showNewClientForm} />
								</Button>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{isNewClientFormOpen && <CreateClientFormRow onCreate={createClient} onCancel={hideNewClientForm}/>}
						{clients.map(client =>
							<ClientRow
								key={client.id}
								client={client}
								onUpdate={(patch) => updateClient(client.id, patch)}
								onRemove={() => removeClient(client.id)}
							/>
						)}
					</TableBody>
				</Table>
				<Box sx={{ml: "auto", mt: 2, width: "fit-content"}}>
					<Button onClick={() => setPage(page - 1)} disabled={page <= 0}>Anterior</Button>
					<Button onClick={() => setPage(page + 1)} disabled={page >= pagesCount-1}>Próxima</Button>
				</Box>
			</Grid>
		</Grid>
	);
}
