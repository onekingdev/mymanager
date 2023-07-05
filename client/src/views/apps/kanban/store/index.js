// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Axios Imports
import axios from 'axios';
import { customInterIceptors } from '../../../../lib/AxiosProvider';
import { fetchWorkspaceApi, getSelectedWorkspaceData } from '../../workspace/store';

import { success, error } from '../../../ui-elements/response-popup';

const API = customInterIceptors();

// // ** Fetch Boards
// export const fetchBoards = createAsyncThunk('appKanban/fetchBoards', async () => {
//   const response = await axios.get('/apps/kanban/boards');

//   return response.data;
// });

// export const fetchTasks = createAsyncThunk('appKanban/fetchTasks', async () => {
//   const response = await axios.get('/apps/kanban/tasks');

//   return response.data;
// });

// ** Kanban Boards - api
export const fetchBoardsApi = createAsyncThunk('appKanban/fetchBoards', async () => {
  const response = await API.get('/board/get');
  return response.data;
});

export const addBoard = createAsyncThunk('appKanban/addBoard', async (data, { dispatch }) => {
  const response = await API.post('/board/add', data);

  if (response.status == 201) {
    success(response?.data?.success);

    const addedBoard = response?.data?.data;
    await dispatch(
      newActivity({
        workspaceId: data.workspaceId,
        boardId: addedBoard?._id,
        current: addedBoard?.title,
        currentColor: addedBoard?.color,
        activity: 'Status Created'
      })
    );
    await dispatch(getSelectedWorkspaceData(data.workspaceId));
    dispatch(fetchWorkspaceApi());
  } else {
    error(response?.errors?.common?.msg);
  }
  return response.data;
});

export const updateBoard = createAsyncThunk('appKanban/updateBoard', async (data, { dispatch }) => {
  const response = await API.post('/board/update', data.status);

  if (response.status == 201) {
    success(response?.data?.success);

    const updatedBoardData = response?.data?.data;
    const { prevBoardName, prevBoardColor } = response?.data;

    await dispatch(
      newActivity({
        workspaceId: data.workspaceId,
        boardId: updatedBoardData?._id,
        activity: 'Status Updated',
        prev: prevBoardName,
        prevColor: prevBoardColor,
        current: updatedBoardData?.title,
        currentColor: updatedBoardData?.color,
        column: 'Status'
      })
    );

    await dispatch(getSelectedWorkspaceData(data.workspaceId));
    dispatch(fetchWorkspaceApi());
  } else {
    error(response?.errors?.common?.msg);
  }
  return response.data;
});

export const updateBoardTitle = createAsyncThunk(
  'appKanban/updateBoardTitle',
  async (data, { dispatch }) => {
    const response = await API.post('/board/updateTitle', data.status);

    if (response.status == 201) {
      success(response?.data?.success);

      const updatedBoardData = response?.data?.data;
      const { prevBoardName, prevBoardColor } = response?.data;

      await dispatch(
        newActivity({
          workspaceId: data.workspaceId,
          boardId: updatedBoardData?._id,
          activity: 'Status Updated',
          prev: prevBoardName,
          prevColor: prevBoardColor,
          current: updatedBoardData?.title,
          currentColor: updatedBoardData?.color,
          column: 'Status'
        })
      );

      await dispatch(getSelectedWorkspaceData(data.workspaceId));
      dispatch(fetchWorkspaceApi());
    } else {
      error(response?.errors?.common?.msg);
    }

    return response.data;
  }
);

export const deleteBoard = createAsyncThunk('appKanban/deleteBoard', async (data, { dispatch }) => {
  const response = await API.delete(`/board/delete/${data.id}/${data.workspaceId}`);

  if (response.status == 201) {
    success(response?.data?.success);

    const deletedBoard = response?.data?.data;
    await dispatch(
      newActivity({
        workspaceId: data.workspaceId,
        boardId: deletedBoard?._id,
        current: deletedBoard?.title,
        currentColor: deletedBoard?.color,
        activity: 'Status Removed'
      })
    );
    await dispatch(getSelectedWorkspaceData(data.workspaceId));
    dispatch(fetchWorkspaceApi());
  } else {
    error(response?.errors?.common?.msg);
  }
  return response;
});

// ** Kanban Task
export const fetchTasksApi = createAsyncThunk('appKanban/fetchTasks', async () => {
  const response = await API.get('/kanban/get');
  // response.data.sort((a, b) => {
  //   return parseInt(a.id) - parseInt(b.id);
  // });
  // await dispatch(getSelectedWorkspaceData(data.workspaceId));
  return response.data;
});

