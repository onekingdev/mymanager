import { createSlice } from '@reduxjs/toolkit';

export const retention = createSlice({
  name: 'retention',
  initialState: {
    // Retention
    retentionListByAttendence: [],
    retentionListByLastContacted:[],
    // Add Retention
    retentionAddSuccess: false,
    retentionAddFail: false,
    // Delete Retention
    retentionDeleteSuccess: false,
    retentionDeleteFail: false,
    //Edit Retention
    retentionEditSuccess: false,
    retentionEditFail: false,

    
  },
  reducers: {
    // fetching retention
    
    fetchRetentionByAttendance: (state, action) => {
      state.retentionListByAttendence = action?.payload;
    },
    fetchRetentionByLastContacted: (state, action) => {
      state.retentionListByLastContacted = action?.payload;
    },
    //addin retention
    addRetentionSuccess: (state, action) => {
      state.retentionAddSuccess = action?.payload;
    },
    addRetentionFail: (state, action) => {
      state.retentionAddFail = action?.payload;
    },
    resetAddRetentionStatus: (state, action) => {
      state.retentionAddSuccess = false;
      state.retentionAddFail = false;
    },
    //delete retention
    deleteRetentionSuccess: (state, action) => {
      state.retentionDeleteSuccess = action?.payload;
    },
    deleteRetentionFail: (state, action) => {
      state.retentionDeleteFail = action?.payload;
    },
    resetDeleteRetentionStatus: (state) => {
      state.retentionDeleteSuccess = false;
      state.retentionDeleteFail = false;
    },
    //edit retention
    editRetentionSuccess: (state, action) => {
      state.retentionEditSuccess = action?.payload;
    },
    editRetentionFail: (state, action) => {
      state.retentionEditFail = action?.payload;
    },
    resetEditRetentionStatus: (state) => {
      state.retentionEditSuccess = false;
      state.retentionEditFail = false;
    },
  }
});

export const {
  // retention
  fetchRetention,
  fetchRetentionByLastContacted,
  fetchRetentionByAttendance,
  addRetentionFail,
  addRetentionSuccess,
  resetAddRetentionStatus,
  deleteRetentionFail,
  deleteRetentionSuccess,
  resetDeleteRetentionStatus,
  editRetentionFail,
  editRetentionSuccess,
  resetEditRetentionStatus,
  
} = retention.actions;

export default retention.reducer;
