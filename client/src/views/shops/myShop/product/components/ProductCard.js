import React, { useEffect, useState } from 'react';
import { Heart, ShoppingCart, Star } from 'react-feather';
import { Badge, Button, Card, CardBody, CardFooter, CardImg, CardText } from 'reactstrap';

import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { getUserData } from '../../../../../auth/utils';
import { addProductToFavoriteAction, addToCartAction, deleteProductToFavoriteAction } from '../../../store/action';

export default function ProductCard({ item,store ,dispatch}) {
  const location = window.location.href.split(window.location.origin)[1].split('/')[1]
  const [isFavorite,setIsFavorite] = useState(false)
  //console.log(item)
  const handleAddToCart = () => {
    //add item to cart
    let payload = {}
    const user = getUserData()
    if(user!==null){
        payload = {
            _id:item._id,
            count:store?.cart?.items?.find(x=>x.itemId._id===item._id)?.count + 1 || 1,
            itemType:'product',
            cartId:'user',
            userType:'user',
            guestId:user.id
        }
    }
    else{
        //guest 
        let guestId = localStorage.getItem('guestId')
        if(guestId!== undefined && guestId !=='' && guestId!==null){
            payload = {
                _id:item._id,
                count:store?.cart?.items?.find(x=>x.itemId._id===item._id)?.count + 1 || 1,
                itemType:'product',
                guestId:guestId,
                userType:'guest'
            }
        }
        else{
            //generate guestId
            guestId = Date.now().toString()
            payload = {
                _id:item._id,
                count:store?.cart?.items?.find(x=>x.itemId._id===item._id)?.count + 1 || 1,
                itemType:'product',
                guestId:guestId,
                userType:'guest'

            }
            localStorage.setItem('guestId',guestId)
        }
        
    }
        dispatch(addToCartAction(payload))

  };
  const isInCart = () => {
    //check if its in the cart
    if(store?.cart?.items?.filter(x=>x.itemId===item._id)?.length>0)
    {
        return true
    }
    else{
        return false
    }
  };
  const handleWishlistClick = (item,isAdd) => {
    //add to favorite
    const user = getUserData()
    let userId;
    if(user===null){
      //guest
      let guestId = localStorage.getItem('guestId')
      if(guestId===null){
        guestId = Date.now().toString()
        localStorage.setItem('guestId',guestId)
        
      }
      userId = guestId
    }
    else{
      userId = user.id
    }
  
    if(isAdd===true){
      const payload = {
        userId:userId,
        product:item._id,
        userType:user.userType || 'user'
      }
      dispatch(addProductToFavoriteAction(payload))
    }
    else if(isAdd===false){
      const payload ={
        id:item._id,
        userId:userId,
        type:'product'
      }
      dispatch(deleteProductToFavoriteAction(payload))
    }
    
  };
  useEffect(()=>{
    let fav = store?.favorites?.products?.find(x=>x._id===item._id)
    if(fav===undefined){
      setIsFavorite(false)
    }
    else{
      setIsFavorite(true)
    }
  },[store?.favorites])
  return (
    <Card className="ecommerce-card">
      <div className="item-img text-center mx-auto">
        <Link to={location==='shop'? `/shop/product/${item?.path}` :`/ecommerce/shop/${item?.path}`}>
          <img
            className="img-fluid card-img-top"
            src={item.imgUrl}
            alt={item.name}
            style={{ height: '150px' }}
          />
        </Link>
      </div>
      <CardBody>
        <div className="d-flex justify-content-between">
          <div className="my-auto">
            <ul className="unstyled-list list-inline">
              {new Array(5).fill().map((listItem, index) => {
                return (
                  <li key={index} className="ratings-list-item me-25">
                    <Star
                      className={classnames({
                        'filled-star': index + 1 <= item?.rating,
                        'unfilled-star': index + 1 > item?.rating
                      })}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h6 className="item-price">${item?.price}</h6>
            <Badge color={item.permission==='public'?'light-success':'light-danger'}>{item.permission}</Badge>
          </div>
        </div>

        <h6 className="item-name">
          <Link className="text-body" to={location==='shop'? `/shop/product/${item?.path}` :`/ecommerce/shop/${item?.path}`}>
            {item.name}
          </Link>
        </h6>
        <p>
          By <span className="text-primary">{item?.brand?.name}</span>
        </p>
        <CardText className="item-description">{item?.description}</CardText>
      </CardBody>
      <div className="item-options text-center">
        <Button
          className="btn-wishlist w-50"
          style={{
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            borderBottomRightRadius: '0px'
          }}
          color="light"
          onClick={() => handleWishlistClick(item,!isFavorite)}
        >
          <Heart
            className={classnames('me-50', {
              'text-danger': isFavorite
            })}
            size={14}
          />
          <span>Favorite</span>
        </Button>

        <Button
          color="primary"
          className="btn-cart w-50"
          style={{
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            borderBottomLeftRadius: '0px'
          }}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="me-50" size={14} />
          <span>{isInCart()===false ? 'Move to Cart' : 'Remove from Cart'}</span>
        </Button>
      </div>
    </Card>
  );
}
