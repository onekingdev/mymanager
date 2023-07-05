import { toast } from 'react-toastify';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';

const API = customInterIceptors();
export async function createAddCampaign(campaignName) {
  try {
    const response = await API.post(ENDPOINTS.CREATE_ADD_CAMPAIGN, campaignName);
    if (response?.status === 200) {
      toast.success('Add New campaign created successfully!');
      return response;
    } else {
      toast.error('Failed to create a project!');
      return response;
    }
  } catch (error) {
    toast.error('Please try again later');
  }
}

export async function createMyGoal(formData) {
  try {
    const response = await API.post(ENDPOINTS.CREATE_ADD_GOAL, formData);
    if (response?.status === 200) {
      toast.success('Add New goal created successfully!');
      return response;
    } else {
      toast.error('Failed to create goal!');
      return response;
    }
  } catch (error) {
    toast.error('Please try again later');
  }
}

export async function getMyGoalsCategory() {
  const goalCategory = await API.get(ENDPOINTS.GET_CATEGORY);
  return goalCategory;
}

export async function getMyGoalList() {
  const goalLIST = await API.get(ENDPOINTS.GET_GOALLIST);
  return goalLIST;
}

export async function notificationData(formData) {
  const response = await API.post(ENDPOINTS.ADD_NOTIFICATION, formData);
  return response;
}
export async function addDisplayUrl(url) {
  try {
    const urlData = await API.post(ENDPOINTS.ADD_DISPLAY_URL, url);
    if (urlData?.status === 200) {
      toast.success('Add New Display Url created successfully!');
      return urlData;
    } else {
      toast.error('Failed to Add Display Url!');
      return response;
    }
  } catch (error) {
    toast.error('Please try again later');
  }
}
export async function getDisplayUrlList() {
  const displayUrlList = await API.get(ENDPOINTS.DISPLAY_URLLIST);
  return displayUrlList;
}
// delete display
export async function deleteDisplay(id) {
  const { data } = await API.delete(ENDPOINTS.DELETE_DISPLAY + id);
  return data;
}

export async function getCampaignList() {
  const campaignlList = await API.get(ENDPOINTS.GET_CAMPAIGN_LIST);
  return campaignlList;
}

// delete campaign
export async function deleteCampaign(id) {
  const { data } = await API.get(ENDPOINTS.DELETE_CAMPAIGN + id);
  return data;
}
// edit campaign
export async function editCampaign(id) {
  const { data } = await API.post(ENDPOINTS.EDIT_CAMPAIGN + id);
  return data;
}
// delete goal
export async function deleteGoal(id) {
  const { data } = await API.get(ENDPOINTS.DELETE_GOAL + id);
  return data;
}

//** view one goal
export async function viewOnegoal(payload) {
  const { data } = await API.get(ENDPOINTS.GOAL_VIEW_ONE + payload);
  return data;
}

// update goal
export async function editGoalData(payload, id) {
  try {
    const { data } = await API.post(ENDPOINTS.UPDATE_GOAL + id, payload);
    if (urlData?.status === 200) {
      toast.success('Goal updated successfully!');
      return data;
    }
  } catch (err) {
    toast.error('ERROR: An error occured! Please try again ');
  }
}

// ADD_RECENTLY_ACTIVITY
export async function AddRecentlyActivity(payload) {
  try {
    const response = await API.post(ENDPOINTS.ADD_RECENTLY_ACTIVITY, payload);
    if (response?.status === 200) {
      toast.success('Add Recently Activity created successfully!');
      return response;
    } else {
      toast.error('Failed to create a project!');
      return response;
    }
  } catch (error) {
    toast.error('Please try again later');
  }
}
