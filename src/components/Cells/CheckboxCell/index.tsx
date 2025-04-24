import {memo, useEffect, useState} from 'react'
import {Checkbox} from '@mui/material';
import {iCheckboxCell} from './interfaces';

export function CheckboxCell(props: iCheckboxCell) {

  // Define a checkbox state, then add an effect for updating the main grid state of selected rows. Inefficient, this will be improved later.
  const [isChecked, setisChecked] = useState<boolean>(!!props.value);
  useEffect(() => {
    if (props.opts?.onUpdate) {props.opts.onUpdate(isChecked)};
  }, [isChecked]);
  
  return (
    <Checkbox className="checkbox-cell" checked={isChecked} onChange={() => setisChecked(!isChecked)} />
  )
}

const CheckboxCellMemoized = memo(CheckboxCell, (prev : iCheckboxCell, next : iCheckboxCell) => {
  return prev.value === next.value && prev.editable === next.editable;
})

export default CheckboxCellMemoized;
