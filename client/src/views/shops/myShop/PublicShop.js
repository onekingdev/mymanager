import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getShopByPathAction } from '../store/action';
import MyShop from './MyShop';
import { Container } from 'reactstrap';
import ShopNavbar from './navbar';

export default function PublicShop() {
    const {shopPath} = useParams();
    const dispatch = useDispatch();
    const store = useSelector((state) => state.shops);

    useEffect(()=>{
        if(shopPath){
            //get shop by path
            dispatch(getShopByPathAction(shopPath))

        }
    },[shopPath])
    
  return (
    <>
    <Container fluid className='my-1'>
      <ShopNavbar/>
    {store?.shop?._id && (<MyShop dispatch={dispatch} store={store} isPublic={true}/>)}
    </Container>
    </>
  )
}
