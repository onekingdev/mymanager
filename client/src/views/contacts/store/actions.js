import * as api from './api';
import { toast } from 'react-toastify';

import {
  contactsReducer,
  selectContactReducer,
  contactNoteFetch,
  allNotesReducer,
  promotedClientData,
  progressionListClient,
  contactRankListSuccess,
  leadContactsReducer,
  vendorContactsReducer,
  relationshipContactsReducer,
  employeeContactsReducer,
  clientContactsReducer,
  totalCountReducer,
  setTagsReducer,
  setStagesReducer,
  setLeadsReducer,
  progressionAddReducer,
  getProgressionHistoryData,
  getProgressionAllData,
  progressionFetchData,

  // ===============Contact Fields====================
  getContactFieldStart,
  getContactFieldSuccess,
  getAllContactFieldStart,
  getAllContactFieldSuccess,

  // =================Client Reducers==================
  // add
  newClientContactStart,
  newClientContactSuccess,
  newClientContactFailure,
  newClientContactReset,

  // Read
  clientContactFetchStart,
  clientContactFetchSuccess,
  clientContactFetchError,
  clientContactFetchReset,
  //Notes
  clientNoteFetch,

  // Client Delete

  //state
  activeCountReducer,
  pastDueCountReducer,
  formerCountReducer,

  // fetch Single client
  singleClientReducer,
  singleClientFetchStartReducer,
  singleClientFetchErrorReducer,

  // // get Invoices
  getInvoicesReducer,
  getInvoicesStartReducer,
  getInvoicesErrorReducer,

  // Contact file upload
  importFileProcessingStart,
  importFileProcessingFinish,
  importFileProcessingError,

  // import
  importProcessingStart,
  importProcessingFinish,
  importProcessingError,

  // edit Client
  editClientStart,
  editClientSuccess,
  editClientError,

  // TAgs
  tagFetchingStart,
  tagFetchingSuccess,
  tagFetchingError,

  // upload avatar
  avatarUploadStart,
  avatarUploadSuccess,
  avatarUploadError,

  // ** files upload reducers
  filesUploadStart,
  filesUploadSuccess,
  filesUploadError,
  filesUploadReset,
  addRankStart,
  addRankSuccess,
  addRankError,
  // ** uploaded file delete
  fleUplaodDeleteStart,
  fleUplaodDeleteSuccess,
  fleUplaodDeleteError,
  addOtherStart,
  addOtherSuccess,
  addOtherError,
  deleteRankStart,
  deleteRankSuccess,
  deleteRankError,
  editRankStart,
  editRankSuccess,
  editRankError,
  // UPdate Spcoa; :oml
  socialLinkStart,
  socialLinkSuccess,
  socialLinkError,
  // edit other
  editOtherStart,
  editOtherSuccess,
  editOtherError,
  // Add Payment Method
  addPaymentMethodStart,
  addPaymentMethodSuccess,
  addPaymentMethodError,
  addPaymentMethodReset,
  // update Payment Method
  updatePaymentMethodStart,
  updatePaymentMethodSuccess,
  updatePaymentMethodError,
  updatePaymentMethodReset,
  // Delete Payment Method
  deletePaymentMethodStart,
  deletePaymentMethodSuccess,
  deletePaymentMethodError,
  deletePaymentMethodReset,
  // Update Billing Address
  updateBillingAddressStart,
  updateBillingAddressSuccess,
  updateBillingAddressError,
  updateBillingAddressReset,
  // delete other
  deleteOtherStart,
  deleteOtherSuccess,
  deleteOtherError,
  // Delete Contact
  deleteContactStart,
  deleteContactSuccess,
  deleteContactError,
  deleteContactReset,

  // =======Employee actions===================
  addEmployeeStart,
  addEmployeeSuccess,
  addEmployeeError,

  //Notes
  empNoteFetch,

  // List
  EmployeeListStart,
  EmployeeListSuccess,
  EmployeeListError,
  EmployeeListReset,

  // Fetch single employee
  employeeByIdStart,
  employeeByIdSuccess,
  employeeByIdError,
  employeeByIdReset,

  // TAgs
  // tagFetchingStart,
  // tagFetchingSuccess,
  // tagFetchingError,
  // ** update Employee
  employeeUpdateIdStart,
  employeeUpdateIdSuccess,
  employeeUpdateIdError,
  employeeUpdateIdReset,

  // ** social LInks
  socialLinkUpdateStart,
  socialLinkUpdateSuccess,
  socialLinkUpdateError,
  socialLinkUpdateReset,

  // Rank Add Update
  rankAddNUpdateStart,
  rankAddNUpdateSuccess,
  rankAddNUpdateError,
  rankAddNUpdateReset,

  // ** file add
  fileAddStart,
  fileAddSuccess,
  fileAddError,
  fileAddReset,
  // ** file Edit
  fileEditStart,
  fileEditSuccess,
  fileEditError,
  fileEditReset,
  // ** file Delete
  fileDeleteStart,
  fileDeleteSuccess,
  fileDeleteError,
  fileDeleteReset,

  // ** Update Billing Address
  billingAddressUpdateStart,
  billingAddressUpdateSuccess,
  billingAddressUpdateError,
  billingAddressUpdateReset,

  // ** total Count
  totalEmployeeCountStart,
  totalEmployeeCountSuccess,
  totalEmployeeCountError,
  totalEmployeeCountReset,
  //
  activeEmployeeCountStart,
  activeEmployeeCountSuccess,
  activeEmployeeCountError,
  activeEmployeeCountReset,
  //
  internshipEmployeeCountStart,
  internshipEmployeeCountSuccess,
  internshipEmployeeCountError,
  internshipEmployeeCountReset,
  //
  formerEmployeeCountStart,
  formerEmployeeCountSuccess,
  formerEmployeeCountError,
  formerEmployeeCountReset,

  // Delete Contact
  deleteEmployeeStart,
  deleteEmployeeSuccess,
  deleteEmployeeError,

  // Category
  getAllCategoryError,
  getAllCategoryStart,
  getAllCategorySuccess,
  getAllCategoryReset,

  // Work Attendance
  saveAttendEmployeeStart,
  saveAttendEmployeeSuccess,
  getAttendEmployeeStart,
  getAttendEmployeeSuccess,

  // ================+Lead Section===================
  addLeadStart,
  addLeadSuccess,
  addLeadError,

  // ================+Relationship Section===================

  // ** Fetch
  contactListStart,
  contactListSuccess,
  contactListError,

  //Notes
  relationNoteFetch,

  //
  totalLeadCountStart,
  totalLeadCountSuccess,
  totalLeadCountError,
  // ** cold list
  coldLeadCountStart,
  coldLeadCountSuccess,
  coldLeadCountError,
  // ** warm List
  warmLeadCountStart,
  warmLeadCountSuccess,
  warmLeadCountError,
  // ** hot list
  hotLeadCountStart,
  hotLeadCountSuccess,
  hotLeadCountError,
  // GET single contact
  singleContactStart,
  singleContactSuccess,
  singleContactError,

  //  ** Update Contact
  contactUpdateStart,
  contactUpdateSuccess,
  contactUpdateError,

  // Others Delete
  othersDeleteStart,
  othersDeleteSuccess,
  othersDeleteError,
  othersDeleteReset
} from './reducer';
import { success, error } from '../../ui-elements/response-popup';
import { getContactTypeByOrgAction } from '../../organizations/store/action';

