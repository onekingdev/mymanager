import { customInterIceptors } from '../../../../lib/AxiosProvider';
import { toast } from 'react-toastify';
const API = customInterIceptors();

// user API end point
export const getSmartList = () => {
  return API.get('/smartlist/get');
};

export const saveAutomation = (saveData) => {
  return API.post('/automation/', saveData);
};

export const fileUpload = (file) => {
  // console.log(file)
  return API.post('/automation/fileupload', file);
};

export const getAll = () => {
  return API.get('/automation');
};

export const changeStatus = (id) => {
  return API.post('/automation/changeStatus', { id: id });
};

export const deleteAutomation = (id) => {
  return API.post('/automation/delete', { id: id });
};

export const getPhones = (id) => {
  return API.post('/deposit/getPhoneNums', { id: id })
}
