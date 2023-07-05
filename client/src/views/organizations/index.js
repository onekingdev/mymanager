import React, { Fragment, useEffect, useState } from 'react';
import { getUserData } from '../../auth/utils';
import AdminView from './users/admin/AdminView';
import SuperAdmin from './users/superAdmin/SuperAdminView';
import UserView from './users/user/UserView';


const Organization = () => {

  const user = getUserData()
  const organization = JSON.parse(localStorage.getItem('organization'));

  return (
    <Fragment>
     {user && user?.userType === 'super-admin' && (
      <SuperAdmin/>
     )}
     {organization && user && user?.organizations.find(x=>x.id===organization._id)?.userType === 'admin' && <AdminView organization={organization}/> }
     {organization && user &&  user?.organizations.find(x=>x.id===organization._id)?.userType === 'user' && <UserView organization={organization}/> }
    </Fragment>
  );
};

export default Organization;
