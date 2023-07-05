import { createSlice } from '@reduxjs/toolkit';

export const memberContact = createSlice({
  name: 'memberContact',
  initialState: {
    // Add new Member Contact
    isMemberContactLoading: false,
    isMemberContactErrors: false,
    memberContact: {
      addSuccess: false
    },
    //notes
    memberNote: [],

    // Member contact list Fetching
    fetchingState: 'idle',
    hasFetchingError: null,
    contacts: [],
    contact: {},

    // Member State
    totalCount: 0,
    activeCount: 0,
    pastDueCount: 0,
    formerCount: 0,

    // Single Member
    singleMember: {
      loading: false,
      member: null
    },
    isMemberContactEditSuccess: false,

    // Contact Upload
    contactUpload: {
      contacts: [],
      fileProcessing: false,
      processingError: null,
      importing: false,
      uploadState: 'idle'
    },

    tags: {
      isLoading: false,
      data: [],
      error: null
    },

    avatarUpload: {
      isLoading: false,
      isSuccess: false,
      error: null
    },

    // ** file upload Initial state
    filesUpload: {
      isLoading: false,
      isSuccess: false,
      error: null
    },
    fleUplaodDelete: {
      isLoading: false,
      isSuccess: false,
      error: null
    },
    rank: {
      isLoading: false,
      isSuccess: false,
      isError: null
    },

    editRank: {
      isLoading: false,
      isSuccess: false,
      isError: null
    },

    deleteRank: {
      isLoading: false,
      isSuccess: false,
      isError: null
    },

    other: {
      isLoading: false,
      isSuccess: false,
      isError: null
    },
    deleteOther: {
      isLoading: false,
      isSuccess: false,
      isError: null
    },

    socialLink: {
      isLoading: false,
      isSuccess: false,
      error: null
    },

    //  Payment Method
    addPaymentMethod: {
      isLoading: false,
      isSuccess: false,
      error: null
    },
    editPaymentMethod: {
      isLoading: false,
      isSuccess: false,
      error: null
    },
    deletePaymentMethod: {
      isLoading: false,
      isSuccess: false,
      error: null
    },
    // UPdate Billing Information
    updateBillingAddress: {
      isLoading: false,
      isSuccess: false,
      error: null
    },

    deleteContact: {
      isLoading: false,
      isSuccess: false,
      error: null
    }
  },
  reducers: {
    // Add new member Contact
    newMemberContactStart: (state) => {
      state.isMemberContactLoading = true;
      state.memberContact.addSuccess = false;
    },
    newMemberContactSuccess: (state, action) => {
      state.isMemberContactLoading = false;
      state.memberContact = action?.payload;
      state.memberContact.addSuccess = true;
    },
    newMemberContactFailure: (state, action) => {
      state.isMemberContactLoading = false;
      state.isMemberContactErrors = action?.payload;
      state.memberContact.addSuccess = false;
    },
    newMemberContactReset: (state, action) => {
      state.isMemberContactLoading = false;
      state.isMemberContactErrors = false;
      state.memberContact.addSuccess = false;
    },

    // Fetch Member Contact list
    memberContactFetchStart: (state, action) => {
      state.fetchingState = 'loading';
      state.hasFetchingError = null;
    },
    memberContactFetchSuccess: (state, action) => {
      state.fetchingState = 'success';
      state.hasFetchingError = null;
      state.contacts = action.payload;
    },
    memberContactFetchError: (state, action) => {
      state.fetchingState = 'error';
      state.hasFetchingError = action?.payload;
    },
    memberContactFetchReset: (state, action) => {
      state.fetchingState = 'idle';
      state.hasFetchingError = null;
    },
    // Member Notes
    memberNoteFetch: (state, action) => {
      state.memberNote = action?.payload;
    },

    // Member State
    totalCountReducer: (state, action) => {
      state.totalCount = action?.payload;
    },
    activeCountReducer: (state, action) => {
      state.activeCount = action?.payload;
    },
    pastDueCountReducer: (state, action) => {
      state.pastDueCount = action?.payload;
    },
    formerCountReducer: (state, action) => {
      state.formerCount = action?.payload;
    },

    // Fetch Single Member
    singleMemberFetchStartReducer: (state, action) => {
      state.singleMember.loading = true;
    },
    singleMemberReducer: (state, action) => {
      state.singleMember.member = action?.payload;
      state.singleMember.loading = false;
      state.singleMember.success = true;
      state.contact = action?.payload;
    },
    singleMemberFetchErrorReducer: (state, action) => {
      state.singleMember.member = null;
      state.singleMember.loading = false;
    },
    singleMemberFetchReset: (state, action) => {
      state.singleMember.success = false;
      state.singleMember.loading = false;
    },

    // import contacts
    importFileProcessingStart: (state, action) => {
      state.contactUpload.fileProcessing = true;
      state.contactUpload.contacts = [];
      state.contactUpload.importing = false;
    },
    importFileProcessingFinish: (state, action) => {
      state.contactUpload.fileProcessing = false;
      state.contactUpload.contacts = action.payload;
      state.contactUpload.importing = false;
    },
    importFileProcessingError: (state, action) => {
      state.contactUpload.fileProcessing = false;
      state.contactUpload.contacts = [];
      state.contactUpload.importing = false;
    },
    // import handler
    importProcessingStart: (state, action) => {
      state.contactUpload.fileProcessing = false;
      state.contactUpload.contacts = [];
      state.contactUpload.importing = true;
      state.contactUpload.uploadState = 'loading';
    },
    importProcessingFinish: (state, action) => {
      state.contactUpload.fileProcessing = false;
      state.contactUpload.contacts = [];
      state.contactUpload.importing = false;
      state.contactUpload.uploadState = 'success';
    },
    importProcessingError: (state, action) => {
      state.contactUpload.fileProcessing = false;
      state.contactUpload.contacts = [];
      state.contactUpload.importing = false;
      state.contactUpload.uploadState = 'error';
    },
    importProcessingReset: (state, action) => {
      state.contactUpload.fileProcessing = false;
      state.contactUpload.contacts = [];
      state.contactUpload.importing = false;
      state.contactUpload.uploadState = 'idle';
    },
    editMemberStart: (state, action) => {
      state.loading = true;
      state.isMemberContactLoading = true;
    },
    editMemberSuccess: (state, action) => {
      state.isMemberContactLoading = false;
      state.contact = action?.payload;
      state.isMemberContactEditSuccess = true;
    },
    editMemberError: (state, action) => {
      state.isMemberContactLoading = false;
      state.isMemberContactErrors = action?.payload;
    },
    editMemberReset: (state, action) => {
      state.isMemberContactLoading = false;
      state.isMemberContactEditSuccess = false;
    },

    // TAg Fetching
    tagFetchingStart: (state, action) => {
      state.tags.isLoading = true;
      state.tags.data = [];
      state.tags.error = null;
    },
    tagFetchingSuccess: (state, action) => {
      state.tags.isLoading = false;
      state.tags.data = action?.payload;
      state.tags.error = null;
    },
    tagFetchingError: (state, action) => {
      state.tags.isLoading = false;
      state.tags.data = [];
      state.tags.error = action?.payload;
    },

    // Avatar Upload
    avatarUploadStart: (state, action) => {
      state.avatarUpload.isLoading = true;
      state.avatarUpload.isSuccess = false;
      state.avatarUpload.error = null;
    },
    avatarUploadSuccess: (state, action) => {
      state.avatarUpload.isLoading = false;
      state.avatarUpload.isSuccess = true;
      state.avatarUpload.error = null;
    },
    avatarUploadError: (state, action) => {
      state.avatarUpload.isLoading = false;
      state.avatarUpload.isSuccess = false;
      state.avatarUpload.error = action.payload;
    },

    // ** files upload
    filesUploadStart: (state, action) => {
      state.filesUpload.isLoading = true;
      state.filesUpload.isSuccess = false;
      state.filesUpload.error = null;
    },
    filesUploadSuccess: (state, action) => {
      state.filesUpload.isLoading = false;
      state.filesUpload.isSuccess = true;
      state.filesUpload.error = null;
    },
    filesUploadError: (state, action) => {
      state.filesUpload.isLoading = false;
      state.filesUpload.isSuccess = false;
      state.filesUpload.error = action.payload;
    },
    filesUploadReset: (state, action) => {
      state.filesUpload.isLoading = false;
      state.filesUpload.isSuccess = false;
      state.filesUpload.error = null;
    },
    // ** files Delete
    fleUplaodDeleteStart: (state, action) => {
      state.fleUplaodDelete.isLoading = true;
      state.fleUplaodDelete.isSuccess = false;
      state.fleUplaodDelete.error = null;
    },
    fleUplaodDeleteSuccess: (state, action) => {
      state.fleUplaodDelete.isLoading = false;
      state.fleUplaodDelete.isSuccess = true;
      state.fleUplaodDelete.error = null;
    },
    fleUplaodDeleteError: (state, action) => {
      state.fleUplaodDelete.isLoading = false;
      state.fleUplaodDelete.isSuccess = false;
      state.fleUplaodDelete.error = action.payload;
    },
    fleUplaodDeleteReset: (state, action) => {
      state.fleUplaodDelete.isLoading = false;
      state.fleUplaodDelete.isSuccess = false;
      state.fleUplaodDelete.error = null;
      // add rank
    },
    addRankStart: (state, action) => {
      state.rank.isLoading = true;
      state.rank.isSuccess = false;
      state.rank.error = null;
    },
    addRankSuccess: (state, action) => {
      state.rank.isLoading = false;
      state.rank.isSuccess = true;
      state.rank.error = null;
    },
    addRankError: (state, action) => {
      state.rank.isLoading = false;
      state.rank.isSuccess = false;
      state.rank.error = action.payload;
    },
    addRankReset: (state, action) => {
      state.rank.isLoading = false;
      state.rank.isSuccess = false;
      state.rank.error = null;
    },

    // edit
    editRankStart: (state, action) => {
      state.editRank.isLoading = true;
      state.editRank.isSuccess = false;
      state.editRank.error = null;
    },
    editRankSuccess: (state, action) => {
      state.editRank.isLoading = false;
      state.editRank.isSuccess = true;
      state.editRank.error = null;
    },
    editRankError: (state, action) => {
      state.editRank.isLoading = false;
      state.editRank.isSuccess = false;
      state.editRank.error = action.payload;
    },
    editRankReset: (state, action) => {
      state.editRank.isLoading = false;
      state.editRank.isSuccess = false;
      state.editRank.error = false;
    },

    // delete rank
    deleteRankStart: (state, action) => {
      state.deleteRank.isLoading = true;
      state.deleteRank.isSuccess = false;
      state.deleteRank.error = null;
    },
    deleteRankSuccess: (state, action) => {
      state.deleteRank.isLoading = false;
      state.deleteRank.isSuccess = true;
      state.deleteRank.error = null;
    },
    deleteRankError: (state, action) => {
      state.deleteRank.isLoading = false;
      state.deleteRank.isSuccess = false;
      state.deleteRank.error = action.payload;
    },

    deleteRankReset: (state, action) => {
      state.deleteRank.isLoading = false;
      state.deleteRank.isSuccess = false;
      state.deleteRank.error = null;
    },
    // add rank
    addOtherStart: (state, action) => {
      state.other.isLoading = true;
      state.other.isSuccess = false;
      state.other.error = null;
    },

    addOtherSuccess: (state, action) => {
      state.other.isLoading = false;
      state.other.isSuccess = true;
      state.other.error = null;
    },
    addOtherError: (state, action) => {
      state.other.isLoading = false;
      state.other.isSuccess = false;
      state.other.error = action.payload;
    },
    addOtherReset: (state, action) => {
      state.other.isLoading = false;
      state.other.isSuccess = false;
      state.other.error = null;
    },

    // edit rank
    editOtherStart: (state, action) => {
      state.other.isLoading = true;
      state.other.isSuccess = false;
      state.other.error = null;
    },
    editOtherSuccess: (state, action) => {
      state.other.isLoading = false;
      state.other.isSuccess = true;
      state.other.error = null;
    },
    editOtherError: (state, action) => {
      state.other.isLoading = false;
      state.other.isSuccess = false;
      state.other.error = action.payload;
    },
    editOtherReset: (state, action) => {
      state.other.isLoading = false;
      state.other.isSuccess = false;
      state.other.error = action.payload;
    },

    // delete
    deleteOtherStart: (state, action) => {
      state.deleteOther.isLoading = true;
      state.deleteOther.isSuccess = false;
      state.deleteOther.error = null;
    },
    deleteOtherSuccess: (state, action) => {
      state.deleteOther.isLoading = false;
      state.deleteOther.isSuccess = true;
      state.deleteOther.error = null;
    },
    deleteOtherError: (state, action) => {
      state.deleteOther.isLoading = false;
      state.deleteOther.isSuccess = false;
      state.deleteOther.error = action.payload;
    },
    deleteOtherReset: (state, action) => {
      state.deleteOther.isLoading = false;
      state.deleteOther.isSuccess = false;
      state.deleteOther.error = null;
    },

    // ==================================
    socialLinkStart: (state, action) => {
      state.socialLink.isLoading = true;
      state.socialLink.isSuccess = false;
      state.socialLink.error = null;
    },
    socialLinkSuccess: (state, action) => {
      state.socialLink.isLoading = false;
      state.socialLink.isSuccess = true;
      state.socialLink.error = null;
    },
    socialLinkError: (state, action) => {
      state.socialLink.isLoading = false;
      state.socialLink.isSuccess = false;
      state.socialLink.error = action.payload;
    },
    socialLinkReset: (state, action) => {
      state.socialLink.isLoading = false;
      state.socialLink.isSuccess = false;
      state.socialLink.error = null;
    },

    // Payment Method Add
    addPaymentMethodStart: (state, action) => {
      state.addPaymentMethod.isLoading = true;
      state.addPaymentMethod.isSuccess = false;
      state.addPaymentMethod.error = null;
    },
    addPaymentMethodSuccess: (state, action) => {
      state.addPaymentMethod.isLoading = false;
      state.addPaymentMethod.isSuccess = true;
      state.addPaymentMethod.error = null;
    },
    addPaymentMethodError: (state, action) => {
      state.addPaymentMethod.isLoading = false;
      state.addPaymentMethod.isSuccess = false;
      state.addPaymentMethod.error = action.payload;
    },
    addPaymentMethodReset: (state, action) => {
      state.addPaymentMethod.isLoading = false;
      state.addPaymentMethod.isSuccess = false;
      state.addPaymentMethod.error = null;
    },

    // Edit Payment Method
    updatePaymentMethodStart: (state, action) => {
      state.editPaymentMethod.isLoading = true;
      state.editPaymentMethod.isSuccess = false;
      state.editPaymentMethod.error = null;
    },
    updatePaymentMethodSuccess: (state, action) => {
      state.editPaymentMethod.isLoading = false;
      state.editPaymentMethod.isSuccess = true;
      state.editPaymentMethod.error = null;
    },
    updatePaymentMethodError: (state, action) => {
      state.editPaymentMethod.isLoading = false;
      state.editPaymentMethod.isSuccess = false;
      state.editPaymentMethod.error = action.payload;
    },
    updatePaymentMethodReset: (state, action) => {
      state.editPaymentMethod.isLoading = false;
      state.editPaymentMethod.isSuccess = false;
      state.editPaymentMethod.error = null;
    },

    // Delete Payment Method
    deletePaymentMethodStart: (state, action) => {
      state.deletePaymentMethod.isLoading = true;
      state.deletePaymentMethod.isSuccess = false;
      state.deletePaymentMethod.error = null;
    },
    deletePaymentMethodSuccess: (state, action) => {
      state.deletePaymentMethod.isLoading = false;
      state.deletePaymentMethod.isSuccess = true;
      state.deletePaymentMethod.error = null;
    },
    deletePaymentMethodError: (state, action) => {
      state.deletePaymentMethod.isLoading = false;
      state.deletePaymentMethod.isSuccess = false;
      state.deletePaymentMethod.error = action.payload;
    },
    deletePaymentMethodReset: (state, action) => {
      state.deletePaymentMethod.isLoading = false;
      state.deletePaymentMethod.isSuccess = false;
      state.deletePaymentMethod.error = null;
    },

    // UPdate Billing Address
    updateBillingAddressStart: (state, action) => {
      state.updateBillingAddress.isLoading = true;
      state.updateBillingAddress.isSuccess = false;
      state.updateBillingAddress.error = null;
    },
    updateBillingAddressSuccess: (state, action) => {
      state.updateBillingAddress.isLoading = false;
      state.updateBillingAddress.isSuccess = true;
      state.updateBillingAddress.error = null;
    },
    updateBillingAddressError: (state, action) => {
      state.updateBillingAddress.isLoading = false;
      state.updateBillingAddress.isSuccess = false;
      state.updateBillingAddress.error = action.payload;
    },
    updateBillingAddressReset: (state, action) => {
      state.updateBillingAddress.isLoading = false;
      state.updateBillingAddress.isSuccess = false;
      state.updateBillingAddress.error = null;
    },
    // Delete Contact
    deleteContactStart: (state, action) => {
      state.deleteContact.isLoading = true;
      state.deleteContact.isSuccess = false;
      state.deleteContact.error = null;
    },
    deleteContactSuccess: (state, action) => {
      state.deleteContact.isLoading = false;
      state.deleteContact.isSuccess = true;
      state.deleteContact.error = null;
    },
    deleteContactError: (state, action) => {
      state.deleteContact.isLoading = false;
      state.deleteContact.isSuccess = false;
      state.deleteContact.error = action.payload;
    },
    deleteContactReset: (state, action) => {
      state.deleteContact.isLoading = false;
      state.deleteContact.isSuccess = false;
      state.deleteContact.error = null;
    }
  }
});

