// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Axios Imports
import axios from 'axios';

// ** API import
import { customInterIceptors } from '../../../../lib/AxiosProvider';
import { getUserData } from '../../../../utility/Utils';

const API = customInterIceptors();

export const getUserProfile = createAsyncThunk('appChat/getTasks', async () => {
  //const response = await axios.get('/apps/chat/users/profile-user');
  let userProfile = getUserData();
  return userProfile;
});

// export const getChatContacts = createAsyncThunk('appChat/getChatContacts', async () => {
//   const response = await axios.get('/apps/chat/chats-and-contacts')
//   return response.data
// })

export const getChatContacts = createAsyncThunk('appChat/getChatContacts', async () => {
  const response = await API.get(`livechat/chats-and-contacts/${getUserData().id}`);
  return response.data;
});

// export const selectChat = createAsyncThunk('appChat/selectChat', async (id, { dispatch }) => {
//   const response = await axios.get('/apps/chat/get-chat', { id })
//   await dispatch(getChatContacts())
//   return response.data
// })

export const selectChat = createAsyncThunk(
  'appChat/selectChat',
  async (channelId, { dispatch }) => {
    const response = await API.get(`livechat/channel/${channelId}`);

    return response.data;
  }
);

export const selectContact = createAsyncThunk(
  'appChat/selectContact',
  async (contact, { dispatch }) => {
    //const response = await API.get(`livechat/channel/${channelId}`);
    // temporary
    if (Object.keys(contact).length > 0) {
      let tmp = {};
      tmp = {
        ...tmp,
        contactId: {
          fullName: contact.fullName,
          email: contact.email
        },
        messages: [
          {
            createdAt: Date.now(),
            type: 'PreChatForm',
            msg: `{"email":${contact.email},"username":${contact.fullName}}`
          }
        ]
      };
      return tmp;
    } else {
      return {};
    }
  }
);

export const deleteChat = createAsyncThunk(
  'appChat/deleteChat',
  async (channelId, { dispatch }) => {
    const response = await API.delete(`livechat/channel/${channelId}`);
    return response.data;
  }
);

export const sendMsg = createAsyncThunk('appChat/sendMsg', async (obj, { dispatch }) => {
  const response = await axios.post('/apps/chat/send-msg', { obj });
  await dispatch(selectChat(obj.contact.id));

  return response.data;
});

export const appChatSlice = createSlice({
  name: 'appChat',
  initialState: {
    chats: [],
    contacts: [],
    userProfile: {},
    selectedUser: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(getChatContacts.fulfilled, (state, action) => {
        state.chats = action.payload.channels;
        state.contacts = action.payload.contacts;
      })
      .addCase(selectChat.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(selectContact.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      });
  }
});

export default appChatSlice.reducer;
