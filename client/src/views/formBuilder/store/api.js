import { customInterIceptors } from '../../../lib/AxiosProvider';

const API = customInterIceptors();

//create form
export const createForm = (payload) => {
  return API.post('/form-builder/create', payload);
};

//save
export const updateForm = (id, payload) => {
  return API.put('/form-builder/edit/' + id, payload);
};

//redirect to live link
export const getForm = (id) => {
  return API.get('/form-builder/preview/' + id);
};

export const deleteForm = (id) => {
  return API.delete(`/form-builder/delete/${id}`);
};

export const getForms = (id) => {
  return API.get('/form-builder/forms/');
};

export const addLeads = (id, payload) => {
  return API.post('/form-builder/addleads/' + id, payload);
};

export const addToImageLibrary = (payload) => {
  return API.post('/image-library/', payload);
};

//save form entry

export const addFormEntry =(id,payload) =>{
    return API.post('/form-builder/details/' + id,payload);
}
export const updateFormEntry =(id,payload) =>{
    return API.put('/form-builder/details/' + id,payload);
}
export const getFormEntries =(id) =>{
    return API.get('/form-builder/details/'+ id);
}
export const getFormEntriesById =(id) =>{
    return API.get('/form-builder/contact-details/'+ id);
}
export const deleteFormEntry =(id) =>{
    return API.delete('/form-builder/details/' + id);
}

// get templates 
export const getTemplates = () =>{
  return API.get('/form-builder/templates');
}

// search domain
export const searchDomain = (domain) =>{
  return API.get(`/form-builder/search/domain/${domain}`);
}

