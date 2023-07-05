// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { customInterIceptors } from '../../../../lib/AxiosProvider';

import moment from 'moment';

const API = customInterIceptors();

export const createBooking = createAsyncThunk(
  'calendar/createBooking',
  async (bookingData, { dispatch }) => {
    console.log(bookingData)
    const response = await API.post(`calendar/booking/create`, bookingData);
    dispatch(weekBookingCount(bookingData.userId));
    dispatch(monthBookingCount(bookingData.userId));
    dispatch(nextMonthBookingCount(bookingData.userId));
    return response.data;
  }
);

export const updateBooking = createAsyncThunk(
  'calendar/updateBooking',
  async ({ id, data }, { dispatch }) => {
    const response = await API.put(`calendar/booking/update/${id}`, data);
    dispatch(weekBookingCount(bookingData.userId));
    dispatch(monthBookingCount(bookingData.userId));
    dispatch(nextMonthBookingCount(bookingData.userId));
    return response.data;
  }
);

export const getBookingDetail = createAsyncThunk('calendar/getBookingDetail', async (id) => {
  const response = await API.get(`calendar/booking/info/${id}`);

  return response.data;
});

export const getData = createAsyncThunk('calendar/getBooking', async (params) => {
  const response = await API.get(`/calendar/booking/get`, { params });
  return {
    params,
    data: response.data.data,
    // data: response.data.books,
    allData: response.data.allData,
    totalPages: response.data.total
  };
});

export const getMonthlyData = createAsyncThunk('calendar/getMonthlyBooking', async (params) => {
  const response = await API.get(`/calendar/booking/get-monthly`, { params });
  return {
    params,
    data: response.data.data
  };
});

export const deleteBook = createAsyncThunk(
  'calendar/deleteBooking',
  async (id,userId, { dispatch, getState }) => {
    const response = await API.delete(`/calendar/booking/delete/${id}`);
    if (response.status === 200) {
      dispatch(weekBookingCount(userId));
      dispatch(monthBookingCount(userId));
      dispatch(nextMonthBookingCount(userId));
      await dispatch(getData(getState().book.params));
      return true;
    }
    return false;
  }
);

export const weekBookingCount = createAsyncThunk('calendar/weekBookingCount', async (id) => {
  const currentDate = new Date();
  const weekStartDate = new Date();
  weekStartDate.setDate(currentDate.getDate() - currentDate.getDay());
  const weekEndDate = new Date(weekStartDate.getTime() + 7 * 60 * 60 * 24 * 1000);

  const response = await API.get(
    `/calendar/booking/get-booking-count?startDate=${moment(weekStartDate).format(
      'YYYY-MM-DD'
    )}&endDate=${moment(weekEndDate).format('YYYY-MM-DD')}&id=${id}`
  );
  return response.data;
});

export const monthBookingCount = createAsyncThunk('calendar/monthBookingCount', async (id) => {
  var date = new Date();
  var monthStartDate = new Date(date.getFullYear(), date.getMonth(), 1);
  var monthLastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const response = await API.get(
    `/calendar/booking/get-booking-count?startDate=${moment(monthStartDate).format(
      'YYYY-MM-DD'
    )}&endDate=${moment(monthLastDate).format('YYYY-MM-DD')}&id=${id}`
  );
  return response.data;
});

export const nextMonthBookingCount = createAsyncThunk(
  'calendar/nextMonthBookingCount',
  async (id) => {
    var date = new Date();
    var monthStartDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    var monthLastDate = new Date(date.getFullYear(), date.getMonth() + 2, 0);

    const response = await API.get(
      `/calendar/booking/get-booking-count?startDate=${moment(monthStartDate).format(
        'YYYY-MM-DD'
      )}&endDate=${moment(monthLastDate).format('YYYY-MM-DD')}&id=${id}`
    );
    return response.data;
  }
);

export const createBookingType = createAsyncThunk(
  'calendar/createBookingType',
  async (bookingTypeData, { dispatch }) => {
    const response = await API.post(`calendar/booking-type/create`, bookingTypeData);
    await dispatch(getBookingType());
    return response.data;
  }
);

export const getBookingType = createAsyncThunk('calendar/getBookingType', async () => {
  const response = await API.get(`calendar/booking-type/get`);

  return response.data;
});

export const getBookingTypeDetail = createAsyncThunk(
  'calendar/getBookingTypeDetail',
  async (link) => {
    const response = await API.get(`calendar/booking-type/info/${link}`);

    return response.data;
  }
);

export const updateBookingType = createAsyncThunk(
  'calendar/updateBookingType',
  async ({ id, data }, { dispatch, getState }) => {
    await API.put(`calendar/booking-type/update/${id}`, data);
    await dispatch(getBookingType());
    return id;
  }
);

export const deleteBookingType = createAsyncThunk(
  'appCalendar/updateEvent',
  async (id, { dispatch, getState }) => {
    await API.delete(`calendar/booking-type/delete/${id}`);
    await dispatch(getBookingType());
    return id;
  }
);

export const cloneBookingType = createAsyncThunk(
  'appCalendar/updateEvent',
  async (id, { dispatch, getState }) => {
    await API.post(`calendar/booking-type/clone/${id}`);
    dispatch(getBookingType());
    return id;
  }
);

export const appBookingsSlice = createSlice({
  name: 'appBooking',
  initialState: {
    montlyBooks: [],
    books: [],
    total: 1,
    params: {},
    allBooks: [],
    bookingTypes: [],
    detailBookingType: {},
    detailBooking: {},
    selectDate: null,
    selectTime: null,
    weekBookingCount: 0,
    monthBookingCount: 0,
    nextMonthBookingCount: 0
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBookingType.fulfilled, (state, action) => {
      state.bookingTypes = action.payload.data;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.books = action.payload.data.list;
      //state.allBooks = action.payload.allData
      state.total = action.payload.data.total;
      state.params = action.payload.params;
    });
    builder.addCase(getMonthlyData.fulfilled, (state, action) => {
      state.monthlyData = action.payload.data;
    });

    builder.addCase(getBookingTypeDetail.fulfilled, (state, action) => {
      state.detailBookingType = action.payload.data;
    });

    builder.addCase(getBookingDetail.fulfilled, (state, action) => {
      state.detailBookingType = action.payload.data.bookingType;
      state.detailBooking = action.payload.data;
    });

    builder.addCase(weekBookingCount.fulfilled, (state, action) => {
      state.weekBookingCount = action.payload;
    });

    builder.addCase(monthBookingCount.fulfilled, (state, action) => {
      state.monthBookingCount = action.payload;
    });

    builder.addCase(nextMonthBookingCount.fulfilled, (state, action) => {
      state.nextMonthBookingCount = action.payload;
    });
  }
});

export default appBookingsSlice.reducer;
