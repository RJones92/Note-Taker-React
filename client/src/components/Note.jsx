import React, { useState, useEffect } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { RIEInput } from "riek";

function Note(props) {
  const [editableTitle, setEditableTitle] = useState(props.noteTitle);

  //useEffect will reset the editableTitle when this is rendering new props
  useEffect(() => setEditableTitle(props.noteTitle), [props.noteTitle]);

  function handleTitleChange(newTitle) {
    setEditableTitle(newTitle.title);
    props.onEdit(props.id, newTitle.title);
  }

  return (
    <div className="note">
      {/* Editable h1 */}
      <h1>
        <RIEInput
          value={editableTitle}
          change={handleTitleChange}
          propName="title"
          className="titleStyle"
        />
      </h1>

      <p name="noteBody">{props.noteBody}</p>
      <ButtonGroup disableElevation variant="" className="button-group">
        <EditButton />
        <DeleteButton onClick={() => props.onDelete(props.id)} />
      </ButtonGroup>
    </div>
  );
}

export default Note;
