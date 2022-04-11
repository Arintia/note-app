import { createSlice } from "@reduxjs/toolkit";

export const NotesSlice = createSlice({
    name: "notes",
    initialState: {
        items: [

        ]
    },
    reducers: {
        addNote: (state,action) => {
            state.items.push(action.payload);
        }
    }
});

export const { addNote } = NotesSlice.actions;
export default NotesSlice.reducer;