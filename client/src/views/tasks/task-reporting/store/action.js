import * as api from './api';

import {
  // ------------------
  // add task
  addTaskStart,
  addTaskSuccess,
  addTaskError,
  // Task List
  taskListStart,
  taskListSuccess,
  taskListError,
  // Task Delete
  taskDeleteStart,
  taskDeleteSuccess,
  taskDeleteError,
  // save Checklist
  saveCheckListStart,
  saveCheckListSuccess,
  saveCheckListError,

  // Task List

  // Working Task List
  workingTaskListStart,
  workingTaskListSuccess,
  workingTaskListError,
  workingTaskListReset,

  // All Day Task List
  allDayTaskListStart,
  allDayTaskListSuccess,
  allDayTaskListError,
  allDayTaskListReset,

  // ----------------- save todos
  saveTaskListTodosStart,
  saveTaskListTodosSuccess,
  saveTaskListTodosError,
  saveTaskListTodosReset,

  // UPload Todo file
  todoFileUploadingInit,
  todoFileUploadingStart,
  todoFileUploadingSuccess,
  todoFileUploadingError,
  todoFileUploadingReset,

  // working task list past due
  workingTaskListPastDueStart,
  workingTaskListPastDueSuccess,
  workingTaskListPastDueError,
  workingTaskListPastDueReset,

  // Send email
  sendEmailStart,
  sendEmailSuccess,
  sendEmailError,

  // Send Freeze Task Request
  sendFTRQStart,
  sendFTRQSuccess,
  sendFTRQError
} from './reducer';

// add task
export const addTaskAction = (payload) => async (dispatch) => {
  try {
    dispatch(addTaskStart());
    const { data } = await api.addTask(payload);
    dispatch(addTaskSuccess(data));

    // Refetch task again
    dispatch(fetchTaskListAction({}));
  } catch (error) {
    dispatch(addTaskError());
  }
};

// task list
export const fetchTaskListAction = (payload) => async (dispatch) => {
  try {
    dispatch(taskListStart());
    const { data } = await api.taskList(payload);
    dispatch(taskListSuccess(data));
  } catch (error) {
    dispatch(taskListError());
  }
};

// task Delete
export const taskDeleteAction = (payload) => async (dispatch) => {
  try {
    dispatch(taskDeleteStart());
    const { data } = await api.taskDelete(payload);
    dispatch(taskDeleteSuccess(data));

    // Refetch task again
    dispatch(fetchTaskListAction({}));
  } catch (error) {
    dispatch(taskDeleteError());
  }
};

// task Save
export const saveCheckListAction = (payload) => async (dispatch) => {
  try {
    dispatch(saveCheckListStart());
    const { data } = await api.saveCheckList(payload);
    dispatch(saveCheckListSuccess(data));

    // Refetch task again
    dispatch(fetchTaskListAction({}));
  } catch (error) {
    dispatch(saveCheckListError());
  }
};

// task Get
export const workingTaskListAction = (payload) => async (dispatch) => {
  try {
    dispatch(workingTaskListStart());
    const { data } = await api.fetchWorkingTaskList(payload);
    dispatch(workingTaskListSuccess(data));

    // Refetch task again
    dispatch(fetchTaskListAction({}));
  } catch (error) {
    dispatch(workingTaskListError());
  }
};

export const allDayTaskListAction = (payload) => async (dispatch) => {
  try {
    dispatch(allDayTaskListStart());
    const { data } = await api.fetchAllDayTaskList(payload);
    dispatch(allDayTaskListSuccess(data));

    // Refetch task again
    dispatch(fetchTaskListAction({}));
  } catch (error) {
    dispatch(allDayTaskListError());
  }
};

// task save answer
export const saveTodosAnsAction = (payload) => async (dispatch) => {
  try {
    const initialOptions = {
      sort: 1,
      sortByDate: false,
      selectDate: payload.selectDate
    };
    dispatch(saveTaskListTodosStart());
    const { data } = await api.saveCheckListAns(payload);
    dispatch(saveTaskListTodosSuccess(data));

    // Refetch task again
    dispatch(workingTaskListAction(initialOptions));
  } catch (error) {
    dispatch(saveTaskListTodosError());
  }
};

// task todo file
export const uploadTodoAnsFile = (payload) => async (dispatch) => {
  try {
    document.body.style.cursor = 'wait';
    dispatch(todoFileUploadingStart());
    const { data } = await api.todoFileUpload(payload);
    dispatch(todoFileUploadingSuccess(data));
    document.body.style.cursor = 'default';
    // Refetch task again
    // dispatch(workingTaskListAction({}))
  } catch (error) {
    dispatch(todoFileUploadingError());
  }
};

// task get past due
export const workingTaskListPastDueAction = (payload) => async (dispatch) => {
  try {
    dispatch(workingTaskListPastDueStart());
    const { data } = await api.fetchWorkingTaskPastDueList(payload);
    dispatch(workingTaskListPastDueSuccess(data));

    // Refetch task again
    // dispatch(fetchTaskListAction({}))
  } catch (error) {
    dispatch(workingTaskListPastDueError());
  }
};

// send Email
export const sendEmail = (payload) => async (dispatch) => {
  try {
    dispatch(sendEmailStart());
    const { data } = await api.sendMail(payload);
    dispatch(sendEmailSuccess(data));
  } catch (error) {
    dispatch(sendEmailError());
  }
};

// send Freeze Task
export const sendFreezeTaskRQ = (payload) => async (dispatch) => {
  // try {
  // dispatch(sendFTRQStart());
  const { data } = await api.freezeTask(payload);
  dispatch(fetchTaskListAction({}));
  return data;
  // dispatch(sendFTRQSuccess(data));
  // } catch (error) {
  // dispatch(sendFTRQError());
  // }
};

export const sendFreezeTaskAccept = (payload) => async (dispatch) => {
  // try {
  // dispatch(sendFTRQStart());
  const { data } = await api.acceptFreezeTask(payload);
  dispatch(fetchTaskListAction({}));
  return data;
  // dispatch(sendFTRQSuccess(data));
  // } catch (error) {
  // dispatch(sendFTRQError());
  // }
};
