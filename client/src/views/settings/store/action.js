import * as api from './api';
import { getUserReducer } from './reducer';

export const saveSettingAction = (options) => async (dispatch) => {
  try {
    const { data } = await api.saveSetting(options);
    return data;
  } catch (error) {}
  // Reset After 3 sec
};

export const sendCodeAction =
  ({ devs, code }) =>
  async (dispatch) => {
    try {
      const { data } = await api.sendCode({ devs, code });
      return data;
    } catch (error) {}
  };

//connect to stripe
export const connectStripeAction = () => async (dispatch) => {
  try {
    const { data } = await api.connectStripe();
    return data;
  } catch (error) {}
};

export const getStripeAccountAction = () => async (dispatch) => {
  try {
    const { data } = await api.getStripeAccount();
    return data;
  } catch (error) {}
};

//get account details 
export const getUserDetailsAction = () =>async (dispatch) =>{
  try {
    const {data} = await api.getUserDetails()
    if(data){
      dispatch(getUserReducer(data))
    }
  } catch (error) {
    
  }
}
