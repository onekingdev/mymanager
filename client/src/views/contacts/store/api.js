import { customInterIceptors } from '../../../lib/AxiosProvider';
const API = customInterIceptors();
import { toast } from 'react-toastify';

// ** Contacts
export const getContacts = () => {
  return API.get('contact/get');
};

export const addContact = (payload) => {
  return API.post('/contact/add', payload);
};

// update contact query
export const updateContact = (payload) => {
  return API.post(`/contact/update/${payload?._id}`, payload);
};

export const updateFieldValueContact = (payload) => {
  return API.post(`/contact/update-field-value/${payload?.contactId}`, payload);
};

// delete contact
export const deleteContact = (payload) => {
  return API.delete(`/contact/delete`, {
    data: { source: payload }
  });
};

export const getContactTypes = () => {
  return API.get('contact-type/getByUserId');
};

// ** Contact Notes API
// fetch client notes list
export const contactNoteList = () => {
  return API.get('notes/followup_note/get_client_notes');
};

export const contactNoteById = (id) => {
  return API.get('notes/followup_note/get_client_notes/' + id);
};
export const contactNoteAdd = (newnote, id) => {
  return API.post('notes/followup_note/add_note/' + id, newnote);
};
export const contactNoteDelete = (id) => {
  return API.delete('notes/followup_note/remove_note/' + id);
};
export const contactNoteEdit = (newnote) => {
  return API.put('notes/followup_note/update_note/' + newnote._id, newnote);
};

// add client to progression
export const addClientProgressionApi = (form) =>
  API.post(`/client-ranks/add_client_into_progression`, form);
//promoted client list
export const promotedListApi = () => {
  return API.get('/client-ranks/listof_Promoted_clients');
};
// ** Get all contact rank
export const contactRankListApi = () => API.get(`/client-ranks/listof_contact_rank`);
//promote client to progression
export const promoteClientProgressionApi = (form) =>
  API.put(`/client-ranks/promote_clients_rank`, form);
//Get client to progression
export const getClientRankApi = (form) => API.post(`/client-ranks/get_clients_rank`, form);
//promote client from event
export const promoteClientProgressionFromEventApi = (form) =>
  API.put(`/client-ranks/promote_clients_rank_from_event`, form);
// add client to progression

export const addRankHistoryApi = (id, payload) => {
  return API.post(`/rank-history/add_rank_client_history/${id}`, payload);
};

export const progressionListApi = (form) => API.get(`/client-ranks/listof_not_Promoted_clients`);

// demoteClientApi
//promoted client list
export const demoteClientApi = (payload) => {
  return API.put('/client-ranks/add_clients_intoProgression', payload);
};

//Membership contracts for contacts
export const getContactContractsApi = (id) => {
  return API.get(`/membership-buy/contact/${id}`);
};

/**
 * ***********************  CAUTION  ***********************
 * Following code will be delete after finish refactoring.
 * Now can not delelte we should test & check the previous work and current work.
 * Thanks.
 */

//leads
export const getLeadsList = (payload) => {
  return API.get('/lead-contact/list', {
    params: payload
  });
};
export const getTotalLeads = () => {
  return API.get('/lead-contact/total-contact-count');
};

//client
export const getClientList = (options) => {
  return API.get('/client-contact', {
    params: options
  });
};
export const getTotalClients = () => {
  return API.get('/client-contact/total-clients-count');
};

//employee
export const getEmployeeList = (options) => {
  return API.get('/contact-employee/list', {
    params: options
  });
};

export const getTotalEmployees = () => {
  return API.get(`/contact-employee/total-employee`);
};
//relationships
export const getRelationshipsList = (payload) => {
  return API.get('/relation-contact/list', {
    params: payload
  });
};
export const getTotalRelationships = () => {
  return API.get('/relation-contact/total-contact-count');
};

//vendors
export const getTotalVendors = () => {
  return API.get('/vendor-contact/total-contact-count');
};
export const getVendorsList = (payload) => {
  return API.get('/vendor-contact/list', {
    params: payload
  });
};

//member
export const getMemberList = (options) => {
  return API.get('/member-contact', {
    params: options
  });
};
export const getTotalMembers = () => {
  return API.get('/member-contact/total-members-count');
};

//tags
export const getTags = () => {
  return API.get('/tags/');
};

export const createTag = (payload) => {
  return API.post('/tags/', payload);
};

export const deleteTag = (id) => {
  return API.put(`/tags/delete/${id}`);
};

