import { createSlice } from "@reduxjs/toolkit";

export const shops = createSlice({
    name:'shops',
    initialState:{
        shop:{
            name:'',
            description:'',
            bannerUrl:'',
            logoUrl:'',
            faq:[]
        },
        membershipTypes:[],
        memberships:[],
        products:[],
        productBrands:[],
        productCategories:[],
        cart:{},
        favorites:{},
        productSales:[],
        membershipSales:[],
        courses:[],

    },
    reducers:{
        setShopReducer:(state,action) =>{
            state.shop = action?.payload
        },
        setProductsReducer:(state,action) =>{
            state.products = action?.payload
        },
        setProductBrandsReducer:(state,action) =>{
            state.productBrands = action?.payload
        },
        setProductCategoriesReducer:(state,action) =>{
            state.productCategories = action?.payload
        },
        setCartReducer:(state,action)=>{
            state.cart = action?.payload
        },
        setFavoriteReducer:(state,action)=>{
            state.favorites = action?.payload
        },
        setProductSalesReducer:(state,action)=>{
            state.productSales= action?.payload
        },
        setMembershipTypesReducer:(state,action)=>{
            state.membershipTypes = action?.payload
        },
        setMembershipsReducer:(state,action)=>{
            state.memberships = action?.payload
        },
        setMembershipSalesReducer:(state,action)=>{
            state.membershipSales= action?.payload
        },
        setCoursesReducer:(state,action) =>{
            state.courses = action?.payload
        },
    }
});

export const {
    setShopReducer,
    setProductsReducer,
    setProductBrandsReducer,
    setProductCategoriesReducer,
    setCartReducer,
    setMembershipTypesReducer,
    setFavoriteReducer,
    setProductSalesReducer,
    setMembershipsReducer,
    setMembershipSalesReducer,
    setCoursesReducer,
} = shops.actions;

export default shops.reducer;