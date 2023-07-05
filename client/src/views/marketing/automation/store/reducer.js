import { createSlice } from '@reduxjs/toolkit';

export const automation = createSlice({
  name: 'automation',
  initialState: {
    allAutomations: [],
    smartlist: [],
    selectedAutomation: {
      _id: '',
      automationName: '',
      contactInfo: {},
      activationUpon: {},
      activateTime: {},
      actions: [],
      isActive: false,
      userName: '',
      userEmail: '',
      userPhone: ''
    },
    isLoading: false,
    isEdit: false,
    addNewType: null,
    isNew: false,
    isEditContact: false,
    showAddNewSideBar: false,
    addedParent: {},
    showDetailId: '',
    editActionId: '',
    isEditModal: false,
    editActionType: ''
  },
  reducers: {
    updateSelectedAutomation: (state, action) => {
      state.selectedAutomation = action.payload;
    },

    addNewType: (state, action) => {
      state.addNewType = action.payload;
    },

    addNewActionToSchedule: (state, action) => {
      state.selectedAutomation.actions.push(action.payload);
    },

    setDetailAction: (state, action) => {
      state.showDetailId = action.payload;
    },

    setAllData: (state, action) => {
      state.allAutomations = action.payload;
    },

    setEdit: (state, action) => {
      state.selectedAutomation = state.allAutomations.find((item) => item._id == action.payload);
      state.isEdit = true;
      state.isNew = false;
    },

    setSmartList: (state, action) => {
      state.smartlist = action.payload;
    },

    setAddNewAutomation: (state) => {
      state.selectedAutomation = {
        id: '',
        automationName: '',
        contactInfo: {},
        activationUpon: {},
        activateTime: {},
        actions: [],
        isActive: false
      };
      state.isEdit = true;
    },

    setcontactInfo: (state, action) => {

      state.selectedAutomation.contactInfo = action.payload;
    },

    setcontactTime: (state, action) => {
      state.selectedAutomation.activateTime = action.payload
    },
    setcontactUpon: (state, action) => {
      state.selectedAutomation.activationUpon = action.payload
    },

    setOffEditableContact: (state) => {
      state.isEditContact = false
    },

    setOnEditableContact: (state) => {
      state.isEditContact = true
    },

    setOnShowNewActionSideBar: (state) => {
      state.showAddNewSideBar = true;
    },

    setOffShowNewActionSideBar: (state) => {
      state.showAddNewSideBar = false;
    },

    setAddedParent: (state, action) => {
      state.addedParent = action.payload
    },

    updateParentIsLast: (state, action) => {
      const parentIndex = state.selectedAutomation.actions.findIndex(item => item.id == action.payload);
      state.selectedAutomation.actions[parentIndex].isLast = false
    },

    updateChildParentId: (state, action) => {
      const childIndex = state.selectedAutomation.actions.findIndex(item => item.parentId = action.payload.current);
      // state.selectedAutomation.actions[childIndex].parentId = action.payload.update
    },

    setSelectedAutomation: (state, action) => {
      state.selectedAutomation = action.payload
    },

    setActionReducer: (state, action) => {
      state.selectedAutomation.actions = action.payload
    },
    saveAutomation: (state, action) => {
      state.allAutomations.push(action.payload)
    },

    setInitDetailId: (state, action) => {
      state.showDetailId = "";
    },

    updateActions: (state, action) => {
      state.selectedAutomation.actions = action.payload;
      state.showDetailId = "";
    },

    setEditAction: (state, action) => {
      state.editActionId = action.payload;
      state.isEditModal = true;
      state.showDetailId = "";
    },

    setEditType: (state, action) => {
      state.editActionType = action.payload;
    },

    initEdit: (state, action) => {
      state.editActionType = '';
      state.isEditModal = false
    }
  }
});


export const {
  updateSelectedAutomation,
  addNewType,
  addNewActionToSchedule,
  setAllData,
  setEdit,
  setAddNewAutomation,
  setSmartList,
  setcontactInfo,
  setOffEditableContact,
  setOnEditableContact,
  setOnShowNewActionSideBar,
  setOffShowNewActionSideBar,
  setAddedParent,
  setcontactTime,
  setcontactUpon,
  updateParentIsLast,
  updateChildParentId,
  setSelectedAutomation,
  setActionReducer,
  saveAutomation,
  setDetailAction,
  setInitDetailId,
  updateActions,
  setEditAction,
  setEditType,
  initEdit
} = automation.actions;

export default automation.reducer;