//
// updateBillingInfo

export const {
  // Add
  newMemberContactStart,
  newMemberContactSuccess,
  newMemberContactFailure,
  newMemberContactReset,

  // Read
  memberContactFetchStart,
  memberContactFetchSuccess,
  memberContactFetchError,
  memberContactFetchReset,
  //notes
  memberNoteFetch,
  //state
  totalCountReducer,
  activeCountReducer,
  pastDueCountReducer,
  formerCountReducer,

  // fetch Single Member
  singleMemberReducer,
  singleMemberFetchStartReducer,
  singleMemberFetchErrorReducer,
  singleMemberFetchReset,
  // contact import
  importFileProcessingStart,
  importFileProcessingFinish,
  importFileProcessingError,
  // import start
  importProcessingStart,
  importProcessingFinish,
  importProcessingError,
  importProcessingReset,
  // Edit member
  editMemberStart,
  editMemberSuccess,
  editMemberError,

  //tags
  tagFetchingStart,
  tagFetchingSuccess,
  tagFetchingError,

  // Upload
  avatarUploadStart,
  avatarUploadSuccess,
  avatarUploadError,

  editMemberReset,

  // ** files upload
  filesUploadStart,
  filesUploadSuccess,
  filesUploadError,
  filesUploadReset,
  // ** files upload Delete
  fleUplaodDeleteStart,
  fleUplaodDeleteSuccess,
  fleUplaodDeleteError,
  fleUplaodDeleteReset,
  // ranks
  addRankStart,
  addRankSuccess,
  addRankError,

  deleteRankStart,
  deleteRankSuccess,
  deleteRankError,

  // other
  addOtherStart,
  addOtherSuccess,
  addOtherError,
  addRankReset,
  // ---------- >
  editRankStart,
  editRankSuccess,
  editRankError,
  socialLinkStart,
  socialLinkSuccess,
  socialLinkError,
  socialLinkReset,

  // Other
  editOtherStart,
  editOtherSuccess,
  editOtherError,
  editOtherReset,

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
  deleteOtherStart,
  deleteOtherSuccess,
  deleteOtherError,
  deleteOtherReset,

  editRankReset,
  deleteRankReset,

  // Delete Contact
  deleteContactStart,
  deleteContactSuccess,
  deleteContactError,
  deleteContactReset,

  addOtherReset
} = memberContact.actions;

export default memberContact.reducer;
