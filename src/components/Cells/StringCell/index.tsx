import {useState} from 'react';
import {iStringCell} from './interfaces';
import {SimpleEditor} from '../../SimpleEditor';

// Okay I thought the numebr cell was the simplest, but THIS is probably the simplest cell we have
export function StringCell(props: iStringCell) {
  const [value, setValue] = useState(props.value);
  const [isEditing, setIsEditing] = useState(false);

  // TODO: This is so ugly, make it more elegant
  const editButton = <button className="edit-button" onClick={() => {setIsEditing(!isEditing)}}>Edit</button>;

  const onUpdate = async (val: string) => {
    setValue(val);
    return true;
  }

  // This is a half-finished editor for now, mostly this is just to play around with editing on a basic level
  const editor = <SimpleEditor
    value={value}
    onUpdate={onUpdate}
    onUpdateFinished={() => setIsEditing(false)}
  />;

  return (
    <>
      {isEditing && editor}
      {!isEditing && <span className="string-cell">{value} {props.editable && editButton}</span>}
    </>
  )
}
