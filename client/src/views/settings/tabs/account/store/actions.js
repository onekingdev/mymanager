import * as api from './api';
import { toast } from 'react-toastify';

import useJwt from '@src/auth/jwt/useJwt';
import email from '../../../../apps/email';
const config = useJwt.jwtConfig;

export const updateUserProfileAction = (payload, userProfileDataRefetch) => async () => {
  try {
    const { data } = await api.updateUserProfile(payload);
    if (data.success) {
      if (data.status === 200) {
        userProfileDataRefetch();
        toast.success(`User's Profile updated Successfully`);
      } else toast.info(`There are not changd User's Profile`);
    } else {
      toast.error(`Unable to update User's Profile`);
    }
  } catch (error) {}
};
export const deactiveUserAction = () => async () => {
  try {
    const { data } = await api.deactiveUser();
    if (data.success) {
      localStorage.removeItem('userData');
      localStorage.removeItem(config.storageTokenKeyName);
      localStorage.removeItem(config.storageRefreshTokenKeyName);
      setTimeout(function () {
        window.location.reload();
      }, 5000);
      toast.success(`Account deactived Successfully`);
    } else {
      toast.error(`Unable to deactive account`);
    }
  } catch (error) {}
};
export const resetUserPasswordAction = (payload) => async () => {
  try {
    const { data } = await api.resetUserPassword(payload);
    switch (data.status) {
      case 200:
        localStorage.removeItem('userData');
        localStorage.removeItem(config.storageTokenKeyName);
        localStorage.removeItem(config.storageRefreshTokenKeyName);
        setTimeout(function () {
          window.location.reload();
        }, 5000);
        toast.success(`Password changed Successfully`);
        break;
      case 403:
        toast.info(`Current Password is incorrect`);
        break;
      default:
        break;
    }
  } catch (error) {}
};

export const sendEmailAction = (payload) => async () => {
  try {
    const { email } = payload;
    const { data } = await api.sendEmail(payload);
    if (data.success) {
      toast.info(`send to verification code to ${email}. plz check the email`);
    } else {
      toast.error(`Do not send to ${email}`);
    }
  } catch (error) {}
};

export const checkOTPEmailAction = (payload, setShowOtpModal) => async () => {
  try {
    const { email } = payload;
    const { data } = await api.checkOTPEmail(payload);
    if (data.success) {
      toast.info(`verification email${email} successfully`);
      setShowOtpModal(false);
    } else {
      toast.error(`Don't verification email:${email}`);
    }
  } catch (error) {}
};
