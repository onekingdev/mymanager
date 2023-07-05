// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Third Party Imports
import { customInterIceptors } from '../../../lib/AxiosProvider';
import { success, error } from '../../ui-elements/response-popup';
import { getUserData } from '../../../auth/utils';
import Swal from 'sweetalert2';

// ** Axios Imports
import axios from 'axios';

// ** Moment Imports
import moment from 'moment';
import { contactsAction } from '../../contacts/store/actions';

const API = customInterIceptors();

// ** Filter
export const updateFilter = createAsyncThunk(
  'appCalendar/updateFilter',
  async (filter, { dispatch, getState }) => {
    if (getState().calendar.selectedFilters.includes(filter)) {
      await dispatch(fetchEvents(getState().calendar.selectedFilters.filter((i) => i !== filter)));
    } else {
      await dispatch(fetchEvents([...getState().calendar.selectedFilters, filter]));
    }
    return filter;
  }
);

export const updateAllFilters = createAsyncThunk(
  'appCalendar/updateAllFilters',
  async (value, { dispatch }) => {
    if (value === true) {
      await dispatch(fetchEvents(['Events', 'Appointments', 'Bookings', 'Classes']));
    } else {
      await dispatch(fetchEvents([]));
    }
    return value;
  }
);

// ** Event
export const fetchEvents = createAsyncThunk('appCalendar/fetchEvents', async (calendars) => {
  const response = await axios.get('/apps/calendar/events', { calendars });
  return response.data;
});

export const addEvent = createAsyncThunk(
  'appCalendar/addEvent',
  async (event, { dispatch, getState }) => {
    await axios.post('/apps/calendar/add-event', { event });
    await dispatch(fetchEvents(getState().calendar.selectedFilters));
    return event;
  }
);

export const updateEvent = createAsyncThunk(
  'appCalendar/updateEvent',
  async (event, { dispatch, getState }) => {
    await axios.post('/apps/calendar/update-event', { event });
    await dispatch(fetchEvents(getState().calendar.selectedFilters));
    return event;
  }
);

export const removeEvent = createAsyncThunk('appCalendar/removeEvent', async (id) => {
  await axios.delete('/apps/calendar/remove-event', { id });
  return id;
});

// ** Appointment
export const fetchAppointments = createAsyncThunk('appCalendar/fetchAppointments', async () => {
  const response = await API.get('/calendar/appointment/get');
  return response.data;
});

export const createAppointment = createAsyncThunk(
  'appCalendar/createAppointment',
  async (data, { dispatch }) => {
    const response = await API.post('/calendar/appointment/create', { ...data });
    await dispatch(fetchAppointments());
    return response;
  }
);

export const updateAppointment = createAsyncThunk(
  'appCalendar/updateAppointment',
  async (data, { dispatch }) => {
    const response = await API.post('/calendar/appointment/update', { ...data });
    await dispatch(fetchAppointments());
    return response;
  }
);

export const removeAppointment = createAsyncThunk('appCalendar/removeAppointment', async (id) => {
  await API.delete('/calendar/appointment/delete', { id });
  return id;
});