/**
 * Contact Action Method
 * @param {Object} payload json object contact data get in database
 * @returns
 */
export const contactsAction = () => async (dispatch) => {
  try {
    const { data: contactList } = await api.getContacts();
    const { data: contactTypeList } = await api.getContactTypes();

    dispatch(contactsReducer({ contactList, contactTypeList }));
  } catch (err) {
    throw new Error(err);
  }
};

export const addContactAction = (payload) => async (dispatch) => {
  try {
    console.log('addContactAction called');
    const data = await api.addContact(payload);

    console.log(data);
    if (data.status == 201) {
      dispatch(contactsAction());
      success('Contact created successfully');
      return data.data;
    } else {
      error('Contact create failed');
      return data.data;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const updateContactAction = (payload) => async (dispatch) => {
  try {
    const data = await api.updateContact(payload);

    if (data.status == 200) {
      success('Contact updated successfully');
      dispatch(contactsAction());
      return data;
    } else {
      error('Contact update failed');
      return data;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const updateFieldValueContactAction = (payload) => async (dispatch) => {
  try {
    const data = await api.updateFieldValueContact(payload);

    if (data.status == 200) {
      // success('Contact updated successfully');
      // dispatch(contactsAction());
      return data;
    } else {
      error('Contact update failed');
      return data;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteContactAction = (payload) => async (dispatch) => {
  try {
    const data = await api.deleteContact(payload);

    if (data.status == 200) {
      dispatch(contactsAction());
      success('Contact deleted successfully');
      return data.data;
    } else {
      error('Contact delete failed');
      return data.data;
    }
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Contact Filter Action Method
 * @param {Object} payload json object contact filter data get in database
 * @returns
 */
export const contactFilterAction = (payload) => async (dispatch) => {
  try {
    dispatch(contactFilterReducer(payload));
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Contact Select Method
 * @param {Object} payload json object selected contact data
 * @returns
 */
export const selectContactAction = (payload) => async (dispatch) => {
  try {
    dispatch(selectContactReducer(payload));
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Get Note Method
 * @param {String} id contact _id
 * @returns
 */
export const contactNoteFetchAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.contactNoteById(id);
    dispatch(contactNoteFetch(data));
  } catch (error) {}
};

export const getAllNotesAction = () => async (dispatch) => {
  try {
    const { data } = await api.contactNoteList();
    dispatch(allNotesReducer(data));
  } catch (error) {}
};

/**
 * Add Contact Note Method
 * @param {Object} newNote json object data of notes
 * @param {*} id client _id
 * @returns
 */
export const contactNoteAddAction = (newNote, id) => async (dispatch) => {
  try {
    const { data } = await api.contactNoteAdd(newNote, id);
    console.log(data);
    await dispatch(contactsAction());
    dispatch(contactNoteFetchAction(id));
  } catch (error) {}
};

/**
 * Delete Contact Note Method
 * @param {String} id note _id
 * @param {String} parentId note parentId
 * @returns
 */
export const contactNoteDeleteAction = (id, parentId) => async (dispatch) => {
  try {
    const { data } = await api.contactNoteDelete(id);
    dispatch(contactNoteFetchAction(parentId));
  } catch (error) {}
};

/**
 * Edit Contact Note Method
 * @param {Object} newNote note data for update
 * @param {String} parentId note parentId
 * @returns
 */
export const contactNoteEditAction = (newNote, parentId) => async (dispatch) => {
  try {
    const { data } = await api.contactNoteEdit(newNote);
    dispatch(contactNoteFetchAction(parentId));
  } catch (error) {}
};

// add  client to progression
export const addClientProgressionAction = (state) => async (dispatch) => {
  try {
    const res = await api.addClientProgressionApi(state);
    // toast.success(res.data.msg);
    dispatch(progressionAddReducer(res.data.msg));
  } catch (error) {
    toast.error('Sorry! client not added to progression');
  }
};

// promot client to progression
export const promotClientAction = (state) => async (dispatch) => {
  try {
    const res = await api.promoteClientProgressionApi(state);

    res.status == 200 ? toast.success('clients is  promoted') : toast.error('clients not promoted');
  } catch (error) {
    toast.error('clients is not promoted');
  }
};
//////
export const addRankHistoryAction = (id, state) => async (dispatch) => {
  try {
    const res = await api.addRankHistoryApi(id, state);
    res.status == 200
      ? toast.success('clients added to progression history')
      : toast.error(res?.data?.msg);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

// progression client
export const contactRankListAction = () => async (dispatch) => {
  try {
    const res = await api.contactRankListApi();
    // res.status == 200 ? toast.success('clients is  promoted') : toast.error('clients not promoted')
    dispatch(contactRankListSuccess(res.data.data));
  } catch (error) {
    toast.error('clients is not promoted');
  }
};
export const progressionListAction = () => async (dispatch) => {
  try {
    const res = await api.progressionListApi();
    // res.status == 200 ? toast.success('clients is  promoted') : toast.error('clients not promoted')
    dispatch(progressionListClient(res.data.data));
  } catch (error) {
    toast.error('clients is not promoted');
  }
};
//get promoted client
export const promotedListAction = (state) => async (dispatch) => {
  try {
    const { data } = await api.promotedListApi();

    dispatch(promotedClientData(data?.data));
  } catch (error) {}
};
// demoteClientAction
export const demoteClientAction = (state) => async (dispatch) => {
  try {
    const res = await api.demoteClientApi(state);
    if (res.status == 200) {
      let resOne = await api.promotedListApi();

      dispatch(promotedClientData(resOne.data.data));
      if (res.data.success == true) {
        toast.success('client removed from promoted client list');
      } else {
        toast.error('sorry! client not removed from promoted client list');
      }
    }
  } catch (error) {
    toast.error('Sorry! client not removed from promoted client list.');
  }
};

//GET CONTACT MEMBERSHIP CONTRACTS
export const getContactMembershipContractsAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getContactContractsApi(id);
    if (data.success === true) {
      return data.data;
    }
  } catch (error) {}
};

/**
 * ***********************  CAUTION  ***********************
 * Following code will be delete after finish refactoring.
 * Now can not delelte we should test & check the previous work and current work.
 * Thanks.
 */

//total client
export const totalContactsAction = () => async (dispatch) => {
  try {
    const clients = await api.getTotalClients();
    const leads = await api.getTotalLeads();
    const vendors = await api.getTotalVendors();
    const relationships = await api.getTotalRelationships();
    const employees = await api.getTotalEmployees();

    const payload = {
      clients: clients.data,
      leads: leads.data,
      vendors: vendors.data,
      relationships: relationships.data,
      employees: employees.data,
      total: clients.data + leads.data + vendors.data + relationships.data + employees.data
    };
    dispatch(totalCountReducer(payload));
  } catch (error) {
    //
  }
};

//---------data
//client list
export const clientContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getClientList();
    dispatch(clientContactsReducer(data));
  } catch (error) {
    //
  }
};
//lead list
export const leadsContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getLeadsList();
    dispatch(leadContactsReducer(data));
  } catch (error) {
    //
  }
};
//vendor List
export const vendorContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getVendorsList();
    dispatch(vendorContactsReducer(data));
  } catch (error) {
    //
  }
};
//relationships list
export const relationshipsContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getRelationshipsList();
    dispatch(relationshipContactsReducer(data));
  } catch (error) {
    //
  }
};
//employee list
export const employeesContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getEmployeeList();
    dispatch(employeeContactsReducer(data));
  } catch (error) {
    //
  }
};
//memger list
export const memberContactsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getMemberList();
    dispatch(memberContactsReducer(data));
  } catch (error) {
    //
  }
};

//tags
export const getTagsAction = () => async (dispatch) => {
  try {
    const { data } = await api.getTags();
    if (data) {
      dispatch(setTagsReducer(data));
    }
  } catch (error) {}
};

export const updateTagsAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateTag(id, payload);
    if (data) {
      dispatch(getTagsAction());
    }
  } catch (error) {}
};

