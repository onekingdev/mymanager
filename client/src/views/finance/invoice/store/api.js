import { customInterIceptors } from "../../../../lib/AxiosProvider";

const API = customInterIceptors();
export const getStripeConfig = (payload)=>{
    return API.get('/payment/stripe/config',{params:payload})
}
export const createIntent =(payload)=>{
    return API.post('/payment/stripe/payment-intent',payload)
}

export const updateInvoicePayment =(id,payload)=>{
    return API.put(`/invoice/${id}`,payload)
}