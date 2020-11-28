import "./App.css"
import MyInputField from "./InputField";
import React from 'react';
import LittleNote from "./LittleNote";
import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {notes:[ ], rightestNote: ''};
  }

  handleNote(newNote) { //we use the function because we want to use the old states with the new one. If we wanted to replace the state then we wouldn't use a function.
    this.setState((state) => {
      return { notes: [newNote, ...state.notes] }
    });
  }

  changeCurrentNote = (updatedNote) => {
    this.state.notes.map((note) => {
      if (note.key == updatedNote.userNoteKey) {
        note.userNoteDate = updatedNote.userNoteDate;
        note.userNoteText = updatedNote.userNoteText;
        note.userNoteTitle = updatedNote.userNoteTitle;
      }
      else {
        console.log('no');
      }
    });
  }

  clearNote = (singleNote) => {
    swalWithBootstrapButtons.fire({
      title: 'Are you sure you want to delete your note?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your note has been deleted.',
          'success'
        )
        const filteredNoteArray = this.state.notes.filter((item) => { return (item.key != singleNote) });
        this.setState({ notes: filteredNoteArray });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your note is safe :)',
          'error'
        )
      }
    })
  }

  render() {
    return (
      <div>
        <MyInputField onNewNote={(newNote) => this.handleNote(newNote)} />
        <LittleNote deleteIt={(itemKey) => this.clearNote(itemKey)} notes={this.state.notes} changeNote={(updatedNote) => {this.changeCurrentNote(updatedNote)}}/>
      </div>
    );
  }
}

export default App;
