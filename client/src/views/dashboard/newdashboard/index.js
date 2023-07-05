import React, { useEffect, useState } from 'react';
import Header from './component/Header';
import {
  Button,
  Card,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  UncontrolledDropdown
} from 'reactstrap';
import { FaTools } from 'react-icons/fa';
import MainDashboardPage from './component';
import { Folder } from 'react-feather';
import OnBoarding from '../../onboarding';
import Select from 'react-select';

function index() {
  const [selectedOption, setSelectedOption] = useState('Dashboard');
  const [users] = useState([
    { label: 'Dashboard', value: 'Dashboard' },
    { label: 'Onboarding', value: 'Onboarding' }
  ]);
  const handleOptionChange = (selected) => {
    setSelectedOption(selected.value);
  };
  return (
    <>
      <div style={{ background: 'rgb(67 112 251 / 95%)', height: selectedOption === 'Onboarding' ? '200px' : '500px' }}>
        <Row>
          <Col md={12}>
            <div className="d-flex justify-content-between p-1">
              <div className="d-flex m-2">
                <Folder size={24} style={{ color: '#fff', marginTop: '5px' }} />
                <h1 style={{ marginLeft: '10px' }} className="text-white">
                  {selectedOption}
                </h1>
              </div>
              <Select
                className="dashboard-dropdown"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    width: '150px',
                    height: '4px',
                    border: '1px solid #fff',
                    background: '#fff'
                  })
                }}
                value={users.find((user) => user.value === selectedOption)}
                options={users}
                onChange={handleOptionChange}
              />
            </div>
          </Col>
        </Row>
        {selectedOption === 'Dashboard' && <Header />}
      </div>
      <div style={{ margin: '10px' }}>
        {selectedOption === 'Dashboard' ? <MainDashboardPage /> : <OnBoarding />}
      </div>
    </>
  );
}

export default index;
