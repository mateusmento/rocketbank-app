import { createContext, useContext, useRef } from "react";
import classname from 'classname';
import './Editable.css';

export const EditableContext = createContext(false);

export function Editable({value, onChange, ...props}) {
	let isEditing = useContext(EditableContext);
	let divRef = useRef();
	return (
		<>
			<div
				className={classname("editable", {"not-editable": !isEditing})}
				onKeyUp={(e) => onChange(e.target.innerText)}
				contentEditable={isEditing}
				ref={divRef} dangerouslySetInnerHTML={{__html: value}}/>
			<input type="hidden" value={value} {...props}/>
		</>
	);
}
