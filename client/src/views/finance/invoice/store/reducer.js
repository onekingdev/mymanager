import { createSlice } from "@reduxjs/toolkit";

export const userInvoice = createSlice({
    name:'userInvoice',
    initialState:{
        invoiceList:[]
    },
    reducers:{
        setInvoiceListReducer:(state,action) =>{
            state.invoiceList = action?.payload
        }
    }
});
export const {
    setInvoiceListReducer
} = userInvoice.actions;

export default userInvoice.reducer;