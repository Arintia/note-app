import React from 'react';
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
  const colorBtn = useSelector(state => state.notes.color);
  const notes = useSelector(state => state.notes.items);

  const [{ isOver }, deleteRef] = useDrop(() => ({
    accept: "note",
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  const deleteNote = id => {
    dispatch(removeNote(id));
  }

  const handleColor = e => {
    if(colorBtn !== null) {
      const oldBtn = document.querySelector(`[data-btnid="${colorBtn}"]`);
      oldBtn.innerHTML = "";
    }
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
              <NoteForm />  
            </div>
            <section className="notes-container">
              {notes.map(note => 
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
