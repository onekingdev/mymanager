import { customInterIceptors } from '../../../lib/AxiosProvider';

const API = customInterIceptors();

export const addIncome = (incomeData) => {
  return API.post('/income', incomeData);
};

export const updateIncome = (id,payload) => {
  return API.patch(`/income/${id}`, payload);
};

export const deleteIncome = (id) => {
  return API.delete('income/' + id)
}

export const duplicateIncome = (id) => {
  return API.post('income/duplicate/' + id)
}

export const fetchIncome = () => {
  return API.get('income');
};

export const fetchAllCategories = () => {
  return API.get('finance-category');
};

export const addFinanceCategory = (data) => {
  return API.post('finance-category', data);
};

export const deleteFinanceCategory = (id) => {
  return API.delete('finance-category/' + id)
}

export const updateFinanceCategory = ({id, data}) => {
  return API.put(`finance-category/${id}`, { data })
}

export const addExpense = (expenseData) => {
  return API.post('expense', expenseData, { 'Content-Type': 'multipart/form-data' });
};

export const deleteExpense = (id) => {
  return API.delete('expense/' + id)
}

export const duplicateExpense = (id) => {
  return API.post('expense/duplicate/' + id)
}

export const fetchExpense = () => {
  return API.get('expense');
};

//invoice
export const createInvoice = (payload) => {
  return API.post('/invoice', payload);
};
