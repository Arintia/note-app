import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import search from '../../assets/img/search.png';
import { addNote } from '../../redux/notes/NotesSlice';

function NoteForm({searchKey, setSearchKey}) {
    const dispatch = useDispatch();
    /**
     * noteInput is a state that stores the text body of the note to be sent over to NotesSlice.
     */
    const [noteInput, setNoteInput] = useState("");
    /**
     * length is a state that stores the length of noteInput. It's used to keep track of the current character count.
     */
    const [length, setLength] = useState(0);
    /**
     * charCountBtn is the node for the character counter. This is used to manipulate the style of the character counter when it
     * reaches certain thresholds.
     */
    const charCountBtn = document.getElementsByClassName("character-counter")[0];

    const handleSubmit = e => {
        e.preventDefault();
        if(!noteInput) return; // return if the input is empty
        dispatch(addNote({ text: noteInput })); // dispatch addNote and set state. note body is sent as an object.
        setNoteInput(""); // reset input.
    }

    /**
     * useEffect hook is called every time noteInput changes. In simpler words, this hook is called every time someone types
     * or deletes something. This hook handles the manipulation of colors as the user types or deletes something.
     * @param nearlimit - near-limit class is for when the character length is between 200 and 255, both excluded.
     * @param atlimit - at-limit class is for when the user has reached the max allowed characters.(255)
     */
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