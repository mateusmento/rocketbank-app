import { createContext, useContext } from "react";
import classname from 'classname';
import './Editable.css';

export const EditableContext = createContext(false);

export function Editable({isEditing, ...props}) {
	let context = useContext(EditableContext);
	isEditing = isEditing || context;
	return (
		<input
			className={classname("editable", {"not-editable": !isEditing})}
			{...props}
			readOnly={!isEditing}
		/>
	);
}
