import { toast } from 'react-toastify';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';

const API = customInterIceptors();
export async function getMyjournalList() {
  const { data } = await API.get('/myjournal/');
  return data;
}

export async function getJournalListById(id) {
  const { data } = await API.get(`/myjournal//${id}`);
  return data;
}

export async function deleteJournalListById(id) {
  const { data } = await API.delete(`/myjournal/${id}`);
  return data;
}
export async function deleteJournalCategory(id) {
  const { data } = await API.delete(`${ENDPOINTS.DELETE_JOURNAL_CATEGORY}/${id}`);
  return data;
}

export async function getOneJournalListById(id) {
  const { data } = await API.get(`${ENDPOINTS.GET_ONE_MY_JOURNAL}/${id}`);
  return data;
}
export async function getDateJournalData(date) {
  const { data } = await API.get(`${ENDPOINTS.CALENDER_JOURNAL}/${date}`);
  return data;
}

export async function createMyJournal(payload) {
  const { data } = await API.post(ENDPOINTS.CREATE_MY_JOURNAL, payload);
  if (data?.success) {
    toast.success('New category created successfully');
    return data;
  } else {
    toast.error('Unable to created');
  }
}
export async function editMyJournals(id, payload) {
  const { data } = await API.put(`${ENDPOINTS.UPDATE_JOURNAL_CATEGORY}/${id}`, payload);
  if (data?.success) {
    toast.success('Category is edited successfully');
    return data;
  } else {
    toast.error('Unable to Edit');
  }
}

export async function createMyJournalById(formData) {
  const { data } = await API.post(ENDPOINTS.CREATE_MY_JOURNAL_BY_ID, formData);
  if (data?.success) {
    toast.success('Journal entry updated successfully');
    return data;
  } else {
    toast.error('Unable to created');
  }
}

export async function updateMyJournal({ id, formData }) {
  const { data } = await API.post(ENDPOINTS.UPDATE_MY_JOURNAL + id, formData);
  if (data?.success) {
    toast.success('Journal list created successfully');
    return data;
  } else {
    toast.error('Unable to created');
  }
}

export async function getJournalCalenderList() {
  const { data } = await API.get(ENDPOINTS.CALENDER_LIST);
  return data;
}
