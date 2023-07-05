import { Fragment, useState, useEffect } from 'react';

import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import {
  AiOutlineQrcode,
  AiOutlineBarcode,
  AiOutlineUnorderedList,
  AiOutlineScan
} from 'react-icons/ai';

import '@src/assets/styles/taskandgoal-setting.scss';

import QRCodeSetting from './QRCode/index';
import BarcodeSetting from './Barcode/index';

import CodeLibrary from './Library';
import Scanner from './Scan';

const Setting = (props) => {
  const [settingIndex, setSettingIndex] = useState('1');

  const toggleTab = (tab) => {
    if (settingIndex !== tab) {
      setSettingIndex(tab);
    }
  };

  return (
    <Row className="setting">
      <Col md="2" sm="12" className="setting-right-side">
        <Nav pills vertical className="mt-1">
          <NavItem>
            <NavLink
              className="justify-content-start"
              active={settingIndex === '1'}
              onClick={() => toggleTab('1')}
            >
              {/* <GiRank2 className="font-medium-1 me-50" /> */}
              <AiOutlineQrcode size={20} className="mb-30" />
              <span className="fs-5">QR Code</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="justify-content-start"
              active={settingIndex === '2'}
              onClick={() => toggleTab('2')}
            >
              {/* <GiRank2 className="font-medium-1 me-50" /> */}
              <AiOutlineBarcode size={20} className="mb-30" />
              <span className="fs-5">Barcode</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="justify-content-start"
              active={settingIndex === '3'}
              onClick={() => toggleTab('3')}
            >
              {/* <GiRank2 className="font-medium-1 me-50" /> */}
              <AiOutlineUnorderedList size={20} className="mb-30" />
              <span className="fs-5">Library</span>
            </NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink
              className="justify-content-start"
              active={settingIndex === '4'}
              onClick={() => toggleTab('4')}
            >
              <AiOutlineScan size={20} className="mb-30" />
              <span className="fs-5">Scan</span>
            </NavLink>
          </NavItem> */}
        </Nav>
      </Col>
      <Col md="10" sm="12" className="setting-left-side">
        <TabContent activeTab={settingIndex}>
          <TabPane tabId="1">
            <QRCodeSetting />
          </TabPane>
          <TabPane tabId="2">
            <BarcodeSetting />
          </TabPane>
          <TabPane tabId="3">
            <CodeLibrary />
          </TabPane>
          <TabPane tabId="4">
            <Scanner />
          </TabPane>
        </TabContent>
      </Col>
    </Row>
  );
};

export default Setting;
