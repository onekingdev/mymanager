import { Fragment, useState } from 'react';

import GoogleFb from './googleFb';
import Sidebar from './Sidebar';

import '@styles/react/apps/app-email.scss';
import '../../../assets/styles/reputation.scss';

const Advancesettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="overflow-hidden email-application">
      <GoogleFb />
      <div className="content-overlay"></div>
      <div
        className="content-area-wrapper  p-0 animate__animated animate__fadeIn"
        style={{
          display: 'inline',
          width: '100%',
          overflow: 'auto',
          padding: '0px 20px 0px 0px'
        }}
      >
        <Fragment>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </Fragment>
      </div>
    </div>
  );
};

export default Advancesettings;
