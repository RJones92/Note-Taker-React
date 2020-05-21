import React, { useState, useEffect } from "react";
import DeleteButton from "./DeleteButton";
import { RIEInput } from "riek";

function Note(props) {
  const [editableTitle, setEditableTitle] = useState(props.noteTitle);
  const [editableBody, setEditableBody] = useState(props.noteBody);

  //useEffect will reset the states of the editable parts when this component is rendering new props
  useEffect(() => {
    setEditableTitle(props.noteTitle);
    setEditableBody(props.noteBody);
  }, [props.noteTitle, props.noteBody]);

  function handleTextChange(newText) {
    if (newText.hasOwnProperty("title")) {
      setEditableTitle(newText.title);
      //Pass in new title and existing body
      props.onEdit(props.id, newText.title, props.noteBody);
    } else if (newText.hasOwnProperty("body")) {
      setEditableBody(newText.body);
      //Pass in existing title and new body
      props.onEdit(props.id, props.noteTitle, newText.body);
    }
  }

  return (
    <div className="note">
      {/* Editable note title */}
      <h1>
        <RIEInput
          value={editableTitle}
          change={handleTextChange}
          propName="title"
        />
      </h1>

      {/* Editable note body */}
      <p>
        <RIEInput
          value={editableBody}
          change={handleTextChange}
          propName="body"
        />
      </p>

      <DeleteButton
        className="delete-btn"
        onClick={() => props.onDelete(props.id)}
      />
    </div>
  );
}

export default Note;