// ** Class & Attendance
export const createClass = createAsyncThunk(
  'appCalendar/createClass',
  async (classEvent, { dispatch }) => {
    try {
      const response = await API.post(`attendance/create`, classEvent);
      await dispatch(fetchClasses());
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
  'appCalendar/markAttendance',
  async (attendanceData, { dispatch }) => {
    try {
      const response = await API.post(`attendance/mark-attendance`, attendanceData);
      await dispatch(fetchClasses());
      const startDate = new Date(attendanceData?.attendedDateTime).toLocaleDateString();
      await dispatch(getAttendance({ classId: attendanceData?.classId, startDate }));
      await dispatch(contactsAction());
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
  'appCalendar/bookClass',
  async (bookClassData, { dispatch }) => {
    try {
      const response = await API.post(`attendance/bookStudentIntoClass`, bookClassData);
      await dispatch(fetchClasses());
      // bookClassData?.seriesId
      await dispatch(getClassbookingBySeries(bookClassData?.seriesId));
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

export const updateBookClass = createAsyncThunk(
  'appCalendar/updateBookClass',
  async (bookClassData, { dispatch }) => {
    try {
      const response = await API.post(`attendance/updateBookedStudent`, bookClassData);
      await dispatch(fetchClasses());
      // bookClassData?.seriesId
      // await dispatch(getClassbooking(bookClassData?.classId));
      await dispatch(getClassbookingBySeries(bookClassData?.seriesId));
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

export const getClassbooking = createAsyncThunk('appCalendar/classBooking', async (classId) => {
  const response = await API.get(`attendance/get-classBooking/${classId}`);
  return response?.data?.data;
});

export const getClassbookingBySeries = createAsyncThunk(
  'appCalendar/classBookingSeries',
  async (seriesId) => {
    const response = await API.get(`attendance/getBookedStudentsBySeriesId/${seriesId}`);
    return response?.data?.data;
  }
);

export const getAttendance = createAsyncThunk('appCalendar/getAttendance', async (data) => {
  const response = await API.get(`attendance/get-attendance/`, { params: data });
  return response?.data?.data;
});

export const fetchClasses = createAsyncThunk('appCalendar/getClasses', async () => {
  const response = await API.get(`attendance/all/${getUserData().id}`);
  return response?.data?.data;
});

export const updateClass = createAsyncThunk(
  'appCalendar/updateClass',
  async (classEvent, { dispatch }) => {
    try {
      const response = await API.post('/attendance/update', classEvent);
      await dispatch(fetchClasses());
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
  'appCalendar/updateWholeSeries',
  async (classEvent, { dispatch }) => {
    try {
      const response = await API.post('/attendance/updateWholeSeries', classEvent);
      await dispatch(fetchClasses());
      // success(response?.data?.msg);
      Swal.fire('Succefully updated!', `Class has been updated.`, 'success');
      return response.data;
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (errors?.common?.msg) {
        // error(errors.common.msg.replace(/\\/g, ''));
        Swal.fire(
          'Update failed!',
          `Class does not updated: ${errors.common.msg.replace(/\\/g, '')}`,
          'error'
        );
      } else {
        // error(err.message.replace(/\\/g, ''));
        Swal.fire('Error', `Server connection error: ${err.message.replace(/\\/g, '')}`, 'error');
      }
    }
  }
);

export const deleteClass = createAsyncThunk(
  'appCalendar/deleteClass',
  async (payload, { dispatch }) => {
    try {
      const response = await API.delete(`attendance/${payload?.type}/${payload?.classId}`);

      if (response.status === 200) {
        await dispatch(fetchClasses(getUserData().id));
        Swal.fire('Succefully deleted!', `Class has been deleted.`, 'success');
        return true;
      }
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (errors?.common?.msg) {
        // error(errors.common.msg.replace(/\\/g, ''));
        Swal.fire(
          'Delete failed!',
          `Class does not deleted: ${errors.common.msg.replace(/\\/g, '')}`,
          'error'
        );
      } else {
        // error(err.message.replace(/\\/g, ''));
        Swal.fire('Error', `Server connection error: ${err.message.replace(/\\/g, '')}`, 'error');
      }
    }
  }
);

export const deleteAttendance = createAsyncThunk(
  'appCalendar/deleteAttendance',
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

export const deleteBooking = createAsyncThunk('appCalendar/deleteBooking', async (bookingId) => {
  try {
    const response = await API.post(`attendance/removeBookedStudent/${bookingId}`);
    if (response.status === 200) {
      // success(response?.data?.msg);
      Swal.fire(response?.data?.msg, '', 'success');
      return true;
    }
  } catch (err) {
    const errors = err?.response?.data?.errors;
    if (errors?.common?.msg) {
      // error(errors.common.msg.replace(/\\/g, ''));
      Swal.fire(
        'Delete failed!',
        `Student does not deleted: ${errors.common.msg.replace(/\\/g, '')}`,
        'error'
      );
    } else {
      Swal.fire('Error', `Server connection error: ${err.message.replace(/\\/g, '')}`, 'error');
      // error(err.message.replace(/\\/g, ''));
    }
  }
});

export const getClassInfo = createAsyncThunk('appCalendar/getClassInfo', async (classId) => {
  const response = await API.get(`attendance/info/${classId}`);
  if (response.status === 200) {
    return response.data;
  }
  return {};
});

export const oneTimeSchedule = createAsyncThunk(
  'appCalendar/oneTimeSchedule',
  async (payload, { dispatch }) => {
    try {
      const response = await API.post(`attendance/oneTimeSchedule`, payload);
      await dispatch(fetchClasses());
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
  'appCalendar/ongoingTimeSchedule',
  async (payload, { dispatch }) => {
    try {
      const response = await API.post(`attendance/ongoingTimeSchedule`, payload);
      await dispatch(fetchClasses());
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

// ** Program
export const fetchPrograms = createAsyncThunk('appCalendar/fetchPrograms', async () => {
  const response = await API.get(`program/get/`);
  return response?.data;
});

export const createProgram = createAsyncThunk(
  'appCalendar/createProgram',
  async (data, { dispatch }) => {
    try {
      const response = await API.post(`program/add`, data);
      await dispatch(fetchPrograms());

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

export const updateProgram = createAsyncThunk(
  'appCalendar/updateProgram',
  async (data, { dispatch }) => {
    try {
      const response = await API.post('/program/update', data);
      await dispatch(fetchPrograms());
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

export const deleteProgram = createAsyncThunk(
  'appCalendar/deleteProgram',
  async (payload, { dispatch }) => {
    try {
      const response = await API.delete(`program/delete/${payload?._id}`);

      if (response.status === 200) {
        await dispatch(fetchPrograms());

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

export const appCalendarSlice = createSlice({
  name: 'appCalendar',
  initialState: {
    // Appointment
    events: [],
    selectedEvent: {},
    selectedFilters: ['Events', 'Appointments', 'Bookings', 'Classes'],
    // Class
    classes: [],
    classAttendees: [],
    classInfo: {},
    selectedClass: {},
    isAddedSuccess: false,
    errors: {
      isError: false,
      data: {}
    }
  },
  reducers: {
    // Appointment
    selectEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    // Class
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
      // Filter
      .addCase(updateFilter.fulfilled, (state, action) => {
        if (state.selectedFilters.includes(action.payload)) {
          state.selectedFilters.splice(state.selectedFilters.indexOf(action.payload), 1);
        } else {
          state.selectedFilters.push(action.payload);
        }
      })
      .addCase(updateAllFilters.fulfilled, (state, action) => {
        const value = action.payload;
        let selected = [];
        if (value === true) {
          selected = ['Events', 'Appointments', 'Bookings', 'Classes'];
        } else {
          selected = [];
        }
        state.selectedFilters = selected;
      })
      // Appointment
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.events = action.payload.data;
      })
      // Class
      .addCase(fetchClasses.fulfilled, (state, action) => {
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
      .addCase(getClassbooking.fulfilled, (state, action) => {
        state.classBookings = action.payload;
      })
      .addCase(getClassbookingBySeries.fulfilled, (state, action) => {
        state.classBookings = action.payload;
      })
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.programs = action.payload;
      });
  }
});

export const { selectEvent, addedSuccess, setErrors, selectClass } = appCalendarSlice.actions;

export default appCalendarSlice.reducer;
