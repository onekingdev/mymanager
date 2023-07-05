import {
  setAllFormsReducer,
  setFormContacts,
  setFormReducer,
  setTemplatesReducer
} from './reducer';
import * as api from './api';
import { toast } from 'react-toastify';
import { getUserData } from '../../../auth/utils';

export const createFormAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createForm(payload);

    dispatch(setFormReducer(data.data));
    if (data?.success === true) {
      toast.success('Form created successfully');
    } else {
      toast.error('Something went wrong! please try again');
    }
  } catch (error) {}
};
export const cloneFormAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createForm(payload);
    dispatch(setFormReducer(data.data));
    if (data?.success === true) {
     // toast.success('Form created successfully');
      return data.data._id;
    } else {
      toast.error('Something went wrong! please try again');
    }
  } catch (error) {}
};

export const updateFormDataAction = (id, payload) => async (dispatch) => {
  try {
    const d = { formData: payload };
    const { data } = await api.updateForm(id, d);

    dispatch(setFormReducer(data.data));
  } catch (error) {}
};

export const updateFormAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateForm(id, payload);
    if (data) {
      toast.success('Form updated successfully');
      dispatch(setFormReducer(data.data));
    }
  } catch (error) {}
};

export const getFormDataAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getForm(id);

    dispatch(setFormReducer(data.data));
  } catch (error) {}
};

export const getFormsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getForms();

    dispatch(setAllFormsReducer(data.data));
  } catch (error) {}
};

export const deleteFormAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteForm(id);

    dispatch(getFormsAction(getUserData().id));
    if (data?.success) {
      toast.success('Funnel deleted successfully');
    } else {
      toast.error('Something went wrong! Please try again!');
    }
  } catch (error) {}
};

export const addLeadAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.addLeads(id, payload);
    if (data?.success) {
      toast.success('Yay your registration complete');
    } else {
      toast.error('Something went wrong! Please try again!');
    }
  } catch (error) {}
};

export const addToImageLibraryAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addToImageLibrary(payload);
    if (data?.success) {
      toast.success('Image uploaded successfully!');
    } else {
      toast.error('Something went wrong! Please try again!');
    }
  } catch (error) {}
};

///------------- ** save data action
export const addFormEntryAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.addFormEntry(id, payload);
    // if (data?.success) {
    //   toast.success('Yay your registration complete');
    // } else {
    //   toast.error('Something went wrong! Please try again!');
    // }
    return data;
  } catch (error) {}
};

export const updateFormEntryAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateFormEntry(id, payload);
    // if (data?.success) {
    //   toast.success('Yay your registration complete');
    // } else {
    //   toast.error('Something went wrong! Please try again!');
    // }
    return data;
  } catch (error) {}
};

export const getFormsEntryAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getFormEntries(id);

    dispatch(setFormContacts(data?.data));
  } catch (error) {}
};
export const getFormEntryDetailsAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getFormEntriesById(id);

    return data;
    // dispatch(setFormContacts(data?.data));
  } catch (error) {}
};
export const deleteFormEntryAction = (id, formId) => async (dispatch) => {
  try {
    const { data } = await api.deleteFormEntry(id);
    dispatch(getFormsEntryAction(formId));
    if (data?.success) {
      toast.success('Contact deleted successfully');
    } else {
      toast.error('Something went wrong! Please try again!');
    }
  } catch (error) {}
};

//------------ *** templates
export const getTemplatesAction = () => async (dispatch) => {
  try {
    const { data } = await api.getTemplates();
    console.log(data)
    dispatch(setTemplatesReducer(data.data));
  } catch (error) {}
};

//-------------** domain connection
export const searchDomainAvailableAction = (domain) => async (dispatch) => {
  try {
    const { data } = await api.searchDomain(domain);
    return data;
  } catch (error) {}
};
