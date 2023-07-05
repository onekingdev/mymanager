import { createSlice } from '@reduxjs/toolkit';

export const progression = createSlice({
  name: 'progression',
  initialState: {
    // Progression
    isProgressionLoading: false,
    progressionList: [],
    progressionListSuccess: false,
    progressionListFail: false,
    // Add Progression
    progressionAddSuccess: false,
    progressionAddFail: false,
    // Delete Progression
    progressionDeleteSuccess: false,
    progressionDeleteFail: false,
    //Edit Progression
    progressionEditSuccess: false,
    progressionEditFail: false,
    //progressionCategories
    progressionCategories: [],
    progressionCategoriesAddSuccess: false,
    progressionCategoriesAddFail: false,

    progressionCategoriesDeleteSuccess: false,
    progressionCategoriesDeleteFail: false,

    progressionCategoriesEditSuccess: false,
    progressionCategoriesEditFail: false,
    //
    progressionCategoriesRank: [],
    progressionCategoriesRankAddSuccess: false,
    progressionCategoriesRankAddFail: false,
    progressionCategoriesRankDeleteSuccess: false,
    progressionCategoriesRankDeleteFail: false,
    progressionCategoriesRankEditSuccess: false,
    progressionCategoriesRankEditFail: false,
    smartListRanking: []
  },
  reducers: {
    // fetching progression
    fetchProgression: (state, action) => {
      state.progressionList = action?.payload;
    },

    fetchProgressionSuccess: (state, action) => {
      state.progressionListSuccess = action?.payload;
    },
    fetchProgressionFail: (state, action) => {
      state.progressionListFail = action?.payload;
    },
    fetchProgressionStatusReset: (state, action) => {
      state.progressionListSuccess = false;
      state.progressionListSuccess = false;
    },

    //addin progression

    addProgressionSuccess: (state, action) => {
      state.progressionAddSuccess = action?.payload;
    },
    addProgressionFail: (state, action) => {
      state.progressionAddFail = action?.payload;
    },
    resetAddProgressionStatus: (state, action) => {
      state.progressionAddSuccess = false;
      state.progressionAddFail = false;
    },
    //delete progression
    deleteProgressionSuccess: (state, action) => {
      state.progressionDeleteSuccess = action?.payload;
    },
    deleteProgressionFail: (state, action) => {
      state.progressionDeleteFail = action?.payload;
    },
    resetDeleteProgressionStatus: (state) => {
      state.progressionDeleteSuccess = false;
      state.progressionDeleteFail = false;
    },
    //edit progression
    editProgressionSuccess: (state, action) => {
      state.progressionEditSuccess = action?.payload;
    },
    editProgressionFail: (state, action) => {
      state.progressionEditFail = action?.payload;
    },
    resetEditProgressionStatus: (state) => {
      state.progressionEditSuccess = false;
      state.progressionEditFail = false;
    },

    // fetch progression CAtegories
    fetchProgressionCategories: (state, action) => {
      state.progressionCategories = action?.payload;
    },
    addProgressionCategoriesSuccess: (state) => {
      state.progressionCategoriesAddSuccess = true;
    },
    addProgressionCategoriesFail: (state, action) => {
      state.progressionCategoriesAddFail = true;
    },
    resetAddProgressionCategoriesStatus: (state) => {
      state.progressionCategoriesAddFail = false;
      state.progressionCategoriesAddSuccess = false;
    },
    deleteProgressionCategoriesSuccess: (state) => {
      state.progressionCategoriesDeleteSuccess = true;
    },
    deleteProgressionCategoriesFail: (state) => {
      state.progressionCategoriesDeleteFail = true;
    },
    resetDeleteProgressionCategoriesStatus: (state) => {
      state.progressionCategoriesDeleteFail = false;
      state.progressionCategoriesDeleteSuccess = false;
    },
    editProgressionCategoriesSuccess: (state) => {
      state.progressionCategoriesEditSuccess = true;
    },
    editProgressionCategoriesFail: (state) => {
      state.progressionCategoriesEditFail = true;
    },
    resetEditProgressionCategoriesStatus: (state) => {
      state.progressionCategoriesEditFail = false;
      state.progressionCategoriesEditSuccess = false;
    },

    //fetch rank
    fetchProgressionCategoriesRank: (state, action) => {
      state.progressionCategoriesRank = action?.payload;
    },
    resetProgressionCategoriesRank: (state) => {
      state.progressionCategoriesRank = [];
    },

    addProgressionCategoriesRankSuccess: (state) => {
      state.progressionCategoriesRankAddSuccess = true;
    },
    addProgressionCategoriesRankFail: (state) => {
      state.progressionCategoriesRankAddFail = true;
    },
    resetAddProgressionCategoriesRankStatus: (state) => {
      state.progressionCategoriesRankAddSuccess = false;
      state.progressionCategoriesRankAddFail = false;
    },
    editProgressionCategoriesRankSuccess: (state) => {
      state.progressionCategoriesRankEditSuccess = true;
    },
    editProgressionCategoriesRankFail: (state) => {
      state.progressionCategoriesRankEditFail = true;
    },
    resetEditProgressionCategoriesRankStatus: (state) => {
      state.progressionCategoriesRankEditFail = false;
      state.progressionCategoriesRankEditSuccess = false;
    },

    deleteProgressionCategoriesRankSuccess: (state) => {
      state.progressionCategoriesRankDeleteSuccess = true;
    },
    deleteProgressionCategoriesRankFail: (state) => {
      state.progressionCategoriesRankDeleteFail = true;
    },
    resetDeleteProgressionCategoriesRankStatus: (state) => {
      state.progressionCategoriesRankDeleteFail = false;
      state.progressionCategoriesRankDeleteSuccess = false;
    },
    addRankingForSmartList: (state, action) => {
      state.smartListRanking.push(action.payload);
    },
    deleteRankingForSmartList: (state, action) => {
      const index = state.smartListRanking.findIndex(
        (item) => item.ranking == action.payload.ranking
      );
      if (index != -1) state.smartListRanking.splice(index, 1);
    },
    deleteCategoryForSmartList: (state, action) => {
      state.smartListRanking = state.smartListRanking.filter(
        (item) => item.category != action.payload
      );
    },
    deleteProgressionForSmartList: (state, action) => {
      state.smartListRanking = state.smartListRanking.filter(
        (item) => item.progression != action.payload
      );
    },
    setSmartListRankingInit: (state, action) => {
      state.smartListRanking = [];
    },
    setSmartList: (state, action) => {
      state.smartListRanking = action.payload;
    }
  }
});

