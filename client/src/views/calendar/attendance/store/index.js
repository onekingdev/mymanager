// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserData } from '../../../../auth/utils';
import { success, error } from '../../../ui-elements/response-popup';

import { customInterIceptors } from '../../../../lib/AxiosProvider';
import moment from 'moment';
import axios from 'axios';
const API = customInterIceptors();

export const createClass = createAsyncThunk(
  'attendance/createClass',
  async (classEvent, { dispatch }) => {
    try {
      const response = await API.post(`attendance/create`, classEvent);
      await dispatch(getClasses());
      success(response?.data?.msg);
      return response.data;
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (errors?.common?.msg) {
        error(errors.common.msg.replace(/\\/g, ''));
      } else {
        error(err.message.replace(/\\/g, ''));
      }
    }
  }
);

export const markAttendance = createAsyncThunk(
  'attendance/markAttendance',
  async (attendanceData, { dispatch }) => {
    try {
      const response = await API.post(`attendance/mark-attendance`, attendanceData);
      await dispatch(getClasses());
      await dispatch(getAttendance(attendanceData?.classId));
      success(response?.data?.msg);
      return response.data;
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (errors?.common?.msg) {
        error(errors.common.msg.replace(/\\/g, ''));
      } else {
        error(err.message.replace(/\\/g, ''));
      }
    }
  }
);

export const bookClass = createAsyncThunk(
  'attendance/bookClass',
  async (bookClassData, { dispatch }) => {
    try {
      const response = await API.post(`attendance/bookClass`, bookClassData);
     
      await dispatch(getClasses());
      await dispatch(getClassbooking(bookClassData?.classId));
      // success(response?.data?.msg);
      return response.data;
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (errors?.common?.msg) {
        error(errors.common.msg.replace(/\\/g, ''));
      } else {
        error(err.message.replace(/\\/g, ''));
      }
    }
  }
);

export const updateBookClass = createAsyncThunk(
  'attendance/updateBookClass',
  async (bookClassData, { dispatch }) => {
    try {
      const response = await API.post(`attendance/updateBookClass`, bookClassData);
      await dispatch(getClasses());
      await dispatch(getClassbooking(bookClassData?.classId));
      // success(response?.data?.msg);
      return response.data;
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (errors?.common?.msg) {
        error(errors.common.msg.replace(/\\/g, ''));
      } else {
        error(err.message.replace(/\\/g, ''));
      }
    }
  }
);

export const getClassbooking = createAsyncThunk('attendance/classBooking', async (classId) => {

  const response = await API.get(`attendance/get-classBooking/${classId}`);

  return response?.data?.data;
});

export const getClassbookingBySeries = createAsyncThunk(
  'attendance/classBookingSeries',
  async (seriesId) => {
    const response = await API.get(`attendance/get-classBooking-by-seriesId/${seriesId}`);
    return response?.data?.data;
  }
);

export const getAttendance = createAsyncThunk('attendance/getAttendance', async (classId) => {
  const response = await API.get(`attendance/get-attendance/${classId}`);
  return response?.data?.data;
});

export const getAllAttendance = createAsyncThunk('attendance/getAllAttendance', async () => {
  const response = await API.get(`attendance/all-attendance`);
  return response?.data?.data;
});

export const getClasses = createAsyncThunk('attendance/getClasses', async () => {
  const response = await API.get(`attendance/all/${getUserData().id}`);
  return response?.data?.data;
});

export const updateClass = createAsyncThunk(
  'attendance/updateClass',
  async (classEvent, { dispatch }) => {
    try {
      const response = await API.post('/attendance/update', classEvent);
      await dispatch(getClasses());
      success(response?.data?.msg);
      return response.data;
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (errors?.common?.msg) {
        error(errors.common.msg.replace(/\\/g, ''));
      } else {
        error(err.message.replace(/\\/g, ''));
      }
    }
  }
);

export const updateWholeSeries = createAsyncThunk(
  'attendance/updateWholeSeries',
  async (classEvent, { dispatch }) => {
    try {
      const response = await API.post('/attendance/updateWholeSeries', classEvent);
      await dispatch(getClasses());
      success(response?.data?.msg);
      return response.data;
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (errors?.common?.msg) {
        error(errors.common.msg.replace(/\\/g, ''));
      } else {
        error(err.message.replace(/\\/g, ''));
      }
    }
  }
);

