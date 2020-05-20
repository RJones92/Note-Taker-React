//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
  bodyParser.json()
);

//---------------------------MONGOOSE SETUP--------------------------------
mongoose.connect("mongodb://localhost:27017/notesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required as part of the schema."],
  },
  content: String,
});

//A model for new documents using the noteSchema. Effectively, a collection called notes (monggoose pluralises for you). "An instance of a model is called a document."
const Note = mongoose.model("Note", noteSchema);
//---------------------------END MONGOOSE SETUP--------------------------------

//---------------------------SAMPLE DATA SETUP--------------------------------
// Uncomment the code below to insert sample data into the DB
// const note1 = new Note({
//   title: "Test1",
//   content: "This is the first test note",
// });
// const note2 = new Note({
//   title: "Test2",
//   content: "This is the second test note",
// });
// note1.save();
// note2.save();
//---------------------------END SAMPLE DATA SETUP--------------------------------

app.get("/dataItems", function (req, res) {
  Note.find(function (err, notes) {
    if (err) {
      console.log(err);
    } else {
      // mongoose.connection.close();
      res.send(notes);
    }
  });
});

app.post("/dataItems", function (req, res) {
  console.log(req.body);

  const newTitle = req.body.title;
  const newContent = req.body.content;
  const newNote = new Note({
    title: newTitle,
    content: newContent,
  });
  newNote.save();
  res.send(newNote);
});

app.delete("/dataItems/:noteId/delete", function (req, res) {
  console.log("Deleting note with DB ID " + req.params.noteId);

  Note.deleteOne({ _id: req.params.noteId }, function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.send(req.params);
});

app.put("/dataItems/:noteId/edit", function (req, res) {
  console.log("app.put has been called");

  const id = req.params.noteId;
  var newTitle = req.body.title;
  console.log("Updating note with DB ID " + id);
  console.log("newTitle is " + newTitle);

  const options = { new: true };

  Note.findOneAndUpdate({ _id: id }, { title: newTitle }, options, function (
    err,
    response
  ) {
    if (err) {
      console.log(err);
    } else {
      console.log("Note updated to...");
      console.log(response);
      res.send(response);
    }
  });
});

//Start the server listening on port 5000
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
