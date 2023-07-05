import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ChevronDown } from 'react-feather';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
// ** Context
import { handleRole } from '@store/authentication';
import Avatar from '@components/avatar';
import { AbilityContext } from '@src/utility/context/Can';
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee } from 'react-feather';

import { customInterIceptors } from '../../../lib/AxiosProvider';
import { setPermissions, setTemplateData } from '../../../utility/Utils';
import { TemplateContext } from '../../../utility/context/Template';
import { toast, Slide } from 'react-toastify';
import { getHomeRouteForLoggedInUser, getUserData } from '../../../utility/Utils';
import { getDefaultElementsAction } from '../../../views/organizations/store/action';

const API = customInterIceptors();

const ToastContent = ({ name, role }) => (
  <>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title fw-bold">Welcome, {name}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        You have successfully logged in as an {role} user to My Manager. Now you can start to
        explore. Enjoy!
      </span>
    </div>
  </>
);

export default function RoleDropdown({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  // ** States
  const [title, setTitle] = useState(
    getUserData().curRole ? getUserData().curRole : 'My user account'
  );
  const [path, setPath] = useState('');
  const [curUserType, setCurUserType] = useState('');
  const [roles, setRoles] = useState([]);
  // ** Contexts
  const ability = useContext(AbilityContext);
  const { setElements } = useContext(TemplateContext);
  // ** Effects
  useEffect(() => {
    setPath(/:\/\/([^\/]+)/.exec(window.location.href)[1].split('.')[0]);
  }, []);
  useEffect(() => {
    user.organizations.map((org) => {
      if (org.path === path) {
        setCurUserType(org.userType);
      }
    });
  }, [user, path]);
  useEffect(async () => {
    if (user?.roles?.length) {
      let tmpTypeIdArr = [];
      tmpTypeIdArr = user.roles.map((role) => {
        return role.contactTypeId;
      });
      const res = await API.post('/contact-type/getRolesByIdArr', { typeIdArr: tmpTypeIdArr });
      res?.data?.data && setRoles(res.data.data);
    }
  }, [user?.roles]);
  // ** Handlers
  const handleChangeRole = async (role) => {
    if (role?.name) {
      setTitle(role.name);
    } else {
      setTitle(role);
    }
    let newAbility = [],
      permissions = [];
    if (role.type == 'employee') {
      const res = await API.get('/role/employee', { params: { email: user.email } });
      if (res.data.success) {
        permissions = res.data.data;
      } else {
        const res = await API.get('/subscription-plan/default');
        permissions = res.data.data;
      }
    } else if (role === 'My User Account') {
      const res = await API.get('/subscription-plan/default');
      permissions = res.data.data;
    } else if (role === 'My Admin Account') {
      const res = await dispatch(getDefaultElementsAction());

      for (const element of res) {
        permissions.push({
          elementTitle: element.elementTitle,
          elementParent: element.elementParent,
          navLink: element.navLink,
          read: true,
          write: true,
          update: true,
          delete: true,
          defaultId: element.id
        });
      }
    } else {
      const res = await dispatch(getDefaultElementsAction());

      for (const element of res) {
        if (element.id != 'tasksAndGoals/tasks' && element.id != 'tasksAndGoals') {
          permissions.push({
            elementTitle: element.elementTitle,
            elementParent: element.elementParent,
            navLink: element.navLink,
            read: false,
            write: false,
            update: false,
            delete: false,
            defaultId: element.id
          });
        } else {
          permissions.push({
            elementTitle: element.elementTitle,
            elementParent: element.elementParent,
            navLink: element.navLink,
            read: true,
            write: true,
            update: true,
            delete: true,
            defaultId: element.id
          });
        }
      }
    }
    newAbility = setPermissions(permissions);

    if (newAbility) ability.update(newAbility);

    //setElements(setTemplateData(permissions));

    const data = { ability: newAbility, curRole: role?.name ? role.name : role };

    dispatch(handleRole(data));
    // setTimeout(() => {
    //   fetchData();
    // }, 1000);
    toast.success(
      <ToastContent name={user.fullName || 'John Doe'} role={role?.name ? role.name : role} />,
      {
        icon: false,
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000
      }
    );
    history.push(getHomeRouteForLoggedInUser(user.userType));
  };
  return (
    <>
      <UncontrolledDropdown className="me-50">
        <DropdownToggle tag="div" className="cursor-pointer">
          <div className="d-flex justify-content-center align-items-center">
            {title}
            <ChevronDown size={14} className="ms-50" />
          </div>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            onClick={() =>
              handleChangeRole(curUserType === 'admin' ? 'My Admin Account' : 'My User Account')
            }
          >
            <span className="text-capitalize">
              {curUserType === 'admin' ? 'My Admin Account' : 'My User Account'}
            </span>
          </DropdownItem>
          {roles?.map((role, idx) => {
            return (
              <DropdownItem key={idx} className="w-100" onClick={() => handleChangeRole(role)}>
                {role.name}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
}