export const deleteTagsAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteTag(id);
    if (data) {
      dispatch(getTagsAction());
    }
  } catch (error) {}
};

export const createTagsAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createTag(payload);
    if (data) {
      dispatch(getTagsAction());
      success('Tag created successfully');
    }
  } catch (error) {
    error('Tag create failed');
  }
};

// Stages
export const getStagesAction = () => async (dispatch) => {
  try {
    const { data } = await api.getStages();
    if (data) {
      dispatch(setStagesReducer(data));
    }
  } catch (error) {}
};

export const updateStageAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateStage(id, payload);
    if (data) {
      dispatch(getStagesAction());
      success('Stage updated successfully');
    }
  } catch (error) {
    error('Update Stage failed');
  }
};

export const deleteStageAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteStage(id);
    if (data) {
      success('Stage removed successfully');
      dispatch(getStagesAction());
    }
  } catch (error) {}
};

export const createStageAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createStage(payload);
    if (data) {
      dispatch(getStagesAction());
      success('Stage created successfully');
    }
  } catch (err) {
    console.log(err);
    error('Stage create failed');
  }
};

export const reorderStageAction = (oldIndex, newIndex) => async (dispatch) => {
  try {
    const { data } = await api.reorderStage(oldIndex, newIndex);
    if (data) {
      dispatch(getStagesAction());
      success('Stages have been reordered successfully');
    }
  } catch (err) {
    error('Reorder stage failed');
  }
};

export const getLeadsSourceAction = () => async (dispatch) => {
  try {
    const { data } = await api.getLeadSource();
    if (data) {
      dispatch(setLeadsReducer(data));
    }
  } catch (error) {}
};
export const createLeadsSourceAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addLeadSource(payload);
    if (data) {
      dispatch(getLeadsSourceAction());
    }
  } catch (error) {}
};
export const deleteLeadsSourceAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteLeadSource(id);
    if (data) {
      dispatch(getLeadsSourceAction());
    }
  } catch (error) {}
};
export const updateLeadsSourceAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateLeadSource(id, payload);
    if (data) {
      dispatch(getLeadsSourceAction());
    }
  } catch (error) {}
};

export const GET_ALL_PROGRESSION_DATA = () => async (dispatch) => {
  try {
    const { data } = await api.getAllProgression();
    if (data.data) {
      dispatch(getProgressionAllData(data.data));
    }
  } catch (error) {
    console.error(error);
  }
};

export const progressionFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProgression();
    dispatch(progressionFetchData(data?.data));
  } catch (error) {
    console.error(error);
  }
};

