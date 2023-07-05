import { useMutation, useQuery, useQueryClient } from 'react-query';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { toast } from 'react-toastify';

const API = customInterIceptors();

const getStripeConfig = ()=>{
    return API.get('/payment/stripe/config')
}
export const useGetStripeConfig = ()=>{
    //const {data,error} = 
    return useQuery('stripeConfig',getStripeConfig,{ 
        refetchOnWindowFocus: false 
    })
}

const createIntent =(payload)=>{
    return API.post('/payment/stripe/payment-intent',payload)
}

export const useCreateIntent = ()=>{
    return useMutation(createIntent,{
        onSuccess:(data)=>{
            return data
        },
        onError:()=>{
            toast.error('An Error occured. Please try again')
        }
    })
}

export const createCustomer = (payload) =>{
    //payload = {name,email} || null
    return API.post('/payment/stripe/customer',payload)
}

export const useCreateCustomer = ()=>{
    return useMutation(createCustomer,{
        onSuccess:(data)=>{
            return data
        },
        onError:()=>{
            toast.error('An Error occured. Please try again')
        }
    })
    
}

export const createSubscription = (payload) =>{
    //payload={customerId,priceId}
    return API.post('/payment/stripe/subscription',payload)
}

export const useCreateSubscription = () =>{
    return useMutation(createSubscription,{
        onSuccess:(data)=>{
            return data
        },
        onError:()=>{
            toast.error('An Error occured. Please try again')
        }
    })
    
}



