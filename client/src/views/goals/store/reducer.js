import { createSlice } from "@reduxjs/toolkit";
import { goals } from "./data";

const myGoals = createSlice({
    name:"myGoals",
    initialState:{
        goals:goals,
   

    },
    reducers:{
        setGoalsReducer:(state,action) =>{
            state.goals = action?.payload
        },
        


    }
})
export const{
    setGoalsReducer,
} = myGoals.actions;
export default myGoals.reducer;