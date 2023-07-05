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
import { progressionFetchAction } from '../../contacts/store/actions';

const Progression = () => {
  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ** Store Variables
  const dispatch = useDispatch();

  // ** Vars
  let ProgressionList = useSelector((state) => state?.totalContacts?.fetchProgressionData);
  useEffect(async () => {
    dispatch(progressionFetchAction());
  }, []);

  // ** UseEffect: GET initial data on Mount

  return (
    <>
      {ProgressionList ? (
        <div className="overflow-hidden email-application">
          <div className="content-overlay"></div>
          <div className="content-area-wrapper animate__animated animate__fadeIn">
            <Fragment>
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                ProgressionList={ProgressionList}
              />
            </Fragment>
          </div>
        </div>
      ) : (
        <center className="mt-4">
          <h3>No Progression to Display</h3>
        </center>
      )}
    </>
  );
};

export default Progression;
