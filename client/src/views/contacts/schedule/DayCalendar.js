/* eslint-disable no-unused-vars */
import { ChevronDown, ChevronUp, Sun, User } from 'react-feather';
import img5 from '@src/assets/images/portrait/small/avatar-s-4.jpg';
import AddEmpolye from './AddEmpolye';
import {
  Row,
  Col,
  Badge,
  Card,
  FormGroup,
  Label,
  Input,
  Button,
  NavLink,
  TabContent,
  TabPane,
  Nav
} from 'reactstrap';
import { Fragment, useEffect, useState } from 'react';
import BudetTool from './BudgetTool';
import LaborTool from './LaborTool';
import moment from 'moment';

const times = [
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm',
  '8pm',
  '9pm',
  '10pm',
  '11pm',
  '12am',
  '1am'
];
const data = [
  {
    id: 1,
    name: 'Antanio S',
    tracker: 0,
    startTime: '00:00',
    endTime: '00:00'
  },
  {
    id: 2,
    name: 'Antanio S',
    tracker: 0,
    startTime: '00:00',
    endTime: '00:00'
  },

  {
    id: 3,
    name: 'Antanio S',
    tracker: 0,
    startTime: '00:00',
    endTime: '00:00'
  },
  {
    id: 4,
    name: 'Antanio S',
    tracker: 0,
    startTime: '00:00',
    endTime: '00:00'
  },
  {
    id: 5,
    name: 'Antanio S',
    tracker: 0,
    startTime: '00:00',
    endTime: '00:00'
  },
  {
    id: 6,
    name: 'Antanio S',
    tracker: 0,
    startTime: '00:00',
    endTime: '00:00'
  },
  {
    id: 7,
    name: 'Antanio S',
    tracker: 0,
    startTime: '00:00',
    endTime: '00:00'
  },
  {
    id: 8,
    name: 'Antanio S',
    tracker: 0,
    startTime: '00:00',
    endTime: '00:00'
  }
];

