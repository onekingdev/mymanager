import React, { useEffect, useState } from 'react';
import { Card, CardImg, Col, Row } from 'reactstrap';
import ShopSidebar from './ShopSidebar';
import ShopProducts from './product/ShopProducts';
import ShopMembership from './membership/ShopMembership';

import '@styles/react/apps/app-ecommerce.scss';

import {
  getCoursesAction,
  getMembershipTypesAction,
  getMembershipsAction,
  getProductBrandsAction,
  getProductCategoryAction,
  getProductListAction
} from '../store/action';
import ShopSearch from './ShopSearch';
import ShopCourses from './course/ShopCourses';

export default function MyShop({ store, dispatch, isPublic }) {
  const [type, setType] = useState('product');
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (isPublic) {
      dispatch(getProductListAction({ shopId: store.shop._id, permission: 'public' }));
      dispatch(getMembershipsAction({ shopId: store.shop._id, permission: 'public' }));
      dispatch(getCoursesAction({ shopId: store.shop._id, permission: 'public' }))
    } else {
      dispatch(getProductListAction({ shopId: store.shop._id, permission: 'all' }));
      dispatch(getMembershipsAction({ shopId: store.shop._id, permission: 'all' }));
      dispatch(getCoursesAction({ shopId: store.shop._id, permission: 'all' }))
    }
    dispatch(getProductBrandsAction(store.shop._id));
    dispatch(getProductCategoryAction(store.shop._id));
    dispatch(getMembershipTypesAction(store.shop._id))
  }, [dispatch]);

  useEffect(() => {
    switch (type) {
      case 'product':
        if (store.products && store.products.length > 0) {
          setItems(store.products);
        }
        break;
      case 'membership':
        if (store.memberships && store.memberships.length > 0) {
          setItems(store.memberships);
        }
        break;
      case 'course':
        if (store.courses && store.courses.length > 0) {
          setItems(store.courses);
        }
        else{
          setItems([])
        }
        break;

      default:
        break;
    }
  }, [store.products,store.courses, type]);
  return (
    <div>
      <div id="user-profile">
        <Card className="profile-header ">
          <CardImg
            src={store?.shop?.bannerUrl}
            alt="Shop Image"
            top
            style={{ maxHeight: '300px' }}
          />
          <div className="position-absolute m-1" style={{ bottom: '0px' }}>
            <div className="profile-img-container d-flex align-items-center">
              <div className="profile-img">
                <img
                  className="rounded img-fluid"
                  src={store?.shop?.logoUrl}
                  alt="Card image"
                  style={{ maxWidth: '100px' }}
                />
              </div>
            </div>
          </div>
          <div className='ps-5 '>
            <div className='ps-5 ms-5'>
              <h2 className='ps-1 my-0 py-0'>{store?.shop?.name}</h2>
              <p className='ps-1'>{store?.shop?.description}</p>
            </div>
          </div>
        </Card>
      </div>
      <Row>
        <Col md="2">
          <ShopSidebar
            store={store}
            dispatch={dispatch}
            type={type}
            setType={setType}
            items={items}
            setItems={setItems}
          />
        </Col>
        <Col md="10">
          <ShopSearch store={store} type={type} items={items} setItems={setItems} />
          {type === 'product' && items.length > 0 && (
            <ShopProducts store={store} dispatch={dispatch} products={items} />
          )}
          {type === 'membership' && <ShopMembership store={store} dispatch={dispatch} memberships={items} />}
          {type === 'course' && <div><ShopCourses store={store}  courses={items} /></div>}
        </Col>
      </Row>
    </div>
  );
}
