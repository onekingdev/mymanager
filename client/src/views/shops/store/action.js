import { toast } from 'react-toastify';
import * as api from './api';
import {
  setCartReducer,
  setFavoriteReducer,
  setMembershipSalesReducer,
  setMembershipTypesReducer,
  setMembershipsReducer,
  setProductBrandsReducer,
  setProductCategoriesReducer,
  setProductSalesReducer,
  setProductsReducer,
  setShopReducer,
  setCoursesReducer,
} from './reducer';
import { addContactsRQ, addFamilyMemberRQ } from '../../../requests/contacts/contacts';

//shop actions
export const createShopAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createShop(payload);
    if (data.success === true) {
      dispatch(setShopReducer(data.data));
      toast.success('Shop created successfully');
    } else {
      toast.error('An error occured please try again');
    }
  } catch (error) {}
};
export const getShopByUserAction = () => async (dispatch) => {
  try {
    const { data } = await api.getShopByUser();
    if (data) {
      dispatch(setShopReducer(data || {}));
    }
  } catch (error) {}
};
export const getShopByPathAction = (path) => async (dispatch) => {
  try {
    const { data } = await api.getShopByPath(path);
    if (data) {
      dispatch(setShopReducer(data || {}));
    }
  } catch (error) {}
};

export const updateShopAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateShop(id, payload);
    if (data.success === true) {
      dispatch(getShopByUserAction());
      toast.success('Shop Updated successfully');
    } else {
      toast.error('An error occured please try again');
    }
  } catch (error) {}
};

export const checkShopPathAction = (path) => async (dispatch) => {
  try {
    const { data } = await api.checkShopPath(path);
    return data;
  } catch (error) {}
};

export const addFaqAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.addFaq(id, payload);
    dispatch(getShopByPathAction());
    toast.success('FAQ added successfully');
  } catch (error) {}
};

export const deleteFaqAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.deleteFaq(id, payload);
    dispatch(getShopByPathAction());
    toast.success('FAQ deleted successfully');
  } catch (error) {}
};

//product actions
export const getProductListAction = (params) => async (dispatch) => {
  try {
    //params: permission, shopId
    const { data } = await api.getProductsList(params);
    if (data) {
      dispatch(setProductsReducer(data.data || []));
    }
  } catch (error) {}
};

export const getProductAction = (shopPath, productPath) => async (dispatch) => {
  try {
    const { data } = await api.getProduct(shopPath, productPath);
    return data;
  } catch (error) {}
};

export const createProductAction = (shopId, payload) => async (dispatch) => {
  try {
    const { data } = await api.createProduct(shopId, payload);
    if (data.success === true) {
      dispatch(getProductListAction({ shopId: shopId, permission: 'all' }));
      toast.success('Product created successfully');
    } else {
      toast.error('An error occured please try again');
    }
  } catch (error) {}
};

export const updateProductAction = (productId, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateProduct(productId, payload);
    if (data.success === true) {
      dispatch(getProductListAction({ shopId: payload.shopId, permission: 'all'}));
      toast.success('Product updated successfully');
    } else {
      toast.error('An error occured please try again');
    }
  } catch (error) {}
};

//product brand
export const getProductBrandsAction = (shopId) => async (dispatch) => {
  try {
    const { data } = await api.getProductBrands(shopId);
    if (data) {
      dispatch(setProductBrandsReducer(data.data || []));
    }
  } catch (error) {}
};

export const createProductBrandAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createProductBrand(payload);
    if (data.success === true) {
      dispatch(getProductBrandsAction(payload.shopId));
      toast.success('Brand created successfully');
    } else {
      toast.error('An error occured please try again');
    }
  } catch (error) {}
};

//product category
export const getProductCategoryAction = (shopId) => async (dispatch) => {
  try {
    const { data } = await api.getProductCategory(shopId);
    if (data) {
      dispatch(setProductCategoriesReducer(data.data || []));
    }
  } catch (error) {}
};

export const createProductCategoryAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.createProductCategory(payload);
    if (data.success === true) {
      dispatch(getProductCategoryAction(payload.shopId));
      toast.success('Category created successfully');
    } else {
      toast.error('An error occured please try again');
    }
  } catch (error) {}
};

//product favorite
export const getMyFavoriteProductsAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getMyFavoriteProducts(id);
    if (data) {
     
      dispatch(setFavoriteReducer(data.data[0] || {}));
    }
  } catch (error) {}
};

export const addProductToFavoriteAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addProductToFavorite(payload);
    if (data.success === true) {
      dispatch(getMyFavoriteProductsAction(payload.userId));
      toast.success('Added to favorite successfully');
    } else {
      toast.error('An error occured please try again');
    }
  } catch (error) {}
};

export const deleteProductToFavoriteAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.deleteProductFromFavorite(payload);
    if (data.success === true) {
      dispatch(getMyFavoriteProductsAction(payload.userId));
      toast.success('Deleted from favorite successfully');
    } else {
      toast.error('An error occured please try again');
    }
  } catch (error) {}
};
//product rating

