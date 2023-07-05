import { customInterIceptors } from '../../../../../lib/AxiosProvider';

const API = customInterIceptors();

// Payment method Add
export const fetchUserProfile = () => {
  return API.post(`user/profile`);
};

// Payment method Add
export const updateUserProfile = (payload) => {
  return API.put(`user/profile`, payload);
};
// Payment method Add
export const deactiveUser = () => {
  return API.put(`user/deactive`);
};
export const resetUserPassword = (payload) => {
  return API.put(`user/reset-password`, payload);
};
export const sendEmail = (payload) => {
  console.log(payload);
  return API.put(`user/send-email`, payload);
};
export const checkOTPEmail = (payload) => {
  console.log(payload);
  return API.put(`user/check-otp-email`, payload);
};