export const updateTag = (id, payload) => {
  return API.put(`/tags/update/${id}`, payload);
};

//stages
export const getStages = () => {
  return API.get('/stage/');
};

export const createStage = (payload) => {
  return API.post('/stage/', payload);
};

export const deleteStage = (id) => {
  return API.put(`/stage/delete/${id}`);
};

export const updateStage = (id, payload) => {
  return API.put(`/stage/update/${id}`, payload);
};

export const reorderStage = (oldIndex, newIndex) => {
  return API.put(`/stage/reorder/${oldIndex}/${newIndex}`);
};

export const getLeadSource = () => {
  return API.get('/lead-source');
};
export const updateLeadSource = (id, payload) => {
  return API.put(`/lead-source/update/${id}`, payload);
};
export const deleteLeadSource = (id) => {
  return API.put(`/lead-source/delete/${id}`);
};
export const addLeadSource = (payload) => {
  return API.post('/lead-source', payload);
};

export const progressionHistory = (clientId, payload) => {
  return API.post(`/rank-history/promoted_client_history/${clientId}`, payload);
};

export const getAllProgression = () => {
  return API.post(`/rank-history/promoted_client_history_all`);
};

export const fetchProgression = () => {
  return API.get('/progression/get/progression_details');
};
export const progressionHistoryDelete = (payload) => {
  return API.delete(`/rank-history/delete_rank_history/${payload}`);
};

export const progressionHiEdApi = (id, payload) => {
  return API.put(`/rank-history/promoted_client_history_update/${id}`, payload);
};

export const progRemoveApi = (payload) => {
  return API.post(`/client-ranks/remove_client_from_progression`, payload);
};

//=====================contact types====================
export const addContactType = (payload) => {
  return API.post(`/contact-type/`, payload);
};
export const updateContactType = (id, payload) => {
  return API.put(`/contact-type/${id}`, payload);
};
export const deleteContactType = (id, payload) => {
  return API.put(`/contact-type/delete/${id}`, payload);
};
// ====================contact fields====================
export const addContactField = (payload) => {
  return API.post('/contact-field/', payload);
};

export const getAllContactField = () => {
  return API.get('/contact-field');
};

export const getContactFieldByType = (contactTypeId) => {
  return API.get(`/contact-field/${contactTypeId}`);
};

export const deleteContactFieldByType = ({ contactType, fieldId }) => {
  return API.delete(`/contact-field/${contactType}/${fieldId}`);
};

export const updateContactFieldByType = (payload) => {
  return API.put(`/contact-field/${payload.contactType}`, payload);
};

export const updateContactFieldOrder = (payload) => {
  return API.post('/contact-field/order', payload);
};

// ======================Client Apis=====================
export const newClientContact = (newClientContact) => {
  return API.post('/client-contact', newClientContact);
};

// fetch Client Contact List
export const clientContactList = (options) => {
  return API.get('/client-contact', {
    params: options
  });
};

// fetch Client Contact List
export const deleteClientContact = (id) => {
  return API.patch('/client-contact/delete/' + id);
};

// Client State
export const ClientContactTotalCount = () => {
  return API.get('/client-contact/total-clients-count');
};

export const ClientContactTotalActiveCount = () => {
  return API.get('/client-contact/active-clients');
};

export const ClientContactTotalPastDueCount = () => {
  return API.get('/client-contact/past-due-clients');
};

export const ClientContactTotalFormerCount = () => {
  return API.get('/client-contact/former-clients');
};

export const fetchSingleClientReqeust = (id) => {
  return API.get('/client-contact/' + id);
};

export const getInvoicesReqeust = () => {
  return API.get('/invoice/');
};

export const importCOntactFileUPload = (data) => {
  return API.post('/client-contact/import-contacts', data, {
    headers: {
      'Content-Type': `multipart/form-data`
    }
  });
};

export const importCOntactReqeust = (data) => {
  return API.post('/client-contact/import-contact-array', data);
};
export const editClientReqeust = (id, updatedClient) =>
  API.patch(`/client-contact/${id}`, updatedClient);

export const tagFetchReqeust = () => API.get(`/tags`);

export const uploadAvatarReqeust = (form) => API.post(`/client-contact/upload-avatar`, form);

// ** files upload reqeusts
export const uploadFileReqeust = (form) => API.post(`/client-contact/upload-file`, form);

export const addRankReqeust = (form) => API.post(`/client-contact/add-rank`, form);
export const deleteFileReqeust = (payload) => API.post(`/client-contact/delete-file`, payload);

