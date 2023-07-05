import { customInterIceptors } from '../../../lib/AxiosProvider';

const API = customInterIceptors();

// user API end point
export const addNewEmployeeContactAction = (addNewEmployee) => {
  return API.post('/contact-employee/add', addNewEmployee);
};

export const deleteContactReqeust = (payload) => {
  return API.post('/contact-employee/delete', payload);
};

export const employeeListAction = (options) => {
  return API.get('/contact-employee/list', {
    params: options
  });
};

export const contactById = (_id) => {
  return API.get('/contact-employee/contact/' + _id);
};

export const contactUpdate = (payload) => {
  return API.post('/contact-employee/contact-update', payload);
};

export const contactRegisterUpdate = (payload) => {
  return API.post('/contact-employee/contact-register-update', payload);
};

export const uploadAvatarReqeust = (payload) =>
  API.post(`/contact-employee/upload-avatar`, payload);

export const updateSocialLinkRequest = (payload) =>
  API.post(`/contact-employee/update-social-links`, payload);

export const rankAddOrUpdateRequest = (payload) =>
  API.post(`/contact-employee/rank-add-or-update`, payload);

export const rankDeleteRequest = (payload) => API.post(`/contact-employee/delte-rank`, payload);

// ** File Section
export const fileAddReqeust = (payload) => API.post(`/contact-employee/file-add`, payload);

export const fileEditReqeust = (payload) => API.post(`/contact-employee/file-edit`, payload);

export const fileDeleteReqeust = (payload) => API.post(`/contact-employee/file-delete`, payload);

export const billingAddressUpdateReqeust = (payload) =>
  API.post(`/contact-employee/billing-address-update`, payload);

// Count

export const totalEmployeeCount = (payload) => API.get(`/contact-employee/total-employee`, payload);

export const ActiveEmployeeCount = (payload) =>
  API.get(`/contact-employee/active-employee`, payload);

export const InternshipEmployeeCount = (payload) =>
  API.get(`/contact-employee/internship-employee`, payload);

export const FormerEmployeeCount = (payload) =>
  API.get(`/contact-employee/former-employee`, payload);

export const importCOntactReqeust = (data) => {
  return API.post('/contact-employee/import-contact-array', data);
};

// ** workHistory

export const apiStartWork = async (userId, description) => {
  const response = await API.post('/contact-employee/workhistory/startwork', {
    userId: userId,
    description: description
  });
  localStorage.setItem('currentWork', JSON.stringify(response?.data));
  return response;
};

export const apiUpdateWork = async (historyId, screenshot) => {
  const response = await API.post('/contact-employee/workhistory/updatework', {
    historyId: historyId,
    screenshot: screenshot
  });
  return response;
};

export const apiEndWork = async (historyId) => {
  const response = await API.post('/contact-employee/workhistory/endwork', {
    historyId: historyId
  });
  return response;
};

export const getWorkHistoryTimeLine = async (id) => {
  const response = await API.get(`/contact-employee/workhistory/${id}`, { id: id });
  return response.data;
};

export const getWorkHistoryOverView = async (id) => {
  const response = await API.get(`/contact-employee/workhistory/overview/${id}`, { id: id });
  return response.data;
};

export const getScreenshots = async (historyId) => {
  const response = await API.get(`contact-employee/workhistory/screenshot/${historyId}`, {
    historyId: historyId
  });
  return response.data;
};
