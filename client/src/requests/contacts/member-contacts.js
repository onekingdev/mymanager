import { useMutation, useQuery, useQueryClient } from 'react-query';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';
import { toast } from 'react-toastify';

const API = customInterIceptors();

// fetch All member contacts
async function fetchMemberContactsRQ() {
  const { data } = await API.get('/member-contact/allmembers');
  return data;
}

export function useGetMemberContacts() {
  return useQuery('member-contact', fetchMemberContactsRQ);
}

// Create New Position
async function createNewPositionRQ(payload) {
  const { data } = await API.post(ENDPOINTS.ALL_MEMBERS_POSITION, payload);
  return data;
}

export function useCreateNewPosition() {
  const queryMember = useQueryClient();
  return useMutation(createNewPositionRQ, {
    onSuccess: () => {
      toast.success('Position Created Successfully');
      queryMember.invalidateQueries(ENDPOINTS.ALL_MEMBERS_POSITION);
    },
    onError: () => {
      toast.error('Unable to create new position');
    }
  });
}

// fetch member position
async function fetchMemberPositionRQ() {
  const { data } = await API.get(ENDPOINTS.ALL_MEMBERS_POSITION);
  return data;
}

export function useGetMemberPosition() {
  return useQuery('member-positions', fetchMemberPositionRQ);
}

// delete Member position List
export const deleteMemberPositionRQ = (id) => {
  const data = API.delete(ENDPOINTS.ONE_MEMBERS_POSITION + id);
  if (data) {
    toast.success('Position Delete Successfully');
  }
  return data;
};

// Put Member Position Data
export async function putMemberPositionRQ(id, payload) {
  const { data } = await API.put(ENDPOINTS.ONE_MEMBERS_POSITION + id, payload);
  if (data) {
    toast.success('Position edited successful');
  }
  return data;
}

// Create New Tag
async function createNewTagRQ(payload) {
  const { data } = await API.post(ENDPOINTS.ALL_MEMBERS_TAG, payload);
  return data;
}

export function useCreateNewTag() {
  const queryMember = useQueryClient();
  return useMutation(createNewTagRQ, {
    onSuccess: () => {
      toast.success('Tag Created Successfully');
      queryMember.invalidateQueries(ENDPOINTS.ALL_MEMBERS_TAG);
    },
    onError: () => {
      toast.error('Unable to create new tag');
    }
  });
}

// fetch member tag
async function fetchMemberTagRQ() {
  const { data } = await API.get(ENDPOINTS.ALL_MEMBERS_TAG);
  return data;
}

export function useGetMemberTag() {
  return useQuery('member-tags', fetchMemberTagRQ);
}

// delete Member tag List
export const deleteMemberTagRQ = (id) => {
  const data = API.delete(ENDPOINTS.ONE_MEMBERS_TAG + id);
  if (data) {
    toast.success('Tag Delete Successfully');
  }
  return data;
};

// Put Member Tag Data
export async function putMemberTagRQ(id, payload) {
  const { data } = await API.put(ENDPOINTS.ONE_MEMBERS_TAG + id, payload);
  if (data) {
    toast.success('Tag edited successful');
  }
  return data;
}
