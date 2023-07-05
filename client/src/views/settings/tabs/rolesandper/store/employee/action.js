import { toast } from 'react-toastify';
import * as api from './api';
import { setTaskListReducer } from './reducer';

export const getTasksByEmployeeAction = () => async (dispatch) => {
  try {
    const { data } = await api.getTasksByEmployee();
    dispatch(setTaskListReducer(data));
  } catch (error) {}
};

export const getTasksByUserAction = (payload) => async (dispatch) => {
  try {
 
    const { data } = await api.getTasksByUser(payload);

    dispatch(setTaskListReducer(data));
  } catch (error) {}
};

export const addTaskAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addTasks(payload);
    if (data) {
      toast.success('Task added successfully!');
      dispatch(getTasksByUserAction('task'))
    } else {
      toast.error('Something went wrong! Please try again later!');
    }
  } catch (error) {}
};

export const updateTaskByUserAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateTaskByUser(id, payload);
    if (data) {
      toast.success('Task updated successfully!');
      //dispatch(setTaskListReducer("employee"));
    } else {
      toast.error('Something went wrong! Please try again later!');
    }
  } catch (error) {}
};

export const updateTaskByEmployeeAction = (taskId, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateTaskByEmployee(taskId, payload);
    if (data) {
      toast.success('Task updated successfully!');
      dispatch(getTasksByEmployeeAction());
    } else {
      toast.error('Something went wrong! Please try again later!');
    }
  } catch (error) {}
};

export const updateTaskStatusUserAction = (taskId, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateTaskStatusUser(taskId, payload);
    if (data) {
      toast.success('Task updated successfully!');
      dispatch(getTasksByUserAction('employee'));
    } else {
      toast.error('Something went wrong! Please try again later!');
    }
  } catch (error) {}
};
