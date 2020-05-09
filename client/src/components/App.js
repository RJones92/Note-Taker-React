import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import exampleNotes from "../notes";

function App() {
  const [serverBody, setServerBody] = useState(null);
  const [notes, setNotes] = useState(exampleNotes);

  //When the React App componenet is mounted or updated, this function executes
  useEffect(() => {
    callBackEndAPI()
      .then((res) => setServerBody(res.express))
      .catch((err) => console.log(err));
  });

  //Collects the data from the Express server, the route is defined in the proxy key-value pair in package.json
  async function callBackEndAPI() {
    const response = await fetch("/express_backend");
    const body = await response.json();
    console.log(response);

    if (response.status !== 200) {
      throw Error(body.message);
    } else {
      return body;
    }
  }

  function addNote(note) {
    setNotes((prevValue) => {
      return [...prevValue, { noteTitle: note.title, noteBody: note.content }];
    });
  }

  function deleteNote(id) {
    setNotes((prevValue) => {
      return prevValue.filter((value, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {/* Creates the notes */}
      {notes.map((note, index) => (
        <Note
          key={index}
          id={index}
          noteTitle={note.noteTitle}
          noteBody={note.noteBody}
          onDelete={deleteNote}
        />
      ))}
      <p>{serverBody}</p>
      <Footer />
    </div>
  );
}

export default App;
