import { customInterIceptors } from '../../../../lib/AxiosProvider';
import { toast } from 'react-toastify';
const API = customInterIceptors();

// user API end point
export const uploadBannerFileRequest = (payload) => API.post(`/file-manager/fileupload`, payload);
export const submitReply = (payload) => API.post(`/file-manager/fileupload`, payload);
export const deleteGuest = async ({ eventId, guestId, isInAttendance }) => {
  await API.delete(`event/delete-guests/${eventId}/${guestId}/${isInAttendance}`).then((res) => {
    toast.success('Successfully deleted');
  });
};
export const deleteGuestArr = async (payload) => {
  await API.post(`event/delete-guests-bulk`, payload).then((res) => {
    toast.success('Successfully deleted');
  });
};
export const deleteEvent = (payload) => API.delete('/event' + payload);
export const getProgressions = () => API.get('/category/categoryDetails');
export const addAndUpdateContacts = async (payload) => {
  await API.post('/contact/add-update-bulk', payload).then((res) => {
    toast.success('Invitees are successfully saved as certain type of contacts');
  });
};
export const updatePayment = (id, payload) => {
  return API.put(`/event/payment/${id}`, payload);
};
export const updateBulkPayment = (id, payload) => {
  return API.put(`/event/bulk/payment/${id}`, payload);
};
export const sendBulkInvoice = (id, payload) => {
  return API.put(`/event/invoice/${id}`, payload);
};
export const getEventInfo = async (eventId) => {
  const response = await API.get(`event/info/${eventId}`);
  if (response.status === 200) {
    return response.data;
  }
  return {};
};
