import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, CardBody, CardText } from 'reactstrap';
import classnames from 'classnames';
import { Heart, ShoppingCart } from 'react-feather';
import { Link } from 'react-router-dom';
import { addProductToFavoriteAction, deleteProductToFavoriteAction } from '../../../store/action';
import { getUserData } from '../../../../../auth/utils';

export default function MembershipCard({ item, store, dispatch }) {
  const location = window.location.href.split(window.location.origin)[1].split('/')[1]
  const [isFavorite,setIsFavorite] = useState(false)
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
        membership:item._id,
        userType:user.userType || 'user'
      }
      dispatch(addProductToFavoriteAction(payload))
    }
    else if(isAdd===false){
      const payload ={
        id:item._id,
        userId:userId,
        type:'membership'
      }
      dispatch(deleteProductToFavoriteAction(payload))
    }
    
  };
  useEffect(()=>{
    let fav = store?.favorites?.memberships?.find(x=>x._id===item._id)

    if(fav===undefined){
      setIsFavorite(false)
    }
    else{
      setIsFavorite(true)
    }
  },[store?.favorites])
  return (
    <>
      <Card className="ecommerce-card">
        <CardBody>
          <div className="d-flex justify-content-end">
            <Badge color={`${item?.membershipType?.color}`} className='me-25' style={{ backgroundColor: `${item?.membershipType?.color}` }}>{item?.membershipType?.type}</Badge>
            <Badge color={item.permission === 'public' ? 'light-success' : 'light-danger'}>
              {item.permission}
            </Badge>
          </div>
          <div className={'d-flex align-items-center justify-content-between'}>
            <h6 className="item-name">{item?.name}</h6>
          </div>
          <CardText className="item-description ">{item?.description}</CardText>
          <table className="table">
            <tr>
              <td>Total Price</td>
              <td>$ {item?.total}</td>
            </tr>
            <tr>
              <td>Down Payment</td>
              <td>$ {item?.downPayment}</td>
            </tr>
            <tr>
              <td>Payment Type</td>
              <td>
                {item?.isRecurring === true ? 'Recurring' : 'One Time'}{' '}
                <span className="text-secondary">
                  <small>({item?.frequency})</small>
                </span>
              </td>
            </tr>
            {item?.isRecurring === true && (
              <>
                <tr>
                  <td>Recuring Time</td>
                  <td>
                    for {item?.duration} {item?.durationType}
                  </td>
                </tr>
              </>
            )}
          </table>
        </CardBody>
        <div className="item-options text-center">
          <div className="item-wrapper">
            <div className="item-cost">
              <h4 className="item-price"> Pay Now ${item?.amount + item?.downPayment}</h4>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <Button
              className="btn-wishlist w-50"
              style={{
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px',
                borderBottomRightRadius: '0px'
              }}
              color="light"
              onClick={() => handleWishlistClick(item, !isFavorite)}
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
              tag={Link}
              to={location==='shop' ?`/shop/membership/${item.path}/checkout` : `/ecommerce/checkout/membership/${item.path}`}
              className="btn-cart move-cart w-50"
              
              style={{
                borderTopLeftRadius: '0px',
                borderTopRightRadius: '0px',
                borderBottomLeftRadius: '0px'
              }}
            >
              <ShoppingCart className="me-50" size={14} />
              <span>{'Buy Now'}</span>
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
