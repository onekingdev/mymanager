import { createSlice } from '@reduxjs/toolkit';

export const goals = createSlice({
  name: 'goals',
  initialState: {

    goalsList: [],
    subGoalsList: [],
    actionPlanList: [],
    selectedGoal: {},
    goalWorkspace: [],
    activeWorkspace: {},
    goalsListSuccess: false,
    goalsListFail: false,
    // Add goals
    goalsAddSuccess: false,
    goalsAddFail: false,
    // Edit goals
    goalsEditSuccess: false,
    goalsEditFail: false,
    // Delete goals
    goalsDeleteSuccess: false,
    goalsDeleteFail: false,
    actionPlanAddFail: false,
    actionPlanAddSuccess: false,
    actionPlanDeleteFail: false,
    actionPlanDeleteSuccess: false,

  },
  reducers: {
    // fetching goals
    fetchGoals: (state, action) => {
      state.goalsList = action?.payload;
    },
    activeWorkspace: (state, action) => {
      state.activeWorkspace = action?.payload;
    },
    goalWorkspace: (state, action) => {
      state.goalWorkspace = action.payload;
    },
    fetchSubGoals: (state, action) => {
      state.subGoalsList = action?.payload;
    },
    fetchActionPlan: (state, action) => {
      state.actionPlanList = action?.payload;
    },
    resetGoals: (state) => {
      state.goalsList = [];
    },
    selectGoal: (state, action) => {
      state.selectedGoal = action?.payload;
    },
    resetSubGoals: (state) => {
      state.subGoalsList = [];
    },
    resetActionPlan: (state) => {
      state.actionPlanList = [];
    },
    fetchGoalsSuccess: (state, action) => {
      state.goalsListSuccess = action?.payload;
    },
    fetchGoalsFail: (state, action) => {
      state.goalsListFail = action?.payload;
    },
    fetchGoalsStatusReset: (state, action) => {
      state.goalsListSuccess = false;
      state.goalsListSuccess = false;
    },

    //addin goals

    addGoalsSuccess: (state, action) => {
      state.goalsAddSuccess = action?.payload;
    },
    addGoalsFail: (state, action) => {
      state.goalsAddFail = action?.payload;
    },
    resetAddGoalsStatus: (state, action) => {
      state.goalsAddSuccess = false;
      state.goalsAddFail = false;
    },
    editGoalsSuccess: (state, action) => {
      state.goalsEditSuccess = action?.payload;
    },
    editGoalsFail: (state, action) => {
      state.goalsEditFail = action?.payload;
    },
    resetEditGoalsStatus: (state) => {
      state.goalsEditSuccess = false;
      state.goalsEditFail = false;
    },
    deleteGoalsSuccess: (state) => {
      state.goalsDeleteSuccess = true;
    },
    deleteGoalsFail: (state) => {
      state.goalsDeleteFail = true;
    },
    resetDeleteGoalsStatus: (state, action) => {
      state.goalsDeleteSuccess = false;
      state.goalsDeleteFail = false;
    },
    addActionPlanSuccess: (state, action) => {
      state.actionPlanAddSuccess = true;
    },
    addActionPlanFail: (state, action) => {
      state.actionPlanAddFail = true;
    },
    resetActionPlanStatus: (state, action) => {
      state.actionPlanAddSuccess = false;
      state.actionPlanAddFail = false;
      state.actionPlanDeleteFail = false;
      state.actionPlanDeleteSuccess = false;
    },
    deleteActionPlanSuccess: (state, action) => {
      state.actionPlanAddSuccess = true;
    },
    deleteActionPlanFail: (state, action) => {
      state.actionPlanAddFail = true;
    },
    populateActiveGoalWorkspace: (state, action) => {
      state.activeWorkspace = action.payload;
    }


  }
});

export const {
  // goals
  fetchGoals,
  populateActiveGoalWorkspace,
  activeWorkspace,
  fetchSubGoals,
  fetchActionPlan,
  goalWorkspace,
  selectGoal,
  resetSubGoals,
  resetGoals,
  resetActionPlan,
  fetchGoalsFail,
  fetchGoalsSuccess,
  fetchGoalsStatusReset,
  addGoalsFail,
  addGoalsSuccess,
  resetAddGoalsStatus,
  editGoalsFail,
  editGoalsSuccess,
  resetEditGoalsStatus,
  deleteGoalsFail,
  deleteGoalsSuccess,
  resetDeleteGoalsStatus,
  addActionPlanFail,
  deleteActionPlanFail,
  deleteActionPlanSuccess,
  addActionPlanSuccess,
  resetActionPlanStatus,

} = goals.actions;

export default goals.reducer;
