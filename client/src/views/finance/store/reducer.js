import { createSlice } from '@reduxjs/toolkit';

export const finance = createSlice({
  name: 'finance',
  initialState: {
    // Income
    IncomeList: [],
    categoryList: [],

    // Add Income
    incomeAddSuccess: false,
    incomeAddFail: false,
    resetAddIncomeStatus: false,


    // Delete Income
    incomeDeleteSuccess: false,
    incomeDeleteFail: false,

  },

  reducers: {
    // fetching Income
    fetchIncome: (state, action) => {
      state.IncomeList = action?.payload;
    },
    fetchAllCategories: (state, action) => {
      state.categoryList = action?.payload;
    },
  }
});

export const {
  // Income
  fetchIncome,
  fetchAllCategories
} = finance.actions;

export default finance.reducer;
