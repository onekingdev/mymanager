// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

import { customInterIceptors } from '../../../../lib/AxiosProvider';
const API = customInterIceptors();

export const getTextContacts = createAsyncThunk(
  'appText/getTextContacts',
  async (params, { getState }) => {
    const response = await API.get(`/client-contact/`, params);

    return {
      data: response.data
    };
  }
);
export const getMessageContacts = createAsyncThunk(
  'appText/getMessageContacts',
  async (params, { getState }) => {
    const response = await API.get(`/text/get-messages/${params}/${params}`);

    let data = response.data?.data;
    return data;
  }
);
export const filterTextContacts = createAsyncThunk(
  'appText/filterTextContacts',
  async (data, { getState }) => {
    return {
      data: data
    };
  }
);
export const activeTextContacts = createAsyncThunk(
  'appText/activeTextContacts',
  async (data, { getState }) => {
    return {
      data: data
    };
  }
);
export const getText = createAsyncThunk('appText/getText', async (params, { getState }) => {
  const response = await API.post(`/text/addcontact/123`, {
    params
  });

  return {
    params,
    data: response.data
  };
});

export const addText = createAsyncThunk('appText/addTask', async (task, { dispatch, getState }) => {
  const response = await API.post(`/text/send-message/${task?.id}`, {
    task
  });
  if (response?.data?.success) {
    await dispatch(getMessageContacts(task?.uid));
  } else {
    toast.error(response?.data?.error);
  }

  // await dispatch(getTasks(getState().todo.params))
  // return response.data
});

// export const updateText = createAsyncThunk(
//     'appText/updateTask',
//     async (task, { dispatch, getState }) => {
//         const response = await axios.post('/apps/todo/update-task', { task })
//         await dispatch(getTasks(getState().todo.params))
//         return response.data
//     }
// )

// export const deleteText = createAsyncThunk(
//     'appText/deleteTask',
//     async (taskId, { dispatch, getState }) => {
//         const response = await axios.delete('/apps/todo/delete-task', {
//             taskId
//         })
//         await dispatch(getTasks(getState().todo.params))
//         return response.data
//     }
// )

export const getChatContacts = createAsyncThunk('appChat/getChatContacts', async () => {
  const response = await axios.get('/apps/chat/chats-and-contacts');
  return response.data;
});

export const selectChat = createAsyncThunk('appChat/selectChat', async (id, { dispatch }) => {
  const response = await axios.get('/apps/chat/get-chat', { id });
  await dispatch(getChatContacts());
  return response.data;
});

export const getFolders = createAsyncThunk('appChat/getFolders', async () => {
  const response = await API.get('/template-folder/read-folder');
  return response.data;
});

export const uploadFolder = createAsyncThunk(
  'appChat/uploadFolder',
  async (folderName, { dispatch }) => {
    const response = await API.post(`/template-folder/create-folder`, {
      folderName: folderName
    });
    if (response?.data?.success) {
      await dispatch(getFolders());
    } else {
      toast.error(response?.data?.error);
    }
  }
);

export const updateFolder = createAsyncThunk(
  'appChat/updateFolder',
  async (payload, { dispatch }) => {
    const response = await API.put(`/template-folder/update-folder/${payload.id}`, {
      folderName: payload.name
    });
    if (response?.data?.success) {
      await dispatch(getFolders());
    } else {
      toast.error(response?.data?.error);
    }
  }
);

export const deleteFolder = createAsyncThunk('appChat/deleteFolder', async (id, { dispatch }) => {
  const response = await API.delete(`/template-folder/delete-folder/${id}`);
  if (response?.data?.success) {
    await dispatch(getFolders());
  } else {
    toast.error(response?.data?.error);
  }
});

export const getSubfolders = createAsyncThunk('appChat/getSubfolders', async () => {
  const response = await API.get('/template-subfolder/read-subfolder');
  return response.data;
});

export const uploadSubfolder = createAsyncThunk(
  'appChat/uploadSubfolder',
  async (payload, { dispatch }) => {
    const response = await API.post(`/template-subfolder/create-subfolder/${payload.parentId}`, {
      subFolderName: payload.subfolderName
    });
    if (response?.data?.success) {
      await dispatch(getFolders());
    } else {
      toast.error(response?.data?.error);
    }
  }
);

export const updateSubfolder = createAsyncThunk(
  'appChat/updateSubfolder',
  async (payload, { dispatch }) => {
    const response = await API.put(`/template-subfolder/update-subfolder/${payload.id}`, {
      subFolderName: payload.name
    });
    if (response?.data?.success) {
      await dispatch(getFolders());
    } else {
      toast.error(response?.data?.error);
    }
  }
);

export const deleteSubfolder = createAsyncThunk(
  'appChat/deleteSubfolder',
  async (payload, { dispatch }) => {
    const response = await API.delete(
      `/template-subfolder/delete-subfolder/${payload.folderId}/${payload.subfolderId}`
    );
    if (response?.data?.success) {
      await dispatch(getFolders());
    } else {
      toast.error(response?.data?.error);
    }
  }
);

export const uploadTemplate = createAsyncThunk(
  'appChat/uploadTemplate',
  async (payload, { dispatch }) => {
    const response = await API.post(`/template/upload-template/${payload.folderId}`, {
      subfolderId: payload.subfolderId,
      text: payload.templateText,
      templateName: payload.templateName
    });
    if (response?.data?.success) {
      await dispatch(getFolders());
    } else {
      toast.error(response?.data?.error);
    }
  }
);

export const updateTemplate = createAsyncThunk(
  'appChat/updateTemplate',
  async (payload, { dispatch }) => {
    const response = await API.put(`/template/update-template/${payload._id}`, {
      templateName: payload.templateName,
      text: payload.templateText
    });
    if (response?.data?.success) {
      await dispatch(getFolders());
    } else {
      toast.error(response?.data?.error);
    }
  }
);

export const deleteTemplate = createAsyncThunk(
  'appChat/deleteTemplate',
  async (payload, { dispatch }) => {
    const response = await API.delete(
      `/template/delete-template/${payload.templateId}/${payload.folderId}/${payload.subfolderId}`
    );
    if (response?.data?.success) {
      await dispatch(getFolders());
    } else {
      toast.error(response?.data?.error);
    }
  }
);

export const appTextSlice = createSlice({
  name: 'appText',
  initialState: {
    chats: [],
    selectedTEXT: {},
    msg: '',
    contacts: [],
    ActiveContact: {},
    messages: [],
    selectedUser: {},
    templateFolders: [],
    templates: []
  },
  // reducers: {
  //     addTextReducer: (state, action) => {
  //         state.Text = action.payload
  //     }
  // },

  extraReducers: (builder) => {
    builder
      // .addCase(getText.fulfilled, (state, action) => {
      //   state.Text = action.payload;
      //   state.params = action.payload;
      // })
      .addCase(getTextContacts.fulfilled, (state, action) => {
        state.contacts = action.payload?.data?.list;
      })
      // .addCase(filterTextContacts.fulfilled, (state, action) => {
      //   state.contacts = action.payload?.data;
      // })
      .addCase(activeTextContacts.fulfilled, (state, action) => {
        state.ActiveContact = action.payload?.data;
      })
      .addCase(getMessageContacts.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(getChatContacts.fulfilled, (state, action) => {
        state.chats = action.payload.chatsContacts;
        state.contacts = action.payload.contacts;
      })
      .addCase(selectChat.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(getFolders.fulfilled, (state, action) => {
        state.templateFolders = action.payload;
      });
  }
});

export const { addTextReducer } = appTextSlice.actions;

export default appTextSlice.reducer;
