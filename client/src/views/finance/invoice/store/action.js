import { toast } from 'react-toastify';
import * as api from './api';


export const getStripeConfigAction =(payload) =>async(dispatch)=>{
    try {
        const {data} = await api.getStripeConfig(payload)
        
        return data;
    } catch (error) {
        
    }
}

export const createStripePaymentIntentAction =(payload) =>async(dispatch)=>{
    try {
        const {data} = await api.createIntent(payload)
        return data;
    } catch (error) {
        
    }
}

export const addPaymentToInvoiceAction =(id,payload) =>async(dispatch)=>{
    try {
        const {data} = await api.updateInvoicePayment(id,payload)
        if(data){
            toast.success("payment done successfully!")
        }
    } catch (error) {
        
    }
}