export const progressionHistoryAction = (clientId, payload) => async (dispatch) => {
  console.log(payload);
  try {
    const { data } = await api.progressionHistory(clientId, payload);
    if (data.data) {
      dispatch(getProgressionHistoryData(data.data));
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteSingleHistoryAction = (clientId, clientIdMain) => async (dispatch) => {
  try {
    const res = await api.progressionHistoryDelete(clientId);
    if (res.status == 200) {
      toast.success('Successfully deleted  client progression history.');
    } else {
      toast.error(res.data.msg);
    }
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const progressionHistEditAction =
  (rankHistoryId, payload, clientIdMain) => async (dispatch) => {
    try {
      const res = await api.progressionHiEdApi(rankHistoryId, payload);
      if (res.status == 200) {
        const { data } = await api.progressionHistory(clientIdMain);
        if (data.data) {
          dispatch(getProgressionHistoryData, getProgressionAllData, data.data);
          toast.success('rank history updated.');
        }
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
export const removeProgAction = (payload) => async (dispatch) => {
  try {
    const res = await api.progRemoveApi(payload);
  } catch (error) {}
};

// ====================contact types====================
export const addContactTypeAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addContactType(payload);
    if (data) {
      toast.success('contact type added successfully');
    }

    return data;
  } catch (error) {}
};

export const updateContactTypeByIdAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateContactType(id, payload);
    if (data) {
      toast.success('contact type updated successfully');
    }

    return data;
  } catch (error) {}
};

export const deleteContactTypeByIdAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.deleteContactType(id, payload);
    if (data) {
      toast.success('contact type deleted successfully');
    }
    return data;
  } catch (error) {}
};

// =====================Contact Fields===================
export const addContactFieldAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addContactField(payload);
    if (data) {
      toast.success('Contact field added successfully');
    }
    return data;
  } catch (error) {}
};

export const getContactFieldByTypeAction = (contactTypeId) => async (dispatch) => {
  try {
    dispatch(getContactFieldStart());
    const { data } = await api.getContactFieldByType(contactTypeId);
    console.log(data);
    dispatch(getContactFieldSuccess(data?.data));
  } catch (error) {
    toast.error(error?.message);
  }
};

export const updateContactFieldOrderAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.updateContactFieldOrder(payload);
  } catch (error) {
    toast.error(error?.message);
  }
};

export const getAllContactFieldAction = () => async (dispatch) => {
  try {
    dispatch(getAllContactFieldStart());
    const { data } = await api.getAllContactField();
    dispatch(getAllContactFieldSuccess(data?.data));
  } catch (error) {
    toast.error(error?.message);
  }
};

export const deleteContactFieldAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.deleteContactFieldByType(payload);
    if (data) {
      dispatch(getContactFieldByTypeAction(payload.contactType));
      toast.success('Contact field deleted successfully');
    }
    return data;
  } catch (error) {}
};

export const updateContactFieldAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.updateContactFieldByType(payload);
    if (data) {
      dispatch(getContactFieldByTypeAction(payload.contactType));
      toast.success('Contact field updated successfully');
    }
    return data;
  } catch (error) {}
};

// =====================Client Reducer===================

// Fetch Client Contact List
export const ClientContactFetchAction = (options) => async (dispatch) => {
  try {
    dispatch(clientContactFetchStart());
    const { data } = await api.clientContactList(options);
    dispatch(clientContactFetchSuccess(data));
  } catch (error) {
    dispatch(
      clientContactFetchError({
        error: error.response
      })
    );
  }
  // Reset After 3 sec
  setTimeout(() => {
    clientContactFetchReset();
  });
};

// action creator for new client contact
export const newClientContact = (newClient) => async (dispatch) => {
  try {
    dispatch(newClientContactStart());
    const { data } = await api.newClientContact(newClient);
    dispatch(ClientContactFetchAction());
    dispatch(newClientContactSuccess(data));

    // Fetch Counts
    dispatch(totalClientCountAction());
    dispatch(totalActiveClientCountAction());
    dispatch(totalPastDueClientCountAction());
    dispatch(totalFormerClientCountAction());
  } catch (error) {
    dispatch(
      newClientContactFailure({
        error: error.response
      })
    );
  }
  // Reset After 3 sec
  setTimeout(() => {
    newClientContactReset();
  });
};
// Delete Contact
export const deleteClientContact = (id) => async (dispatch, getState) => {
  try {
    dispatch(deleteContactStart());
    await api.deleteClientContact(id);
    dispatch(ClientContactFetchAction({}));
    dispatch(deleteContactSuccess());
  } catch (error) {
    dispatch(deleteContactError());
  }
};
// Client State Action
export const totalClientCountAction = () => async (dispatch, getState) => {
  try {
    const { data } = await api.ClientContactTotalCount();
    dispatch(totalCountReducer(data));
  } catch (error) {
    //
  }
};

export const totalActiveClientCountAction = () => async (dispatch, getState) => {
  try {
    const { data } = await api.ClientContactTotalActiveCount();
    dispatch(activeCountReducer(data));
  } catch (error) {
    //
  }
};

export const totalPastDueClientCountAction = () => async (dispatch, getState) => {
  try {
    const { data } = await api.ClientContactTotalPastDueCount();
    dispatch(pastDueCountReducer(data));
  } catch (error) {
    //
  }
};

export const totalFormerClientCountAction = () => async (dispatch, getState) => {
  try {
    const { data } = await api.ClientContactTotalFormerCount();
    dispatch(formerCountReducer(data));
  } catch (error) {
    //
  }
};

export const fetchSingleClientAction = (id) => async (dispatch, getState) => {
  try {
    dispatch(singleClientFetchStartReducer());
    const { data } = await api.fetchSingleClientReqeust(id);
    dispatch(singleClientReducer(data));
  } catch (error) {
    dispatch(singleClientFetchErrorReducer());
  }
};

export const getInvoicesAction = () => async (dispatch, getState) => {
  try {
    dispatch(getInvoicesStartReducer());
    const { data } = await api.getInvoicesReqeust();
    dispatch(getInvoicesReducer(data));
  } catch (error) {
    dispatch(getInvoicesErrorReducer());
  }
};

// contact import actions
export const contactFileUploadAction = (payload) => async (dispatch, getState) => {
  try {
    dispatch(importFileProcessingStart());
    const { data } = await api.importCOntactFileUPload(payload);
    dispatch(importFileProcessingFinish(data));
  } catch (error) {
    dispatch(importFileProcessingError({}));
  }
};
// contact import actions

export const contactImportAction = (payload) => async (dispatch, getState) => {
  try {
    dispatch(importProcessingStart());
    const { data } = await api.importCOntactReqeust(payload);
    dispatch(importProcessingFinish(data));

    dispatch(totalClientCountAction());
    dispatch(totalActiveClientCountAction());
    dispatch(totalPastDueClientCountAction());
    dispatch(totalFormerClientCountAction());
  } catch (error) {
    dispatch(importProcessingError({}));
  }
};
export const editClientAction = (id, updatedClient) => async (dispatch) => {
  try {
    dispatch(editClientStart());
    const { data } = await api.editClientReqeust(id, updatedClient);
    dispatch(editClientSuccess(data));

    // fetch single client
    dispatch(fetchSingleClientAction(id));
  } catch (error) {
    // const email =
    dispatch(editClientError());
  }
};

