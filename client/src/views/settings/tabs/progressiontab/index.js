// ** React Imports

import {  Fragment, useState } from 'react';

// ** Email App Component Imports

import Sidebar from './Sidebar';

// ** Styles
import '@styles/react/apps/app-email.scss';

const Progressiontab = () => {
  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="overflow-hidden email-application">
      <div className="content-overlay"></div>
      <div className="content-area-wrapper  animate__animated animate__fadeIn">
        <Fragment>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </Fragment>
      </div>
    </div>
  );
};

export default Progressiontab;
