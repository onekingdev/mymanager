import { customInterIceptors } from '../../../lib/AxiosProvider';

const API = customInterIceptors();

export const saveSetting = (payload) => {
  return API.post('/livechat-widget-setting', payload);
};
export const sendCode = (payload) => {
  return API.post('/livechat-widget-setting/send-code', payload);
};

export const connectStripe = ()=>{
  return API.post('/payment/stripe/create-account')
}

export const getStripeAccount = ()=>{
  return API.get('/payment/stripe/get-account')
}
export const getUserDetails = () =>{
  return API.get('/account-setting/data')
}
