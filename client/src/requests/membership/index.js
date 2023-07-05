import { useMutation, useQuery, useQueryClient } from 'react-query'
import { customInterIceptors } from '../../lib/AxiosProvider'
import { ENDPOINTS } from '../../lib/endpoints'
import { toast } from 'react-toastify'

const API = customInterIceptors()


// // fetch membership type
async function fetchMemberTypes() {
    const { data } = await API.get(ENDPOINTS.MEMBER_TYPES)
    return data
}

export function useGetMembershipTypes() {
    return useQuery(ENDPOINTS.MEMBER_TYPES, fetchMemberTypes)
}


// // delete membership type
export async function deleteMembershipTypeRQ(id) {
    const { data } = await API.delete(ENDPOINTS.MEMBER_TYPE + id)
    if (data?.success) {
        toast.success('Membership Type Deleted Successfully')
    }
    else {
        toast.error('Unable to Delete Type')
    }
    return data
}

async function createNewMembershipTypeRQ(payload) {
    const { data } = await API.post(ENDPOINTS.CREAT_NEW_MEMBERSHIP_TYPE, payload)
    return data
}

export function useCreateNewMembershipType() {
    const queryClient = useQueryClient()
    return useMutation(createNewMembershipTypeRQ, {
        onSuccess: () => {
            toast.success('New Membership Type Created Successfully')
            queryClient.invalidateQueries(ENDPOINTS.MEMBER_TYPES)
        },
        onError: () => {
            toast.error('Unable to Create New Membership Type')
        }
    })
}

// Put Lead Position Data
export async function usePutMembershipType(id, payload) {
    const { data } = await API.put(ENDPOINTS.MEMBER_TYPE + id, payload)
    if (data) {
        toast.success("Position Edited Successfully")
    }
    return data
}

//get membership by id public
export async function getMembershipById(id){
    const {data} = await API.get(`/public_membership/${id}`);
    return data;
}

export function useGetMembershipPublic(){
    return useQuery('public_membership/',getMembershipById)
}
