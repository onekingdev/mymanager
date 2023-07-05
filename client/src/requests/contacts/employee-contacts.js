import { useMutation, useQuery, useQueryClient } from 'react-query';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { ENDPOINTS } from '../../lib/endpoints';
import { toast } from 'react-toastify';

const API = customInterIceptors();

//add new position
// export function useCreateNewEmployeePosition() {
//     const queryClient = useQueryClient()
//     return useMutation(createNewEmployeePositionRQ, {
//         onSuccess: () => {
//             toast.success('Position Created Successfully')
//             queryClient.invalidateQueries(ENDPOINTS.ALL_EMPLOYEE_POSITION)
//         },
//         onError: () => {
//             toast.error('Unable to create new position')
//         }
//     })
// }

// Create New Position

async function createNewPositionRQ(payload) {
  const { data } = await API.post(ENDPOINTS.CREATE_NEW_EMPLOYEE_POSITION, payload);
  return data;
}

export function useCreateNewPosition() {
  const queryClient = useQueryClient();
  return useMutation(createNewPositionRQ, {
    onSuccess: () => {
      toast.success('Position Created Successfully');
      queryClient.invalidateQueries(ENDPOINTS.ALL_CLIENT_POSITION);
    },
    onError: () => {
      toast.error('Unable to create new position');
    }
  });
}

// fetch client position
async function fetchEmployeePositionRQ() {
  const { data } = await API.get(ENDPOINTS.ALL_EMPLOYEE_POSITION);
  return data;
}

export function useGetEmployeePosition() {
  return useQuery('employee-positions', fetchEmployeePositionRQ);
}

// fetch employees
async function fetchAllEmployeesRQ() {
  const { data } = await API.get(ENDPOINTS.ALL_EMPLOYEES);
  return data;
}

export function useGetAllEmployees() {
  return useQuery('employee-contacts', fetchAllEmployeesRQ);
}

// delete Client position List
export const deleteEmployeePositionRQ = (id) => {
  return API.delete(ENDPOINTS.ONE_EMPLOYEE_POSITION + id);
};

// Edit Employee Position Data
export async function usePutEmployeePosition(id, payload) {
  const { data } = await API.put(ENDPOINTS.ONE_EMPLOYEE_POSITION + id, payload);
  if (data) {
    toast('Position Edited Successfully!');
  }
  return data;
}

// fetch roles
async function fetchAllRoleRQ() {
  const { data } = await API.get(ENDPOINTS.ALL_ROLES);
  return data;
}

export function useGetAllRole() {
  return useQuery('roles', fetchAllRoleRQ);
}

// Shifts
// Create New Shift

async function createNewShiftRQ(payload) {
  const { data } = await API.post(ENDPOINTS.EMPLOYEE_SHIFT, payload);
  return data;
}

export function useCreateNewShift() {
  const queryClient = useQueryClient();
  return useMutation(createNewShiftRQ, {
    onSuccess: () => {
      toast.success('Shift Created Successfully');
      queryClient.invalidateQueries(ENDPOINTS.ALL_CLIENT_POSITION);
    },
    onError: () => {
      toast.error('Unable to create new position');
    }
  });
}

// fetch shift position
async function fetchEmployeeShiftRQ() {
  const { data } = await API.get(ENDPOINTS.EMPLOYEE_SHIFT);
  return data;
}

export function useGetEmployeeShifts() {
  return useQuery('employee-shifts', fetchEmployeeShiftRQ);
}

// delete Client position List
export const deleteEmployeeShiftRQ = (id) => {
  return API.delete(ENDPOINTS.EMPLOYEE_SHIFT + id);
};

// Edit Shift
export async function usePutEmployeeShift(id, payload) {
  const { data } = await API.put(ENDPOINTS.EMPLOYEE_SHIFT + id, payload);
  if (data) {
    toast('Shift Edited Successfully!');
  }
  return data;
}
