import {
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
  updateStatusReducer,
  saveAutomation,
  setDetailAction,
  setInitDetailId,
  updateActions,
  setEditAction,
  setEditType,
  initEdit

} from './reducer';
import * as api from './api';
import { toast } from 'react-toastify';

export const updateAutomation = (newAutomation) => async (dispatch) => {
  try {
    dispatch(updateSelectedAutomation(newAutomation));
  } catch (error) { }
};

export const setAddNewTypeAndIndex = (newType) => async (dispatch) => {
  try {
    dispatch(addNewType(newType));
  } catch (error) { }
};

export const addNewAction = (insertData) => async (dispatch) => {
  try {
    // console.log(insertData)
    dispatch(addNewActionToSchedule(insertData));
  } catch (error) { }
};

export const setAutomationDataList = (data) => async (dispatch) => {
  try {
    dispatch(setAllData(data));
  } catch (error) { }
};

export const setEditAutomation = (id) => async (dispatch) => {
  try {
    await dispatch(setEdit(id));
  } catch (error) { }
};

export const setNewAutomation = () => async (dispatch) => {
  try {
    dispatch(setAddNewAutomation());
  } catch (error) { }
};

export const getSmartList = () => async (dispatch) => {
  try {
    const data = await api.getSmartList();
    if (data.status == 200) {
      dispatch(setSmartList(data.data.data));
    } else {
      toast(data.msg);
    }
  } catch (error) { }
};

export const setContactInfo = (contactInfo) => async (dispatch) => {
  try {
    // console.log("this is dat in action", contactInfo)
    dispatch(setcontactInfo(contactInfo.contactInfo));
    dispatch(setcontactTime(contactInfo.activatetime));
    dispatch(setcontactUpon(contactInfo.activationupon));


  } catch (error) { }
};

export const setOffEditableContactAction = () => async (dispatch) => {
  try {
    dispatch(setOffEditableContact())

  } catch (error) {

  }
};

export const setOnEditableContactAction = () => async (dispatch) => {
  try {
    dispatch(setOnEditableContact())
  } catch (error) {

  }
};

export const setOnShowAddNewActionSideBarAction = () => async (dispatch) => {
  try {
    dispatch(setOnShowNewActionSideBar())
  } catch {

  }
};

export const setOffShowAddNewActionSideBarAction = () => async (dispatch) => {
  try {
    dispatch(setOffShowNewActionSideBar())
  } catch {

  }
};

export const setAddedParentAction = (parent) => async (dispatch) => {
  try {
    dispatch(setAddedParent(parent))
  } catch (error) {

  }
};

export const updateParentUpdateIsLast = (parentId) => async (dispatch) => {
  try {
    dispatch(updateParentIsLast(parentId))
  } catch (error) {

  }
};

export const updateChildParentIdAction = (idDatas) => async (dispatch) => {
  try {
    dispatch(updateChildParentId(idDatas))
  } catch (error) {

  }
};

export const setSelectedAutomationAction = (automationData) => async (dispatch) => {
  try {
    dispatch(setSelectedAutomation(automationData))
  } catch (error) {

  }
};

export const setActions = (actions) => async (dispatch) => {
  try {
    dispatch(setActionReducer(actions))
  } catch (error) {

  }
};

export const uploadFileAction = (form) => async (dispatch) => {
  try {
    const data = await api.fileUpload(form);
    return data
  } catch (error) {

  }
};

export const saveAutomationAction = (saveData) => async (dispatch) => {
  try {
    const data = await api.saveAutomation(saveData);
    if (data.status == 200) {
      const allAutomations = await api.getAll();
      if (allAutomations.status == 200 && allAutomations.data.success == true) {
        dispatch(setAllData(allAutomations.data.data))
      }
      toast('Successfully saved!');
    } else {
      toast(data.msg);
    }
  } catch (error) {

  }
};

export const getAllAutomations = () => async (dispatch) => {
  try {
    const allAutomations = await api.getAll();
    if (allAutomations.status == 200 && allAutomations.data.success == true) {
      dispatch(setAllData(allAutomations.data.data))
    }

  } catch (error) {

  }
}

export const changeStatusAction = (id) => async (dispatch) => {
  try {
    const updatedAutomation = await api.changeStatus(id);
    const allAutomations = await api.getAll();
    if (allAutomations.status == 200 && allAutomations.data.success == true) {
      dispatch(setAllData(allAutomations.data.data))
    }
    toast('Changed status successfully')
  } catch (error) {

  }
}

export const deleteAutomationAction = (id) => async (dispatch) => {
  try {
    const updatedAutomation = await api.deleteAutomation(id);
    const allAutomations = await api.getAll();
    if (allAutomations.status == 200 && allAutomations.data.success == true) {
      dispatch(setAllData(allAutomations.data.data))
    }
    toast('Successfully deleted!')
  } catch (error) {

  }
}

export const setDetailId = (id) => async (dispatch) => {
  try {
    dispatch(setDetailAction(id))
  } catch (error) {

  }
}

export const initDetailId = () => async (dispatch) => {
  try {
    dispatch(setInitDetailId())
  } catch (error) {

  }
}

export const setUpdateActions = (updatedActions) => async (dispatch) => {
  try {
    dispatch(updateActions(updatedActions))
  } catch (error) {

  }
}

export const setEditActionId = (id) => async (dispatch) => {
  try {
    dispatch(setEditAction(id))
  } catch (error) {

  }
}

export const setEditActionType = (type) => async (dispatch) => {
  try {
    dispatch(setEditType(type));
  } catch (error) {

  }
}

export const initEditAction = () => async (dispatch) => {
  try {
    dispatch(initEdit());
  } catch (error) {

  }
}

export const getPhoneNum = (id) => async (dispatch) => {
  try {
    const phoneNums = await api.getPhones(id);
  } catch (error) {

  }
}