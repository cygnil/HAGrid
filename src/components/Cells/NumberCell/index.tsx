import {useContext, useState} from 'react';
import {Tooltip, IconButton} from '@mui/material';
import {Edit} from '@mui/icons-material';
import {iNumberCell} from './interfaces';
import {SimpleEditor} from '../../SimpleEditor';
import {AlertsContext} from '../../App/App';
import {onUpdateFactory} from '../../../server-effects';

// Probably the simplest cell we have
export function NumberCell(props: iNumberCell) {
  const [value, setValue] = useState(props.value);
  const [isEditing, setIsEditing] = useState(false);
  const {alerts, setAlerts} = useContext(AlertsContext);

  const editButton = <Tooltip title="Edit"><IconButton className="edit-button" size="small" onClick={() => {setIsEditing(!isEditing)}}><Edit /></IconButton></Tooltip>;

  const onUpdate = onUpdateFactory(props.columnId, props.dataId, alerts, setAlerts);
  const onUpdateFinished = (success : boolean, value : number) => {
    if (success) {setValue(value);}
    setIsEditing(false);
  }

  const editor = <SimpleEditor
    value={value}
    validate={(val: string) => {return {isValid: /^\d*(\.\d*)?$/.test(val), message: "Does not appear to be a number!"}}}
    onUpdate={onUpdate}
    onUpdateFinished={onUpdateFinished}
  />;

  return (
    <>
      {isEditing && editor}
      {!isEditing && <span className="number-cell">{value} {props.editable && editButton}</span>}
    </>
  )
}
