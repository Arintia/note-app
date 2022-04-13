import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import search from '../../assets/img/search.png';
import { addNote } from '../../redux/notes/NotesSlice';

function NoteForm() {
    const dispatch = useDispatch();
    const [noteInput, setNoteInput] = useState("Write your note here...");
    const [length, setLength] = useState(0);

    const handleSubmit = e => {
        e.preventDefault();
        if(noteInput === "Write your note here..." || !noteInput) return;
        dispatch(addNote({ text: noteInput }));
        setNoteInput("Write your note here...");
    }

    useEffect(() => {
        setLength(noteInput.length);
    }, [noteInput])

    return (
        <form onSubmit={handleSubmit}>
            <div className="note-input-box">
                <div className="search-container">
                    <img src={search} alt="search" className="search-btn" />
                    <input type="text" className="search-input" placeholder='Search' />
                </div>
                <div className="input-container">
                    <span className="character-counter">{length}/255</span>
                    <textarea 
                        name="note-input" 
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