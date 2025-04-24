import {memo, useContext, useState} from 'react';
import {iNumberCell} from './interfaces';
import {SimpleEditor} from '../../SimpleEditor';
import {AlertsContext} from '../../App/App';
import {EditButton} from '../../EditButton';
import {onUpdateFactory} from '../../../server-effects';
import './index.css';

// Probably the simplest cell we have
export function NumberCell(props: iNumberCell) {
  const [value, setValue] = useState(props.value);
  const [isEditing, setIsEditing] = useState(false);
  const {alerts, setAlerts} = useContext(AlertsContext);

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
      {!isEditing && <span className={`number-cell ${props.editable && "editable"}`}>{value} {props.editable && <EditButton onClick={() => {setIsEditing(!isEditing)}} />}</span>}
    </>
  )
}

const NumberCellMemoized = memo(NumberCell, (prev : iNumberCell, next : iNumberCell) => {
  return prev.value === next.value && prev.editable === next.editable;
})

export default NumberCellMemoized;
