import { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// ** Custom components
import Sidebar from './components/Sidebar';
import Table from './components/Table';

// ** Custom actions
import { retentionFetchAction } from '../../settings/tabs/advancesettings/tabs/retention/store/actions';
import { getAllAttendance } from '../../calendar/attendance/store';
import { getAllNotesAction } from '../../contacts/store/actions';
import '@styles/react/apps/app-email.scss';

const Retention = () => {
  const dispatch = useDispatch();
  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [title, setTitle] = useState('0-6 Days');
  // ** Sidebars
  const [firstArrNum, setFirstArrNum] = useState(0);
  const [secondArrNum, setSecondArrNum] = useState(0);
  const [thirdArrNum, setThirdArrNum] = useState(0);
  const [fourthArrNum, setFourthArrNum] = useState(0);
  const [fifthArrNum, setFifthArrNum] = useState(0);
  // ** Effect
  useEffect(() => {
    dispatch(getAllAttendance());
    dispatch(getAllNotesAction());
    dispatch(retentionFetchAction());
  }, []);
  return (
    <>
      <Fragment>
        <Sidebar
          sidebarOpen={sidebarOpen}
          title={title}
          setTitle={setTitle}
          firstArrNum={firstArrNum}
          secondArrNum={secondArrNum}
          thirdArrNum={thirdArrNum}
          fourthArrNum={fourthArrNum}
          fifthArrNum={fifthArrNum}
        />
        <div className="content-right">
          <div className="content-body">
            <div>
              <Table
                title={title}
                setFirstArrNum={setFirstArrNum}
                setSecondArrNum={setSecondArrNum}
                setThirdArrNum={setThirdArrNum}
                setFourthArrNum={setFourthArrNum}
                setFifthArrNum={setFifthArrNum}
              />
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default Retention;
