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
            state.items.push({id: uid(), text, bgColor: state.color});
        },
        removeNote: (state, action) => {
            const {id} = action.payload;
            state.items = state.items.filter(note => note.id !== id);
        },
        setColor: (state, action) => {
            state.color = action.payload;
        }
    }
});

export const { addNote, removeNote, setColor } = NotesSlice.actions;
export default NotesSlice.reducer;