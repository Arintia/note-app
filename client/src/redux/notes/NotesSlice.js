import { createSlice } from "@reduxjs/toolkit";
import { uid } from "uid";

export const NotesSlice = createSlice({
    name: "notes",
    initialState: {
        items: [
            
        ],
        color: "0"
    },
    reducers: {
        addNote: (state,action) => {
            const { text } = action.payload;
            const newItem = {
                id: uid(),
                text,
                bgColor: state.color
            };
            state.items.push(newItem);
            localStorage.setItem("notes", JSON.stringify(state.items));
        },
        setNote: (state,action) => {
            state.items = action.payload;
        },
        removeNote: (state, action) => {
            const {id} = action.payload;
            state.items = state.items.filter(note => note.id !== id);
            localStorage.setItem("notes", JSON.stringify(state.items));
        },
        setColor: (state, action) => {
            state.color = action.payload;
        }
    }
});

export const { addNote, removeNote, setColor, setNote } = NotesSlice.actions;
export default NotesSlice.reducer;