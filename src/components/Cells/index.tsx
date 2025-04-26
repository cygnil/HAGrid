import {TableCell} from '@mui/material';
import NumberCell from './NumberCell';
import StringCell from './StringCell';
import CheckboxCell from './CheckboxCell';
import UriCell from './UriCell';
import UsersCell from './UsersCell';
import LatLongCell from './LatLongCell';
import {iCell} from './interfaces';

// Umbrella cell for determining what cell type we actually render
export function Cell(props: iCell) {
  const cellTypes : Record<string, any> = {
    number: NumberCell,
    uri: UriCell,
    checkbox: CheckboxCell,
    users: UsersCell,
    string: StringCell,
    latlong: LatLongCell
  };

  const CellComponent = cellTypes[props.type] || StringCell;

  return (
    <TableCell className="cell">
      <CellComponent {...props} />
    </TableCell>
  )
}
