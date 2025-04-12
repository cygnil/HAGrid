import {useState} from 'react';
import {iNumberCell} from './interfaces';
import {SimpleEditor} from '../../SimpleEditor';

// Probably the simplest cell we have
export function NumberCell(props: iNumberCell) {
    const [value, setValue] = useState(props.value);
    const [isEditing, setIsEditing] = useState(false);

    // TODO: This is so ugly, make it more elegant
    const editButton = <button className="edit-button" onClick={() => {setIsEditing(!isEditing)}}>Edit</button>;

    const onUpdate = async (val: number) => {
        setValue(val);
        return true;
    }

    // This is a half-finished editor for now, mostly this is just to play around with editing on a basic level
    const editor = <SimpleEditor
        value={value}
        validate={(val: string) => /^\d*(\.\d*)?$/.test(val)}
        onUpdate={onUpdate}
        onUpdateFinished={() => setIsEditing(false)}
    />;

    return (
        <>
            {isEditing && editor}
            {!isEditing && <span className="number-cell">{value} {props.editable && editButton}</span>}
        </>
    )
}
