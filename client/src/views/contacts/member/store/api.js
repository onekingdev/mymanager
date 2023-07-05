import { customInterIceptors } from '../../../../lib/AxiosProvider';

const API = customInterIceptors();

// user API end point
export const newMemberContact = (newMemberContact) => {
  return API.post('/member-contact', newMemberContact);
};

// fetch Member Contact List
export const memberContactList = (options) => {
  return API.get('/member-contact/list', {
    params: options
  });
};

// fetch Member Contact List
export const deleteMemberContact = (id) => {
  return API.patch('/member-contact/delete/' + id);
};
// fetch member notes list
export const memberNoteList = () => {
  return API.get('notes/followup_note/get_notes_by_user_id');
};
export const memberNoteAdd = (newnote) => {
  return API.post('notes/followup_note/add_note', newnote);
};
export const memberNoteDelete = (id) => {
  return API.delete('notes/followup_note/remove_note/' + id);
};
export const memberNoteEdit = (newnote) => {
  return API.put('notes/followup_note/update_note/' + newnote._id, newnote);
};

// Member State
export const MemberContactTotalCount = () => {
  return API.get('/member-contact/total-members-count');
};

export const MemberContactTotalActiveCount = () => {
  return API.get('/member-contact/active-members');
};

export const MemberContactTotalPastDueCount = () => {
  return API.get('/member-contact/past-due-members');
};

export const MemberContactTotalFormerCount = () => {
  return API.get('/member-contact/former-members');
};

export const fetchSingleMemberReqeust = (id) => {
  return API.get('/member-contact/' + id);
};

export const importCOntactFileUPload = (data) => {
  return API.post('/member-contact/import-contacts', data, {
    headers: {
      'Content-Type': `multipart/form-data`
    }
  });
};

export const importCOntactReqeust = (data) => {
  return API.post('/member-contact/import-contact-array', data);
};
export const editMemberReqeust = (id, updatedMember) =>
  API.patch(`/member-contact/${id}`, updatedMember);

export const tagFetchReqeust = () => API.get(`/contact/bytag`);

export const uploadAvatarReqeust = (form) => API.post(`/member-contact/upload-avatar`, form);

// ** files upload reqeusts
export const uploadFileReqeust = (form) => API.post(`/member-contact/upload-file`, form);

export const addRankReqeust = (form) => API.post(`/member-contact/add-rank`, form);
export const deleteFileReqeust = (payload) => API.post(`/member-contact/delete-file`, payload);

export const editRankReqeust = (form) => API.patch(`/member-contact/rank/edit`, form);

export const deleteRankReqeust = (data) => API.patch(`/member-contact/remove-rank`, data);

export const addOtherReqeust = (form) => API.post(`/member-contact/add/other`, form);

export const editOtherReqeust = (form) => API.patch(`/member-contact/edit/other`, form);

// Payment method Add
export const addPaymentMethod = (form) => API.post(`/member-contact/add/payment-method`, form);

// Payment method Delete
export const deletePaymentMethod = (form) =>
  API.post(`/member-contact/delete/payment-method`, form);

// Payment method Add
export const updatePaymentMethod = (form) =>
  API.post(`/member-contact/update/payment-method`, form);
export const deleteOtherReqeust = (state) => API.patch(`/member-contact/remove-other`, state);

export const editBillingReqeust = (form) => API.patch(`/member-contact/update/billing-info`, form);

export const mergeDocument = ({ url, replaceFields }) => {
  return API.post('/file-manager/merge-file', {
    fileUrl: url,
    replaceFields
  });
};

export const getContactByTag = (tag)=>{
  let payload = {tag:tag}
  return API.get('/client-contact/contact/bytag/',payload)
}