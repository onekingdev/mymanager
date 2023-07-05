import { customInterIceptors } from "../../../../lib/AxiosProvider";


const API  = customInterIceptors();

export async function getJournals() {
    const { data } = await API.get('/myjournal/');
    return data;
}

export async function getJournalById(id) {
    const { data } = await API.get(`/myjournal//${id}`);
    return data;
}

export async function deleteJournal(id) {
    const { data } = await API.delete(`/myjournal/${id}`);
    return data;
}

export async function editJournal(id,payload) {
    const { data } = await API.put(`/myjournal/${id}`,payload);
    return data;
}
export async function addJournal(payload) {
    const { data } = await API.post(`/myjournal/`,payload);
    return data;
}

export async function addJournalCategory(payload) {
    const { data } = await API.post(`/myjournal-category/`,payload);
    return data;
}

export async function getJournalCategories() {
    const { data } = await API.get('/myjournal-category/');
    return data;
}

export async function getJournalCategory(id) {
    const { data } = await API.get(`/myjournal-category/${id}`);
    return data;
}

export async function deleteJournalCategory(id) {
    const { data } = await API.delete(`/myjournal-category/${id}`);
    return data;
}

export async function editJournalCategory(id,payload) {
    const { data } = await API.put(`/myjournal-category/${id}`,payload);
    return data;
}
