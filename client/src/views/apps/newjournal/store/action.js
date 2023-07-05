import * as api from './api';
import { toast } from 'react-toastify';
import { journalCategoriesReducer, journalListReducer } from './reducer';

export const getJournalListAction = () => async (dispatch) => {
  try {
    const  data  = await api.getJournals();
    console.log(data);
    dispatch(journalListReducer(data));
  } catch (error) {}
};

export const getJournalByIdAction = (id) => async (dispatch) => {
  try {
    const  data  = await api.getJournalById(id);
    console.log(data);
    return data;
  } catch (error) {}
};

export const addJournalAction = ( payload) => async (dispatch) => {
  try {
    const data  = await api.addJournal( payload);

    console.log(data);
    if (data) {
      toast.success('Journal Edited Successfully');
      dispatch(getJournalListAction())
      dispatch(getJournalCategoriesAction())
    }
  } catch (error) {}
};


export const editJournalAction = (id, payload) => async (dispatch) => {
  try {
    const data  = await api.editJournal(id, payload);
    console.log(data);
    if (data) {
      toast.success('Journal Edited Successfully');
    }
  } catch (error) {}
};

export const deleteJournalAction = (id) => async (dispatch) => {
  try {
    const  data  = await api.deleteJournal(id);
    if (data) {
      dispatch(getJournalListAction());
      toast.success('Journal Deleted Successfully');
    }
    console.log(data);
  } catch (error) {}
};

export const getJournalCategoriesAction = () => async (dispatch) => {
    try {
      const data  = await api.getJournalCategories();
      dispatch(journalCategoriesReducer(data));
    } catch (error) {}
  };
  
  export const getJournalCategoryByIdAction = (id) => async (dispatch) => {
    try {
      const  data  = await api.getJournalCategory(id);
      console.log(data);
      return data;
    } catch (error) {}
  };
  
  export const editJournalCategoryAction = (id, payload) => async (dispatch) => {
    try {
      const data  = await api.editJournalCategory(id, payload);
      console.log(data);
      if (data) {
        dispatch(getJournalCategoriesAction());
        toast.success('Journal Category Edited Successfully');
      }
    } catch (error) {}
  };
  
  export const deleteJournalCategoryAction = (id) => async (dispatch) => {
    try {
      const data  = await api.deleteJournalCategory(id);
      if (data) {
        dispatch(getJournalCategoriesAction());
        toast.success('Journal Category Deleted Successfully');
      }
      console.log(data);
    } catch (error) {}
  };
  export const addJournalCategoryAction = ( payload) => async (dispatch) => {
    try {
      const data  = await api.addJournalCategory( payload);
  
      console.log(data);
      if (data) {
        toast.success('Journal Category added Successfully');
        dispatch(getJournalCategoriesAction())
      }
    } catch (error) {}
  };
