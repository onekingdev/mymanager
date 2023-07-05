import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const ShopRoutes = [
  // Shop
  {
    path: '/ecommerce/shop',
    className: 'ecommerce-application',
    exact:true,
    // component: lazy(() => import('../../views/shop/shop'))
    //component: lazy(() => import('../../views/shop/manage'))
    component: lazy(() => import('../../views/shops'))
  },
  {
    path: '/shop/:shopPath',
    component: lazy(() => import('../../views/shops/myShop/PublicShop')),
    className: 'ecommerce-application',
    layout: 'BlankLayout',
    exact:true,
    meta: {
      menuHidden: true,
      publicRoute: true
    }
  },
  {
    path: '/ecommerce/shop/:shopPath/:productPath',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/shops/myShop/product/details/ProductDetails')),
   
  },
  {
    path: '/shop/product/:shopPath/:productPath',
    component: lazy(() => import('../../views/shops/myShop/product/details/PublicProduct')),
    className: 'ecommerce-application',
    layout: 'BlankLayout',
    exact:true,
    meta: {
      menuHidden: true,
      publicRoute: true
    }
  },
  //checkout cart
  {
    path: '/ecommerce/checkout/:cartId', 
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/shops/myShop/product/checkout/UserCheckout'))
  },
  //checkout cart public
  {
    path: '/shop/:shopPath/checkout/:cartId',
    component: lazy(() => import('../../views/shops/myShop/product/checkout/PublicCheckout')),
    className: 'ecommerce-application',
    layout: 'BlankLayout',
    exact:true,
    meta: {
      menuHidden: true,
      publicRoute: true
    }
  },
  //checkout product 
  {
    path: '/ecommerce/:shopPath/:productPath/checkout',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/shops/myShop/product/checkout/UserCheckout'))
  },
   //checkout product public
  {
    path: '/shop/:shopPath/:productPath/checkout',
    component: lazy(() => import('../../views/shops/myShop/product/checkout/PublicCheckout')),
    className: 'ecommerce-application',
    layout: 'BlankLayout',
    exact:true,
    meta: {
      menuHidden: true,
      publicRoute: true
    }
  },
  //checkout membership
  {
    path: '/ecommerce/checkout/membership/:shopPath/:membershipPath',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/shops/myShop/membership/checkout/UserCheckout'))
  },
  //checkout membership public
  {
    path: '/shop/membership/:shopPath/:membershipPath/checkout',
    component: lazy(() => import('../../views/shops/myShop/membership/checkout/PublicCheckout')),
    className: 'ecommerce-application',
    layout: 'BlankLayout',
    exact:true,
    meta: {
      menuHidden: true,
      publicRoute: true
    }
  },
  //courses
  {
    path: '/shop/:shopPath/course/:id',
    component: lazy(() => import('../../views/shops/myShop/course/courseview')),
    className: 'ecommerce-application',
    layout: 'BlankLayout',
    exact:true,
    meta: {
      menuHidden: true,
      publicRoute: true
    }
  },
  {
    path: '/ecommerce/:shopPath/course/:id',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/shops/myShop/course/courseview')),
  },

];

export default ShopRoutes;
