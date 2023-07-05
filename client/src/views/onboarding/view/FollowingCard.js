import React, { useState } from 'react';
import { Users } from 'react-feather';
import { BsCardChecklist, BsFillCalendar3WeekFill, BsTree } from 'react-icons/bs';
import { FaDollyFlatbed, FaUserFriends, FaUsers } from 'react-icons/fa';
import { GiTargetShot } from 'react-icons/gi';
import { GrUserSettings } from 'react-icons/gr';
import { Badge, Button, Card, CardBody, CardHeader, Col, Input, Progress, Row } from 'reactstrap';

const data = [
  {
    id: 1,
    title: 'Gym Programs, level and ranks',
    icon: <Users size={24} />
  },
  {
    id: 2,
    title: 'Set up billing and payment processing',
    icon: <FaDollyFlatbed size={24} />
  },

  {
    id: 3,
    title: 'Set up the membership options and pricing',
    icon: <FaUsers size={24} />
  },
  {
    id: 4,
    title: 'Add and import member data',
    icon: <FaUserFriends size={24} />
  },
  {
    id: 5,
    title: 'Set up the weekly training schedule',
    icon: <BsCardChecklist size={24} />
  },
  {
    id: 6,
    title: 'Set up public business website',
    icon: <BsFillCalendar3WeekFill size={24} />
  }
];

function FollowingCard() {
  const [checkedItems, setCheckedItems] = useState([]);
  const [progressValue, setProgressValue] = useState(0);
  const totalItems = 6;

  const handleCheckboxChange = (index) => {
    const updatedCheckedItems = [...checkedItems];
    if (updatedCheckedItems.includes(index)) {
      // Uncheck the checkbox
      const itemIndex = updatedCheckedItems.indexOf(index);
      updatedCheckedItems.splice(itemIndex, 1);
    } else {
      // Check the checkbox
      updatedCheckedItems.push(index);
    }
    setCheckedItems(updatedCheckedItems);

    // Update progress value and completed count
    const completedCount = updatedCheckedItems.length;
    const newProgressValue = (completedCount / totalItems) * 100;
    setProgressValue(newProgressValue);
  };

  const isItemChecked = (index) => {
    return checkedItems.includes(index);
  };

  return (
    <Card className="p-2">
      <div>
        <div className="d-flex">
          <GiTargetShot size={18} color="primary" />
          <h4>Getting Started</h4>
        </div>
        <span>Complete the following steps to get the most out of your account.</span>
      </div>
      <div className="mt-0">
        <Row>
          <Col md={9}>
            <Progress
              className="my-2"
              value={progressValue}
              style={{
                height: '20px'
              }}
            />
          </Col>
          <Col md={3} className="my-2">
            <h4>
              Completed {checkedItems.length} out of {totalItems}
            </h4>
          </Col>
        </Row>
      </div>
      <div>
        {data.map((item) => (
          <Card
            key={item.id}
            className="m-1 p-1 mb-0"
            style={{
              background: isItemChecked(item.id - 1) ? 'rgba(23, 74, 231, 0.12)' : 'white',
              color: isItemChecked(item.id - 1) ? '#174ae7' : '#000',
              border: isItemChecked(item.id - 1) ? '1px solid #174ae7' : '1px solid #ebe9f1'
            }}
          >
            <div style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
              <div className="d-flex align-items-center">
                <Input
                  type="checkbox"
                  checked={isItemChecked(item.id - 1)}
                  onChange={() => handleCheckboxChange(item.id - 1)}
                />
                <div style={{ marginLeft: '20px', display: 'flex' }}>
                  {item.icon}
                  <h4
                    className="mb-50"
                    style={{
                      color: isItemChecked(item.id - 1) ? '#174ae7' : '#000',
                      fontWeight: 'bolder',
                      marginLeft: '20px'
                    }}
                  >
                    {item.title}
                  </h4>
                </div>
              </div>
              <button
                className="btn"
                style={{
                  background: isItemChecked(item.id - 1) ? 'rgb(40, 199, 111)' : '#174ae7',
                  color: isItemChecked(item.id - 1) ? '#fff' : '#fff'
                }}
              >
                Start
              </button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}

export default FollowingCard;
