import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane, Button } from 'reactstrap';
import { BsX } from 'react-icons/bs';
import NumPad from './NumPad';
import BarCode from './BarCode';
import FaceRecognition from './FaceRecognition';
import { getBudgetAction } from '../schedule/store/actions';
import { useGetAllAttendEmployee } from '../../../requests/contacts/employee-contacts';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MdTouchApp, MdBarcodeReader, MdPhotoCameraFront } from 'react-icons/md';

const NotAuthorizedPunchEmployeeView = (props) => {
  const { attendEmpArr, setAttendEmpArr } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  // ** States
  const [active, setActive] = useState('1');
  const [faceRecogEnable, setFaceRecogEnable] = useState(false);
  // ** Redux Store
  const employeeScheduleState = useSelector((state) => state?.employeeSchedule);
  const options = employeeScheduleState?.budgets?.salesProjected[0];

  // ** Effects
  useEffect(() => {
    dispatch(getBudgetAction());
  }, []);
  // *** Face IO Login
  let faceio;
  useEffect(() => {
    faceio = new faceIO('fioade66');
  }, []);

  useEffect(() => {
    setFaceRecogEnable(options?.faceRecog);
  }, [options]);

  const handleLogIn = async () => {
    try {
      let response = await faceio.authenticate({
        locale: 'auto'
      });

  
    } catch (error) {
      console.log(error);
    }
  };

  // ** Handlers
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const handleCloseClick = (e) => {
    history.goBack();
  };

  return (
    <>
      <div className="dark-layout employee-checkin">
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            color="custom"
            className="btn-check-close position-absolute zindex-4 p-25"
            style={{ color: '#d0d2d6' }}
            onClick={(e) => handleCloseClick(e)}
          >
            <BsX size={35} />
          </Button>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="h-100 w-100 d-flex justify-content-center">
              <div className="checkIn-wrapper">
                <Nav tabs className="mb-2 justify-content-center">
                  <NavItem>
                    <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                      <MdTouchApp size={30} className="mr-0" />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                      <MdBarcodeReader size={30} className="mr-0" />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                      <MdPhotoCameraFront size={30} className="mr-0" />
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={active}>
                  <TabPane tabId="1">
                    <NumPad />
                  </TabPane>
                  <TabPane tabId="3">
                    <BarCode />
                  </TabPane>
                  <TabPane tabId="4">
                    <FaceRecognition />
                  </TabPane>
                </TabContent>
              </div>
            </div>
          </div>
        </div>
        {faceRecogEnable ? (
          <p className="mt-3">
            If you want Face Recognition authentication, Please
            <a href="#" className="text-primary" onClick={(e) => handleLogIn()}>
              {' '}
              click here{' '}
            </a>
          </p>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default NotAuthorizedPunchEmployeeView;
