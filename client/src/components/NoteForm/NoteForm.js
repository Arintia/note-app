import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import search from '../../assets/img/search.png';
import { addNote } from '../../redux/notes/NotesSlice';

function NoteForm({searchKey, setSearchKey}) {
    const dispatch = useDispatch();
    const [noteInput, setNoteInput] = useState("");
    const [length, setLength] = useState(0);
    const charCountBtn = document.getElementsByClassName("character-counter")[0];

    const handleSubmit = e => {
        e.preventDefault();
        if(!noteInput) return;
        dispatch(addNote({ text: noteInput }));
        setNoteInput("");
    }

    useEffect(() => {
        setLength(noteInput.length);
        if(charCountBtn) {
            if(noteInput.length > 200 && noteInput.length < 255 && !charCountBtn.classList.contains("near-limit")) {
                charCountBtn.classList.add("near-limit");
            }
            else if(noteInput.length > 200 && noteInput.length < 255 && charCountBtn.classList.contains("at-limit")) {
                charCountBtn.classList.remove("at-limit");
            }
            else if(noteInput.length === 255 && !charCountBtn.classList.contains("at-limit")) {
                charCountBtn.classList.add("at-limit");
            } 
            else if(noteInput.length < 200 && (charCountBtn.classList.contains("near-limit") || charCountBtn.classList.contains("at-limit"))) {
                charCountBtn.classList.remove("near-limit");
                charCountBtn.classList.remove("at-limit");
            }
        }
    }, [noteInput])

    return (
        <form onSubmit={handleSubmit}>
            <div className="note-input-box">
                <div className="search-container">
                    <img src={search} alt="search" className="search-btn" />
                    <input type="text" value={searchKey} onChange={e => setSearchKey(e.target.value)} className="search-input" placeholder='Search' />
                </div>
                <div className="input-container">
                    <span className="character-counter">{length}/255</span>
                    <textarea 
                        name="note-input" 
                        placeholder="Write your note here..."
                        id="note-input" 
                        className="note-input"
                        maxLength={255}
                        value={noteInput}
                        onChange={e => setNoteInput(e.target.value)}
                    >
                    </textarea>
                </div>
                
                <button className="submit-btn" type="submit">Submit</button>
            </div>
        </form>
    );
}

export default NoteForm;