export const editRankReqeust = (form) => API.patch(`/client-contact/rank/edit`, form);

export const deleteRankReqeust = (data) => API.patch(`/client-contact/remove-rank`, data);

export const addOtherReqeust = (form) => API.post(`/client-contact/add/other`, form);

export const editOtherReqeust = (form) => API.patch(`/client-contact/edit/other`, form);

// Payment method Add
export const addPaymentMethod = (form) => API.post(`/client-contact/add/payment-method`, form);

// Payment method Delete
export const deletePaymentMethod = (form) =>
  API.post(`/client-contact/delete/payment-method`, form);

// Payment method Add
export const updatePaymentMethod = (form) =>
  API.post(`/client-contact/update/payment-method`, form);
export const deleteOtherReqeust = (state) => API.patch(`/client-contact/remove-other`, state);

export const editBillingReqeust = (form) => API.patch(`/client-contact/update/billing-info`, form);

export const mergeDocument = ({ url, replaceFields }) => {
  return API.post('/file-manager/merge-file', {
    fileUrl: url,
    replaceFields
  });
};

export const getContactByTag = (tag) => {
  let payload = { tag: tag };
  return API.get('/client-contact/contact/bytag/', payload);
};
export const getFormerClients = () => {
  return API.get('/client-contact/former-clients');
};

// =================Employee Apis===============
export const importEmpContactReqeust = (data) => {
  return API.post('/contact-employee/import-contact-array', data);
};
export const addNewEmployeeContactAction = (addNewEmployee) => {
  API.post('/contact-employee/add', addNewEmployee).then((res) => {
    if (res.status !== 200 && res.status !== 201) {
      toast.error(res.message);
    } else {
      return res;
    }
  });
};
// Notes
export const empNoteList = () => {
  return API.get('notes/followup_note/get_notes_by_user_id');
};
export const empNoteAdd = (newnote) => {
  return API.post('notes/followup_note/add_note', newnote);
};
export const empNoteDelete = (id) => {
  return API.delete('notes/followup_note/remove_note/' + id);
};
export const empNoteEdit = (newnote) => {
  return API.put('notes/followup_note/update_note/' + newnote._id, newnote);
};

