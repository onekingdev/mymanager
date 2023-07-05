// ** React Imports
import { Fragment, useState } from 'react';

// ** Custom Components
import NavbarUser from './NavbarUser';
import NavbarBookmarks from './NavbarBookmarks';
import OrganizationDropdown from './OrganizationDropdown';
import OrgLocationDropdown from './OrgLocationDropdown';


import { getUserData } from '../../../auth/utils';

const ThemeNavbar = (props) => {
  // ** Vars
  const user = getUserData();
  const organization = localStorage.getItem('organization')
  
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props;

  return (
    <Fragment>
      <div className="bookmark-wrapper d-flex align-items-center">
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
        {user && user?.organizations && user?.organizations?.length > 0 && (
          <OrganizationDropdown user={user} />
        )}
        {organization && JSON.parse(organization)?.locations?.length>0 && <OrgLocationDropdown />}
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  );
};

export default ThemeNavbar;
