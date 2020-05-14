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
        return renderNotes(note);
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

  //Adds a note to DB
  function addNote(note) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: note.title,
        content: note.content,
      }),
    };

    fetch("/dataItems", requestOptions)
      .then((res) => res.json())
      //using the JSON response we'll now add the note to the Array
      .then((newNote) => renderNotes(newNote));
  }

  //Adds a note to notes array
  function renderNotes(note) {
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
