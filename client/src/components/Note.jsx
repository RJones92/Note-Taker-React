import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

function Note(props) {
  return (
    <div className="note">
      <h1>{props.noteTitle}</h1>
      <p>{props.noteBody}</p>
      <ButtonGroup disableElevation variant="" className="button-group">
        <EditButton />
        <DeleteButton onClick={() => props.onDelete(props.id)} />
      </ButtonGroup>
    </div>
  );
}

export default Note;
