import { customInterIceptors } from "../../../lib/AxiosProvider";
const API = customInterIceptors();

//shop api
export const createShop = (payload) =>{
    return API.post('/shop/',payload)
}
export const getShopByUser = () =>{
    return API.get('/shop/')
}
export const getShopByPath = (path) =>{
    return API.get(`/shop/get/${path}`)
}
export const updateShop = (id,payload) =>{
    return API.put(`/shop/${id}`,payload)
}
export const checkShopPath = (path) =>{
    return API.get(`/shop/check-shop-path/${path}`)
}
export const addFaq = (id,payload) =>{
    return API.put(`/shop/faq/${id}`,payload)
}
export const deleteFaq = (id,payload) =>{
    return API.put(`/shop/faq/delete/${id}`,payload)
}

//product api
export const createProduct = (shopId,payload) =>{
    return API.post(`/product/${shopId}`,payload)
}
export const getProduct = (shopPath,productPath) =>{
    return API.get(`/product/details`,{params:{shopPath:shopPath,productPath:productPath}})
}
export const getProductsList = (payload) =>{
    return API.get(`/product`,{params:payload})
}
export const updateProduct = (productId,payload) =>{
    return API.put(`/product/${productId}`,payload)
}

//product brand
export const createProductBrand = (payload) =>{
    return API.post(`/product-brand/`,payload)
}
export const getProductBrands = (shopId) =>{
    return API.get(`/product-brand/${shopId}`)
}

//product category
export const createProductCategory = (payload) =>{
    return API.post(`/product-category/`,payload)
}
export const getProductCategory = (shopId) =>{
    return API.get(`/product-category/${shopId}`)
}

//cart api
export const addToCart = (payload)=>{
    return API.post('/cart/add-to-cart',payload)
}

export const getCart = (id)=>{
    return API.get(`/cart/${id}`)
}

export const deleteFromCart = (id,payload) =>{
    return API.post(`/cart/delete-from-cart/${id}`,payload) //payload item. _id
}

//product purchase
export const productBuySuccess = (payload)=>{
    return API.post('/product-buy',payload)
}
export const productSales = (shopId) =>{
    return API.get(`/product-buy/${shopId}`)
}
export const updateProductBuy = (id,payload) =>{
    return API.put(`/product-buy/${id}`,payload)
}

//product favorites
export const addProductToFavorite = (payload) =>{
    return API.post('/product-favorite',payload)
}
export const deleteProductFromFavorite = (payload)=>{
    return API.put(`/product-favorite/`,payload)
}
export const getMyFavoriteProducts = (id)=>{
    return API.get(`/product-favorite/${id}`)
}

// ** MEMBERSHIPS

//membership
export const getMemberships = (payload)=>{
    return API.get(`/membership/`,{params:payload}) //permission, shopId
}
export const getMembership = (payload)=>{ 
    return API.get(`/membership/details`,{params:payload}) //shopPath, membershipPath
}

export const addMembership = (payload)=>{
    return API.post(`/membership/`,payload) 
}
export const updateMembership =(membershipId,payload)=>{
    return API.put(`/membership/${membershipId}`,payload)
}

//membership types
export const getMembershipTypes = (shopId)=>{
    return API.get(`/membership-type/${shopId}`)
}
export const addMembershipTypes = (payload)=>{
    return API.post('/membership-type/',payload)
}
export const updateMembershipTypes = (id,payload)=>{
    return API.put(`/membership-type/${id}`,payload)
}

//buy memberships
export const addBuyMembership = (payload) =>{
    return API.post('/membership-buy',payload)
}
export const activateMembership = (payload) =>{
    return API.post('/membership-buy/activate',payload)
}
export const getBoughtMembershipById = (id)=>{ 
    return API.get(`/membership-buy/${id}`) 
}
export const getMembershipOrders = (shopId)=>{ 
    return API.get(`/membership-buy/orders/${shopId}`)
}
export const updateMembershipBuy = (id,payload) =>{
    return API.put(`/membership-buy/${id}`,payload)
}
// Course
export const getCourses = (payload)=>{
    return API.get('/course/list/',{params:payload})
}


