import { customInterIceptors } from '../../../../../../../lib/AxiosProvider';

const API = customInterIceptors();

export const addRetention = (retentionData) => {
  return API.post('/retention', retentionData);
};
export const fetchRetention = () => {
  return API.get('/retention');
};
export const deleteRetention = (rule) => {
  return API.delete('/retention/'+rule._id);
};
export const editRetention = (payload) => {
  return API.put('/retention/'+payload.rule._id,payload);
};

