import { toast } from 'react-toastify';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';

const API = customInterIceptors();

export async function getOnboardingStatus() {
  const { data } = await API.get(`${ENDPOINTS.GET_ONBOARDING_STATUS}`);
  return data;
}
