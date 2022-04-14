import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import check from './assets/img/check.svg';
import trash from './assets/img/trash.svg';
import ColorButton from './components/ColorButton/ColorButton';
import Note from './components/Note/Note';
import NoteForm from './components/NoteForm/NoteForm';
import { setColor, removeNote } from './redux/notes/NotesSlice';
import { colors } from './util/colors';

function App() {
  const dispatch = useDispatch();
  /** 
  * color state stores the id(number) of the button that's selected as the background color
  */
  const colorBtn = useSelector(state => state.notes.color);
  /**
   * items state is an array of objects. 
   * It has 3 properties.
   * @param {Number} id - Unique ID for the object. This is generated automatically using uid.
   * @param {String} text - Body of the note. This is passed to NotesSlice as the payload.
   * @param {Number} color - This is a state. Refer to colorBtn comment for further information. 
   */
  const notes = useSelector(state => state.notes.items);
  // This state is passed onto NoteForm.js for note filtering. 
  const [searchKey, setSearchKey] = useState("");

  /**
   * useDrop is a hook from react-dnd.
   * You can specify what types of data items drop operation will accept. 
   */
  const [{ isOver }, deleteRef] = useDrop(() => ({
    accept: "note",
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  /**
   * deleteNote is a custom method for handling drag-and-drop.
   * Drag-and-drop results in the deletion of a note. 
   * removeNote is dispatched with id as the payload. Removal is handled within the slice.
   * @param {*} id - ID of the note to be removed from the items state.
   */
  const deleteNote = id => {
    dispatch(removeNote(id));
  }


  const handleColor = e => {
    /**
     * If a color button is already selected, we need to remove the "tick mark" from it.
     *  @param {Number} btnid - This is assigned while looping through the item state array with the unique ID(notes.id).
     */
    if(colorBtn !== null) {
      const oldBtn = document.querySelector(`[data-btnid="${colorBtn}"]`);
      oldBtn.innerHTML = "";
    }
    // Add the "tick mark" to the new color and set the state.
    e.target.innerHTML = `<img src=${check} alt="checked" />`;
    dispatch(setColor(e.target.dataset.btnid));
  }

  return (
      <div className="app-container">
        <aside className="side-bar">
          <h2 className="app-header">
            Note App
          </h2>
          <p>Please select a color for your note down below.</p>
          <div className="color-container">
            {colors.map(color => 
              <ColorButton key={color.id} bgColor={color.bgColor} handleColor={handleColor} id={color.id} />  
            )}
          </div>
          <h6 className="version">v1.0.0</h6>
        </aside>
          <main>  
            <div className="note-input-container">
              <NoteForm searchKey={searchKey} setSearchKey={setSearchKey} />  
            </div>
            <section className="notes-container">
              {notes.map(note =>
              note.text.includes(searchKey) && 
                <Note 
                  key={note.id} 
                  id={note.id}
                  deleteNote={deleteNote}
                  bgColor={note.bgColor} 
                  text={note.text} 
                /> 
              )}
            </section>
            <aside className="delete-btn">
              <button><img src={trash} alt="delete" ref={deleteRef} /></button>
            </aside>
          </main>          
        <footer>
          <p>Developed by <a href="https://github.com/Arintia" target="_blank" rel="noopener noreferrer">Yigit Atak</a></p>
        </footer>
      </div>
  );
}

export default App;
