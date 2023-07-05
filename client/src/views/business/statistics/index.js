// ** React Imports
import { Fragment, useState } from 'react';

// ** Email App Component Imports

import Sidebar from './components/Sidebar';


// ** Styles
import '@styles/react/apps/app-email.scss';

const Progression = () => {
  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ** UseEffect: GET initial data on Mount

  return (
    <Fragment>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </Fragment>
  );
};

export default Progression;