export const editSocialLinksAction = (id, updatedClient) => async (dispatch) => {
  try {
    dispatch(socialLinkStart());
    const { data } = await api.editClientReqeust(id, updatedClient);
    dispatch(socialLinkSuccess(data));
  } catch (error) {
    // const email =
    dispatch(socialLinkError());
  }
};

export const fetchTagsAction = () => async (dispatch) => {
  try {
    dispatch(tagFetchingStart());
    const { data } = await api.tagFetchReqeust();
    dispatch(tagFetchingSuccess(data));
  } catch (error) {
    // const email =
    dispatch(tagFetchingError());
  }
};

export const uploadAvatarAction = (form, id) => async (dispatch) => {
  try {
    dispatch(avatarUploadStart());
    await api.uploadAvatarReqeust(form);
    dispatch(fetchSingleClientAction(id));
    dispatch(avatarUploadSuccess());
  } catch (error) {
    dispatch(avatarUploadError({}));
  }
};

// ** files upload Aciton

export const uploadFilesAction = (form, id) => async (dispatch) => {
  try {
    dispatch(filesUploadStart());
    await api.uploadFileReqeust(form);
    dispatch(fetchSingleClientAction(id));
    dispatch(filesUploadSuccess());
  } catch (error) {
    dispatch(filesUploadError(error));
  }
};

export const addRankAction = (form) => async (dispatch) => {
  try {
    dispatch(addRankStart());
    const { data } = await api.addRankReqeust(form);
    dispatch(addRankSuccess(data));
  } catch (error) {
    dispatch(addRankError({ message: 'Error. Try again' }));
  }
};

export const editRankAction = (form, clientId) => async (dispatch) => {
  try {
    dispatch(editRankStart());
    const { data } = await api.editRankReqeust(form);
    dispatch(editRankSuccess(data));
    dispatch(fetchSingleClientAction(clientId));
  } catch (error) {
    dispatch(editRankError({ message: 'Error. Try again' }));
  }
};
export const deleteClientFileAction = (clientId, id) => async (dispatch) => {
  try {
    dispatch(fleUplaodDeleteStart());
    await api.deleteFileReqeust({ clientId, id });
    dispatch(fetchSingleClientAction(clientId));
    dispatch(fleUplaodDeleteSuccess());
  } catch (error) {
    dispatch(fleUplaodDeleteError(error));
  }
};
export const deleteRankAction = (state) => async (dispatch) => {
  try {
    dispatch(deleteRankStart());
    const { data } = await api.deleteRankReqeust(state);
    dispatch(fetchSingleClientAction(state?.clientId));
    dispatch(deleteRankSuccess(data));
  } catch (error) {
    dispatch(deleteRankError({ message: 'Error. Try again' }));
  }
};
export const addOtherAction = (form, id) => async (dispatch) => {
  try {
    dispatch(addOtherStart());
    const { data } = await api.addOtherReqeust(form);
    dispatch(addOtherSuccess(data));
    dispatch(fetchSingleClientAction(id));
  } catch (error) {
    dispatch(addOtherError({ message: 'Error. Try again' }));
  }
};
export const editOtherAction = (state) => async (dispatch) => {
  try {
    dispatch(editOtherStart());
    const { data } = await api.editOtherReqeust(state);
    dispatch(editOtherSuccess(data));

    // refetch single Client
    dispatch(fetchSingleClientAction(state?.clientId));
  } catch (error) {
    dispatch(editOtherError({ message: 'Error. Try again' }));
  }
};
// Add Payment Method
export const addPaymentMethodAction = (state) => async (dispatch) => {
  try {
    dispatch(addPaymentMethodStart());
    const { data } = await api.addPaymentMethod(state);
    // Refetch Single Client Again
    dispatch(fetchSingleClientAction(state?.clientId));
    dispatch(addPaymentMethodSuccess(data));
  } catch (error) {
    dispatch(addPaymentMethodError({ message: 'Error. Try again' }));
  }
};
// update Payment Method
export const updatePaymentMethodAction = (state) => async (dispatch) => {
  try {
    dispatch(updatePaymentMethodStart());
    const { data } = await api.updatePaymentMethod(state);
    dispatch(fetchSingleClientAction(state?.clientId));
    dispatch(updatePaymentMethodSuccess(data));
  } catch (error) {
    dispatch(updatePaymentMethodError({ message: 'Error. Try again' }));
  }
};
// Delete Payment Method
export const deletePaymentMethodAction = (state) => async (dispatch) => {
  try {
    dispatch(deletePaymentMethodStart());
    const { data } = await api.deletePaymentMethod(state);
    dispatch(fetchSingleClientAction(state?.clientId));
    dispatch(deletePaymentMethodSuccess(data));
  } catch (error) {
    dispatch(deletePaymentMethodError({ message: 'Error. Try again' }));
  }
};
// Update Billing Address
export const updateBillingAddressAction = (state) => async (dispatch) => {
  try {
    dispatch(updateBillingAddressStart());
    const { data } = await api.editBillingReqeust(state);
    dispatch(updateBillingAddressSuccess(data));
  } catch (error) {
    dispatch(updateBillingAddressError({ message: 'Error. Try again' }));
  }
};
export const deleteOtherAction = (state) => async (dispatch) => {
  try {
    dispatch(deleteOtherStart());
    const { data } = await api.deleteOtherReqeust(state);
    dispatch(deleteOtherSuccess(data));
    //
    dispatch(fetchSingleClientAction(state?.clientId));
  } catch (error) {
    dispatch(deleteOtherError({ message: 'Error. Try again' }));
  }
};

export const getClientContactByTagsAction = (options) => async (dispatch) => {
  try {
    dispatch(clientContactFetchStart());
    const { data } = await api.getContactByTag(options);
    dispatch(clientContactFetchSuccess(data));
  } catch (error) {
    dispatch(
      clientContactFetchError({
        error: error.response
      })
    );
  }
  // Reset After 3 sec
  setTimeout(() => {
    clientContactFetchReset();
  });
};

