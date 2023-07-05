import { createSlice } from '@reduxjs/toolkit';

const journal = createSlice({
    name: 'journal',
    initialState: {
      journalList:[],
      journalCategories:[],
    },
  
    reducers: {
      journalListReducer: (state, action) => {
        state.journalList = action?.payload;
      },
      journalCategoriesReducer: (state, action) => {
        state.journalCategories = action?.payload;
      },
      
    }
  });
  
  export const {
    journalListReducer,
    journalCategoriesReducer
  } = journal.actions;
  
  export default journal.reducer;
  