import { createSlice } from "@reduxjs/toolkit";

export const organizations = createSlice({
    name:'organizations',
    initialState:{
        myOrgs:[
        ],
        plans:[],
        elements:[]

    },
    reducers:{
        setOrgs: (state,action) =>{
            state.myOrgs = action?.payload
        },
        setPlans:(state,action) =>{
            state.plans = action?.payload
        },
        setElements:(state,action)=>{
            state.elements = action?.payload
        }
        
    }
})

export const {setOrgs,setPlans,setElements} = organizations?.actions

export default organizations.reducer


// {
//     name:'',
//     email:'',
//     contact:'',
//     address:'',
//     url:'',
//     isVerified:false
//     totals:{
//         users:0,
//     }
// }