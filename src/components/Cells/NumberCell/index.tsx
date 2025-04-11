import {iCell} from '../interfaces';

// Probably the simplest cell we have
export function NumberCell(props: iCell) {
    return (
        <span className="number-cell">{props.value}</span>
    )
}
