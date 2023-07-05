import React, { memo, useState } from 'react';
import { ListGroup, Col } from 'reactstrap';
import Select from 'react-select';
// ** Utils
import { selectThemeColors } from '@utils';

function ProfileAvatar({ handleEventType }) {
  const [currentPlan, setCurrentPlan] = useState({
    value: '',
    label: 'Select Type'
  });
  const planOptions = [
    { value: 'Clients', label: 'Clients' },
    { value: 'Employee', label: 'Employee' },
    { value: 'Leads', label: 'Leads' },
    { value: 'Relationships', label: 'Relationships' },
    { value: 'Vendor', label: 'Vendor' }
  ];

  return (
    <ListGroup className="pt-2 align-itmes-center" style={{marginBottom: "10px !important"}}>
      <div className="d-flex">
        <Col xs="6" sm="6">
          <h4 className="chat-list-title text-primary" style={{ marginTop: '10px' }}>
            Contacts
          </h4>
        </Col>
        <Col xs="6" sm="6" style={{ paddingRight: '10px' }}>
          <Select
            theme={selectThemeColors}
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
            options={planOptions}
            value={currentPlan}
            onChange={(data) => {
              handleEventType(data), setCurrentPlan(data);
            }}
          />
        </Col>
      </div>
    </ListGroup>
  );
}

export default memo(ProfileAvatar);