export const getFormerClients = () => async (dispatch) => {
  try {
    dispatch(clientContactFetchStart());
    const { data } = await api.getFormerClients();
    dispatch(clientContactFetchSuccess(data));
  } catch (error) {
    dispatch(
      clientContactFetchError({
        error: error.response
      })
    );
  }
  // Reset After 3 sec
  setTimeout(() => {
    clientContactFetchReset();
  });
};
// =============Employee Action===============

export const addEmpContactAction = (options) => async (dispatch) => {
  try {
    dispatch(addEmployeeStart());
    const data = await api.addNewEmployeeContactAction(options);
    dispatch(addEmployeeSuccess(data));
    dispatch(contactListRequest({}));
    dispatch(TotalEmployeeCountAction());
    dispatch(TotalActiveEmployeeCountAction());
  } catch (error) {
    dispatch(addEmployeeError(error?.response?.data?.message));
  }
};

export const contactEmpImportAction = (payload) => async (dispatch, getState) => {
  try {
    dispatch(importProcessingStart());
    const { data } = await api.importEmpContactReqeust(payload);
    dispatch(importProcessingFinish(data));
  } catch (error) {
    dispatch(importProcessingError({}));
  }
};

export const EmpNoteFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.empNoteList();
    dispatch(empNoteFetch(data));
  } catch (error) {}
};
export const EmpNoteAddAction = (newNote) => async (dispatch) => {
  try {
    const { data } = await api.empNoteAdd(newNote);
    dispatch(EmpNoteFetchAction());
  } catch (error) {}
};
export const EmpNoteDeleteAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.empNoteDelete(id);
    dispatch(EmpNoteFetchAction());
  } catch (error) {}
};
export const EmpNoteEditAction = (newNote) => async (dispatch) => {
  try {
    const { data } = await api.empNoteEdit(newNote);
    dispatch(EmpNoteFetchAction());
  } catch (error) {}
};

// ** Add Contact Bulk to Event
export const addContactBulkAction = (payload) => async (dispatch) => {
  try {
    dispatch(addEmployeeStart());
    const data = await api.addContactBulk(payload);
    dispatch(addEmployeeSuccess(data));
    await dispatch(getEventInfo(payload.eventId));
    return data;
  } catch (error) {
    dispatch(addEmployeeError(error?.response?.data?.message));
  }
  // Reset After 3 sec
};

// ** Delete Contact
export const deleteEmployeeContact = (payload, id) => async (dispatch) => {
  try {
    dispatch(deleteEmployeeStart());
    const { data } = await api.deleteContactReqeust(payload);
    dispatch(contactListRequest({}));
    dispatch(deleteEmployeeSuccess(data));
    dispatch(TotalEmployeeCountAction());
    dispatch(TotalActiveEmployeeCountAction());
  } catch (error) {
    dispatch(deleteEmployeeError({}));
  }
};

export const contactListRequest = (options) => async (dispatch) => {
  try {
    dispatch(EmployeeListStart());
    const { data } = await api.employeeListAction(options);
    dispatch(EmployeeListSuccess(data));
    // Refetch Employee
  } catch (error) {}
  // Reset After 3 sec
};

export const employeeListRequest = (options) => async (dispatch) => {
  try {
    dispatch(EmployeeListStart());
    const { data } = await api.employeeListAction(options);
    dispatch(EmployeeListSuccess(data));
    // Refetch Employee
  } catch (error) {}
  // Reset After 3 sec
};

export const contactByIdAction =
  ({ _id }) =>
  async (dispatch) => {
    try {
      dispatch(employeeByIdStart());
      const { data } = await api.contactById(_id);
      dispatch(employeeByIdSuccess(data));
      // Refetch Employee
    } catch (error) {
      // console.log(error?.response?.data?.errors)
      // dispatch(EmployeeListError(data))
    }
    // Reset After 3 sec
  };

export const contactRegisterAction = (contact) => async (dispatch) => {
  try {
    dispatch(employeeUpdateIdStart());
    const { data } = await api.contactRegisterUpdate(contact);
    dispatch(employeeUpdateIdSuccess(data));
    // Refetch Employee
    dispatch(contactByIdAction({ _id: contact?.id }));
  } catch (error) {}
  // Reset After 3 sec
};

export const contactRegisterSendAction = (contact) => async (dispatch) => {
  try {
    const response = await api.contactRegisterSend(contact);
  } catch (error) {}
  // Reset After 3 sec
};

export const contactUpdateByIdAction = (contact) => async (dispatch) => {
  try {
    dispatch(employeeUpdateIdStart());
    const { data } = await api.contactUpdate(contact);
    dispatch(employeeUpdateIdSuccess(data));
    // Refetch Employee
    dispatch(contactByIdAction({ _id: contact?._id }));
  } catch (error) {}
  // Reset After 3 sec
};

export const uploadEmpAvatarAction = (form, id) => async (dispatch) => {
  try {
    await api.uploadEmpAvatarReqeust(form);
    dispatch(contactByIdAction({ _id: id }));
  } catch (error) {}
};

export const socialLinksUpdateAction = (payload) => async (dispatch) => {
  try {
    dispatch(socialLinkUpdateStart());
    await api.updateSocialLinkRequest(payload);
    dispatch(contactByIdAction({ _id: payload?.id }));
    dispatch(socialLinkUpdateSuccess());
  } catch (error) {
    dispatch(socialLinkUpdateError({}));
  }
};

// ** rank Update

export const RankAddOrUpdateAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(rankAddNUpdateStart());
    await api.rankAddOrUpdateRequest(payload);
    dispatch(contactByIdAction({ _id: id }));
    dispatch(rankAddNUpdateSuccess());
  } catch (error) {
    dispatch(rankAddNUpdateError({}));
  }
};

// ********************** FIle Section **************************************************
// ********************** FIle Section **************************************************

// ** File Add
export const fileAddAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(fileAddStart());
    await api.fileAddReqeust(payload);
    dispatch(contactByIdAction({ _id: id }));
    dispatch(fileAddSuccess());
  } catch (error) {
    dispatch(fileAddError({}));
  }
};

// ** file Update
export const fileEditAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(fileEditStart());
    await api.fileEditReqeust(payload);
    dispatch(contactByIdAction({ _id: id }));
    dispatch(fileEditSuccess());
  } catch (error) {
    dispatch(fileEditReset({}));
  }
};

