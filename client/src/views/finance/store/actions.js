import * as api from './api';
import { toast } from 'react-toastify';
import {
  fetchIncome,
  fetchAllCategories
} from './reducer';

//parent Income
export const IncomeFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchIncome();
    dispatch(fetchIncome(data));
  } catch (error) {}
};

export const IncomeAddAction = (IncomeData) => async (dispatch) => {
  try {
    const { data } = await api.addIncome(IncomeData);
    toast.success('Income created successfully');
    dispatch(IncomeFetchAction());
  } catch (error) {}
};

export const IncomeUpdateAction = (id,payload) => async (dispatch) => {
  try {
    const { data } = await api.updateIncome(id,payload);
    toast.success('Income created successfully');
    dispatch(IncomeFetchAction());
  } catch (error) {}
};

export const IncomeDeleteAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteIncome(id);
    toast.success('Income deleted successfully');
    dispatch(IncomeFetchAction());
  } catch (error) {}
};

export const getFinanceCategories = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllCategories();
    dispatch(fetchAllCategories(data));
  } catch (error) {}
};

export const addFinanceCategoryAction = (categoryData) => async (dispatch) => {
  try {
    const { data } = await api.addFinanceCategory(categoryData);
    dispatch(getFinanceCategories())
    toast.success("Add category successfully")
  } catch (error) {}
};

export const DeleteFinanceCategoryAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteFinanceCategory(id);
    dispatch(getFinanceCategories())
    toast.success(data.message)
  } catch (error) {}
}

export const UpdateFinanceCategoryAction = (updateData) => async (dispatch) => {
  try {
    const { data } = await api.updateFinanceCategory(updateData);
    dispatch(getFinanceCategories())
    toast.success(data.message);
    
  } catch (error) {}
}