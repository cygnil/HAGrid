import {Edit} from "@mui/icons-material";
import {IconButton, Tooltip} from "@mui/material";
import {iEditButton} from "./interfaces";

export function EditButton(props : iEditButton) {
  return (
    <>
      <Tooltip title="Edit">
          <IconButton className="edit-button" size="small" onClick={props.onClick}>
              <Edit sx={{width: 18, height: 18}} />
          </IconButton>
      </Tooltip>
    </>
  )
}
