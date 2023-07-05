import React, { useEffect, useState } from 'react';
import {
  DollarSign,
  Facebook,
  Heart,
  Share2,
  ShoppingCart,
  Star,
  Twitter,
  Youtube
} from 'react-feather';
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown
} from 'reactstrap';

import classnames from 'classnames';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { addProductToFavoriteAction, addToCartAction, deleteProductToFavoriteAction } from '../../../../store/action';
import { getUserData } from '../../../../../../auth/utils';

import '@styles/base/pages/app-ecommerce-details.scss';
import '@styles/react/libs/swiper/swiper.scss'

export default function ProductInfo({ product, store, dispatch, isPublic }) {
  const [isSeller, setIsSeller] = useState(false);
  const [related, setRelated] = useState([]);
  const [isFavorite,setIsFavorite] = useState(false);

  const handleWishlistClick = (isAdd) => {
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
        product:product._id,
        userType:user.userType || 'user'
      }
      dispatch(addProductToFavoriteAction(payload))
    }
    else if(isAdd===false){
      const payload ={
        id:product._id,
        userId:userId,
        type:'product'
      }
      dispatch(deleteProductToFavoriteAction(payload))
    }
    
  };
  const handleAddToCart = () => {
    //add item to cart
    let payload = {};
    const user = getUserData();
    if (user !== null) {
      payload = {
        _id: product._id,
        count: store?.cart?.items?.find((x) => x.itemId._id === product._id)?.count + 1 || 1,
        itemType: 'product',
        cartId: 'user',
        userType: 'user',
        guestId: user.id
      };
    } else {
      //guest
      let guestId = localStorage.getItem('guestId');
      if (guestId !== undefined && guestId !== '' && guestId !== null) {
        payload = {
          _id: product._id,
          count: store?.cart?.items?.find((x) => x.itemId._id === product._id)?.count + 1 || 1,
          itemType: 'product',
          guestId: guestId,
          userType: 'guest'
        };
      } else {
        //generate guestId
        guestId = crypto.randomUUID();
        payload = {
          _id: product._id,
          count: store?.cart?.items?.find((x) => x.itemId._id === product._id)?.count + 1 || 1,
          itemType: 'product',
          guestId: guestId,
          userType: 'guest'
        };
      }
    }
    dispatch(addToCartAction(payload));
  };
  const isInCart = () => {
    //check if its in the cart
    if (store?.cart?.items?.filter((x) => x.itemId === product._id)?.length > 0) {
      return true;
    } else {
      return false;
    }
  };

 
  // ** Slider params
  const params = {
    className: 'swiper-responsive-breakpoints swiper-container px-4 py-2',
    slidesPerView: 5,
    spaceBetween: 55,
    navigation: true,
    breakpoints: {
      1600: {
        slidesPerView: 4,
        spaceBetween: 55
      },
      1300: {
        slidesPerView: 3,
        spaceBetween: 55
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 55
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 55
      }
    }
  };

  useEffect(() => {
    if (store?.products?.length > 0) {
      setRelated(store.products.filter((x) => x.permission === 'public' && x._id !== product._id));
    }
  }, [store.products]);
  useEffect(() => {
    if (product) {
      const user = getUserData();
      if (user) {
        if (user.id === product.userId) {
          setIsSeller(true);
        } else {
          setIsSeller(false);
        }
      } else {
        setIsSeller(false);
      }
    }
  }, [product]);
  useEffect(()=>{
    let fav = store?.favorites?.products?.find(x=>x._id===product._id)
    if(fav===undefined){
      setIsFavorite(false)
    }
    else{
      setIsFavorite(true)
    }
  },[store?.favorites])
  return (
    <>
      <Card>
        <CardBody>
          <Row className="my-2">
            <Col
              className="d-flex align-items-center justify-content-center mb-2 mb-md-0"
              md="5"
              xs="12"
            >
              <div className="d-flex align-items-center justify-content-center">
                <img className="img-fluid product-img" src={product.imgUrl} alt={product.name} />
              </div>
            </Col>
            <Col md="7" xs="12">
              <h4>{product.name}</h4>
              <CardText tag="span" className="item-company">
                By
                <a className="company-name ms-50" href="/" onClick={(e) => e.preventDefault()}>
                  {product.brand.name}
                </a>
              </CardText>
              <div className="ecommerce-details-price d-flex flex-wrap mt-1">
                <h4 className="item-price me-1">${product.price}</h4>
                <ul className="unstyled-list list-inline">
                  {new Array(5).fill().map((listItem, index) => {
                    return (
                      <li key={index} className="ratings-list-item me-25">
                        <Star
                          className={classnames({
                            'filled-star': index + 1 <= product?.rating,
                            'unfilled-star': index + 1 > product?.rating
                          })}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
              <CardText>
                Available -
                <span
                  className={`${product?.inStock > 0 ? 'text-success ms-25' : 'text-danger ms-25'}`}
                >
                  {product?.inStock > 0 ? 'In stock' : 'Out of Stock'}
                </span>
              </CardText>
              <CardText>{product.description}</CardText>
              <ul className="product-features list-unstyled">
                {product?.freeShipping === true && (
                  <li>
                    <ShoppingCart size={19} />
                    <span>Free Shipping</span>
                  </li>
                )}
                {product?.emi === true && (
                  <li>
                    <DollarSign size={19} />
                    <span>EMI options available</span>
                  </li>
                )}
              </ul>
              <hr />
              <div className="d-flex flex-column flex-sm-row pt-1">
                <Button
                  className="btn-cart me-0 me-sm-1 mb-1 mb-sm-0"
                  color="primary"
                  tag={Link}
                  ///ecommerce/:shopPath/:productPath/checkout
                  to={
                    isPublic
                      ? `/shop/${product.path}/checkout`
                      : `/ecommerce/${product.path}/checkout`
                  }
                  disabled={product?.inStock >= 0 ? false : true}
                >
                  <ShoppingCart className="me-50" size={14} />
                  {'Buy Now'}
                </Button>
                {!isInCart() ? (
                  <Button
                    className="btn-cart me-0 me-sm-1 mb-1 mb-sm-0"
                    color="primary"
                    onClick={handleAddToCart}
                    disabled={product?.inStock >= 0 ? false : true}
                  >
                    <ShoppingCart className="me-50" size={14} />
                    {'Move to cart'}
                  </Button>
                ) : (
                  <></>
                )}
                <Button
                  className="btn-wishlist me-0 me-sm-1 mb-1 mb-sm-0"
                  color="secondary"
                  outline
                  onClick={() => handleWishlistClick(!isFavorite)}
                >
                  <Heart
                    size={14}
                    className={classnames('me-50', {
                      'text-danger': isFavorite
                    })}
                  />
                  <span>Favorite</span>
                </Button>
              </div>
            </Col>
          </Row>
        </CardBody>
        {/* Features */}
        <div className="item-features bg-light-secondary py-5">
          <Row className="text-center">
            <Col className="mb-4 mb-md-0" md="4" xs="12">
              <div className="w-75 mx-auto">
                <Icon.Award />
                <h4 className="mt-2 mb-1">100% Original</h4>
                <CardText>
                  Chocolate bar candy canes ice cream toffee. Croissant pie cookie halvah.
                </CardText>
              </div>
            </Col>
            <Col className="mb-4 mb-md-0" md="4" xs="12">
              <div className="w-75 mx-auto">
                <Icon.Clock />
                <h4 className="mt-2 mb-1">10 Day Replacement</h4>
                <CardText>
                  Marshmallow biscuit donut dragée fruitcake. Jujubes wafer cupcake.
                </CardText>
              </div>
            </Col>
            <Col className="mb-4 mb-md-0" md="4" xs="12">
              <div className="w-75 mx-auto">
                <Icon.Shield />
                <h4 className="mt-2 mb-1">1 Year Warranty</h4>
                <CardText>
                  Cotton candy gingerbread cake I love sugar plum I love sweet croissant.
                </CardText>
              </div>
            </Col>
          </Row>
        </div>
         {/* RelatedProducts */}
      <div>
        <div className="mt-4 mb-2 text-center">
          <h4>Related Products</h4>
          <CardText>People also search for this items</CardText>
        </div>
        {related?.length > 0 && (
          <Swiper {...params}>
            {related.map((slide) => {
              return (
                <SwiperSlide key={slide.name}>
                  <a href="/" onClick={(e) => e.preventDefault()} >
                  <div  >
                  <div className="item-heading text-center">
                      <h5 className="text-truncate mb-0">{slide.name}</h5>
                      <small className="text-body">by {slide.brand.name}</small>
                    </div>
                    <div className="img-container w-50 mx-auto py-75">
                      <img src={slide.imgUrl} alt={`${slide.name}`} className="img-fluid" />
                    </div>
                    <div className="item-meta text-center">
                      <ul className="unstyled-list list-inline mb-25">
                        {new Array(5).fill().map((listItem, index) => {
                          return (
                            <li key={index} className="ratings-list-item me-25">
                              <Star
                                className={classnames({
                                  'filled-star': index + 1 <= slide?.rating,
                                  'unfilled-star': index + 1 > slide?.rating
                                })}
                              />
                            </li>
                          );
                        })}
                      </ul>
                      <CardText className="text-primary mb-0">${slide.price}</CardText>
                    </div>
                  </div>
                  </a>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
      </Card>

     
    </>
  );
}
