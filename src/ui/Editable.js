import { createContext, useContext } from "react";

export const EditableContext = createContext(false);

export function Editable({isEditing, value, ...props}) {
	let context = useContext(EditableContext);
	isEditing = isEditing || context;
	return (
		isEditing
			? <input value={value} {...props}/>
			: <span {...props}>{value}</span>
	);
}
