import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  //When the React App component is mounted or updated, this function executes
  useEffect(() => {
    callBackEndAPI()
      .then((res) => {
        addNotes(res);
      })
      .catch((err) => {
        console.log(err);
      });

    function addNotes(notesFromDB) {
      notesFromDB.map((note) => {
        return addNoteToArray(note);
      });
    }
  }, []);

  //Collects the data from the Express server, the route is defined in the proxy key-value pair in package.json
  async function callBackEndAPI() {
    const response = await fetch("/dataItems");
    const body = await response.json();

    console.log("Status code from DB: " + response.status);
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  //Adds a note to DB
  function addNotetoDB(note) {
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
      .then((newNote) => addNoteToArray(newNote));
  }

  //Adds a note to notes array
  function addNoteToArray(note) {
    setNotes((prevValue) => {
      return [
        ...prevValue,
        { id: note._id, noteTitle: note.title, noteBody: note.content },
      ];
    });
  }

  //Deletes a note from the DB
  function deleteNoteFromDB(deletedNoteId) {
    const requestOptions = {
      method: "DELETE",
    };
    fetch("/dataItems/" + deletedNoteId + "/delete", requestOptions)
      .then((res) => res.json())
      //using the JSON response we'll now delete the note from the Array
      .then((deletedNote) => {
        deleteNoteFromArray(deletedNote.noteId);
      });
  }

  //Deletes a note from the notes Array
  function deleteNoteFromArray(deletedNoteId) {
    setNotes((prevValue) => {
      return prevValue.filter((x) => {
        return x.id !== deletedNoteId;
      });
    });
  }

  //Updates note in DB and array
  function editNote(id, newTitle, newBody) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        content: newBody,
      }),
    };

    //edit in the DB
    fetch("/dataItems/" + id + "/edit", requestOptions)
      .then((res) => res.json())
      //using the JSON response we'll now update the note in the Array
      .then((updatedNote) => {
        setNotes(() => {
          return notes.map((note) => {
            return note.id === updatedNote._id
              ? {
                  ...note,
                  noteTitle: updatedNote.title,
                  noteBody: updatedNote.content,
                }
              : note;
          });
        });
      });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNotetoDB} />
      {notes.map((note, index) => {
        return (
          <Note
            key={index}
            id={note.id}
            noteTitle={note.noteTitle}
            noteBody={note.noteBody}
            onDelete={deleteNoteFromDB}
            onEdit={editNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
