// ** React Imports
import { Link } from 'react-router-dom';
import { useEffect, Fragment, useState } from 'react';

// ** Third Party Components
import InputNumber from 'rc-input-number';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ShoppingCart, X, Plus, Minus } from 'react-feather';

// ** Reactstrap Imports
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Badge,
  Button,
  Col
} from 'reactstrap';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';

// ** Styles
import '@styles/react/libs/input-number/input-number.scss';
import { addToCartAction, deleteFromCartAction, getCartAction, getProductAction } from './../../store/action';
import { getUserData } from '../../../../auth/utils';

const CartDropdown = () => {
  // ** State
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.shops);
  // ** ComponentDidMount
  useEffect(() => {
    const user = getUserData();
    if (user) {
      dispatch(getCartAction(user.id));
    } else {
      const guestId = localStorage.getItem('guestId');
      dispatch(getCartAction(guestId));
    }
  }, []);

  // ** Function to toggle Dropdown
  const toggle = () => setDropdownOpen(!dropdownOpen);

  // ** Function to call on Dropdown Item Click
  const handleDropdownItemClick = (id) => {
    dispatch(getProductAction(id));
    toggle();
  };

  // ** Loops through Cart Array to return Cart Items
  const setProductAmount = (productId, count) => {
    const user = getUserData();
    let payload = {};
    if (user) {
      payload = {
        _id: productId,
        count: count,
        itemType: 'product',
        guestId: user.id,
        userType: 'user'
      };
      console.log(payload);
      dispatch(addToCartAction(payload));
    } else {
      payload = {
        _id: productId,
        count: count,
        itemType: 'product',
        guestId: localStorage.getItem('guestId'),
        userType: 'guest'
      };
      dispatch(addToCartAction(payload));
    }
  };

  const renderCartItems = () => {
    if (store.cart && store?.cart?.items?.length > 0) {
      let total = 0;
      store?.cart?.items?.map((cart_item) => {
        total += cart_item?.count * cart_item?.itemId?.price;
      });
      return (
        <Fragment>
          <PerfectScrollbar
            className="scrollable-container media-list"
            options={{
              wheelPropagation: false
            }}
          >
            <hr/>
            {store.cart.items.map((item) => {
              return (
                <div className='mx-1'>
                    <div className="d-flex justify-content-between">
                   <div>
                    <div className='d-flex'>
                    <img
                      className="d-block rounded me-1"
                      src={item.itemId?.imgUrl}
                      alt={item.itemId?.name}
                      width="62"
                    />
                    <h6 className="cart-item-title my-auto">{item?.itemId?.name}</h6>
                    </div>
                   </div>

                    <div>
                      <X
                        size={14}
                        className="cart-item-remove"
                        onClick={() => dispatch(deleteFromCartAction(store.cart._id, item.itemId._id))}
                      />
                      
                    </div>
                    <InputNumber
                      min={1}
                      max={10}
                      upHandler={<Plus />}
                      className="cart-input my-auto"
                      defaultValue={item.amount}
                      downHandler={<Minus />}
                      value={item?.count}
                      onChange={(e) => setProductAmount(item?.itemId?._id, e)}
                    />

                    <h5 className="cart-item-price my-auto">${item?.itemId?.price * item?.count}</h5>
                  </div>
                  <hr/>
                </div>
              );
            })}
          </PerfectScrollbar>
          <div className='mx-1'>
          <div className="d-flex justify-content-between mb-1">
              <h6 className="fw-bolder mb-0">Total:</h6>
              <h6 className="text-primary fw-bolder mb-0">${Number(total.toFixed(2))}</h6>
            </div>
            <Button
              tag={Link}
              to={`/shop/${store.shop.shopPath}/checkout/${store.cart._id}`}
              color="primary"
              block
              onClick={toggle}
            >
              Checkout
            </Button>
          </div>
        </Fragment>
      );
    } else {
      return <p className="m-0 p-1 text-center">Your cart is empty</p>;
    }
  };

  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      tag="li"
      className="dropdown-cart nav-item me-25"
    >
      <DropdownToggle tag="a" className="nav-link position-relative">
        <ShoppingCart className="ficon" />
        {store.cart && store.cart?.items?.length > 0 ? (
          <Badge pill color="primary" className="badge-up">
            {store.cart.items.length}
          </Badge>
        ) : null}
      </DropdownToggle>
      <DropdownMenu
        end
        tag="ul"
        className="dropdown-menu-media dropdown-cart mt-0"
        style={{ minWidth: '400px' }}
      >
        <DropdownItem tag="div" className="d-flex" header>
          <h4 className="notification-title mb-0 me-auto">My Cart</h4>
          <Badge color="light-primary" pill>
            {/* {store.cart.length || 0} Items */}
            {store.cart ? store?.cart?.items?.length : 0} Items
          </Badge>
        </DropdownItem>
        {renderCartItems()}
      </DropdownMenu>
    </Dropdown>
  );
};

export default CartDropdown;
