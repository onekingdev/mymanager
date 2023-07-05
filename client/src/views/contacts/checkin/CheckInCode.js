import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { MdTouchApp, MdBarcodeReader, MdPhotoCameraFront } from 'react-icons/md';
import NumPad from './NumPad';
import BarCode from './BarCode';
import FaceRecognition from './FaceRecognition';
import { getEmployeeAttendanceAction } from '../store/actions';

const CheckInCode = (props) => {
  const { attendEmpArr, setAttendEmpArr } = props;
  const dispatch = useDispatch();

  const [active, setActive] = useState('1');

  useEffect(() => {
    dispatch(getEmployeeAttendanceAction());
  }, []);

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  return (
    <div className="h-100 w-100 d-flex justify-content-center">
      <div>
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
  );
};

export default CheckInCode;