const DayCalender = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [currentDate, setCurrentDate] = useState(moment());
  const [days, setDays] = useState([]);
  const [openfooter, setopenfooter] = useState(false);
  const [active, setActive] = useState('1');
  const toggle = (tab) => {
    setActive(tab);
    setopenfooter(true);
  };

  const handleClickOpen = () => {
    setopenfooter(!openfooter);
  };

  // Use the current date to calculate the next 7 days to display
  useEffect(() => {
    const daysInWeek = [];
    for (let i = 0; i < 12; i++) {
      daysInWeek.push(moment().add(i, 'days'));
    }
    setDays(daysInWeek);
  }, [currentDate]);

  const handlePageChange = (event) => {
    setSelectedPage(parseInt(event.target.value));
  };

  const indexOfLastPost = selectedPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const displayData = data.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Fragment>
      <Card>
        <div className="w-100 rounded p-1">
          <h5>Day Calendar</h5>
          <table className="w-100 ">
            <thead>
              <tr className="border cursor-pointer">
                <th className="border cursor-pointer" width={'250'}>
                  <div className="d-flex">
                    <div className="m-1">
                      <AddEmpolye />
                      {/* <button className="btn btn-primary">Add Employee</button> */}
                    </div>
                    <div
                      className="d-flex align-items-center text-secondary"
                    >
                      <div>
                        <div>
                          <Sun size={16} />
                          <span>30° F</span>
                        </div>
                        <div>
                          <User size={16} />
                          <span> 16</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </th>
                {times.map((day) => (
                  <th className="border cursor-pointer text-center">
                    <h5 style={{ fontWeight: '500' }}> {day}</h5>
                    <div className='mt-1 text-secondary'>
                      <User size={16} />
                      <span> 6</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border">
                <th className="border cursor-pointer p-2">Opening Shift Server</th>
              </tr>
              <tr className="border">
                <th className="border cursor-pointer p-2">Opening Shift Manager</th>
              </tr>
              {displayData.map((item, i) => (
                <tr key={i}>
                  <th className="border cursor-pointer">
                    <div className="d-flex p-1">
                      <img
                        src={img5}
                        className="rounded-circle me-2"
                        alt="Generic placeholder image"
                        height="40"
                        width="40"
                      />
                      <div className="ml-1 ">
                        <h5 className="font-weight-bold">{item.name}</h5>
                        <span style={{ fontSize: '12px' }}>$0.00 - $0.00</span>
                      </div>
                    </div>
                  </th>
                  <th className="border cursor-pointer">
                    <div
                      style={{
                        width: '200px',
                        position: 'absolute',
                        background: 'green',
                        height: '20px',
                        marginLeft: '10px',
                        color: '#fff',
                        textAlign: 'center'
                      }}
                    >
                      <span>07: 15am - 10:30am</span>
                    </div>
                  </th>
                  <th className="border cursor-pointer"></th>
                  <th className="border cursor-pointer"></th>
                  <th className="border cursor-pointer"></th>
                  <th className="border cursor-pointer"></th>
                  <th className="border cursor-pointer">
                    <div
                      style={{
                        width: '150px',
                        position: 'absolute',
                        background: 'green',
                        height: '20px',
                        marginLeft: '10px',
                        color: '#fff',
                        textAlign: 'center'
                      }}
                    >
                      <span>11: 15am - 1:45pm</span>
                    </div>
                  </th>
                  <th className="border cursor-pointer"></th>
                  <th className="border cursor-pointer"></th>
                  <th className="border cursor-pointer"></th>
                  <th className="border cursor-pointer"></th>
                  <th className="border cursor-pointer"></th>
                  <th className="border cursor-pointer"></th>
                  <th className="border cursor-pointer"></th>
                  <th className="border cursor-pointer"></th>
                  <th className="border cursor-pointer"></th>
                  <th className="border cursor-pointer"></th>
                  <th className="border cursor-pointer"></th>
                  <th className="border cursor-pointer"></th>
                  <th className="border cursor-pointer"></th>
                </tr>
              ))}
            </tbody>
          </table>
          <FormGroup
            style={{
              width: '100px',
              marginTop: '10px',
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Label for="pageSelect" style={{ marginTop: '8px' }}>
              Page:
            </Label>
            <Input
              type="select"
              name="pageSelect"
              id="pageSelect"
              value={selectedPage}
              onChange={handlePageChange}
              style={{ width: '100px' }}
            >
              {Array.from({ length: Math.ceil(data.length / postsPerPage) }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Input>
          </FormGroup>
        </div>
      </Card>
      <div>
        <div className="d-flex justify-content-between h-100">
          <div className="shadow bg-white cursor-pointer">
            <Nav tabs className="p-0">
              <NavLink
                active={active === '1'}
                className="rounded"
                onClick={() => {
                  toggle('1');
                }}
              >
                Budget Tool
              </NavLink>
              <NavLink
                active={active === '2'}
                className="rounded"
                onClick={() => {
                  toggle('2');
                }}
              >
                Optimal Labor
              </NavLink>
            </Nav>
          </div>

          <div className="d-flex">
            <Input type="select">
              <option value={'hello'}>Actual This Week</option>
              <option value={'hello'}>Actual This Week</option>
              <option value={'hello'}>Actual This Week</option>
              <option value={'hello'}>Actual This Week</option>
            </Input>
            <div onClick={handleClickOpen} className="shadow bg-white cursor-pointer p-1">
              {openfooter ? <ChevronDown /> : <ChevronUp />}
            </div>
          </div>
        </div>
        <div className="w-100 shadow bg-white h-100">
          <TabContent activeTab={active}>
            <TabPane tabId="1">
              <div className="w-100 shadow bg-white rounded">
                <BudetTool openfooter={openfooter} />
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="w-100 shadow bg-white rounded">
                <LaborTool openfooter={openfooter} />
              </div>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </Fragment>
  );
};

export default DayCalender;
