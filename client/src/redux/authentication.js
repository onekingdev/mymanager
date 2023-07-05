// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { createApi } from '@reduxjs/toolkit/query/react'
// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt';
// import axios from 'axios'
import { customInterIceptors } from '../lib/AxiosProvider';
import { success } from '../views/ui-elements/response-popup';

const API = customInterIceptors();
const config = useJwt.jwtConfig;

const initialUser = () => {
  const item = window.localStorage.getItem('userData');
  //** Parse stored json or if none return initialValue
  return item ? JSON.parse(item) : {};
};

export const fetchUserApi = createAsyncThunk('authentication/fetchUser', async () => {
  const item = JSON.parse(window.localStorage.getItem('userData'));
  const response = await API.get(`/user/${item.id}`);
  return response.data;
});

export const updateUserInfo = createAsyncThunk(
  'authentication/updateUserInfo',
  async (data, { dispatch }) => {
    const item = JSON.parse(window.localStorage.getItem('userData'));
    const response = await API.put(`/user/profile/${item.id}`, data);
    if (response.status == 200) {
      success('Saved successfully');
    } else {
      error('Save failed');
    }
    await dispatch(fetchUserApi());
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  'authentication/deleteUser',
  async (data, { dispatch }) => {
    const response = await API.delete('/user/delete', { data: { source: data } });
    await dispatch(fetchUserApi());
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser(),
    detailUserInfo: {}
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userData = action.payload;
      state[config.storageTokenKeyName] = action.payload[config.storageTokenKeyName];
      state[config.storageRefreshTokenKeyName] = action.payload[config.storageRefreshTokenKeyName];
      localStorage.setItem('userData', JSON.stringify(action.payload));
      localStorage.setItem(config.storageTokenKeyName, JSON.stringify(action.payload.accessToken));
      localStorage.setItem(
        config.storageRefreshTokenKeyName,
        JSON.stringify(action.payload.refreshToken)
      );
    },
    handleRole: (state, action) => {
      state.userData.ability = action.payload.ability;
      let userData = JSON.parse(localStorage.getItem('userData'));
      userData.ability = action.payload.ability;
      userData = { ...userData, curRole: action.payload.curRole };
      localStorage.setItem('userData', JSON.stringify(userData));
    },
    handleLogout: (state) => {
      state.userData = {};
      state[config.storageTokenKeyName] = null;
      state[config.storageRefreshTokenKeyName] = null;
      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem('userData');
      localStorage.removeItem(config.storageTokenKeyName);
      localStorage.removeItem(config.storageRefreshTokenKeyName);
      localStorage.removeItem('organization');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserApi.fulfilled, (state, action) => {
      state.detailUserInfo = action.payload;
    });
  }
});

export const { handleLogin, handleLogout, handleRole } = authSlice.actions;

export default authSlice.reducer;
