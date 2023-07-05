import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import Setting from './tabs/setting/Setting';
import Products from './tabs/products/Products';
import Faq from './tabs/faq/Faq';
import MyShop from '../myShop/MyShop';
import Memberships from './tabs/membership/Memberships';
import ManageCourse from '../../mycma/usercourses/manage';
import Statistics from './tabs/dashboard/Statistics';
import Coupons from './tabs/coupons/Coupons';
import Breadcrumbs from '@components/breadcrumbs';
import { AbilityContext } from '../../../utility/context/Can';



export default function Shop({ dispatch, store }) {
  const [activeTab, setActiveTab] = useState('1');
  const [title, setTitle] = useState('My Shop');

  const ability = useContext(AbilityContext)

  useEffect(()=>{
    if(ability.can('read','shop')){
      setActiveTab('1')
      setTitle('My Shop')
    }
    else if(ability.can('read','shop/products')){
      setActiveTab('3')
      setTitle('Products')
    }
    else if(ability.can('read','shop/membership')){
      setActiveTab('4')
      setTitle('Memberships')
    }
    else if(ability.can('read','shop/courses')){
      setActiveTab('5')
      setTitle('Courses')
    }
    else if(ability.can('read','shop/coupons')){
      setActiveTab('6')
      setTitle('Coupons')
    }
    
  },[])

  return (
    <Fragment>
       <Breadcrumbs
        breadCrumbTitle={'Shop'}
        breadCrumbParent="Shop"
        breadCrumbActive={title}
      />
      <div className="d-flex justify-content-between">
        <Nav pills>
          {ability.can('read','shop') &&  <NavItem>
            <NavLink
              active={activeTab === '1'}
              onClick={() => {
                setActiveTab('1');
                setTitle('My Shop');
              }}
            >
              My Shop
            </NavLink>
          </NavItem>}
         {ability.can('read','shop') && <NavItem>
            <NavLink
              active={activeTab === '2'}
              onClick={() => {
                setActiveTab('2');
                setTitle('Dashboard');
              }}
            >
              Dashboard
            </NavLink>
          </NavItem>}
          {ability.can('read','shop/products') &&  <NavItem>
            <NavLink
              active={activeTab === '3'}
              onClick={() => {
                setActiveTab('3');
                setTitle('Products');
              }}
            >
              Products
            </NavLink>
          </NavItem>}
         {ability.can('read','shop/membership') &&  <NavItem>
            <NavLink
              active={activeTab === '4'}
              onClick={() => {
                setActiveTab('4');
                setTitle('Memberships');
              }}
            >
              Memberships
            </NavLink>
          </NavItem>}
         {ability.can('read','shop/courses') && <NavItem>
            <NavLink
              active={activeTab === '5'}
              onClick={() => {
                setActiveTab('5');
                setTitle('Courses');
              }}
            >
              Courses
            </NavLink>
          </NavItem>}
          {ability.can('read','shop/coupons') && <NavItem>
            <NavLink
              active={activeTab === '6'}
              onClick={() => {
                setActiveTab('6');
                setTitle('Coupons');
              }}
            >
              Coupons
            </NavLink>
          </NavItem>}
         
          <NavItem>
            <NavLink
              active={activeTab === '7'}
              onClick={() => {
                setActiveTab('7');
                setTitle('Settings');
              }}
            >
              Settings
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={activeTab === '8'}
              onClick={() => {
                setActiveTab('8');
                setTitle('FAQ');
              }}
            >
              FAQ
            </NavLink>
          </NavItem>
        </Nav>
        {/* <div className="my-auto">
          <Button color="primary">Preview</Button>
        </div> */}
      </div>
      <hr />
      <TabContent activeTab={activeTab}>
        {ability.can('read','shop') && <TabPane tabId="1">
          <MyShop store={store} dispatch={dispatch} />
        </TabPane>}
        {ability.can('read','shop') && <TabPane tabId="2">
          <Statistics/>
        </TabPane>}
        {ability.can('read','shop/products') && <TabPane tabId="3">
          <Products store={store} dispatch={dispatch} />
        </TabPane>}
        {ability.can('read','shop/membership') && <TabPane tabId="4">
          <Memberships store={store} dispatch={dispatch} />
        </TabPane>}
        {ability.can('read','shop/courses') &&  <TabPane tabId="5">
          <ManageCourse shopStore={store}  dispatch={dispatch} />
        </TabPane>}
        {ability.can('read','shop/coupons') &&  <TabPane tabId="6">
          <Coupons/>
        </TabPane>}
        {ability.can('read','shop') && <TabPane tabId="7">
          <Setting store={store} dispatch={dispatch} />
        </TabPane>}
        {ability.can('read','shop') && <TabPane tabId="8">
          <Faq store={store} dispatch={dispatch} />
        </TabPane>}
      </TabContent>
    </Fragment>
  );
}
