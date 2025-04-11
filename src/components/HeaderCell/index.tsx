import {iHeaderCell} from "./interfaces";

// Not much going on here, just a header cell with a title. In a mopre fully-formed table we'd have sort and resize widgets
export function HeaderCell(props: iHeaderCell) {
    return (
        <th className="header-cell">
            <div className="header-cell-content">
                <span className="header-cell-title">{props.title}</span>
            </div>
        </th>
    )
}
