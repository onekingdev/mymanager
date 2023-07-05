import { customInterIceptors } from '../../../lib/AxiosProvider';

const API = customInterIceptors();

export const addGoals = (type,payload) => {
  return API.post('user-goal/add_goalcreategoal/'+type, payload);
};
export const addActionPlan = (id,payload) => {
  return API.post('action-plans/add_goal_actionPlan/'+id,payload);
};
export const addSubGoals = (parentId,type,payload) => {
  return API.post('user-goal/add_goalcreategoal/'+type+"?parentId="+parentId, payload);
};
export const fetchGoals = (id) => {
  return API.get('user-goal/all_goals/'+id);
};
export const fetchSubGoals = (id) => {
  return API.get('user-goal/goals_By_parengoalId/'+id);
};
export const fetchActionPlan = (id) => {
  return API.get('action-plans/add_goal_actionPlan/'+id);
};
export const deleteActionPlan = (id) => {
  return API.delete('action-plans/remove_actonPlan/'+id);
};

export const deleteGoals = (id) => {
  return API.delete('user-goal/remove_goal/'+id);
};
export const editGoals = (payload,id) => {
  return API.put('user-goal/update_goal_subgoal/' + id,payload);
};
export const getGoal = (id) => {
  return API.get('user-goal/'+id);
};
export const fetchGoalWorkspace = () => {
  return API.get('goal-workspace/');
};
export const addGoalWorkspace=(payload)=>{
  return API.post('goal-workspace/',payload)
}
export const deleteGoalWorkspace=(id)=>{
  return API.delete('goal-workspace/'+id)
}

