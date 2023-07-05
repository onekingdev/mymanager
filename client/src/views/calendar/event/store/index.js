// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserData } from '../../../../auth/utils';
import { customInterIceptors } from '../../../../lib/AxiosProvider';

const API = customInterIceptors();

export const saveContact = createAsyncThunk(
  'contact/saveContact',
  async (payload, { dispatch }) => {
    const response = await API.post(`contact/save-contact`, payload);
    return response.data;
  }
);

export const replyToEvent = createAsyncThunk(
  'event/replyToEvent',
  async (payload, { dispatch }) => {
    const response = await API.post(`event/replyToEvent`, payload);
    return response.data;
  }
);

export const createEvent = createAsyncThunk(
  'event/createEvent',
  async (eventForm, { dispatch }) => {
    const response = await API.post(`event/create`, eventForm);
    await dispatch(getEvents(getUserData().id));
    return response.data;
  }
);

export const updateEvent = createAsyncThunk(
  'event/updateEvent',
  async ({ _id, eventForm }, { dispatch }) => {
    const response = await API.put(`event/update/${_id}`, eventForm);
    const result = await dispatch(getEvents(getUserData().id));

    return response.data;
  }
);

export const getEvents = createAsyncThunk('event/getEvents', async (userId) => {
  const response = await API.get(`event/all/`);
  return response.data;
});

export const deleteEvent = createAsyncThunk('event/deleteEvent', async (eventId, { dispatch }) => {
  const response = await API.delete(`event/${eventId}`);
  if (response.status === 200) {
    await dispatch(getEvents(getUserData().id));
    return true;
  }
  return false;
});

export const getEventInfo = createAsyncThunk('event/getEventInfo', async (eventId) => {
  const response = await API.get(`event/info/${eventId}`);
  if (response.status === 200) {
    return response.data;
  }
  return {};
});

export const getFileInfo = createAsyncThunk('event/getEventInfo', async (eventId) => {
  const response = await API.get(`event/info/${eventId}`);
  if (response.status === 200) {
    return response.data;
  }
  return {};
});

export const addUpdateGuests = createAsyncThunk(
  'event/updateEvent',
  async ({ _id, guestData, isNewEmployee }, { dispatch }) => {
    const response = await API.put(`event/add-update-guest/${_id}`, { guestData, isNewEmployee });
    //const result = await dispatch(getEvents(getUserData().id));

    return response.data;
  }
);

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    events: [],
    eventInfo: {},
    addGuests: [],
    isAddedSuccess: false,
    eventLoading: false,
    errors: {
      isError: false,
      data: {}
    }
  },
  reducers: {
    addNewGuests: (state, action) => {
      state.addGuests = action.payload;
    },
    removeAllGuests: (state, action) => {
      state.addGuests = [];
    },
    addedSuccess: (state, action) => {
      state.isAddedSuccess = action.payload;
    },
    setErrors: (state, action) => {
      state.errors.isError = true;
      state.errors.data = action.payload;
    },
    getEventInfoStart: (state, action) => {
      state.eventLoading = true;
    },
    getEventInfoSuccess: (state, action) => {
      state.eventInfo = action.payload;
      state.eventLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(getEventInfo.fulfilled, (state, action) => {
        state.eventInfo = action.payload;
      });
  }
});
export const {
  addNewGuests,
  removeAllGuests,
  addedSuccess,
  setErrors,
  getEventInfoStart,
  getEventInfoSuccess
} = eventSlice.actions;

export default eventSlice.reducer;
