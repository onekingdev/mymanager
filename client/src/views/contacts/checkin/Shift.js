import React, { useState, useEffect } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import ShiftItem from './ShiftItem';
import { getAllEmployeeShiftAction } from '../schedule/store/actions';
const Shift = () => {
  const dispatch = useDispatch();
  const employeeShiftList = useSelector((state) => state.employeeSchedule.shifts?.shiftList);
  const [progressList, setProgressList] = useState([]);
  const [upcomingList, setUpcomingList] = useState([]);
  useEffect(() => {
    dispatch(getAllEmployeeShiftAction());
  }, []);
  useEffect(() => {
    let today = new Date(),
      tmpProgressList = [],
      tmpUpcomingList = [];
    employeeShiftList &&
      employeeShiftList.map((eachShift, index) => {
        if (eachShift.weekDay == today.getDay()) {
          tmpProgressList.push(eachShift);
        } else if (eachShift.weekDay == today.getDay() + 1) {
          tmpUpcomingList.push(eachShift);
        } else return;
      });
    setProgressList(tmpProgressList);
    setUpcomingList(tmpUpcomingList);
  }, [employeeShiftList]);
  const [active, setActive] = useState('1');
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div>
      <Nav tabs className="mb-2 ">
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <span className="fs-6">In Progress</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            {/* <span className="fs-6">My Forms</span> */}
            <span className="fs-6">Upcoming</span>
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={active}>
        <TabPane tabId="1">
          {progressList.map((progressShift, index) => {
            return <ShiftItem shift={progressShift} key={'progress' + index} />;
          })}
        </TabPane>
        <TabPane tabId="2">
          {upcomingList.map((upcomingShift, index) => {
            return <ShiftItem shift={upcomingShift} key={'progress' + index} />;
          })}
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Shift;
