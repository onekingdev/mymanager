import * as api from './api';
import {
  fetchGoals,
  activeWorkspace,
  resetGoals,
  fetchSubGoals,
  selectGoal,
  goalWorkspace,
  fetchActionPlan,
  resetActionPlan,
  deleteGoalsSuccess,
  deleteGoalsFail,
  resetDeleteGoalsStatus,
  addGoalsFail,
  addGoalsSuccess,
  resetAddGoalsStatus,
  editGoalsFail,
  editGoalsSuccess,
  resetEditGoalsStatus,
  addActionPlanSuccess,
  addActionPlanFail,
  deleteActionPlanFail,
  deleteActionPlanSuccess,
  resetActionPlanStatus,
  populateActiveGoalWorkspace,
} from './reducer';
//parent goals
export const goalsFetchAction = (id, type) => async (dispatch) => {
  try {
    type === "reset" && dispatch(resetGoals())
    const { data } = await api.fetchGoals(id);
    if (data?.success) {
      dispatch(fetchGoals(data.data));
    }
    else {
      dispatch(fetchGoals([]))
    }

  } catch (error) { }
};
export const subGoalsFetchAction = (id) => async (dispatch) => {
  try {

    const { data } = await api.fetchSubGoals(id);
    if (data?.success) {
      dispatch(fetchSubGoals(data.data));
    }
    else {
      dispatch(fetchSubGoals([]))
    }

  } catch (error) { }
};
export const activeWorkspaceSetAction = (payload) => async (dispatch) => {
  try {
    dispatch(activeWorkspace(payload))
  }
  catch
  {

  }
};
export const actionPlanFetchAction = (id) => async (dispatch) => {
  try {
    dispatch(resetActionPlan())
    const { data } = await api.fetchActionPlan(id);
    if (data?.success) {
      dispatch(fetchActionPlan(data.data));
    }
    else {
      dispatch(fetchActionPlan([]))
    }

  } catch (error) { }
};
export const actionPlanAddAction = (id, workspaceId, payload, notify) => async (dispatch) => {
  try {
    const { data } = await api.addActionPlan(id, payload);
    if (notify) {
      if (data.success === true) {
        dispatch(addActionPlanSuccess(true));
      } else {
        dispatch(addActionPlanFail(true));
      }
    }

    dispatch(resetActionPlanStatus());
    dispatch(goalsFetchAction(workspaceId));
    dispatch(fetchGoal(id))
    dispatch(subGoalsFetchAction(id))
  } catch (error) { }
};
export const actionPlanDeleteAction = (id, workspaceId,notify) => async (dispatch) => {
  try {
    const { data } = await api.deleteActionPlan(id);
    if (notify) {
      if (data.success === true) {
        dispatch(deleteActionPlanSuccess(true));
      } else {
        dispatch(deleteActionPlanFail(true));
      }
    }
    dispatch(goalsFetchAction(workspaceId))
    dispatch(resetActionPlanStatus());
  } catch (error) { }
};
export const goalsAddAction = (workSpaceId, type, payload) => async (dispatch) => {
  try {
    const { data } = await api.addGoals(type, payload);
    if (data.success === true) {
      dispatch(addGoalsSuccess(true));
    } else {
      dispatch(addGoalsFail(true));
    }
    dispatch(resetAddGoalsStatus());
    dispatch(goalsFetchAction(workSpaceId));
  } catch (error) { }
};
export const subGoalsAddAction = (parentId, workSpaceId, type, payload) => async (dispatch) => {
  try {
    const { data } = await api.addSubGoals(parentId, type, payload);
    if (data.success === true) {
      dispatch(addGoalsSuccess(true));
    } else {
      dispatch(addGoalsFail(true));
    }
    dispatch(resetAddGoalsStatus());
    dispatch(goalsFetchAction(workSpaceId));
    parentId && dispatch(subGoalsFetchAction(parentId))
  } catch (error) { }
};
export const goalsEditAction = (id, workspaceId, payload) => async (dispatch) => {
  try {
    const { data } = await api.editGoals(payload, id);
    if (data.success === true) {
      dispatch(editGoalsSuccess(true));
    } else {
      dispatch(editGoalsFail(true));
    }
    dispatch(resetEditGoalsStatus())
    dispatch(goalsFetchAction(workspaceId));

  } catch (error) { }
};
export const goalsEditActionMuted = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.editGoals(payload, id);

  } catch (error) { }
};
export const subGoalsEditAction = (id, payload, parentId) => async (dispatch) => {
  try {
    const { data } = await api.editGoals(payload, id);
    if (data.success === true) {
      dispatch(editGoalsSuccess(true));
    } else {
      dispatch(editGoalsFail(true));
    }
    dispatch(fetchGoal(parentId))
    dispatch(resetEditGoalsStatus())
    dispatch(subGoalsFetchAction(parentId));

  } catch (error) { }
};
export const goalsDeleteAction = (workspaceId, id) => async (dispatch) => {
  try {
    const { data } = await api.deleteGoals(id);
    if (data.success === true) {
      dispatch(deleteGoalsSuccess());
    } else {
      dispatch(deleteGoalsFail());
    }
    dispatch(resetDeleteGoalsStatus());
    dispatch(goalsFetchAction(workspaceId));
  } catch (error) { }
};
export const subGoalsDeleteAction = (id, parentId) => async (dispatch) => {
  try {
    const { data } = await api.deleteGoals(id);
    if (data.success === true) {
      dispatch(deleteGoalsSuccess());
    } else {
      dispatch(deleteGoalsFail());
    }
    dispatch(resetDeleteGoalsStatus());
    dispatch(subGoalsFetchAction(parentId));
  } catch (error) {
  }
};
export const fetchGoal = (id) => async (dispatch) => {
  try {
    const { data } = await api.getGoal(id);
    if (data.success) {
      dispatch(selectGoal(data.data))
      dispatch(subGoalsFetchAction(id))
    }
  }
  catch {
  }
}
export const setGoalAction = (goal) => async (dispatch) => {
  dispatch(selectGoal(goal))
}
export const fetchGoalWorkspaceAction = (type) => async (dispatch) => {
  try {
    const response = await api.fetchGoalWorkspace();
    if (response.data.data) {
      dispatch(goalWorkspace(response.data.data))
    }
    if(response.data.data.length>0&&type==="initialFetch")
    {
      const personalWorkspace=response.data.data.filter(item=>item.title==="Personal")
      dispatch(populateActiveGoalWorkspace(personalWorkspace[0]))
    }
  }
  catch {
  }
}
export const addGoalWorkspaceAction = (payload) => async (dispatch) => {
  try {
    const response = await api.addGoalWorkspace(payload);
    dispatch(fetchGoalWorkspaceAction())
    // if (response.data.data) {
    //   dispatch(goalWorkspace(response.data.data))
    // }
  }
  catch {
  }
}
export const deleteGoalWorkspaceAction = (id) => async (dispatch) => {
  try {
    const response = await api.deleteGoalWorkspace(id);
    dispatch(fetchGoalWorkspaceAction())
    // if (response.data.data) {
    //   dispatch(goalWorkspace(response.data.data))
    // }
  }
  catch {
  }
}
