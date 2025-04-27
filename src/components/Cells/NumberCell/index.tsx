import {memo, useContext, useState} from 'react';
import {LinearProgress} from '@mui/material';
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
  const {min, max, visualize} = props.opts || {}

  const onUpdate = onUpdateFactory(props.columnId, props.dataId, alerts, setAlerts);
  const onUpdateFinished = (success : boolean, value : number) => {
    if (success) {setValue(value);}
    setIsEditing(false);
  }

  const validate = (val: string) => {
    if (!/^-?\d*(\.\d*)?$/.test(val))
      return {isValid: false, message: "Does not appear to be a number!"};
    const valNum = parseFloat(val);
    if (min !== undefined && valNum < min)
      return ({isValid: false, message: "Number is below minimum " + min});
    if (max !== undefined && valNum > max)
      return ({isValid: false, message: "Number is above maximum " + max});
    return {isValid: true, message: ""};
  }

  const editor = <SimpleEditor
    value={value}
    validate={validate}
    onUpdate={onUpdate}
    onUpdateFinished={onUpdateFinished}
  />;

  return (
    <>
      {isEditing && editor}
      {!isEditing &&
        <span className={`number-cell ${props.editable && "editable"}`}>
          {value} 
          {min !== undefined && max !== undefined && visualize && <LinearProgress className="num-graph" variant="determinate" value={(value - min) * 100 / (max - min)} />}
          {props.editable && <EditButton onClick={() => {setIsEditing(!isEditing)}} />}
        </span>
      }
    </>
  )
}

const NumberCellMemoized = memo(NumberCell, (prev : iNumberCell, next : iNumberCell) => {
  return prev.value === next.value && prev.editable === next.editable;
})

export default NumberCellMemoized;
