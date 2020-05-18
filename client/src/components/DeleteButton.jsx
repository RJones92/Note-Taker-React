import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

// Create a React Hook called useStyles to style Material-UI components
const useStyles = makeStyles({
  root: {
    color: "#ff99c8",
    paddingRight: 0,
    paddingLeft: 0,
  },
});

function DeleteButton(props) {
  const classes = useStyles();
  return (
    <Button {...props} classes={{ root: classes.root }}>
      <Tooltip title="Delete">
        <DeleteIcon />
      </Tooltip>
    </Button>
  );
}

export default DeleteButton;
