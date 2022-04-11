import { createSlice } from "@reduxjs/toolkit";

export const NotesSlice = createSlice({
    name: "notes",
    initialState: {
        items: [

        ],
        color: "0"
    },
    reducers: {
        addNote: (state,action) => {
            state.items.push(action.payload);
        },
        setColor: (state, action) => {
            state.color = action.payload;
        }
    }
});

export const { addNote, setColor } = NotesSlice.actions;
export default NotesSlice.reducer;