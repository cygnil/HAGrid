import {TableCell} from '@mui/material';
import {NumberCell} from './NumberCell';
import {StringCell} from './StringCell';
import {CheckboxCell} from './CheckboxCell';
import {UriCell} from './UriCell';
import {UsersCell} from './UsersCell';
import {iCell} from './interfaces';

// Umbrella cell for determining what cell type we actually render
export function Cell(props: iCell) {
  let renderedValue;

  // I think the switch statement is undervalued: it's more elegant than "if (x === y) ... else if (x === z)..." and every so often
  // having a switch fallthrough actually is the thing you want; it always gives me a small jolt of joy when I get to use that correctly.
  // For extensibility, add new cell types here.
  switch (props.type) {
    case 'number':
      renderedValue = <NumberCell {...props} />;
      break;
    case 'uri':
      renderedValue = <UriCell {...props} />;
      break;
    case 'checkbox':
      renderedValue = <CheckboxCell {...props} />;
      break;
    case 'users':
      renderedValue = <UsersCell {...props} />;
      break;
    case 'string':
    default:
      renderedValue = <StringCell {...props} />;
      break;
  }

  return (
    <TableCell className="cell">
      {renderedValue}
    </TableCell>
  )
}
