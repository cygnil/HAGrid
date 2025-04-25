import {Paper, Table, TableBody, TableContainer, TableHead, TableRow} from '@mui/material';
import {HeaderCell} from '../Cells/HeaderCell';
import {Cell} from '../Cells';
import {iGrid} from './interfaces'

// The main grid component. Extensible cells are contained in ../Cells, and there's a lot of grid functionality not present (such as
// sorting, filtering, and resizing).
export function Grid(props: iGrid) {
  
  // One minor flaw in this is that it will get messed up if one of the column names included in the data definiton is "__select__"
  return (
    <>
      <TableContainer component={Paper} className="grid-table-container">
        <Table className="grid-table" stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {
                props.definition.map((header) => {
                  return (
                    <HeaderCell title={header.title} id={header.id} key={header.id} />
                  )
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.data.map((rowData) => {
                return (
                  <TableRow key={rowData.id}>
                      {
                      props.definition.map((colData) => {
                        return <Cell key={colData.id + rowData.id} dataId={rowData.id} value={rowData[colData.id]} columnId={colData.id} type={colData.type} editable={colData.editable} opts={colData.opts || {}} />
                      })
                    }
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}