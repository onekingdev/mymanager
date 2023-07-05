// ** React Imports
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Utils
import { isUserLoggedIn } from '@utils';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout } from '@store/authentication';

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
  Heart
} from 'react-feather';

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg';

const FavoriteDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch();

  // ** State
  // const [userData, setUserData] = useState(null)
  const { userData } = useSelector((state) => state.auth);

  //** ComponentDidMount
  // useEffect(() => {
  //   if (isUserLoggedIn() !== null) {
  //     setUserData(JSON.parse(localStorage.getItem('userData')))
  //   }
  // }, [])

  //** Vars
  const userAvatar = (userData && userData?.avatar) || null;

  const [shortName, setShortName] = useState('');
  const organization = JSON.parse(localStorage.getItem('organization'));

  useEffect(() => {
    if (userData) {
      if (userData?.fullName) {
        const nameOrArr = String(userData?.fullName).split(' ');
        const firstPart = nameOrArr.length > 0 ? nameOrArr[0] : '';
        const lastPart = nameOrArr.length > 1 ? nameOrArr[1] : '';
        setShortName(
          `${firstPart[0].toUpperCase()} ${lastPart[0] ? lastPart[0].toUpperCase() : ''}`
        );
      }
    } //
    return () => {};
  }, [userData]);

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        
        {/* {userAvatar ? (
          <Avatar img={userAvatar} imgHeight="40" imgWidth="40" status="online" />
        ) : (
          <>
            <Avatar
              // img={userAvatar}
              color="primary"
              imgHeight="40"
              imgWidth="40"
              status="online"
              content={shortName || 'N/A'}
            />
          </>
        )} */}
        <Heart/>
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/pages/account-settings">
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>
        
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default FavoriteDropdown;
