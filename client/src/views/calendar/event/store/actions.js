import * as api from './api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  // ** files upload reducers
  filesUploadBannerStart,
  filesUploadBannerSuccess,
  filesUploadBannerError,
  filesUploadBannerReset
} from './reducer';
import { getEventInfoStart, getEventInfoSuccess, getEventInfo } from '.';
import { toast } from 'react-toastify';

// ** files upload Action
export const uploadBannerFilesAction = (form) => async (dispatch) => {
  try {
    dispatch(filesUploadBannerStart());
    await api.uploadBannerFileRequest(form);
    dispatch(filesUploadBannerSuccess());
  } catch (error) {
    dispatch(filesUploadBannerError(error));
  }
};

// ** Get Event info
export const getEventInfoAction = (eventId) => async (dispatch) => {
  try {
    dispatch(getEventInfoStart());
    const data = await api.getEventInfo(eventId);

    dispatch(getEventInfoSuccess(data));
  } catch (error) {

  }
};

export const submitReplyAction = (state) => async (dispatch) => {
  try {
    dispatch(employeeUpdateIdStart());
    const { data } = await api.submitReply(state);
    dispatch(employeeUpdateIdSuccess(data));
    // Refetch Employee
    dispatch(contactByIdAction({ _id: contact?.id }));
  } catch (error) {}
  // Reset After 3 sec
};

export const deleteGuestAction =
  ({ eventId, guestId, isInAttendance }) =>
  async (dispatch) => {
    try {
      await api.deleteGuest({ eventId, guestId, isInAttendance });
      dispatch(getEventInfo(eventId));
    } catch (error) {}
  };

export const deleteGuestArrAction =
  ({ eventId, guestIdArr, isInAttendance }) =>
  async (dispatch) => {
    try {
      await api.deleteGuestArr({ eventId, guestIdArr, isInAttendance });
      dispatch(getEventInfo(eventId));
    } catch (error) {}
  };

export const deleteEventAction = (eventId) => async (dispatch) => {
  try {
    await api.deleteEvent(eventId);
    dispatch(getEventInfo(eventId));
  } catch (error) {}
};

export const useAddAndUpdateContactsBulkAction =
  ({ eventId, payload }) =>
  async (dispatch) => {
    try {
      await api.addAndUpdateContacts(payload);
      dispatch(getEventInfo(eventId));
    } catch (error) {}
  };

export const updatePaymentAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updatePayment(id, payload);
    if (data) {
      dispatch(getEventInfo(id));
      toast.success('Payment done successfully');
    }
  } catch (error) {}
};
export const updateBulkPayment = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateBulkPayment(id, payload);
    if (data) {
      dispatch(getEventInfo(id));
      toast.success('Payment done successfully');
    }
  } catch (error) {}
};
export const sendBulkInvoice = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.sendBulkInvoice(id, payload);
    if (data) {
      dispatch(getEventInfo(id));
      toast.success('Invoice Sent Successfully');
    }
  } catch (error) {}
};