export const addTask = createAsyncThunk('appKanban/addTask', async (data, { dispatch }) => {
  const response = await API.post('/kanban/add', data);

  if (response.status == 201) {
    success(response?.data?.success);

    const addedTaskData = response?.data?.data;
    await dispatch(
      newActivity({
        workspaceId: data.workspaceId,
        boardId: addedTaskData?.boardId,
        kanbanId: addedTaskData?._id,
        current: addedTaskData?.title,
        activity: 'Task Created'
      })
    );
    await dispatch(getSelectedWorkspaceData(data.workspaceId));
    dispatch(fetchTasksApi());
    dispatch(fetchWorkspaceApi());
  } else {
    error(response?.errors?.common?.msg);
  }
  return response.data;
});

export const updateTaskStatus = createAsyncThunk(
  'appKanban/updateTaskStatus',
  async (data, { dispatch }) => {
    const response = await API.post('/kanban/update-taskboard', data);
    if (response.status == 200) {
      success(response?.data?.success);

      const updatedTaskData = response?.data?.data;
      const { prevBoardName, prevBoardColor, currentBoardName, currentBoardColor } = response?.data;

      await dispatch(
        newActivity({
          workspaceId: data.workspaceId,
          boardId: updatedTaskData?.boardId,
          kanbanId: updatedTaskData?._id,
          activity: 'Task Status',
          prev: prevBoardName,
          prevColor: prevBoardColor,
          current: currentBoardName,
          currentColor: currentBoardColor,
          column: 'Task Status'
        })
      );

      await dispatch(getSelectedWorkspaceData(data.workspaceId));
      dispatch(fetchWorkspaceApi());
    } else {
      error(response?.errors?.common?.msg);
    }
    return response;
  }
);

export const updateTask = createAsyncThunk('appKanban/updateTask', async (data, { dispatch }) => {
  const response = await API.post('/kanban/update', data?.postData);

  console.log(data);
  if (response.status == 200) {
    success(response?.data?.success);
    const updatedTaskData = response?.data?.data;
    console.log('updatedTaskData', updatedTaskData);
    await dispatch(
      newActivity({
        workspaceId: data?.workspaceId,
        boardId: updatedTaskData?.boardId,
        kanbanId: updatedTaskData?._id,
        activity: 'Task Updated'
      })
    );
  } else {
    error(response?.errors?.common?.msg);
  }
  // await dispatch(getSelectedWorkspaceData(workspaceId));
  return response.data;
});

export const reorderTasks = createAsyncThunk(
  'appKanban/reorder-tasks',
  async (data, { dispatch }) => {
    const response = await API.post('/kanban/reorder', data);
    await dispatch(getSelectedWorkspaceData(data.workspaceId));
    return response.data;
  }
);

export const deleteTask = createAsyncThunk('appKanban/delete', async (data, { dispatch }) => {
  const response = await API.delete('/kanban/delete', { data: { source: data } });
  await dispatch(getSelectedWorkspaceData(data.workspaceId));
  dispatch(fetchWorkspaceApi());
  dispatch(fetchTasksApi());
  return response.data;
});

export const clearTasks = createAsyncThunk('appKanban/clearTasks', async (data, { dispatch }) => {
  const response = await API.delete(`/kanban/deleteByBoardId/${data.boardId}`);
  await dispatch(getSelectedWorkspaceData(data.workspaceId));
  dispatch(fetchWorkspaceApi());
  return response;
});

// ** Kanban Task Activity
export const newActivity = createAsyncThunk('appKanban/newActivity', async (data, { dispatch }) => {
  const response = await API.post('/kanban/addActivity', data);
  if ((response.status = 201)) {
    dispatch(getActivity());
    return response;
  } else {
    error('Activity not saved');
    return response;
  }
});

export const getActivity = createAsyncThunk(
  'appKanban/getActivity',
  async (query, { dispatch }) => {
    const response = await API.get('/kanban/getActivity');
    if (response.status == 201) {
      return response?.data?.data;
    } else {
      error('Load activity list failed');
      return response;
    }
  }
);

// ** Last Seen
export const setLastViewed = async (data) => {
  const response = await API.post('/kanban/setLastViewed', data);
  if (response.status == 201) {
    return response;
  } else {
    error('Set activity view history failed');
    return response;
  }
};

export const getLastViewed = async (data) => {
  const response = await API.get('/kanban/getLastViewed', { params: data });
  if (response.status == 201) {
    return response;
  } else {
    error('Load last seen data failed');
    return response;
  }
};

export const appKanbanSlice = createSlice({
  name: 'appKanban',
  initialState: {
    tasks: [],
    boards: [],
    selectedTask: {},
    activity: []
  },
  reducers: {
    handleSelectTask: (state, action) => {
      state.selectedTask = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchBoards.fulfilled, (state, action) => {
      .addCase(fetchBoardsApi.fulfilled, (state, action) => {
        state.boards = action.payload;
      })
      // .addCase(fetchTasks.fulfilled, (state, action) => {
      .addCase(fetchTasksApi.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(getActivity.fulfilled, (state, action) => {
        state.activity = action.payload;
      });
  }
});

export const { handleSelectTask } = appKanbanSlice.actions;

export default appKanbanSlice.reducer;
