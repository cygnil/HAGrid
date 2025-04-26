import {memo, useContext, useState} from 'react';
import {iLatLongCell} from './interfaces';
import {SimpleEditor} from '../../SimpleEditor';
import {AlertsContext} from '../../App/App';
import {EditButton} from '../../EditButton';
import {onUpdateFactory} from '../../../server-effects';
import './index.css';

// A cell for displaying latitude and longitude, rendering a link that will show the user the location in Google Maps
export function LatLongCell(props: iLatLongCell) {
  const [value, setValue] = useState(props.value);
  const [isEditing, setIsEditing] = useState(false);
  const {alerts, setAlerts} = useContext(AlertsContext);

  const onUpdate = onUpdateFactory(props.columnId, props.dataId, alerts, setAlerts);
  const onUpdateFinished = (success : boolean, value : string) => {
    if (success) {setValue(value);}
    setIsEditing(false);
  }

  const validate = (val: string) => {
    if (!/^[+-]?\d+(\.\d+)?, *[+-]?\d+(\.\d+)?$/.test(val))
      return {isValid: false, message: "Does not appear to be a valiid lat/long entry!"}
    const [lat, long] = [parseFloat(val.replace(/,.*/, "")), parseFloat(val.replace(/^[^,]*, */, ""))];
    if (lat < -90 || lat > 90)
      return {isValid: false, message: `Latitude is ${lat < -90 ? "less" : "greater"} than ${lat < -90 ? "-" : ""}90`};
    if (long < -180 || long > 180)
      return {isValid: false, message: `Longitude is ${long < -180 ? "less" : "greater"} than ${long < -180 ? "-" : ""}180`};
    return {isValid: true, message: ""};
  }

  const editor = <SimpleEditor
    value={value}
    onUpdate={onUpdate}
    onUpdateFinished={onUpdateFinished}
    validate={validate}
  />;

  return (
    <>
      {isEditing && editor}
      {!isEditing &&
        <span className={`latlong-cell ${props.editable && "editable"}`}>
          <a href={`https://google.com/maps/place/${value}`} target="_blank">{value}</a> {props.editable && <EditButton onClick={() => {setIsEditing(!isEditing)}} />}
        </span>}
    </>
  )
}

const LatLongCellMemoized = memo(LatLongCell, (prev : iLatLongCell, next : iLatLongCell) => {
  return prev.value === next.value && prev.editable === next.editable;
})

export default LatLongCellMemoized;
