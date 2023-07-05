import React, { Fragment, useEffect, useState } from 'react';
import { getProductBrandsAction, getProductCategoryAction, getShopProductSalesAction } from '../../../store/action';
import { Card, Col, Nav, NavItem, NavLink, Navbar, Row, TabContent, TabPane } from 'reactstrap';

import { Image, Info, Users } from 'react-feather';
import ProductList from './tabs/products/ProductList';
import CategoryList from './tabs/categories/CategoryList';
import Customers from './tabs/customers/Customers';
import Orders from './tabs/orders/Orders';

export default function Products({ store, dispatch }) {
  const [activeTab, setActiveTab] = useState('1');
  useEffect(()=>{
    dispatch(getShopProductSalesAction(store.shop._id))
  },[])
  return (
    <Fragment>
      <div id="user-profile">
        <Row>
          <Col sm="12">
            <Card className="profile-header mb-2">
              <div className="profile-header-nav">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className="fw-bold"
                      active={activeTab === '1'}
                      onClick={() => setActiveTab('1')}
                    >
                      <span className="d-none d-md-block">Products</span>
                      <Info className="d-block d-md-none" size={14} />
                    </NavLink>
                  </NavItem>
                  {/* <NavItem>
                    <NavLink
                      className="fw-bold"
                      active={activeTab === '2'}
                      onClick={() => setActiveTab('2')}
                    >
                      <span className="d-none d-md-block">Categories</span>
                      <Image className="d-block d-md-none" size={14} />
                    </NavLink>
                  </NavItem> */}
                  <NavItem>
                    <NavLink
                      className="fw-bold"
                      active={activeTab === '3'}
                      onClick={() => setActiveTab('3')}
                    >
                      <span className="d-none d-md-block">Customers</span>
                      <Users className="d-block d-md-none" size={14} />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="fw-bold"
                      active={activeTab === '4'}
                      onClick={() => setActiveTab('4')}
                    >
                      <span className="d-none d-md-block">Orders</span>
                      <Users className="d-block d-md-none" size={14} />
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </Card>
          </Col>
        </Row>
        <TabContent activeTab={activeTab}>
            <TabPane tabId='1'>
                <ProductList store={store} dispatch={dispatch}/>
            </TabPane>
            {/* <TabPane tabId='2'>
                <CategoryList store={store} dispatch={dispatch}/>
            </TabPane> */}
            <TabPane tabId='3'>
                <Customers store={store} dispatch={dispatch}/>
            </TabPane>
            <TabPane tabId='4'>
                <Orders store={store} dispatch={dispatch}/>
            </TabPane>
        </TabContent>
      </div>
    </Fragment>
  );
}