export const addContactBulk = (payload) => {
  API.post('/contact-employee/add-bulk', payload).then((res) => {
    if (res.status !== 200 && res.status !== 201) {
      toast.error(res.message);
    } else {
      return res;
    }
  });
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

export const contactRegisterSend = (payload) => {
  return API.post('/contact-employee/contact-register-send', payload);
};

export const uploadEmpAvatarReqeust = (payload) =>
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

// ** workHistory

//getAllWorkHistory
export const getAllWorkHistory = () => {
  return API.get('/contact-employee/workhistory/getallworkhisotry');
};

export const apiStartWork = async (userId, description) => {
  const response = await API.post('/contact-employee/workhistory/startwork', {
    userId: userId,
    description: description
  });
  localStorage.setItem('currentWork', JSON.stringify(response?.data));
  return response;
};

export const apiUpdateWork = async (historyId, screenshot, screenshot_sm) => {
  const response = await API.post('/contact-employee/workhistory/updatework', {
    historyId: historyId,
    screenshot: screenshot,
    screenshot_sm: screenshot_sm
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

export const getScreenshotsByUserId = async (userId, startPicker) => {
  const response = await API.post(`contact-employee/workhistory/screenshots_userId`, {
    userId: userId,
    startPicker: startPicker
  });
  if (response.status == 200) return response.data;
};

export const getDetailImage = async (workId, screenId) => {
  const response = await API.post(`contact-employee/workhistory/get_detail_image`, {
    workId: workId,
    screenId: screenId
  });
  if (response.status == 200) return response.data;
};

export const getAllEmployeeCategory = async () => {
  return API.get(`employee-categories/`);
};

export const createCategory = async (newCategory) => {
  API.post(`/employee-categories/`, newCategory).then((response) => {
    if (response.status == 200 || response.status == 201) {
      toast.success('Create categories successfully');
    } else {
      toast.error('Failed to save categories');
    }
  });
};
export const deleteCategory = async (id) => {
  API.delete(`/employee-categories/${id}`).then((response) => {
    if (response.status == 200 || response.status == 201) {
      toast.success('Delete category successfully');
    } else {
      toast.error('Failed to delete category');
    }
  });
};
export const updateCategory = async ({ id, category }) => {
  API.put(`/employee-categories/${id}`, { category }).then((response) => {
    if (response.status == 200 || response.status == 201) {
    } else {
      toast.error('Failed to save shift');
    }
  });
};

// ** Work Attendance
// *** Save recent punch in
export const saveAttendEmployee = async (payload) => {
  await API.post('/employee-attendance/', payload).then((response) => {
    if (response.status == 200 || response.status == 201) {
    } else {
      toast.error('Failed to save attendance');
    }
  });
};

export const checkOutEmployee = async (id) => {
  await API.delete(`/employee-attendance/${id}`).then((response) => {
    if (response.status == 200 || response.status == 201) {
    } else {
      toast.error('Failed to save attendance');
    }
  });
};

export const getAllAttendEmployee = async () => {
  return API.get('/employee-attendance/');
};

// ** Class Attendance
// *** Save recent punch in
// export const saveAttendClass = async (payload) => {
//   await API.post('/class-attendance/', payload).then((response) => {
//     if (response.status == 200 || response.status == 201) {
//     } else {
//       toast.error('Failed to save attendance');
//     }
//   });
// };

// export const getAllAttendClass = async () => {
//   return API.get('/class-attendance/');
// };

export const saveEmpArrToMap = async (payload) => {
  await API.post('/contact-employee/save-employee-to-map', payload);
};

// Member Api

export const checkMember = async (id) => {
  await API.post('/member-contact/attendance', { employeeId: id }).then((response) => {
    if (response.status == 200 || response.status == 201) {
    } else {
      toast.error('Failed to save attendance');
    }
  });
};

// ======================Lead Sections====================

// user API end point
export const addLeadContact = (payload) => {
  return API.post('/lead-contact/add', payload);
};

// ======================Relationship Sections====================

export const addRelationshipContact = (payload) => {
  return API.post('/relation-contact/add', payload);
};

// fetch relationship notes list
export const relationNoteList = () => {
  return API.get('notes/followup_note/get_notes_by_user_id');
};
export const relationNoteAdd = (newnote) => {
  return API.post('notes/followup_note/add_note', newnote);
};
export const relationNoteDelete = (id) => {
  return API.delete('notes/followup_note/remove_note/' + id);
};
export const relationNoteEdit = (newnote) => {
  return API.put('notes/followup_note/update_note/' + newnote._id, newnote);
};

// user API end point
export const contactRelationshipList = (payload) => {
  return API.get('/relation-contact/list', {
    params: payload
  });
};

// GET Single contact
export const getSingleCotact = (id) => {
  return API.get('/relation-contact/' + id);
};

// Total Lead Count
export const totalLeadsCount = () => {
  return API.get('/relation-contact/total-contact-count');
};

// Total Cold Lead Count
export const totalCOldLeads = () => {
  return API.get('/relation-contact/total-cold-contact-count');
};

// Total warm Lead Count
export const totalWarmLeads = () => {
  return API.get('/relation-contact/total-warm-contact-count');
};

// Total Hot Lead Count
export const totalHotLeads = () => {
  return API.get('/relation-contact/total-hot-contact-count');
};

export const updateRelationshipContact = (payload) => {
  return API.post('/relation-contact/update', payload);
};

export const updateRelationshipSocialLinkRequest = (payload) =>
  API.post(`/relation-contact/update-social-links`, payload);

export const fileRelationshipAddReqeust = (payload) =>
  API.post(`/relation-contact/file-add`, payload);

export const fileelationshipDeleteReqeust = (payload) =>
  API.post(`/relation-contact/file-delete`, payload);
export const fetchRelationshipSingleClientReqeust = (id) => {
  return API.get('/relation-contact/' + id);
};
export const addRelationshipOtherReqeust = (form) => API.post(`/relation-contact/add/other`, form);
export const otherDeleteReqeust = (payload) => API.post(`/relation-contact/delete/other`, payload);
export const uploadRelationshipAvatarReqeust = (payload) =>
  API.post(`/relation-contact/upload-avatar`, payload);
export const deleteRelationshipContact = (payload) =>
  API.post(`/relation-contact/delete-contact`, payload);
export const importRelationshipContactReqeust = (data) => {
  return API.post('/relation-contact/import-contact-array', data);
};
export const tagRelationshipFetchReqeust = () => API.get(`/tags`);

// ======================Vendor Sections====================

export const addVendorContact = (payload) => {
  return API.post('/vendor-contact/add', payload);
};

export const contactList = (payload) => {
  return API.get('/vendor-contact/list', {
    params: payload
  });
};
