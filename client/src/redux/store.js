import { configureStore } from '@reduxjs/toolkit';
import NotesSlice from './notes/NotesSlice';

export const store = configureStore({
    reducer: {
        notes: NotesSlice
    }
});

