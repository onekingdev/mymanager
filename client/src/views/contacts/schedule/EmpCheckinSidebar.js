import { Label, Button, Form } from 'reactstrap';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { X } from 'react-feather';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Modal, ModalHeader, ModalBody } from 'reactstrap';

// import { useState } from 'react';
// import NameSearch from '../checkin/NameSearch';
import NumPad from '../checkin/NumPad';
import BarCode from '../checkin/BarCode';
import FaceRecognition from '../checkin/FaceRecognition';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BiFullscreen } from 'react-icons/bi';
import { MdTouchApp, MdBarcodeReader, MdPhotoCameraFront } from 'react-icons/md';

const EmpCheckinSidebar = ({ sidebarOpen, toggleSidebar, setSidebarOpen }) => {
  const [active, setActive] = useState('1');
  const [hasFullScreen, setHasFullScreen] = useState(false);
  // ** Redux Store
  const { userData } = useSelector((state) => state.auth);
  const { contactList } = useSelector((state) => state.employeeContact);

  useEffect(() => {
    if (userData.userType == 'super-admin' || userData.role == 'admin') {
      setHasFullScreen(true);
    }
  }, [userData]);

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  //** Handlers
  const handleSidebarClosed = (e) => {
    setSidebarOpen(false);
  };
  return (
    <Modal
      isOpen={sidebarOpen}
      toggle={toggleSidebar}
      contentClassName="overflow-hidden pt-0 employee-check-modal"
      modalClassName="modal-slide-in"
      onClosed={handleSidebarClosed}
      className="sidebar-lg"
    >
      <ModalHeader className="mb-1 align-items-center" toggle={toggleSidebar} tag="div">
        <h5 className="modal-title">
          <span className="align-middle">Check In</span>
        </h5>
        {hasFullScreen ? (
          <Link to="/employee/checkin">
            <BiFullscreen size={15} className="full-screen" />
          </Link>
        ) : (
          <></>
        )}
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <ModalBody className="flex-grow-1">
          <div>
            <div className="dark-layout" style={{ margin: '5% auto 10%' }}>
              <div className="card">
                <div className="card-body">
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
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </PerfectScrollbar>
    </Modal>
  );
};

export default EmpCheckinSidebar;
