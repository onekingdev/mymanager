import React, { useEffect } from 'react';
import { X, Heart, Star, Plus, Minus } from 'react-feather';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';

import classnames from 'classnames';
import InputNumber from 'rc-input-number';
import Payment from '../../../../payment/Payment';
import { deleteFromCartAction } from '../../../../../store/action';

export default function CartDetails({
  dispatch,
  store,
  cart,
  buyer,
  payment,
  setPayment,
  setCart,
  isPublic
}) {
  const totalOutput = () => {
    let sum = 0;
    cart &&
      cart.items.map((item, i) => {
        sum += item.count * item.itemId.price;
      });
    return sum;
  };
  const setProductAmount = (product, count) => {
    let temp = cart.items.map(x=>{
      let t = x;
      if(t.itemId._id===product.itemId._id){
        t = {...t,count:count}
      }
      return t
    })
    setCart({...cart, items:temp});
  };
  const handleRemoveFromCart = (item)=>{
    dispatch(deleteFromCartAction(cart._id,{_id:item._id,guestId:cart.userId}))
  }
  // ** Render cart items
  const renderCart = () => {
    return (
      cart &&
      cart?.items?.map((item) => {
        return (
          <Card key={item} className="ecommerce-card">
            <Row>
              <Col md="2" className='m-auto'>
              <div className="item-img m-auto">
              <Link to={isPublic?`/shop/product/${item?.itemId?.path}`:`/ecommerce/shop/${item?.itemId?.path}`}>
                <img className="img-fluid" src={item?.itemId?.imgUrl} alt={item?.itemId?.name} style={{maxHeight:"150px"}}/>
              </Link>
            </div>
              </Col>
              <Col md="8">
              <CardBody>
              <div className="item-name">
                <h6 className="mb-0">
                  <Link to={isPublic?`/shop/product/${item?.itemId?.path}`:`/ecommerce/shop/${item?.itemId?.path}`}>
                    {item?.itemId?.name}
                  </Link>
                </h6>
                {/* <span className="item-company">
                  By
                  <span className="text-primary">{item?.itemId?.brand?.name}</span>
                </span> */}
                <div className="item-rating">
                  <ul className="unstyled-list list-inline">
                    {new Array(5).fill().map((listItem, index) => {
                      return (
                        <li key={index} className="ratings-list-item me-25">
                          <Star
                            className={classnames({
                              'filled-star': index + 1 <= item.itemId?.rating,
                              'unfilled-star': index + 1 > item.itemId?.rating
                            })}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <span className="text-success mb-1">In Stock</span>
              <div className="item-quantity">
                <span className="quantity-title me-50">Qty</span>
                <InputNumber
                  min={1}
                  max={10}
                  upHandler={<Plus />}
                  className="cart-input"
                  defaultValue={item.count}
                  downHandler={<Minus />}
                  onChange={(e) => setProductAmount(item, e)}
                />
              </div>
            </CardBody>
              </Col>
              <Col md="2" className='my-auto'>
              <div className="item-options text-center my-auto">
              <div className="item-wrapper">
                <div className="item-cost">
                  <h4 className="item-price">${item.itemId.price * item.count}</h4>
                  {item.hasFreeShipping ? (
                    <CardText className="shipping">
                      <Badge color="light-success" pill>
                        Free Shipping
                      </Badge>
                    </CardText>
                  ) : null}
                </div>
              </div>
              <Button
                className="mt-1 remove-wishlist"
                color="light"
                onClick={()=>handleRemoveFromCart(item)}
              >
                <X size={14} className="me-25" />
                <span>Remove</span>
              </Button>
            </div>
              </Col>
             
          
          
            </Row>
          </Card>
        );
      })
    );
  };

  return (
   <>
    {cart && cart.items ? (<>
    <Row>
      <Col md="8">
      <div className="checkout-items">
        {cart?.items?.length>0 ? renderCart() : <h4>Your cart is empty</h4>}
      </div>
      </Col>
      <Col md="4">
      <div className="checkout-options">
        <Card>
          <CardBody>
            <div className="price-details">
              <h6 className="price-title">Pay Now</h6>
              <ul className="list-unstyled">
                <li className="price-detail">
                  <div className="detail-title">Price</div>
                  <div className="detail-amt">${totalOutput()}</div>
                </li>
                <li className="price-detail">
                  <div className="detail-title">Delivery Charges</div>
                  <div className="detail-amt discount-amt text-success">Free</div>
                </li>
              </ul>
              <hr />
              <ul className="list-unstyled">
                <li className="price-detail">
                  <div className="detail-title detail-total">Total</div>
                  <div className="detail-amt fw-bolder">${totalOutput()}</div>
                </li>
              </ul>
              <Payment
                payment={payment}
                setPayment={setPayment}
                cart={cart}
                dispatch={dispatch}
                store={store}
                buyer={buyer}
              />
            </div>
          </CardBody>
        </Card>
      </div>
      </Col>
    </Row>
     
      </>):(<><h5>Your cart is empty</h5></>)}
   </>
  );
}
