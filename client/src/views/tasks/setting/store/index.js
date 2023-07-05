// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isEmptyObject } from 'jquery';

import { customInterIceptors } from '../../../../lib/AxiosProvider';

const API = customInterIceptors();

// ** Fetch QRCode - api
export const fetchQRCodeApi = createAsyncThunk('appQrcode/fetchQRCode', async () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.id;
  const response = await API.get(`/qrcode/get-all/${userId}`);
  return response.data;
});

export const getQRCodeByUUID = createAsyncThunk('appSelectQRCode/selectQRCode', async (id) => {
  const response = await API.get(`/qrcode/get/${id}`);
  return response;
});

export const saveQRCode = createAsyncThunk('appQrcode/saveQRCode', async (data, { dispatch }) => {
  const response = await API.post('/qrcode/add', data);
  await dispatch(fetchQRCodeApi());
  return response;
});

export const updateQRCodeTitle = createAsyncThunk(
  'appQrcode/updateQRCodeTitle',
  async (data, { dispatch }) => {
    const response = await API.post('/qrcode/update', data);
    await dispatch(fetchQRCodeApi());
    return response;
  }
);

export const deleteQRCode = createAsyncThunk(
  'appQrcode/deleteQRCode',
  async (data, { dispatch }) => {
    const response = await API.delete('/qrcode/delete/', { data: { source: data } });
    await dispatch(fetchQRCodeApi());
    return response;
  }
);

export const shareQRCode = createAsyncThunk('appQrcode/share', async (data, { dispatch }) => {
  const response = await API.post(`/qrcode/share`, data);
  await dispatch(fetchQRCodeApi());
  return response;
});

export const shareRevertQRCode = createAsyncThunk('appQrcode/share', async (data, { dispatch }) => {
  const response = await API.post(`/qrcode/share-revert`, data);
  await dispatch(fetchQRCodeApi());
  return response;
});

export const fileUpload = createAsyncThunk('appQrcode/fileupload', async (data) => {
  const response = await API.post('utill/upload', data);
  return response;
});

export const appQrcodeSlice = createSlice({
  name: 'appQrcode',
  initialState: {
    qrcodeList: [],
    uploadedFile: ''
  },
  // reducers: {
  //   handleSelectQRCode: (state, action) => {
  //     state.selectedQRCode = action.payload;
  //   },
  //   handleSelectTask: (state, action) => {
  //     state.selectedTask = action.payload;
  //   }
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchQRCodeApi.fulfilled, (state, action) => {
      state.qrcodeList = action.payload;
    });
  }
});

export const { handleSelectQRCode, handleSelectTask } = appQrcodeSlice.actions;

export default appQrcodeSlice.reducer;
