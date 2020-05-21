import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

// Create a React Hook called useStyles to style Material-UI component
const useStyles = makeStyles({
  root: {
    color: "#ff99c8",
    padding: "7px",
    "&:hover": {
      backgroundColor: "RGB(255, 153, 200, 0.2)",
    },
  },
});

function DeleteButton(props) {
  const classes = useStyles();
  return (
    <div>
      <IconButton {...props} classes={{ root: classes.root }}>
        <Tooltip title="Delete">
          <DeleteIcon />
        </Tooltip>
      </IconButton>
    </div>
  );
}

export default DeleteButton;
