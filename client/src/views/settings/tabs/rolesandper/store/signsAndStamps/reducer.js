import { createSlice } from "@reduxjs/toolkit";

export const userSignatureStampInitial = createSlice({
    name:'userSignatureStampInitial',
    initialState:{
        signatures:[],
        signature:{},
        stamp:{},
        stamps:[],
        signatureId:''
    },
    reducers:{
        getSignaturesReducer:(state,action) =>{
            state.signatures = action?.payload
            // state.stamps = action?.payload?.stamps
            // state.signatureId = action?.payload?._id
        },
        setSignatureReducer:(state,action)=>{
            state.signature = action?.payload
        },
        setStampReducer:(state,action) =>{
            state.stamp = action?.payload
        },
        setStampsReducer:(state,action)=>{
            state.stamps = action?.payload
        },
        setSignaturesReducer:(state,action)=>{
            state.signatures = action?.payload
        },
    }
})

export const {
    getSignaturesReducer,
    setSignatureReducer,
    setStampsReducer,
    setSignaturesReducer
} = userSignatureStampInitial.actions;

export default userSignatureStampInitial.reducer;