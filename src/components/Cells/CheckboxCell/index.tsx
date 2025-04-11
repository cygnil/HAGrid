import { useEffect, useState } from 'react'
import {iCell} from '../interfaces';

export function CheckboxCell(props: iCell) {

    // Define a checkbox state, then add an effect for updating the main grid state of selected rows. Inefficient, this will be improved later.
    const [isChecked, setisChecked] = useState<boolean>(!!props.value);
    useEffect(() => {
        if (props.opts?.onUpdate) {props.opts.onUpdate(isChecked)};
    }, [isChecked]);
    
    return (
        <input type="checkbox" className="checkbox-cell" checked={isChecked} onChange={() => setisChecked(!isChecked)} />
    )
}
