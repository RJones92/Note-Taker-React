import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

// Create a React Hook called useStyles to style Material-UI components
const useStyles = makeStyles({
  root: {
    color: "#a9def9",
    paddingRight: 0,
    paddingLeft: 0,
  },
});

function EditButton(props) {
  const classes = useStyles();
  return (
    <Button {...props} classes={{ root: classes.root }}>
      <Tooltip title="Edit">
        <EditIcon />
      </Tooltip>
    </Button>
  );
}

export default EditButton;
