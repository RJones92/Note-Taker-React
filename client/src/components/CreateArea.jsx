import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [note, setNote] = useState({ title: "", content: "" });
  const [expandArea, setExpandArea] = useState(false);

  function changeNote(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    //Reset the notetaking area to blank
    setNote({ title: "", content: "" });
    setExpandArea(false);
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">
        {expandArea ? (
          <input
            onChange={changeNote}
            value={note.title}
            name="title"
            placeholder="Title"
            autoComplete="no"
          />
        ) : null}
        <textarea
          onClick={() => setExpandArea(true)}
          onChange={changeNote}
          value={note.content}
          name="content"
          placeholder="Take a note..."
          rows={expandArea ? "3" : "1"}
          autoComplete="no"
        />
        <Zoom in={expandArea}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
