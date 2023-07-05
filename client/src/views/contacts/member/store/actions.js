import * as api from './api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  // add
  newMemberContactStart,
  newMemberContactSuccess,
  newMemberContactFailure,
  newMemberContactReset,

  // Read
  memberContactFetchStart,
  memberContactFetchSuccess,
  memberContactFetchError,
  memberContactFetchReset,
  //Notes
  memberNoteFetch,

  // Member Delete

  //state
  totalCountReducer,
  activeCountReducer,
  pastDueCountReducer,
  formerCountReducer,

  // fetch Single member
  singleMemberReducer,
  singleMemberFetchStartReducer,
  singleMemberFetchErrorReducer,

  // Contact file upload
  importFileProcessingStart,
  importFileProcessingFinish,
  importFileProcessingError,

  // import
  importProcessingStart,
  importProcessingFinish,
  importProcessingError,

  // edit Member
  editMemberStart,
  editMemberSuccess,
  editMemberError,

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
  deleteContactReset
} from './reducer';

// Fetch Member Contact List
export const MemberContactFetchAction = (options) => async (dispatch) => {
  try {
    dispatch(memberContactFetchStart());
    const { data } = await api.memberContactList(options);
    dispatch(memberContactFetchSuccess(data));
  } catch (error) {
    dispatch(
      memberContactFetchError({
        error: error.response
      })
    );
  }
  // Reset After 3 sec
  setTimeout(() => {
    memberContactFetchReset();
  });
};

// action for member Tag

export const getMemberContactByTagsAction = (options) => async (dispatch) => {
  try {
    dispatch(memberContactFetchStart());
    const { data } = await api.getContactByTag(options);
    dispatch(memberContactFetchSuccess(data));
  } catch (error) {
    dispatch(
      memberContactFetchError({
        error: error.response
      })
    );
  }
  // Reset After 3 sec
  setTimeout(() => {
    memberContactFetchReset();
  });
};


// action for member notes
export const MemberNoteFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.memberNoteList();
    dispatch(memberNoteFetch(data));
  } catch (error) {}
};
export const MemberNoteAddAction = (newNote) => async (dispatch) => {
  try {
    const { data } = await api.memberNoteAdd(newNote);
    dispatch(MemberNoteFetchAction());
  } catch (error) {}
};
export const MemberNoteDeleteAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.memberNoteDelete(id);
    dispatch(MemberNoteFetchAction());
  } catch (error) {}
};
export const MemberNoteEditAction = (newNote) => async (dispatch) => {
  try {
    const { data } = await api.memberNoteEdit(newNote);
    dispatch(MemberNoteFetchAction());
  } catch (error) {}
};
// action creator for new member contact
export const newMemberContact = (newMember) => async (dispatch) => {
  try {
    dispatch(newMemberContactStart());
    const { data } = await api.newMemberContact(newMember);
    dispatch(MemberContactFetchAction());
    dispatch(newMemberContactSuccess(data));

    // Fetch Counts
    dispatch(totalMemberCountAction());
    dispatch(totalActiveMemberCountAction());
    dispatch(totalPastDueMemberCountAction());
    dispatch(totalFormerMemberCountAction());
  } catch (error) {
    dispatch(
      newMemberContactFailure({
        error: error.response
      })
    );
  }
  // Reset After 3 sec
  setTimeout(() => {
    newMemberContactReset();
  });
};
// Delete Contact
export const deleteMemberContact = (id) => async (dispatch, getState) => {
  try {
    dispatch(deleteContactStart());
    await api.deleteMemberContact(id);
    dispatch(MemberContactFetchAction({}));
    dispatch(deleteContactSuccess());
  } catch (error) {
    dispatch(deleteContactError());
  }
};
// Member State Action
export const totalMemberCountAction = () => async (dispatch, getState) => {
  try {
    const { data } = await api.MemberContactTotalCount();
    dispatch(totalCountReducer(data));
  } catch (error) {
    //
  }
};

