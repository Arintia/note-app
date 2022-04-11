import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import check from './assets/img/check.svg';
import ColorButton from './components/ColorButton/ColorButton';
import { setColor } from './redux/notes/NotesSlice';
import { colors } from './util/colors';


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
          {colors.map(color => 
            <ColorButton bgColor={color.bgColor} handleColor={handleColor} id={color.id} />  
          )}
        </div>
        <h6 className="version">v1.0.0</h6>
      </aside>
      <main>
          <form>
            <div className="note-input-container">
              <div className="note-input-box">
                <div className="search-container">
                  <img src={search} alt="search" className="search-btn" />
                  <input type="text" className="search-input" placeholder='Search' />
                </div>
                <textarea name="note-input" id="note-input" className="note-input">Write your note here...</textarea>
                <button className="submit-btn" type="submit">Gönder</button>
              </div>
            </div>
          </form>
      </main>            
      <footer>
        <p>Developed by <a href="https://github.com/Arintia" target="_blank" rel="noopener noreferrer">Yiğit Atak</a></p>
      </footer>
    </div>
  );
}

export default App;
