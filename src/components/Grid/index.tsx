import {HeaderCell} from '../Cells/HeaderCell';
import {Cell} from '../Cells';
import {iGrid} from './interfaces'
import {useState} from 'react';
import './index.css';

// The main grid component. Extensible cells are contained in ../Cells, and there's a lot of grid functionality not present (such as
// sorting, filtering, and resizing). It will at least allow for selection of rows, although to what end is as-yet TBD
export function Grid(props: iGrid) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  // TODO: make sure defined columns do not include __select__

  const onSelectAll = (val: boolean) => {
    if (val) {
      setSelectedIds(props.data.map((rowData) => rowData.id));
    } else {
      setSelectedIds([]);
    }
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <Cell type="checkbox" columnId="__select__" value={false} opts={{onUpdate: onSelectAll}} />
            {
              props.definition.map((header) => {
                return (
                  <HeaderCell title={header.title} id={header.id} />
                )
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            props.data.map((rowData) => {
              // Function for catching when a checkbox on a row is clicked and updating the global list of selected IDs
              const onSelectUpdate = (val: boolean) => {
                if (val)
                  setSelectedIds(selectedIds.concat([rowData.id]));
                else
                  setSelectedIds(selectedIds.filter((id) => id !== rowData.userId))
              };

              return (
                <tr key={rowData.id}>
                    <Cell type='checkbox' value={false} columnId='__select__' opts={{onUpdate: onSelectUpdate}} />
                    {
                    props.definition.map((colData) => {
                      return <Cell key={colData.id + rowData.id} value={rowData[colData.id]} columnId={colData.id} type={colData.type} editable={colData.editable} opts={colData.opts || {}} />
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}