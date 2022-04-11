import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import check from './assets/img/check.svg';
import { setColor } from './redux/notes/NotesSlice';

function App() {
  const dispatch = useDispatch();
  const colorBtn = useSelector(state => state.notes.color);

  const handleColor = e => {
    if(colorBtn!== null) {
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
          <button 
            className="color"
            style={{background: "#34568b"}}
            onClick={handleColor}
            data-btnid="0"
          >
          </button>
          <button 
            className="color"
            style={{background: "#FF6F61"}}
            onClick={handleColor}
            data-btnid="1"
          >
          </button>
          <button 
            className="color"
            style={{background: "#ff9de2"}}
            onClick={handleColor}
            data-btnid="2"
          >
          </button>
          <button 
            className="color"
            style={{background: "#88B04B"}}
            onClick={handleColor}
            data-btnid="3"
          >
          </button>
          <button 
            className="color"
            style={{background: "#ffe477"}}
            onClick={handleColor}
            data-btnid="4"
          >
          </button>
        </div>
        <h6 className="version">v1.0.0</h6>
      </aside>

      <footer>
        <p>Developed by <a href="https://github.com/Arintia" target="_blank" rel="noopener noreferrer">Yiğit Atak</a></p>
      </footer>
    </div>
  );
}

export default App;
