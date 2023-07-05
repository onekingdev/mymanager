import { useDispatch } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';
import { toast } from 'react-toastify';
const API = customInterIceptors();

// fetch all contacts
export async function fetchContactsRQ() {
  const { data } = await API.get('/contact/get');
  return data;
}

export function useGetContactsRQ() {
  return useQuery('contacts', fetchContactsRQ);
}

// add contact query
export async function addContactsRQ(payload) {
  const { data } = await API.post('/contact/add', payload);
  return data;
}

export function useAddContacts() {
  const queryClient = useQueryClient();
  return useMutation(addContactsRQ, {
    onSuccess: () => {
      toast.success('Contact created successfully');
      queryClient.invalidateQueries('contacts');
    },
    onError: () => {
      toast.error('Unable to create new contact');
    }
  });
}

// add contact query
async function addAndUpdateContactsBulkRQ(payload) {
  const { data } = await API.post('/contact/add-update-bulk', payload);
  return data;
}

export function useAddAndUpdateContactsBulk() {
  const queryClient = useQueryClient();
  return useMutation(addAndUpdateContactsBulkRQ, {
    onSuccess: () => {
      //queryClient.invalidateQueries('contacts');
    },
    onError: () => {
      toast.error('Unable to create new contacts');
    }
  });
}

// update contact query
export async function updateContactsRQ(payload) {
  const { data } = await API.post(`/contact/update/${payload?._id}`, payload);
  return data;
}

export function useUpdateContacts() {
  const queryClient = useQueryClient();
  return useMutation(updateContactsRQ, {
    onSuccess: () => {
      toast.success('Contact updated successfully');
      queryClient.invalidateQueries('contacts');
    },
    onError: () => {
      toast.error('Unable to create new contact');
    }
  });
}

// delete contact query
async function deleteContactsRQ(payload) {
  const { data } = await API.delete(`/contact/delete`, {
    data: { source: payload }
  });
  return data;
}

export function useDeleteContacts() {
  const queryClient = useQueryClient();
  return useMutation(deleteContactsRQ, {
    onSuccess: () => {
      toast.success('Contact deleted successfully');
      queryClient.invalidateQueries('contacts');
    },
    onError: () => {
      toast.error('Unable to delete contact');
    }
  });
}

// fetch all contact types
export async function fetchContactTypesRQ() {
  // const dispatch = useDispatch();
  const { data } = await API.get('/contact-type/getByUserId');
  // await dispatch(contactsAction({ contactTypeList: data }));
  return data;
}

export function useGetContactTypesRQ() {
  return useQuery('contactTypes', fetchContactTypesRQ);
}

// add contact query
async function addContactTypeRQ(payload) {
  const { data } = await API.post('/contact-type/add', payload);
  return data;
}

export function useAddContactType() {
  const queryClient = useQueryClient();
  return useMutation(addContactTypeRQ, {
    onSuccess: () => {
      toast.success('Contact created successfully');
      queryClient.invalidateQueries('contactTypes');
    },
    onError: () => {
      toast.error('Unable to create new contact');
    }
  });
}

// update contact query
async function updateContactTypeRQ(payload) {
  const { data } = await API.post(`/contact-type/update/${payload?._id}`, payload);
  return data;
}

export function useUpdateContactType() {
  const queryClient = useQueryClient();
  return useMutation(updateContactTypeRQ, {
    onSuccess: () => {
      toast.success('Contact updated successfully');
      queryClient.invalidateQueries('contactTypes');
    },
    onError: () => {
      toast.error('Unable to create new contact');
    }
  });
}

// delete contact query
async function deleteContactTypeRQ(payload) {
  const { data } = await API.delete(`/contact-type/delete/${payload?._id}`, payload);
  return data;
}

export function useDeleteContactType() {
  const queryClient = useQueryClient();
  return useMutation(deleteContactTypeRQ, {
    onSuccess: () => {
      toast.success('Contact deleted successfully');
      queryClient.invalidateQueries('contactTypes');
    },
    onError: () => {
      toast.error('Unable to delete contact');
    }
  });
}

//add family members
export async function addFamilyMemberRQ(payload) {
  const { data } = await API.post('/contact/add-family', payload);
  return data;
}
