import {TableCell} from "@mui/material";
import {iHeaderCell} from "./interfaces";
import "./index.css";

// Not much going on here, just a header cell with a title. In a more fully-formed table we'd have sort and resize widgets
export function HeaderCell(props: iHeaderCell) {
  return (
    <TableCell className="header-cell">
      <span className="header-cell-title">{props.title}</span>
    </TableCell>
  )
}