//product cart
export const getCartAction = (userId) => async (dispatch) => {
  try {
    const { data } = await api.getCart(userId);
    if (data) {
      dispatch(setCartReducer(data.data || {}));
    }
  } catch (error) {}
};
export const addToCartAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addToCart(payload);
    if (data.success === true) {
      dispatch(getCartAction(payload.guestId));
      //toast.success('Category created successfully');
    } else {
      toast.error('An error occured please try again');
    }
  } catch (error) {}
};
export const deleteFromCartAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.deleteFromCart(id, payload);
    if (data.success === true) {
      dispatch(getCartAction(payload.guestId));
      //toast.success('Category created successfully');
    } else {
      toast.error('An error occured please try again');
    }
  } catch (error) {}
};

//buy products
export const getShopProductSalesAction = (shopId) => async (dispatch) => {
  try {
    const { data } = await api.productSales(shopId);
    if (data) {
      dispatch(setProductSalesReducer(data.data));
    }
  } catch (error) {}
};
export const productBuySuccessAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.productBuySuccess(payload);
    if (data) {
      toast.success('Your order placed successfully! Invoice will send to your email');
    }
  } catch (error) {}
};

export const updateProductBuyAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateProductBuy(id, payload);
    if (data) {
      dispatch(getShopProductSalesAction(payload.shopId));
      toast.success('Order Updated Successfully');
    }
  } catch (error) {}
};

// ** Memberships

//memberships
export const getMembershipsAction = (params) => async (dispatch) => {
  try {
    const { data } = await api.getMemberships(params);
    if (data) {
      dispatch(setMembershipsReducer(data.data));
    }
  } catch (error) {}
};
export const getMembershipDetailsAction = (params) => async (dispatch) => {
  try {
    const { data } = await api.getMembership(params);
    if (data) {
      return data.data;
    }
  } catch (error) {}
};

export const addMembershipAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addMembership(payload);
    if (data) {
      dispatch(getMembershipsAction({ shopId: payload.shopId, permission: 'all' }));
      toast.success('Membership type added successfully');
    }
  } catch (error) {}
};
export const updateMembershipAction = (membershipId, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateMembership(membershipId, payload);
    if (data.success === true) {
      dispatch(getMembershipsAction({ shopId: payload.shopId, permission: 'all' }));
      toast.success('Membership updated successfully');
    } else {
      toast.error('An error occured please try again');
    }
  } catch (error) {}
};

//membership types
export const getMembershipTypesAction = (shopId) => async (dispatch) => {
  try {
    const { data } = await api.getMembershipTypes(shopId);
    if (data) {
      dispatch(setMembershipTypesReducer(data));
    }
  } catch (error) {}
};
export const addMembershipTypeAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addMembershipTypes(payload);
    if (data) {
      dispatch(getMembershipTypesAction(payload.shopId));
      toast.success('Membership type added successfully');
    }
  } catch (error) {}
};
export const updateMembershipTypeAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateMembershipTypes(id, payload);
    if (data) {
      dispatch(getMembershipTypesAction(payload.shopId));
      toast.success('Membership type updated successfully');
    }
  } catch (error) {}
};

//buy membership
//get bought memberships

export const addMembershipBuyAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addBuyMembership(payload);
    if (data) {
      toast.success('Membership created successfully');
      return data.data;
    }
  } catch (error) {}
};
export const activateMembershipAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.activateMembership(payload);
    if (data) {
      toast.success('Membership activated successfully');
      return data.data;
    }
  } catch (error) {}
};

export const getBoughtMembershipByIdAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.getBoughtMembershipById(id);
  
    if (data) {
      return data.data
    }
  } catch (error) {}
};

export const getMembershipSalesAction = (shopId) => async (dispatch) => {
  try {
    const { data } = await api.getMembershipOrders(shopId);

    if (data) {
      dispatch(setMembershipSalesReducer(data.data))
    }
  } catch (error) {}
};

export const updateMembershipBuyAction = (id, payload) => async (dispatch) => {
  try {
    const { data } = await api.updateMembershipBuy(id, payload);
    if (data) {
      dispatch(getMembershipSalesAction(payload.shopId));
      toast.success('Order Updated Successfully');
    }
  } catch (error) {}
};

//add to contact for family
export const addFamilyContactAction = (payload) => async (dispatch) => {
  try {
    const data = await addContactsRQ(payload);
    if (data) {
      return data;
    }
  } catch (error) {}
};

//add family to contact
export const addFamilyToContactAction = (payload) => async (dispatch) => {
  try {
    const data = await addFamilyMemberRQ(payload);
    if (data) {
      return data;
    }
  } catch (error) {}
};
// course
export const getCoursesAction = (params) => async (dispatch) => {
  try {
    //params: permission, shopId
    const { data } = await api.getCourses(params);
    if (data) {
      dispatch(setCoursesReducer(data.data || []));
    }
  } catch (error) {}
};




