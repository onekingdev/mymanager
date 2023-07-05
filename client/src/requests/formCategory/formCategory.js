import { toast } from 'react-toastify';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';

const API = customInterIceptors();

export async function getFormCategories() {
    const { data } = await API.get(ENDPOINTS.FORM_CATEGORY);
    return data;
}

export async function createFormCategory(payload) {
    const { data } = await API.post(ENDPOINTS.FORM_CATEGORY, payload);
    if (data?.success) {
        toast.success('New category created successfully');
        return data;
    } else {
        toast.error('Unable to created');
    }
}

export async function updateFormCategory(payload) {
    const { data } = await API.put(`${ENDPOINTS.FORM_CATEGORY}`, payload);
    if (data?.success) {
        toast.success('Category updated successfully');
        return data;
    } else {
        toast.error('Unable to updated');
    }
}

export async function deleteFormCategory(id) {
    const { data } = await API.delete(`${ENDPOINTS.FORM_CATEGORY}/${id}`);
    if (data?.success) {
        toast.success('Category deleted successfully');
        return data;
    } else {
        toast.error('Unable to deleted');
    }
}
  