// ** file Delete
export const fileDeleteAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(fileDeleteStart());
    await api.fileDeleteReqeust(payload);
    dispatch(contactByIdAction({ _id: id }));
    dispatch(fileDeleteSuccess());
  } catch (error) {
    dispatch(fileDeleteError({}));
  }
};

// ** Billing Address Update

export const billingAddressUpdateAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(billingAddressUpdateStart());
    await api.billingAddressUpdateReqeust(payload);
    // dispatch(contactByIdAction({ _id: id }))
    dispatch(billingAddressUpdateSuccess());
  } catch (error) {
    dispatch(billingAddressUpdateError({}));
  }
};

// ** Total Employee Count
export const TotalEmployeeCountAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(totalEmployeeCountStart());
    const { data } = await api.totalEmployeeCount(payload);
    dispatch(totalEmployeeCountSuccess(data));
  } catch (error) {
    dispatch(totalEmployeeCountError({}));
  }
};

// ** Total Active Employee Count
export const TotalActiveEmployeeCountAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(activeEmployeeCountStart());
    const { data } = await api.ActiveEmployeeCount(payload);
    dispatch(activeEmployeeCountSuccess(data));
  } catch (error) {
    dispatch(activeEmployeeCountError({}));
  }
};

// ** Selected employee save
export const saveEmpArrToMapAction = (payload) => async (dispatch) => {
  try {
    await api.saveEmpArrToMap(payload);
    await dispatch(contactListRequest({}));
  } catch (error) {
    console.log(error);
  }
};

// ** Total Internship Employee Count
export const TotalinternshipEmployeeEmployeeCountAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(internshipEmployeeCountStart());
    const { data } = await api.InternshipEmployeeCount(payload);
    dispatch(internshipEmployeeCountSuccess(data));
  } catch (error) {
    dispatch(internshipEmployeeCountError({}));
  }
};

// ** Total Former Employee Count
export const formerEmployeeEmployeeCountAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(formerEmployeeCountStart());
    const { data } = await api.FormerEmployeeCount(payload);
    dispatch(formerEmployeeCountSuccess(data));
  } catch (error) {
    dispatch(formerEmployeeCountError({}));
  }
};

export const getAllWorkHistory = () => async (dispatch) => {
  try {
    const { data } = await api.getAllWorkHistory();
    dispatch(setAllWorkHistory(data));
  } catch (error) {
    //
  }
};

export const getAllEmployeeCategoryAction = () => async (dispatch) => {
  try {
    dispatch(getAllCategoryStart());
    const { data } = await api.getAllEmployeeCategory();
    dispatch(getAllCategorySuccess(data));
  } catch (error) {}
};

export const createCategoryAction = (newCategory) => async (dispatch) => {
  try {
    await api.createCategory(newCategory);
  } catch (error) {}
};

export const updateCategoryAction = (newCategory) => async (dispatch) => {
  try {
    await api.updateCategory(newCategory);
  } catch (error) {}
};

export const deleteCategoryAction = (id) => async (dispatch) => {
  try {
    await api.deleteCategory(id);
  } catch (error) {}
};

export const getEmployeeContactByTagsAction = (options) => async (dispatch) => {
  try {
    dispatch(EmployeeListStart());
    const { data } = await api.getContactByTag(options);
    dispatch(EmployeeListSuccess(data));
  } catch (error) {
    dispatch(
      EmployeeListError({
        error: error.response
      })
    );
  }
  // Reset After 3 sec
  setTimeout(() => {
    EmployeeListReset();
  });
};

// Attendance actions

export const getEmployeeAttendanceAction = () => async (dispatch) => {
  try {
    dispatch(getAttendEmployeeStart());
    const { data } = await api.getAllAttendEmployee();
    dispatch(getAttendEmployeeSuccess(data));
  } catch (error) {
    //console.log(error);
  }
};

export const saveAttendEmployeeAction = (newAttend) => async (dispatch) => {
  try {
    await api.saveAttendEmployee(newAttend).then((res) => {
      dispatch(getEmployeeAttendanceAction());
    });
  } catch (error) {
    //console.log(error);
  }
};

export const checkOutEmployeeAction = (id) => async (dispatch) => {
  try {
    await api.checkOutEmployee(id).then((res) => {
      dispatch(getEmployeeAttendanceAction());
    });
  } catch (error) {
    //console.log(error);
  }
};

export const checkMemberAction = (id) => async (dispatch) => {
  try {
    await api.checkMember(id).then((res) => {
      dispatch(contactListRequest());
    });
  } catch (error) {
    //console.log(error);
  }
};

// =============Lead Section================

export const addLeadContactAction = (options) => async (dispatch) => {
  //console.log(options);
  try {
    dispatch(addLeadStart());
    const { data } = await api.addLeadContact(options);
    dispatch(fetchContactListAction());
    dispatch(addLeadSuccess(data));

    // Fetch Total contact count
    dispatch(fetchTotalLeadCountAction());
    // Fetch total cold contact count
    dispatch(fetchTotalColdLeadCountAction());
    dispatch(fetchTotalWarmLeadCountAction());
    dispatch(fetchTotalHotLeadCountAction());
  } catch (error) {
    dispatch(
      addLeadError({
        error: error.response
      })
    );
  }
};

// =============Relationship Section================

export const addRelationshipContactAction = (options) => async (dispatch) => {
  try {
    dispatch(addLeadStart());
    const { data } = await api.addRelationshipContact(options);
    dispatch(fetchRelationContactListAction());
    dispatch(addLeadSuccess(data));
    dispatch(fetchRelationTotalLeadCountAction());
    dispatch(fetchRelationTotalColdLeadCountAction());
    dispatch(fetchTotalWarmLeadCountAction());
    dispatch(fetchTotalHotLeadCountAction());
  } catch (error) {
    dispatch(addLeadError());
  }
};

// Fetct total contact count
export const fetchRelationTotalLeadCountAction = () => async (dispatch) => {
  try {
    dispatch(totalLeadCountStart());
    const { data } = await api.totalLeadsCount();
    dispatch(totalLeadCountSuccess(data));
  } catch (error) {
    dispatch(totalLeadCountError());
  }
};

