// ** React Imports
import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';

// ** Email App Component Imports

import Sidebar from './Sidebar';

// ** Third Party Components

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';

import PerfectScrollbar from 'react-perfect-scrollbar';
// ** Styles
import '@styles/react/apps/app-email.scss';
import { initialRetentinAddAction } from './tabs/retention/store/actions';

const Advancesettings = () => {
  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ** Store Variables
  const dispatch = useDispatch();

  // ** Vars
  useEffect(() => {
    dispatch(initialRetentinAddAction())
  }, [])

  return (
    <div className="overflow-hidden email-application">
      <div className="content-overlay"></div>
      <div className="content-area-wrapper p-0 animate__animated animate__fadeIn">
        <Fragment>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </Fragment>
      </div>
    </div>
  );
};

export default Advancesettings;
