import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductAction, getProductListAction, getShopByPathAction } from '../../../store/action';
import BreadCrumbs from '@components/breadcrumbs';


import '@styles/base/pages/app-ecommerce.scss';
import { Card, CardBody, Container } from 'reactstrap';
import { useParams } from 'react-router-dom';
import ProductInfo from './components/ProductInfo';
import ShopNavbar from '../../navbar';

export default function PublicProduct() {
  const [product, setProduct] = useState();
  const { shopPath, productPath } = useParams();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.shops);

  useEffect(() => {
    dispatch(getProductAction(shopPath, productPath)).then((res) => {
      setProduct(res.data);
    });
    
  }, [dispatch]);
  useEffect(()=>{
    if(product){
      dispatch(getProductListAction({shopId:product.shopId,permission:'all'}))
    }
  },[product])
  useEffect(()=>{
    dispatch(getShopByPathAction(shopPath))
  },[])
  return (
    <Fragment>
     
      <Container fluid className='my-1'>
      <div className="app-ecommerce-details">
      <ShopNavbar/>
      {product ? (
              <>
              <ProductInfo product={product} store={store} dispatch={dispatch} isPublic={true}/>
              </>
            ) : (
              <></>
            )}
       
      </div>
      </Container>
    </Fragment>
   
  );
}
