import {memo, useContext, useState} from 'react';
import {Tooltip, IconButton} from '@mui/material';
import {Edit} from '@mui/icons-material';
import {iStringCell} from './interfaces';
import {SimpleEditor} from '../../SimpleEditor';
import {AlertsContext} from '../../App/App';
import {onUpdateFactory} from '../../../server-effects';
import './index.css';

// Okay I thought the number cell was the simplest, but THIS is probably the simplest cell we have
export function StringCell(props: iStringCell) {
  const [value, setValue] = useState(props.value);
  const [isEditing, setIsEditing] = useState(false);
  const {alerts, setAlerts} = useContext(AlertsContext);

  const editButton = <Tooltip title="Edit"><IconButton className="edit-button" size="small" onClick={() => {setIsEditing(!isEditing)}}><Edit /></IconButton></Tooltip>;

  const onUpdate = onUpdateFactory(props.columnId, props.dataId, alerts, setAlerts);
  const onUpdateFinished = (success : boolean, value : string) => {
    if (success) {setValue(value);}
    setIsEditing(false);
  }

  // This is a half-finished editor for now, mostly this is just to play around with editing on a basic level
  const editor = <SimpleEditor
    value={value}
    onUpdate={onUpdate}
    onUpdateFinished={onUpdateFinished}
  />;

  return (
    <>
      {isEditing && editor}
      {!isEditing && <span className={`string-cell ${props.editable && "editable"}`}>{value} {props.editable && editButton}</span>}
    </>
  )
}

const StringCellMemoized = memo(StringCell, (prev : iStringCell, next : iStringCell) => {
  return prev.value === next.value && prev.editable === next.editable;
})

export default StringCellMemoized;
