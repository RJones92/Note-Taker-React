import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
// import exampleNotes from "../notes";

function App() {
  const [notes, setNotes] = useState([]);

  //When the React App component is mounted or updated, this function executes
  useEffect(() => {
    console.log("useEffect has been called");

    callBackEndAPI()
      .then((res) => {
        addNotes(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    function addNotes(notesFromDB) {
      console.log("Adding notes...");
      notesFromDB.map((note) => {
        return addNote(note);
      });
    }
  }, []);

  //Collects the data from the Express server, the route is defined in the proxy key-value pair in package.json
  async function callBackEndAPI() {
    console.log("callBackEndAPI has been called");
    const response = await fetch("/dataItems");
    const body = await response.json();

    console.log("HTTP status code: " + response.status);
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
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
      {notes.map((note, index) => (
        <Note
          key={index}
          id={index}
          noteTitle={note.noteTitle}
          noteBody={note.noteBody}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
