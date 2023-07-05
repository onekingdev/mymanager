// ** React Imports
import { Fragment, useState } from 'react';

// ** Custom Components
import { Card, CardBody, Nav, NavItem, Navbar } from 'reactstrap';
import CartDropdown from './CartDropdown';
import FavoriteDropdown from './FavoriteDropdown';





const ShopNavbar = (props) => {


  return (
    <Fragment>
     
     <Card>
     <Navbar>
      <Nav className='ms-auto me-0'>
        <NavItem><CartDropdown /></NavItem>
        <NavItem><FavoriteDropdown /></NavItem>
      </Nav>
    </Navbar>
    </Card>
    </Fragment>
  );
};

export default ShopNavbar;
