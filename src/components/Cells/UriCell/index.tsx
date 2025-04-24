import {memo, useContext, useState} from 'react';
import {IconButton, Tooltip} from '@mui/material';
import {Edit} from '@mui/icons-material';
import {iUriCell} from './interfaces';
import {AlertsContext} from '../../App/App';
import {SimpleEditor} from '../../SimpleEditor';
import {onUpdateFactory} from '../../../server-effects';
import './index.css';

// Render a URI as a link
export function UriCell(props: iUriCell) {
  const opts = props.opts || {};
  const {editable} = props;
  const [value, setValue] = useState(props.value);
  const [isEditing, setIsEditing] = useState(false);
  const {alerts, setAlerts} = useContext(AlertsContext);

  const onUpdate = onUpdateFactory(props.columnId, props.dataId, alerts, setAlerts);
  const onUpdateFinished = (success : boolean, value : string) => {
    if (success) {setValue(value);}
    setIsEditing(false);
  }
  const validate = (newValue: string) => {return {isValid: URL.canParse(newValue), message: "Does not pass URL.canParse() check!"}};

  const editButton = <Tooltip title="Edit"><IconButton className="edit-button" size="small" onClick={() => {setIsEditing(!isEditing)}}><Edit /></IconButton></Tooltip>;

  return (
    <>
      {!isEditing &&
        <span className={`uri-cell ${props.editable && "editable"}`}>
          <a href={value} {...(opts.newTab ? {target: "_blank", rel: "noopener noreferrer"} : {})}>{value}</a>
          {editable && editButton}
        </span>
      }
      {isEditing && <SimpleEditor
        onUpdate={onUpdate}
        onUpdateFinished={onUpdateFinished}
        value={value}
        validate={validate}
      />}
    </>
  )
}

const UriCellMemoized = memo(UriCell, (prev : iUriCell, next : iUriCell) => {
  return prev.value === next.value && prev.editable === next.editable && prev.opts?.newTab === next.opts?.newTab;
})

export default UriCellMemoized;