// Fetct total Cold contact count
export const fetchRelationTotalColdLeadCountAction = () => async (dispatch) => {
  try {
    dispatch(coldLeadCountStart());
    const { data } = await api.totalCOldLeads();
    dispatch(coldLeadCountSuccess(data));
  } catch (error) {
    dispatch(coldLeadCountError());
  }
};

export const fetchRelationTotalHotLeadCountAction = () => async (dispatch) => {
  try {
    dispatch(hotLeadCountStart());
    const { data } = await api.totalHotLeads();
    dispatch(hotLeadCountSuccess(data));
  } catch (error) {
    dispatch(hotLeadCountError());
  }
};

export const fetchRelationTotalWarmLeadCountAction = () => async (dispatch) => {
  try {
    dispatch(warmLeadCountStart());
    const { data } = await api.totalWarmLeads();
    dispatch(warmLeadCountSuccess(data));
  } catch (error) {
    dispatch(warmLeadCountError());
  }
};

// Notes start
export const RelationNoteFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.relationNoteList();
    dispatch(relationNoteFetch(data));
  } catch (error) {}
};

export const RelationNoteAddAction = (newNote) => async (dispatch) => {
  try {
    const { data } = await api.relationNoteAdd(newNote);
    dispatch(RelationNoteFetchAction());
  } catch (error) {}
};
export const RelationNoteDeleteAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.relationNoteDelete(id);
    dispatch(RelationNoteFetchAction());
  } catch (error) {}
};
export const RelationNoteEditAction = (newNote) => async (dispatch) => {
  try {
    const { data } = await api.relationNoteEdit(newNote);
    dispatch(RelationNoteFetchAction());
  } catch (error) {}
};

// Notes End

export const fetchRelationContactListAction = (options) => async (dispatch) => {
  try {
    dispatch(contactListStart());
    const { data } = await api.getRelationshipsList(options);
    dispatch(contactListSuccess(data));
  } catch (error) {
    dispatch(contactListError());
  }
};

export const getSingleConactAction = (id) => async (dispatch) => {
  try {
    dispatch(singleContactStart());
    const { data } = await api.getSingleCotact(id);
    dispatch(singleContactSuccess(data));
  } catch (error) {
    dispatch(singleContactError());
  }
};

// ** Update Contact
export const updateRelationContactAction = (payload) => async (dispatch) => {
  try {
    dispatch(contactUpdateStart());
    const { data } = await api.updateRelationshipContact(payload);
    dispatch(contactUpdateSuccess(data));
  } catch (error) {
    dispatch(contactUpdateError());
  }
};

export const socialRelationLinksUpdateAction = (payload) => async (dispatch) => {
  try {
    dispatch(socialLinkUpdateStart());
    await api.updateRelationshipSocialLinkRequest(payload);
    dispatch(getSingleConactAction(payload?.id));
    dispatch(socialLinkUpdateSuccess());
  } catch (error) {
    dispatch(socialLinkUpdateError({}));
  }
};

// ** File Add
export const fileRelationAddAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(fileAddStart());
    await api.fileRelationshipAddReqeust(payload);
    dispatch(getSingleConactAction(id));
    dispatch(fileAddSuccess());
  } catch (error) {
    dispatch(fileAddError({}));
  }
};

// ** file Delete
export const fileRelationDeleteAction = (payload, id) => async (dispatch) => {
  try {
    dispatch(fileDeleteStart());
    await api.fileelationshipDeleteReqeust(payload);
    dispatch(getSingleConactAction(id));
    dispatch(fileDeleteSuccess());
  } catch (error) {
    dispatch(fileDeleteError({}));
  }
};

export const fetchRelationSingleClientAction = (id) => async (dispatch, getState) => {
  try {
    dispatch(singleClientFetchStartReducer());
    const { data } = await api.fetchRelationshipSingleClientReqeust(id);
    dispatch(singleClientReducer(data));
  } catch (error) {
    dispatch(singleClientFetchErrorReducer());
  }
};

export const addRelationOtherAction = (form, id) => async (dispatch) => {
  try {
    dispatch(addOtherStart());
    const { data } = await api.addRelationshipOtherReqeust(form);
    dispatch(getSingleConactAction(id));
    dispatch(addOtherSuccess(data));
  } catch (error) {
    dispatch(addOtherError({ message: 'Error. Try again' }));
  }
};

export const otherDeleteAction = (payload) => async (dispatch) => {
  try {
    dispatch(othersDeleteStart());
    const { data } = await api.otherDeleteReqeust(payload);
    dispatch(getSingleConactAction(payload?.leadContact));
    dispatch(othersDeleteSuccess(data));
  } catch (error) {
    dispatch(othersDeleteError({ message: 'Error. Try again' }));
  }
};

export const uploadRelationAvatarAction = (form, id) => async (dispatch) => {
  try {
    // dispatch(avatarUploadStart())
    await api.uploadRelationshipAvatarReqeust(form);
    dispatch(getSingleConactAction(id));
    // dispatch(avatarUploadSuccess())
  } catch (error) {
    // dispatch(avatarUploadError({}))
  }
};

export const deleteRelationContactAction = (payload) => async (dispatch) => {
  try {
    dispatch(deleteContactStart());
    await api.deleteRelationshipContact(payload);
    dispatch(fetchContactListAction({}));
    dispatch(deleteContactSuccess());
  } catch (error) {
    // dispatch(deleteContactError({}))
  }
};

// contact import actions
export const contactRelationImportAction = (payload) => async (dispatch, getState) => {
  try {
    dispatch(importProcessingStart());
    const { data } = await api.importRelationshipContactReqeust(payload);
    dispatch(importProcessingFinish(data));
  } catch (error) {
    dispatch(importProcessingError({}));
  }
};

// ================Vendor Section===================
export const addVendorContactAction = (options) => async (dispatch) => {
  try {
    dispatch(addLeadStart());
    const { data } = await api.addVendorContact(options);
    dispatch(fetchContactListAction());
    dispatch(addLeadSuccess(data));
    dispatch(fetchTotalLeadCountAction());
    dispatch(fetchTotalColdLeadCountAction());
    dispatch(fetchTotalWarmLeadCountAction());
    dispatch(fetchTotalHotLeadCountAction());
  } catch (error) {
    dispatch(addLeadError());
  }
};
