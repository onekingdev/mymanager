import { createSlice } from '@reduxjs/toolkit';

export const totalContacts = createSlice({
  name: 'totalContacts',
  initialState: {
    //contact
    contactList: {},
    contactTypeList: [],
    totalNotes: [],
    selectedContact: {},
    //contact note
    notes: [],
    // filter params
    currentContactType: '',
    pageSize: 10,
    page: 1,
    //promotedlist
    promotedClientList: [],
    //progression
    progressionListClientData: [],
    //get all contact
    contactRankList: [],
    // Contact Fields By Type
    contactField: {
      loading: false,
      data: [],
      error: null
    },
    totalContactField: {
      loading: false,
      data: [],
      error: null
    },
    //contact count
    totalCount: {
      clients: 0,
      leads: 0,
      vendors: 0,
      relationships: 0,
      employees: 0,
      members: 0,
      total: 0
    },
    tags: [],
    stages: [],
    leadSource: [],
    //contact data
    clientContacts: [],
    leadContacts: [],
    vendorContacs: [],
    relationshipContacts: [],
    employeeContacts: [],
    memberContacts: [],
    progressionMessage: [],
    progressIonHistoryData: [],
    allProgressionData: [],
    fetchProgressionData: [],
    removeIdDataPro: [],
    // ================Client Reducers==================
    // Add new Client Contact
    isClientContactLoading: false,
    isClientContactErrors: false,
    clientContact: {
      addSuccess: false
    },
    //notes
    clientNote: [],
    // Client contact list Fetching
    fetchingState: 'idle',
    hasFetchingError: null,
    contacts: [],
    contact: {},
    // Client State
    totalCount: 0,
    activeCount: 0,
    pastDueCount: 0,
    formerCount: 0,
    // Single Client
    singleClient: {
      loading: false,
      client: null
    },
    isClientContactEditSuccess: false,
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
    //  Invoices
    invoice: {
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
    },
    //
    promotedClientList: [],
    progressionListClientData: [],
    // promot action
    promotClientProgressionData: [],

    // ===============Employee Reducer=============
    // add new Employee
    addEmployee: {
      loading: false,
      success: false,
      error: null
    },
    deleteEmployee: {
      loading: false,
      success: false,
      error: null
    },
    //notes
    empNote: [],
    employeeList: {
      loading: false,
      success: false,
      error: null,
      data: null
    },
    contact: {
      loading: false,
      success: false,
      error: null,
      data: null
    },
    contactUpdate: {
      loading: false,
      success: false,
      error: null
    },
    socialLinksUpdate: {
      loading: false,
      success: false,
      error: null
    },
    rankAddNUpdate: {
      loading: false,
      success: false,
      error: null
    },
    rankDelete: {
      loading: false,
      success: false,
      error: null
    },
    // ** file add
    fileAdd: {
      loading: false,
      success: false,
      error: null
    },
    // ** file Edit
    fileEdit: {
      loading: false,
      success: false,
      error: null
    },
    // **  File Delete
    fileDelete: {
      loading: false,
      success: false,
      error: null
    },
    // ** Other Add
    billingAddressUpdate: {
      loading: false,
      success: false,
      error: null
    },
    totalEmployeeCount: {
      loading: false,
      success: false,
      error: null,
      data: 0
    },
    activeEmployeeCount: {
      loading: false,
      success: false,
      error: null,
      data: 0
    },
    internshipEmployeeCount: {
      loading: false,
      success: false,
      error: null,
      data: 0
    },
    formerEmployeeCount: {
      loading: false,
      success: false,
      error: null,
      data: 0
    },
    // ** WorkHistory
    workHistory: {
      isStart: false,
      duration: 0
    },

    // all work history data
    workAllHistory: {
      allHistory: []
    },

    // category
    employeeCategory: {
      loading: false,
      success: false,
      data: []
    },

    // Work Attendance
    employeeAttance: {
      loading: false,
      success: false,
      data: []
    },

    // =================Lead Section==============
    leadNote: [],
    // add new Lead
    addLead: {
      loading: false,
      success: false,
      error: null
    },
    deleteContact: {
      loading: false,
      success: false,
      error: null
    },
    deleteLead: {
      loading: false,
      success: false,
      error: null
    },
    LeadList: {
      loading: false,
      success: false,
      error: null,
      data: null
    },
    contactList: {
      loading: false,
      success: false,
      error: null,
      data: [],
      isNewContact: false
    },
    totalLeadCount: {
      loading: false,
      success: false,
      error: null,
      data: 0
    },
    coldLeadCount: {
      loading: false,
      success: false,
      error: null,
      data: 0
    },
    warmLeadCount: {
      loading: false,
      success: false,
      error: null,
      data: 0
    },
    hotLeadCount: {
      loading: false,
      success: false,
      error: null,
      data: 0
    },
    singleContact: {
      loading: false,
      success: false,
      error: null,
      data: 0
    },
    othersDelete: {
      isLoading: false,
      isSuccess: false,
      isError: null
    },
    viewGoalSet: {
      isLoading: false,
      isSuccess: false,
      viewGoal: 1
    },
    updateContactStage: {
      oading: false,
      Success: false,
      error: null
    },
    selectContact: {
      selected: null,
      isSelected: false
    },
    // ============Relationship Section==================
    //notes
    relationNote: [],
    // ============Vendor Section==================
    vendorNote: []
  },
  reducers: {
    //Contact
    contactsReducer: (state, action) => {
      state.contactList = action?.payload?.contactList;
      state.contactTypeList = action?.payload?.contactTypeList;
    },
    selectContactReducer: (state, action) => {
      state.selectedContact = action.payload;
    },

    // Contact Fields
    getContactFieldStart: (state) => {
      state.contactField.loading = true;
    },
    getContactFieldSuccess: (state, action) => {
      state.contactField.loading = false;
      state.contactField.data = action?.payload;
    },
    getAllContactFieldStart: (state) => {
      state.totalContactField.loading = true;
    },
    getAllContactFieldSuccess: (state, action) => {
      state.totalContactField.loading = false;
      state.totalContactField.data = action?.payload;
    },
    // Contact Notes
    contactNoteFetch: (state, action) => {
      state.notes = action?.payload;
    },

    // Contact Notes
    allNotesReducer: (state, action) => {
      state.totalNotes = action?.payload;
    },

    // Filter Params
    contactFilterReducer: (state, action) => {
      state.currentContactType = action?.payload?.currentContactType;
      state.pageSize = action?.payload?.pageSize;
      state.page = action?.payload?.page;
    },

    // ** All contact rank data
    contactRankListSuccess: (state, action) => {
      state.contactRankList = action?.payload;
    },

    //promoted client data
    promotedClientData: (state, action) => {
      state.promotedClientList = action?.payload;
    },

    //progression List
    progressionListClient: (state, action) => {
      state.progressionListClientData = action.payload;
    },

    /**
     * ***********************  CAUTION  ***********************
     * Following code will be delete after finish refactoring.
     * Now can not delelte we should test & check the previous work and current work.
     * Thanks.
     */

    totalCountReducer: (state, action) => {
      state.totalCount = action?.payload;
    },

    clientContactsReducer: (state, action) => {
      state.clientContacts = action.payload;
    },
    leadContactsReducer: (state, action) => {
      state.leadContacts = action.payload;
    },
    vendorContactsReducer: (state, action) => {
      state.vendorContacs = action.payload;
    },
    relationshipContactsReducer: (state, action) => {
      state.relationshipContacts = action.payload;
    },
    employeeContactsReducer: (state, action) => {
      state.employeeContacts = action.payload;
    },
    memberContactsReducer: (state, action) => {
      state.memberContacts = action.payload;
    },
    setTagsReducer: (state, action) => {
      state.tags = action.payload;
    },
    setStagesReducer: (state, action) => {
      state.stages = action.payload;
    },
    setLeadsReducer: (state, action) => {
      state.leadSource = action.payload;
    },
    progressionAddReducer: (state, action) => {
      state.progressionMessage = action.payload;
    },
    getProgressionHistoryData: (state, action) => {
      state.progressIonHistoryData = action.payload;
    },
    getProgressionAllData: (state, action) => {
      state.allProgressionData = action.payload;
    },
    progressionFetchData: (state, action) => {
      state.fetchProgressionData = action.payload;
    },
    removeIdReducer: (state, action) => {
      state.removeIdDataPro = action.payload;
    },
    // ===================Client Reducers================
    // Add new client Contact
    newClientContactStart: (state) => {
      state.isClientContactLoading = true;
      state.clientContact.addSuccess = false;
    },
    newClientContactSuccess: (state, action) => {
      state.isClientContactLoading = false;
      state.clientContact = action?.payload;
      state.clientContact.addSuccess = true;
    },
    newClientContactFailure: (state, action) => {
      state.isClientContactLoading = false;
      state.isClientContactErrors = action?.payload;
      state.clientContact.addSuccess = false;
    },
    newClientContactReset: (state, action) => {
      state.isClientContactLoading = false;
      state.isClientContactErrors = false;
      state.clientContact.addSuccess = false;
    },

    // Fetch Client Contact list
    clientContactFetchStart: (state, action) => {
      state.fetchingState = 'loading';
      state.hasFetchingError = null;
    },
    clientContactFetchSuccess: (state, action) => {
      state.fetchingState = 'success';
      state.hasFetchingError = null;
      state.contacts = action.payload;
    },
    clientContactFetchError: (state, action) => {
      state.fetchingState = 'error';
      state.hasFetchingError = action?.payload;
    },
    clientContactFetchReset: (state, action) => {
      state.fetchingState = 'idle';
      state.hasFetchingError = null;
    },
    // Client Notes
    clientNoteFetch: (state, action) => {
      state.clientNote = action?.payload;
    },

    // Client State
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

    // Fetch Single Client
    singleClientFetchStartReducer: (state, action) => {
      state.singleClient.loading = true;
    },
    singleClientReducer: (state, action) => {
      state.singleClient.client = action?.payload;
      state.singleClient.loading = false;
      state.singleClient.success = true;
      state.contact = action?.payload;
    },
    singleClientFetchErrorReducer: (state, action) => {
      state.singleClient.client = null;
      state.singleClient.loading = false;
    },
    singleClientFetchReset: (state, action) => {
      state.singleClient.success = false;
      state.singleClient.loading = false;
    },

    // Fetch Invoices
    getInvoicesStartReducer: (state, action) => {
      state.invoice.isLoading = true;
    },
    getInvoicesReducer: (state, action) => {
      state.invoice.data = action.payload.data;
      state.invoice.allData = action.payload.allData;
      state.invoice.total = action.payload.totalPages;
      state.invoice.params = action.payload.params;
      state.invoice.isLoading = false;
      state.invoice.isSuccess = true;
    },
    getInvoicesErrorReducer: (state, action) => {
      state.invoice.data = null;
      state.invoice.allData = null;
      state.invoice.total = null;
      state.invoice.params = null;
      state.invoice.isLoading = false;
    },
    getInvoicesFetchReset: (state, action) => {
      state.invoice.isSuccess = false;
      state.invoice.isLoading = false;
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
    editClientStart: (state, action) => {
      state.loading = true;
      state.isClientContactLoading = true;
    },
    editClientSuccess: (state, action) => {
      state.isClientContactLoading = false;
      state.contact = action?.payload;
      state.isClientContactEditSuccess = true;
    },
    editClientError: (state, action) => {
      state.isClientContactLoading = false;
      state.isClientContactErrors = action?.payload;
    },
    editClientReset: (state, action) => {
      state.isClientContactLoading = false;
      state.isClientContactEditSuccess = false;
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
    },
    //promoted client data
    promotedClientData: (state, action) => {
      state.promotedClientList = action?.payload;
    },
    //progression List
    progressionListClient: (state, action) => {
      state.progressionListClientData = action.payload;
    },
    promotClientProgression: (state, action) => {
      state.promotClientProgressionData = action.payload;
    },

    // ===========Employee Contact==========

    addEmployeeError: (state, action) => {
      state.addEmployee.loading = false;
      state.addEmployee.success = false;
      state.addEmployee.error = action.payload;
    },
    addEmployeeStart: (state) => {
      state.addEmployee.loading = true;
    },
    addEmployeeSuccess: (state) => {
      state.addEmployee.loading = false;
      state.addEmployee.success = true;
      state.addEmployee.error = null;
    },
    addEmployeeReset: (state, action) => {
      state.addEmployee.loading = false;
      state.addEmployee.success = false;
      state.addEmployee.error = null;
    },
    // ** add new Employee
    // Member Notes

    empNoteFetch: (state, action) => {
      state.empNote = action?.payload;
    },
    // ** add new Employee
    EmployeeListStart: (state) => {
      state.employeeList.loading = true;
    },
    EmployeeListSuccess: (state, action) => {
      state.employeeList.loading = false;
      state.employeeList.success = true;
      state.employeeList.error = null;
      state.employeeList.data = action.payload;
    },
    EmployeeListError: (state, action) => {
      state.employeeList.loading = false;
      state.employeeList.success = true;
      state.employeeList.error = action.payload;
    },
    EmployeeListReset: (state, action) => {
      state.employeeList.loading = false;
      state.employeeList.success = false;
      state.employeeList.error = null;
    },
    // ** add new Employee

    // ** single employee fetch
    employeeByIdStart: (state) => {
      state.contact.loading = true;
    },
    employeeByIdSuccess: (state, action) => {
      state.contact.loading = false;
      state.contact.success = true;
      state.contact.error = null;
      state.contact.data = action.payload;
    },
    employeeByIdError: (state, action) => {
      state.contact.loading = false;
      state.contact.success = true;
      state.contact.error = action.payload;
    },
    employeeByIdReset: (state, action) => {
      state.contact.loading = false;
      state.contact.success = false;
      state.contact.error = null;
    },

    // (**) Contact Update
    // ** single employee fetch
    employeeUpdateIdStart: (state) => {
      state.contactUpdate.loading = true;
    },
    employeeUpdateIdSuccess: (state, action) => {
      state.contactUpdate.loading = false;
      state.contactUpdate.success = true;
      state.contactUpdate.error = null;
    },
    employeeUpdateIdError: (state, action) => {
      state.contactUpdate.loading = false;
      state.contactUpdate.success = true;
      state.contactUpdate.error = action.payload;
    },
    employeeUpdateIdReset: (state, action) => {
      state.contactUpdate.loading = false;
      state.contactUpdate.success = false;
      state.contactUpdate.error = null;
    },

    // ** social Link update

    socialLinkUpdateStart: (state) => {
      state.socialLinksUpdate.loading = true;
    },
    socialLinkUpdateSuccess: (state, action) => {
      state.socialLinksUpdate.loading = false;
      state.socialLinksUpdate.success = true;
      state.socialLinksUpdate.error = null;
    },
    socialLinkUpdateError: (state, action) => {
      state.socialLinksUpdate.loading = false;
      state.socialLinksUpdate.success = true;
      state.socialLinksUpdate.error = action.payload;
    },
    socialLinkUpdateReset: (state, action) => {
      state.socialLinksUpdate.loading = false;
      state.socialLinksUpdate.success = false;
      state.socialLinksUpdate.error = null;
    },

    // ** Rank Add or Update

    rankAddNUpdateStart: (state) => {
      state.rankAddNUpdate.loading = true;
    },
    rankAddNUpdateSuccess: (state, action) => {
      state.rankAddNUpdate.loading = false;
      state.rankAddNUpdate.success = true;
      state.rankAddNUpdate.error = null;
    },
    rankAddNUpdateError: (state, action) => {
      state.rankAddNUpdate.loading = false;
      state.rankAddNUpdate.success = true;
      state.rankAddNUpdate.error = action.payload;
    },
    rankAddNUpdateReset: (state, action) => {
      state.rankAddNUpdate.loading = false;
      state.rankAddNUpdate.success = false;
      state.rankAddNUpdate.error = null;
    },

    // ** Rank Delete

    rankDeleteStart: (state) => {
      state.rankDelete.loading = true;
    },
    rankDeleteSuccess: (state, action) => {
      state.rankDelete.loading = false;
      state.rankDelete.success = true;
      state.rankDelete.error = null;
    },
    rankDeleteError: (state, action) => {
      state.rankDelete.loading = false;
      state.rankDelete.success = true;
      state.rankDelete.error = action.payload;
    },
    rankDeleteReset: (state, action) => {
      state.rankDelete.loading = false;
      state.rankDelete.success = false;
      state.rankDelete.error = null;
    },
    // fileAdd
    // fileEdit
    // fileDelete
    // ** file Add
    fileAddStart: (state) => {
      state.fileAdd.loading = true;
    },
    fileAddSuccess: (state, action) => {
      state.fileAdd.loading = false;
      state.fileAdd.success = true;
      state.fileAdd.error = null;
    },
    fileAddError: (state, action) => {
      state.fileAdd.loading = false;
      state.fileAdd.success = true;
      state.fileAdd.error = action.payload;
    },
    fileAddReset: (state, action) => {
      state.fileAdd.loading = false;
      state.fileAdd.success = false;
      state.fileAdd.error = null;
    },

    // ** file Edit
    fileEditStart: (state) => {
      state.fileEdit.loading = true;
    },
    fileEditSuccess: (state, action) => {
      state.fileEdit.loading = false;
      state.fileEdit.success = true;
      state.fileEdit.error = null;
    },
    fileEditError: (state, action) => {
      state.fileEdit.loading = false;
      state.fileEdit.success = true;
      state.fileEdit.error = action.payload;
    },
    fileEditReset: (state, action) => {
      state.fileEdit.loading = false;
      state.fileEdit.success = false;
      state.fileEdit.error = null;
    },
    // ** file Delete
    fileDeleteStart: (state) => {
      state.fileDelete.loading = true;
    },
    fileDeleteSuccess: (state, action) => {
      state.fileDelete.loading = false;
      state.fileDelete.success = true;
      state.fileDelete.error = null;
    },
    fileDeleteError: (state, action) => {
      state.fileDelete.loading = false;
      state.fileDelete.success = true;
      state.fileDelete.error = action.payload;
    },
    fileDeleteReset: (state, action) => {
      state.fileDelete.loading = false;
      state.fileDelete.success = false;
      state.fileDelete.error = null;
    },

    // Billing Address Update
    billingAddressUpdateStart: (state) => {
      state.billingAddressUpdate.loading = true;
    },
    billingAddressUpdateSuccess: (state, action) => {
      state.billingAddressUpdate.loading = false;
      state.billingAddressUpdate.success = true;
      state.billingAddressUpdate.error = null;
    },
    billingAddressUpdateError: (state, action) => {
      state.billingAddressUpdate.loading = false;
      state.billingAddressUpdate.success = true;
      state.billingAddressUpdate.error = action.payload;
    },
    billingAddressUpdateReset: (state, action) => {
      state.billingAddressUpdate.loading = false;
      state.billingAddressUpdate.success = false;
      state.billingAddressUpdate.error = null;
    },

    // Employee Count
    totalEmployeeCountStart: (state) => {
      state.totalEmployeeCount.loading = true;
    },
    totalEmployeeCountSuccess: (state, action) => {
      state.totalEmployeeCount.loading = false;
      state.totalEmployeeCount.success = true;
      state.totalEmployeeCount.error = null;
      state.totalEmployeeCount.data = action.payload;
    },
    totalEmployeeCountError: (state, action) => {
      state.totalEmployeeCount.loading = false;
      state.totalEmployeeCount.success = true;
      state.totalEmployeeCount.error = action.payload;
    },
    totalEmployeeCountReset: (state, action) => {
      state.totalEmployeeCount.loading = false;
      state.totalEmployeeCount.success = false;
      state.totalEmployeeCount.error = null;
    },

    // Active Employee Count
    activeEmployeeCountStart: (state) => {
      state.activeEmployeeCount.loading = true;
    },
    activeEmployeeCountSuccess: (state, action) => {
      state.activeEmployeeCount.loading = false;
      state.activeEmployeeCount.success = true;
      state.activeEmployeeCount.error = null;
      state.activeEmployeeCount.data = action.payload;
    },
    activeEmployeeCountError: (state, action) => {
      state.activeEmployeeCount.loading = false;
      state.activeEmployeeCount.success = true;
      state.activeEmployeeCount.error = action.payload;
    },
    activeEmployeeCountReset: (state, action) => {
      state.activeEmployeeCount.loading = false;
      state.activeEmployeeCount.success = false;
      state.activeEmployeeCount.error = null;
    },

    // Internship Employee Count
    internshipEmployeeCountStart: (state) => {
      state.internshipEmployeeCount.loading = true;
    },
    internshipEmployeeCountSuccess: (state, action) => {
      state.internshipEmployeeCount.loading = false;
      state.internshipEmployeeCount.success = true;
      state.internshipEmployeeCount.error = null;
      state.internshipEmployeeCount.data = action.payload;
    },
    internshipEmployeeCountError: (state, action) => {
      state.internshipEmployeeCount.loading = false;
      state.internshipEmployeeCount.success = true;
      state.internshipEmployeeCount.error = action.payload;
    },
    internshipEmployeeCountReset: (state, action) => {
      state.internshipEmployeeCount.loading = false;
      state.internshipEmployeeCount.success = false;
      state.internshipEmployeeCount.error = null;
    },

    // Former Employee
    formerEmployeeCountStart: (state) => {
      state.formerEmployeeCount.loading = true;
    },
    formerEmployeeCountSuccess: (state, action) => {
      state.formerEmployeeCount.loading = false;
      state.formerEmployeeCount.success = true;
      state.formerEmployeeCount.error = null;
      state.formerEmployeeCount.data = action.payload;
    },
    formerEmployeeCountError: (state, action) => {
      state.formerEmployeeCount.loading = false;
      state.formerEmployeeCount.success = true;
      state.formerEmployeeCount.error = action.payload;
    },
    formerEmployeeCountReset: (state, action) => {
      state.formerEmployeeCount.loading = false;
      state.formerEmployeeCount.success = false;
      state.formerEmployeeCount.error = null;
    },

    // Delete Employee
    deleteEmployeeStart: (state) => {
      state.deleteEmployee.loading = true;
    },
    deleteEmployeeSuccess: (state, action) => {
      state.deleteEmployee.loading = false;
      state.deleteEmployee.success = true;
      state.deleteEmployee.error = null;
      state.deleteEmployee.data = action.payload;
    },
    deleteEmployeeError: (state, action) => {
      state.deleteEmployee.loading = false;
      state.deleteEmployee.success = true;
      state.deleteEmployee.error = action.payload;
    },
    deleteEmployeeReset: (state, action) => {
      state.deleteEmployee.loading = false;
      state.deleteEmployee.success = false;
      state.deleteEmployee.error = null;
    },

    // set all work history
    setAllWorkHistory: (state, action) => {
      state.workAllHistory.allHistory = action.payload;
    },

    // WorkHistory
    setWorkHistory: (state, action) => {
      state.workHistory = action.payload;
    },

    // WorkHistoryDuration
    setDuration: (state) => {
      state.workHistory.duration += 1;
    },

    // GetAllCategory
    getAllCategoryStart: (state) => {
      state.employeeCategory.loading = true;
    },
    getAllCategorySuccess: (state, action) => {
      state.employeeCategory.loading = false;
      state.employeeCategory.success = true;
      state.employeeCategory.data = action.payload;
    },
    getAllCategoryError: (state, action) => {
      state.employeeCategory.loading = false;
      state.employeeCategory.success = true;
      state.employeeCategory.data = action.payload;
    },
    getAllCategoryReset: (state, action) => {
      state.employeeCategory.loading = false;
      state.employeeCategory.success = false;
      state.employeeCategory.data = null;
    },
    getAttendEmployeeStart: (state) => {
      state.employeeAttance.isLoading = true;
      state.employeeAttance.saveSuccess = false;
    },
    getAttendEmployeeSuccess: (state, action) => {
      state.employeeAttance.isLoading = true;
      state.employeeAttance.data = action.payload;
      state.employeeAttance.saveSuccess = true;
    },
    saveAttendEmployeeStart: (state) => {
      state.employeeAttance.isLoading = true;
      state.employeeAttance.saveSuccess = false;
    },
    saveAttendEmployeeSuccess: (state) => {
      state.employeeAttance.isLoading = false;
      state.employeeAttance.saveSuccess = true;
    },

    // ====================Lead Section=================
    addLeadStart: (state) => {
      state.addLead.loading = true;
    },
    addLeadSuccess: (state) => {
      state.addLead.loading = false;
      state.addLead.success = true;
      state.addLead.error = null;
    },
    addLeadError: (state, action) => {
      state.addLead.loading = false;
      state.addLead.success = true;
      state.addLead.error = action.payload;
    },
    addLeadReset: (state, action) => {
      state.addLead.loading = false;
      state.addLead.success = false;
      state.addLead.error = null;
    },

    // Client Notes
    leadNoteFetch: (state, action) => {
      state.leadNote = action?.payload;
    },

    // ** add new Lead

    contactListStart: (state) => {
      state.contactList.loading = true;
    },
    contactListSuccess: (state, action) => {
      state.contactList.loading = false;
      state.contactList.success = true;
      state.contactList.error = null;
      state.contactList.data = action.payload;
    },
    contactListError: (state, action) => {
      state.contactList.loading = false;
      state.contactList.success = true;
      state.contactList.error = action.payload;
    },
    contactListReset: (state, action) => {
      state.contactList.loading = false;
      state.contactList.success = false;
      state.contactList.error = null;
    },

    // ** Total Leads
    totalLeadCountStart: (state) => {
      state.totalLeadCount.loading = true;
    },
    totalLeadCountSuccess: (state, action) => {
      state.totalLeadCount.loading = false;
      state.totalLeadCount.success = true;
      state.totalLeadCount.error = null;
      state.totalLeadCount.data = action.payload;
    },
    totalLeadCountError: (state, action) => {
      state.totalLeadCount.loading = false;
      state.totalLeadCount.success = true;
      state.totalLeadCount.error = action.payload;
    },

    // ** Total Cold  Leads
    coldLeadCountStart: (state) => {
      state.coldLeadCount.loading = true;
    },
    coldLeadCountSuccess: (state, action) => {
      state.coldLeadCount.loading = false;
      state.coldLeadCount.success = true;
      state.coldLeadCount.error = null;
      state.coldLeadCount.data = action.payload;
    },
    coldLeadCountError: (state, action) => {
      state.coldLeadCount.loading = false;
      state.coldLeadCount.success = true;
      state.coldLeadCount.error = action.payload;
    },

    // ** Total warm  Leads
    warmLeadCountStart: (state) => {
      state.warmLeadCount.loading = true;
    },
    warmLeadCountSuccess: (state, action) => {
      state.warmLeadCount.loading = false;
      state.warmLeadCount.success = true;
      state.warmLeadCount.error = null;
      state.warmLeadCount.data = action.payload;
    },
    warmLeadCountError: (state, action) => {
      state.warmLeadCount.loading = false;
      state.warmLeadCount.success = true;
      state.warmLeadCount.error = action.payload;
    },
    // ** Total Hot  Leads
    hotLeadCountStart: (state) => {
      state.hotLeadCount.loading = true;
    },
    hotLeadCountSuccess: (state, action) => {
      state.hotLeadCount.loading = false;
      state.hotLeadCount.success = true;
      state.hotLeadCount.error = null;
      state.hotLeadCount.data = action.payload;
    },
    hotLeadCountError: (state, action) => {
      state.hotLeadCount.loading = false;
      state.hotLeadCount.success = true;
      state.hotLeadCount.error = action.payload;
    },
    // ** GET Single Contact
    singleContactStart: (state) => {
      state.singleContact.loading = true;
    },
    singleContactSuccess: (state, action) => {
      state.singleContact.loading = false;
      state.singleContact.success = true;
      state.singleContact.error = null;
      state.singleContact.data = action.payload;
    },
    singleContactError: (state, action) => {
      state.singleContact.loading = false;
      state.singleContact.success = true;
      state.singleContact.error = action.payload;
    },
    // ** Update Single Contact
    contactUpdateStart: (state) => {
      state.contactUpdate.loading = true;
    },
    contactUpdateSuccess: (state, action) => {
      state.contactUpdate.loading = false;
      state.contactUpdate.success = true;
      state.contactUpdate.error = null;
    },
    contactUpdateError: (state, action) => {
      state.contactUpdate.loading = false;
      state.contactUpdate.success = true;
      state.contactUpdate.error = action.payload;
    },
    contactUpdateReset: (state, action) => {
      state.contactUpdate.loading = false;
      state.contactUpdate.success = false;
      state.contactUpdate.error = null;
    },

    // ** social Link update

    socialLeadLinkUpdateStart: (state) => {
      state.socialLinksUpdate.loading = true;
    },
    socialLeadLinkUpdateSuccess: (state, action) => {
      state.socialLinksUpdate.loading = false;
      state.socialLinksUpdate.success = true;
      state.socialLinksUpdate.error = null;
    },
    socialLeadLinkUpdateError: (state, action) => {
      state.socialLinksUpdate.loading = false;
      state.socialLinksUpdate.success = true;
      state.socialLinksUpdate.error = action.payload;
    },
    socialLeadLinkUpdateReset: (state, action) => {
      state.socialLinksUpdate.loading = false;
      state.socialLinksUpdate.success = false;
      state.socialLinksUpdate.error = null;
    },

    // ** file Add
    fileLeadAddStart: (state) => {
      state.fileAdd.loading = true;
    },
    fileLeadAddSuccess: (state, action) => {
      state.fileAdd.loading = false;
      state.fileAdd.success = true;
      state.fileAdd.error = null;
    },
    fileLeadAddError: (state, action) => {
      state.fileAdd.loading = false;
      state.fileAdd.success = true;
      state.fileAdd.error = action.payload;
    },
    fileLeadAddReset: (state, action) => {
      state.fileAdd.loading = false;
      state.fileAdd.success = false;
      state.fileAdd.error = null;
    },

    // ** file Delete
    fileLeadDeleteStart: (state) => {
      state.fileDelete.loading = true;
    },
    fileLeadDeleteSuccess: (state, action) => {
      state.fileDelete.loading = false;
      state.fileDelete.success = true;
      state.fileDelete.error = null;
    },
    fileLeadDeleteError: (state, action) => {
      state.fileDelete.loading = false;
      state.fileDelete.success = true;
      state.fileDelete.error = action.payload;
    },
    fileLeadDeleteReset: (state, action) => {
      state.fileDelete.loading = false;
      state.fileDelete.success = false;
      state.fileDelete.error = null;
    },

    // Other Add
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
    // Other Delete
    othersDeleteStart: (state, action) => {
      state.othersDelete.isLoading = true;
      state.othersDelete.isSuccess = false;
      state.othersDelete.error = null;
    },
    othersDeleteSuccess: (state, action) => {
      state.othersDelete.isLoading = false;
      state.othersDelete.isSuccess = true;
      state.othersDelete.error = null;
    },
    othersDeleteError: (state, action) => {
      state.othersDelete.isLoading = false;
      state.othersDelete.isSuccess = false;
      state.othersDelete.error = action.payload;
    },
    othersDeleteReset: (state, action) => {
      state.othersDelete.isLoading = false;
      state.othersDelete.isSuccess = false;
      state.othersDelete.error = action.payload;
    },
    // Delete Contact
    deleteLeadContactStart: (state, action) => {
      state.deleteContact.loading = true;
      state.deleteContact.success = false;
      state.deleteContact.error = null;
    },
    deleteLeadContactSuccess: (state, action) => {
      state.deleteContact.loading = false;
      state.deleteContact.success = true;
      state.deleteContact.error = null;
    },
    deleteLeadContactError: (state, action) => {
      state.deleteContact.loading = false;
      state.deleteContact.success = false;
      state.deleteContact.error = action.payload;
    },
    deleteLeadContactReset: (state, action) => {
      state.deleteContact.loading = false;
      state.deleteContact.success = false;
      state.deleteContact.error = action.payload;
    },

    // setViewGoal handler
    changeViewGoalStart: (state, action) => {
      state.viewGoalSet.isLoading = true;
      state.viewGoalSet.isSuccess = false;
    },
    changeViewGoal: (state, action) => {
      state.viewGoalSet.isLoading = false;
      state.viewGoalSet.viewGoal = action.payload;
    },
    // import handler
    importLeadProcessingStart: (state, action) => {
      state.contactUpload.fileProcessing = false;
      state.contactUpload.contacts = [];
      state.contactUpload.importing = true;
      state.contactUpload.uploadState = 'loading';
    },
    importLeadProcessingFinish: (state, action) => {
      state.contactUpload.fileProcessing = false;
      state.contactUpload.contacts = [];
      state.contactUpload.importing = false;
      state.contactUpload.uploadState = 'success';
    },
    importLeadProcessingError: (state, action) => {
      state.contactUpload.fileProcessing = false;
      state.contactUpload.contacts = [];
      state.contactUpload.importing = false;
      state.contactUpload.uploadState = 'error';
    },
    importLeadProcessingReset: (state, action) => {
      state.contactUpload.fileProcessing = false;
      state.contactUpload.contacts = [];
      state.contactUpload.importing = false;
      state.contactUpload.uploadState = 'idle';
    },
    //updateStage
    updateContactStageStart: (state, action) => {
      state.updateContactStage.loading = true;
      state.updateContactStage.success = false;
      state.updateContactStage.error = null;
    },
    updateContactStageSuccess: (state, action) => {
      state.updateContactStage.loading = false;
      state.updateContactStage.success = true;
      state.updateContactStage.error = null;
    },

    changeStateAddNew: (state, action) => {
      state.contactList.isNewContact = action.payload;
    },
    selectContactLead: (state, action) => {
      (state.selectContact.selected = action.payload), (state.selectContact.isSelected = true);
    },

    // ===============Relationship Section================

    // Member Notes
    relationNoteFetch: (state, action) => {
      state.relationNote = action?.payload;
    },

    // Delete Contact
    deleteContactStart: (state, action) => {
      state.deleteContact.loading = true;
      state.deleteContact.success = false;
      state.deleteContact.error = null;
    },
    deleteContactSuccess: (state, action) => {
      state.deleteContact.loading = false;
      state.deleteContact.success = true;
      state.deleteContact.error = null;
    },
    deleteContactError: (state, action) => {
      state.deleteContact.loading = false;
      state.deleteContact.success = false;
      state.deleteContact.error = action.payload;
    },
    deleteContactReset: (state, action) => {
      state.deleteContact.loading = false;
      state.deleteContact.success = false;
      state.deleteContact.error = action.payload;
    },

    // =========Vendor Section=========
    // Member Notes
    vendorNoteFetch: (state, action) => {
      state.vendorNote = action?.payload;
    }
  }
});
export const {
  contactsReducer,
  selectContactReducer,
  contactNoteFetch,
  allNotesReducer,
  contactFilterReducer,

  promotedClientData,
  progressionListClient,
  contactRankListSuccess,
  /**
   * ***********************  CAUTION  ***********************
   * Following code will be delete after finish refactoring.
   * Now can not delelte we should test & check the previous work and current work.
   * Thanks.
   */

  totalCountReducer,
  totalLeadsReducer,
  totalVendorsReducer,
  totalRelationshipsReducer,
  totalEmployeesReducer,
  totalMembersReducer,
  clientContactsReducer,
  leadContactsReducer,
  vendorContactsReducer,
  relationshipContactsReducer,
  employeeContactsReducer,
  memberContactsReducer,
  setTagsReducer,
  setStagesReducer,
  setLeadsReducer,
  progressionAddReducer,
  getProgressionHistoryData,
  getProgressionAllData,
  progressionFetchData,
  removeIdReducer,
  // =============Contact Field============
  getContactFieldStart,
  getContactFieldSuccess,
  getAllContactFieldStart,
  getAllContactFieldSuccess,
  // =============Reducer Client============
  // Add
  newClientContactStart,
  newClientContactSuccess,
  newClientContactFailure,
  newClientContactReset,

  // Read
  clientContactFetchStart,
  clientContactFetchSuccess,
  clientContactFetchError,
  clientContactFetchReset,
  //notes
  clientNoteFetch,
  //state
  // totalCountReducer,
  activeCountReducer,
  pastDueCountReducer,
  formerCountReducer,

  // fetch Single Client
  singleClientReducer,
  singleClientFetchStartReducer,
  singleClientFetchErrorReducer,
  singleClientFetchReset,

  // get Invoices
  getInvoicesReducer,
  getInvoicesStartReducer,
  getInvoicesErrorReducer,
  getInvoicesFetchReset,
  // contact import
  importFileProcessingStart,
  importFileProcessingFinish,
  importFileProcessingError,
  // import start
  importProcessingStart,
  importProcessingFinish,
  importProcessingError,
  importProcessingReset,
  // Edit client
  editClientStart,
  editClientSuccess,
  editClientError,

  //tags
  tagFetchingStart,
  tagFetchingSuccess,
  tagFetchingError,

  // Upload
  avatarUploadStart,
  avatarUploadSuccess,
  avatarUploadError,

  editClientReset,

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

  addOtherReset,
  // promotedClientData,
  // progressionListClient,
  promotClientProgression,

  // =============Employee Reducers=========
  // import start
  addEmployeeStart,
  addEmployeeSuccess,
  addEmployeeError,
  addEmployeeReset,
  empNoteFetch,

  // list
  EmployeeListStart,
  EmployeeListSuccess,
  EmployeeListError,
  EmployeeListReset,

  // Single Employee Fetch
  employeeByIdStart,
  employeeByIdSuccess,
  employeeByIdError,
  employeeByIdReset,

  // Single employee contact Update
  employeeUpdateIdStart,
  employeeUpdateIdSuccess,
  employeeUpdateIdError,
  employeeUpdateIdReset,

  // social link
  socialLinkUpdateStart,
  socialLinkUpdateSuccess,
  socialLinkUpdateError,
  socialLinkUpdateReset,

  // Rank Add Or Update
  rankAddNUpdateStart,
  rankAddNUpdateSuccess,
  rankAddNUpdateError,
  rankAddNUpdateReset,

  // Rank Delete
  rankDeleteStart,
  rankDeleteSuccess,
  rankDeleteError,
  rankDeleteReset,

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

  billingAddressUpdateStart,
  billingAddressUpdateSuccess,
  billingAddressUpdateError,
  billingAddressUpdateReset,

  // **

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
  deleteEmployeeReset,

  // WorkHistory
  setWorkHistory,

  // set all work history
  setAllWorkHistory,

  // WorkHistoryDuration
  setDuration,

  // Category
  getAllCategoryStart,
  getAllCategorySuccess,
  getAllCategoryError,
  getAllCategoryReset,

  // Work Attendance
  getAttendEmployeeStart,
  getAttendEmployeeSuccess,

  saveAttendEmployeeStart,
  saveAttendEmployeeSuccess,

  // ==========Lead Section=============
  // Add
  addLeadStart,
  addLeadSuccess,
  addLeadError,
  addLeadReset,

  // List fetch
  contactListStart,
  contactListSuccess,
  contactListError,
  contactListReset,
  //   Note
  leadNoteFetch,

  // Total Lead list
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
  contactUpdateReset,

  // social links
  socialLeadLinkUpdateStart,
  socialLeadLinkUpdateSuccess,
  socialLeadLinkUpdateError,
  socialLeadLinkUpdateReset,

  // ** file Delete
  fileLeadDeleteStart,
  fileLeadDeleteSuccess,
  fileLeadDeleteError,
  fileLeadDeleteReset,

  // ** file add
  fileLeadAddStart,
  fileLeadAddSuccess,
  fileLeadAddError,
  fileLeadAddReset,

  // Other
  editLeadOtherStart,
  editLeadOtherSuccess,
  editLeadOtherError,
  editLeadOtherReset,

  // fetch Single Client
  singleLeadClientReducer,
  singleLeadClientFetchStartReducer,
  singleLeadClientFetchErrorReducer,
  singleLeadClientFetchReset,

  // other
  addLeadOtherStart,
  addLeadOtherSuccess,
  addLeadOtherError,
  addLeadRankReset,

  // Delete Other
  othersDeleteStart,
  othersDeleteSuccess,
  othersDeleteError,
  othersDeleteReset,

  // Delete contact
  deleteLeadContactStart,
  deleteLeadContactSuccess,
  deleteLeadContactError,
  deleteLeadContactReset,

  // ChangeViewGoal
  changeViewGoalStart,
  changeViewGoal,

  // import start
  importLeadProcessingStart,
  importLeadProcessingFinish,
  importLeadProcessingError,
  importLeadProcessingReset,

  //updateStage
  updateContactStageSuccess,
  updateContactStageStart,
  changeStateAddNew,
  selectContactLead,

  // ===============Relationship sections===========
  //Notes
  relationNoteFetch,

  // =========Vendor Section===============
  //   venodr note fetch
  vendorNoteFetch
} = totalContacts.actions;

export default totalContacts.reducer;