export const totalActiveMemberCountAction = () => async (dispatch, getState) => {
  try {
    const { data } = await api.MemberContactTotalActiveCount();
    dispatch(activeCountReducer(data));
  } catch (error) {
    //
  }
};

export const totalPastDueMemberCountAction = () => async (dispatch, getState) => {
  try {
    const { data } = await api.MemberContactTotalPastDueCount();
    dispatch(pastDueCountReducer(data));
  } catch (error) {
    //
  }
};

export const totalFormerMemberCountAction = () => async (dispatch, getState) => {
  try {
    const { data } = await api.MemberContactTotalFormerCount();
    dispatch(formerCountReducer(data));
  } catch (error) {
    //
  }
};

export const fetchSingleMemberAction = (id) => async (dispatch, getState) => {
  try {
    dispatch(singleMemberFetchStartReducer());
    const { data } = await api.fetchSingleMemberReqeust(id);
    dispatch(singleMemberReducer(data));
  } catch (error) {
    dispatch(singleMemberFetchErrorReducer());
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

    dispatch(totalMemberCountAction());
    dispatch(totalActiveMemberCountAction());
    dispatch(totalPastDueMemberCountAction());
    dispatch(totalFormerMemberCountAction());
  } catch (error) {
    dispatch(importProcessingError({}));
  }
};
export const editMemberAction = (id, updatedMember) => async (dispatch) => {
  try {
    dispatch(editMemberStart());
    const { data } = await api.editMemberReqeust(id, updatedMember);
    dispatch(editMemberSuccess(data));

    // fetch single member
    dispatch(fetchSingleMemberAction(id));
  } catch (error) {
    // const email =
    dispatch(editMemberError());
  }
};

export const editSocialLinksAction = (id, updatedMember) => async (dispatch) => {
  try {
    dispatch(socialLinkStart());
    const { data } = await api.editMemberReqeust(id, updatedMember);
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
    dispatch(fetchSingleMemberAction(id));
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
    dispatch(fetchSingleMemberAction(id));
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

export const editRankAction = (form, memberId) => async (dispatch) => {
  try {
    dispatch(editRankStart());
    const { data } = await api.editRankReqeust(form);
    dispatch(editRankSuccess(data));
    dispatch(fetchSingleMemberAction(memberId));
  } catch (error) {
    dispatch(editRankError({ message: 'Error. Try again' }));
  }
};
export const deleteMemberFileAction = (memberId, id) => async (dispatch) => {
  try {
    dispatch(fleUplaodDeleteStart());
    await api.deleteFileReqeust({ memberId, id });
    dispatch(fetchSingleMemberAction(memberId));
    dispatch(fleUplaodDeleteSuccess());
  } catch (error) {
    dispatch(fleUplaodDeleteError(error));
  }
};
export const deleteRankAction = (state) => async (dispatch) => {
  try {
    dispatch(deleteRankStart());
    const { data } = await api.deleteRankReqeust(state);
    dispatch(fetchSingleMemberAction(state?.memberId));
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
    dispatch(fetchSingleMemberAction(id));
  } catch (error) {
    dispatch(addOtherError({ message: 'Error. Try again' }));
  }
};
export const editOtherAction = (state) => async (dispatch) => {
  try {
    dispatch(editOtherStart());
    const { data } = await api.editOtherReqeust(state);
    dispatch(editOtherSuccess(data));

    // refetch single Member
    dispatch(fetchSingleMemberAction(state?.memberId));
  } catch (error) {
    dispatch(editOtherError({ message: 'Error. Try again' }));
  }
};
// Add Payment Method
export const addPaymentMethodAction = (state) => async (dispatch) => {
  try {
    dispatch(addPaymentMethodStart());
    const { data } = await api.addPaymentMethod(state);
    // Refetch Single Member Again
    dispatch(fetchSingleMemberAction(state?.memberId));
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
    dispatch(fetchSingleMemberAction(state?.memberId));
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
    dispatch(fetchSingleMemberAction(state?.memberId));
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
    dispatch(fetchSingleMemberAction(state?.memberId));
  } catch (error) {
    dispatch(deleteOtherError({ message: 'Error. Try again' }));
  }
};