export const deleteClass = createAsyncThunk(
  'attendance/deleteClass',
  async (payload, { dispatch }) => {
    try {
      const response = await API.delete(`attendance/${payload?.type}/${payload?.classId}`);

      if (response.status === 200) {
        await dispatch(getClasses(getUserData().id));
        success(response?.data?.msg);
        return true;
      }
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (errors?.common?.msg) {
        error(errors.common.msg.replace(/\\/g, ''));
      } else {
        error(err.message.replace(/\\/g, ''));
      }
    }
  }
);

export const deleteAttendance = createAsyncThunk(
  'attendance/deleteAttendance',
  async (attendanceId) => {
    try {
      const response = await API.post(`attendance/delete-attendance/${attendanceId}`);
      if (response.status === 200) {
        return true;
      }
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (errors?.common?.msg) {
        error(errors.common.msg.replace(/\\/g, ''));
      } else {
        error(err.message.replace(/\\/g, ''));
      }
    }
  }
);

export const deleteBooking = createAsyncThunk('attendance/deleteBooking', async (bookingId) => {
  try {
    const response = await API.post(`attendance/deleteBooking/${bookingId}`);
    if (response.status === 200) {
      return true;
    }
  } catch (err) {
    const errors = err?.response?.data?.errors;
    if (errors?.common?.msg) {
      error(errors.common.msg.replace(/\\/g, ''));
    } else {
      error(err.message.replace(/\\/g, ''));
    }
  }
});

export const getClassInfo = createAsyncThunk('attendance/getClassInfo', async (classId) => {
  const response = await API.get(`attendance/info/${classId}`);
  if (response.status === 200) {
    return response.data;
  }
  return {};
});

export const oneTimeSchedule = createAsyncThunk(
  'attendance/oneTimeSchedule',
  async (payload, { dispatch }) => {
    try {
      const response = await API.post(`attendance/oneTimeSchedule`, payload);
      await dispatch(getClasses());
      success(response?.data?.msg);
      return response.data;
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (errors?.common?.msg) {
        error(errors.common.msg.replace(/\\/g, ''));
      } else {
        error(err.message.replace(/\\/g, ''));
      }
    }
  }
);

export const ongoingTimeSchedule = createAsyncThunk(
  'attendance/ongoingTimeSchedule',
  async (payload, { dispatch }) => {
    try {
      const response = await API.post(`attendance/ongoingTimeSchedule`, payload);
      await dispatch(getClasses());
      success(response?.data?.msg);
      return response?.data;
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (errors?.common?.msg) {
        error(errors.common.msg.replace(/\\/g, ''));
      } else {
        error(err.message.replace(/\\/g, ''));
      }
    }
  }
);

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    classes: [],
    classAttendees: [],
    totalClassAttendees: [],
    classInfo: {},
    selectedClass: {},
    isAddedSuccess: false,
    errors: {
      isError: false,
      data: {}
    }
  },
  reducers: {
    selectClass: (state, action) => {
      state.selectedClass = action.payload;
    },
    addedSuccess: (state, action) => {
      state.isAddedSuccess = action.payload;
    },
    setErrors: (state, action) => {
      state.errors.isError = true;
      state.errors.data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClasses.fulfilled, (state, action) => {
        if (action.payload.classes.length > 0) {
          action.payload.classes.map((classEvent) => {
            classEvent.start = moment(classEvent.startDate + ' ' + classEvent.classStartTime)
              .local()
              .format();
            classEvent.end = moment(classEvent.endDate + ' ' + classEvent.classEndTime)
              .local()
              .format();
            classEvent.title = classEvent.classTitle;
          });
        }
        state.classes = action.payload;
      })
      .addCase(getClassInfo.fulfilled, (state, action) => {
        state.classInfo = action.payload;
      })
      .addCase(getAttendance.fulfilled, (state, action) => {
        state.classAttendees = action.payload;
      })
      .addCase(getAllAttendance.fulfilled, (state, action) => {
        state.totalClassAttendees = action.payload;
      })
      .addCase(getClassbooking.fulfilled, (state, action) => {
        state.classBookings = action.payload;
      });
  }
});
export const { addedSuccess, setErrors, selectClass } = attendanceSlice.actions;

export default attendanceSlice.reducer;
