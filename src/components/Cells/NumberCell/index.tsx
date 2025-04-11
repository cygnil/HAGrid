import {useState} from 'react';
import {iNumberCell} from './interfaces';
import {SimpleEditor} from '../../SimpleEditor';

// Probably the simplest cell we have
export function NumberCell(props: iNumberCell) {
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    // TODO: This is so ugly, make it more elegant
    const editButton = <button className="edit-button" onClick={() => {setIsEditing(!isEditing)}}>Edit</button>;

    // This is a half-finished editor for now, mostly this is just to play around with editing on a basic level
    const editor = <SimpleEditor
        value={props.value}
        validate={(value: string) => /^\d*(\.\d*)?$/.test(value)}
        onUpdate={(value: number, finish: Function) => {setIsUpdating(true); finish()}}
        onUpdateFinished={() => {setIsUpdating(false); setIsEditing(false)}}
    />;

    return (
        <>
            {isEditing && editor}
            {!isEditing && <span className="number-cell">{props.value} {props.editable && editButton}</span>}
        </>
    )
}