export const {
  // progression
  fetchProgression,
  fetchProgressionFail,
  fetchProgressionSuccess,
  fetchProgressionStatusReset,
  addProgressionFail,
  addProgressionSuccess,
  resetAddProgressionStatus,
  deleteProgressionFail,
  deleteProgressionSuccess,
  resetDeleteProgressionStatus,
  editProgressionFail,
  editProgressionSuccess,
  resetEditProgressionStatus,
  //categories
  fetchProgressionCategories,
  addProgressionCategoriesSuccess,
  addProgressionCategoriesFail,
  resetAddProgressionCategoriesStatus,
  deleteProgressionCategoriesFail,
  deleteProgressionCategoriesSuccess,
  resetDeleteProgressionCategoriesStatus,
  editProgressionCategoriesFail,
  editProgressionCategoriesSuccess,
  resetEditProgressionCategoriesStatus,
  //categories rank
  fetchProgressionCategoriesRank,
  resetProgressionCategoriesRank,
  fetchProgressionCategoriesRankSuccess,
  fetchProgressionCategoriesRankFail,
  addProgressionCategoriesRankFail,
  addProgressionCategoriesRankSuccess,
  resetAddProgressionCategoriesRankStatus,
  deleteProgressionCategoriesRankSuccess,
  deleteProgressionCategoriesRankFail,
  resetDeleteProgressionCategoriesRankStatus,
  editProgressionCategoriesRankFail,
  editProgressionCategoriesRankSuccess,
  resetEditProgressionCategoriesRankStatus,
  addRankingForSmartList,
  deleteRankingForSmartList,
  deleteCategoryForSmartList,
  deleteProgressionForSmartList,
  setSmartListRankingInit,
  setSmartList
} = progression.actions;

export default progression.reducer;
