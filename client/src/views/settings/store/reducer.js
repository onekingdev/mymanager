import { createSlice } from '@reduxjs/toolkit';

export const settings = createSlice({
  name: 'settings',
  initialState: {
    // add new Employee
    setSettings: {
      loading: false,
      success: false,
      error: null
    },
    updateSettings: {
      loading: false,
      success: false,
      error: null
    },
    user:{}
  },
  reducers: {
    getUserReducer: (state, action) => {
      state.user = action?.payload;
    },
  }
});

export const {
  getUserReducer
} = settings.actions

export default settings.reducer;
