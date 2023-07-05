import * as api from './api';
import { getSignaturesReducer, setSignatureReducer } from './reducer';

export const addSignatureInitialStampAction = (payload)=>async(dispatch)=>{
    try {
        const {data} = await api.addSignInitialStamp(payload);
        if(data){
            dispatch(setSignatureReducer(data));
            //signatureId
        }
    } catch (error) {
        
    }
}

export const getSignatureInitialStampAction = (payload)=>async(dispatch)=>{
    try {
  
        const {details} = await api.getSignatureStampInitial(payload);

        if(details){
            dispatch(getSignaturesReducer(details));
        }
    } catch (error) {
        
    }
}

export const updateSignatureInitialStampAction = (payload)=>async(dispatch)=>{
    try {
        const {data} = await api.editSignatureStampInitial(payload);
        if(data){
            //should check
          
           
            //stamp and signature and initial should be handled separately
            dispatch(getSignaturesReducer(data));
        }
    } catch (error) {
        
    }
}

export const uploadSignatureInitialStampAction = (payload)=>async(dispatch)=>{
    try {
        const {data} = await api.uploadSignatureStampInitial(payload);
        if(data){
            //should check

           
            //stamp and signature and initial should be handled separately
            dispatch(getSignaturesReducer(data));
        }
    } catch (error) {
        
    }
}

