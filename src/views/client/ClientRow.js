import { Fragment, useCallback, useState } from 'react';
import { Editable, EditableContext } from '../../ui/Editable';

export function ClientRow({client: sourceClient, onRemove, onUpdate}) {
	let [isEditing, setIsEditing] = useState(false);

	let [client, setClient] = useState(() => cloneClient());

	let setField = useCallback((name, value) => {
		setClient({...client, [name]: value});
	}, [client]);

	let cloneClient = useCallback(() => {
		return JSON.parse(JSON.stringify(sourceClient));
	}, [sourceClient]);

	let startEditing = useCallback(() => {
		setIsEditing(true);
	}, []);

	let confirmEditing = useCallback(() => {
		setIsEditing(false);
		onUpdate(client);
	}, [client, onUpdate]);

	let cancelEditing = useCallback(() => {
		setClient(cloneClient());
		setIsEditing(false);
	}, [cloneClient]);

	return (
		<tr>
			<EditableContext.Provider value={isEditing}>
				<td><Editable value={client.name} onChange={(e) => setField("name", e.target.value)}/></td>
				<td><Editable value={client.cpf} onChange={(e) => setField("cpf", e.target.value)}/></td>
				<td><Editable value={client.birthDate} onChange={(e) => setField("birthDate", e.target.value)}/></td>
			</EditableContext.Provider>
			<td>
				{!isEditing ?
						<Fragment>
							<button onClick={startEditing}>Editar</button>
							<button onClick={onRemove}>Excluir</button>
						</Fragment>
					:
						<Fragment>
							<button onClick={confirmEditing}>Atualizar</button>
							<button onClick={cancelEditing}>Cancelar</button>
						</Fragment>
				}
			</td>
		</tr>
	);
}
