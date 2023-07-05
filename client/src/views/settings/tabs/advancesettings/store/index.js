// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { customInterIceptors } from '../../../../../lib/AxiosProvider';
import axios from 'axios';
import { getUserData } from '../../../../../auth/utils';

const API = customInterIceptors();

export const createSmartList = createAsyncThunk(
  'setting/createSmartList',
  async (value, { dispatch }) => {
    const response = await API.post(`/smartlist/create`, value);
    dispatch(getData());
  }
);

export const getData = createAsyncThunk('setting/getSmartList', async (listId) => {
  const response = await API.get(`/smartlist/get`, listId);
  return response.data;
});

export const createSmartListItem = createAsyncThunk(
  'setting/createSmartListItem',
  async (value) => {
    const response = await API.post(`/smartlistitem/create`, value);
    // window.location.href = '/setting'
    // return response.data
  }
);

export const getDataItem = createAsyncThunk('setting/getSmartListItem', async (value) => {
  const response = await API.get(`/smartlistitem/get/${value.listId}`);
  return response.data;
});

export const removeSmartListItem = createAsyncThunk(
  'setting/removeSmartListItem',
  async (value) => {
    const response = await API.delete(`/smartlistitem/delete/${value.itemId}`);
    if (response.status === 200) {
      return true;
    }
    return false;
  }
);

export const updateSmartListItem = createAsyncThunk('setting/updateSmartListItem', async (data) => {
  const response = await API.put(`/smartlistitem/update/${data.itemId}`, data.value);
  if (response.status === 200) {
    return response.data.data;
  }
  return false;
});

export const getProgressionDatas = createAsyncThunk('setting/getPorgressionDetails', async () => {
  const response = await API.get('/progression/get/progression_details');
  return response;
});

export const getRankDatas = createAsyncThunk('setting/getRanks', async (data) => {
  const response = await API.get(`/rank-category/category_rank_info/${data}`);
  return response;
});

export const listIdSet = createAsyncThunk('setting/listId', async (value) => {
  return value;
});

export const getCustomersWithSmartList = createAsyncThunk(
  'setting/getCustomersWithSmartList',
  async (data) => {
    const response = await API.post(`/smartlistitem/getCustomers`, data);
    if (response.success) {
    }
  }
);

export const appSmartListsSlice = createSlice({
  name: 'smartList',
  initialState: {
    smartLists: [],
    smartListsItem: [],
    listId: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.smartLists = action.payload.data;
    });
    builder.addCase(getDataItem.fulfilled, (state, action) => {
      state.smartListsItem = action.payload.data;
    });
    builder.addCase(listIdSet.fulfilled, (state, action) => {
      state.listId = action.payload;
    });
    builder.addCase(updateSmartListItem.fulfilled, (state, action) => {
      
      const updatedata = action.payload;
      const index = state.smartListsItem.findIndex(item => item._id == updatedata._id)
      if (index != -1) {
        state.smartListsItem[index] = updatedata
      }
    })
  }
});

export default appSmartListsSlice.reducer;
