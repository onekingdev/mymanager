import React, { Fragment, useEffect, useState } from 'react';
import WeekCalender from './WeekCalender';
import EmpWeekCalendar from './EmpWeekCalendar';
import DayCalendar from './DayCalendar';
import { Button, TabContent, TabPane, Card } from 'reactstrap';

import { useSelector } from 'react-redux';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
const EmployeeCalender = () => {
  // ** Constants
  const colors = ['purple', 'yellow', 'orange', 'brown', 'black', 'red', 'green', 'pink'];

  // ** States

  const [inputList, setInputList] = React.useState([]);
  const [inputWeekList, setInputWeekList] = useState([]);
  const [employeeAddList, setEmployeeAddList] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [active, setActive] = useState('week');
  const [arrToMap, setArrToMap] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // ** Redux Store
  const { userData } = useSelector((state) => state.auth);
  // ** Handlers
  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const handlePreviousMonth = () => {
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(previousMonth);
  };

  const addEmployeeFiledInCalendar = (e) => {
    setEmployeeAddList(
      employeeAddList.concat(
        <tr>
          <td id="sub">
            <div className="d-flex p-1">
              <Avatar src="/static/images/avatar/1.jpg" />
              <div className="ml-1">
                <h5 className="font-weight-bold">Antanio S</h5>
                <span>0.00 - $0.00</span>
              </div>
            </div>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      )
    );
  };

  const onAddBtnClick = (event) => {
    setInputWeekList(
      inputWeekList.concat(
        <tr
          style={{ background: colors[inputWeekList.length % colors.length] }}
          className="jobs_column"
        >
          <td className="ml-1" style={{ border: 'none' }}>
            Open
          </td>
          <td style={{ border: 'none' }}></td>
          <td style={{ border: 'none' }}></td>
          <td style={{ border: 'none' }}></td>
          <td style={{ border: 'none' }}></td>
          <td style={{ border: 'none' }}></td>
          <td style={{ border: 'none' }}></td>
          <td style={{ border: 'none' }}></td>
        </tr>
      )
    );
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Card>
      <div className="d-flex justify-content-between">
        <div
          className="d-flex align-items-center text-success m-1"
          style={{ borderRadius: '5px', height: '40px' }}
        >
          <FaAngleLeft size={28} className="text-secondary" onClick={handlePreviousMonth} />
          <FaAngleRight size={28} className="text-secondary" onClick={handleNextMonth} />
          <h3 className="p-1 text-secondary" style={{ marginTop: '10px', color: '#fff' }}>
            <b>{currentMonth.toLocaleString('default', { month: 'long' })}</b>
          </h3>
        </div>
        <div className="d-flex m-2" role="group" aria-label="Basic example">
          <Button
            active={active === 'week'}
            onClick={() => {
              toggle('week');
            }}
            type="button"
            color="primary"
            className="me-75"
            outline
          >
            week
          </Button>
          <Button
            active={active === 'day'}
            onClick={() => {
              toggle('day');
            }}
            type="button"
            color="primary"
            outline
          >
            Day
          </Button>
          {userData.role == 'employee' || userData.userType !== 'super-admin' ? (
            <></>
          ) : (
            <Button
              onClick={() => {
                toggleSidebar();
              }}
              className="ms-1"
              type="button"
              color="primary"
              outline
            >
              Check In
            </Button>
          )}
        </div>
      </div>
      <div>
        <div className="col-md-12 calenders">
          <TabContent className="py-0" activeTab={active}>
            <TabPane tabId="day">
              <DayCalendar
                inputList={inputList}
                inputWeekList={inputWeekList}
                employeeAddList={employeeAddList}
                addEmployeeFiledInCalendar={addEmployeeFiledInCalendar}
              />
            </TabPane>
            <TabPane tabId="week">
              {userData.role == 'employee' || userData.userType !== 'super-admin' ? (
                <EmpWeekCalendar
                  employeeAddList={employeeAddList}
                  onAddBtnClick={onAddBtnClick}
                  inputWeekList={inputWeekList}
                  addEmployeeFiledInCalendar={addEmployeeFiledInCalendar}
                  arrToMap={arrToMap}
                  setArrToMap={setArrToMap}
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  toggleSidebar={toggleSidebar}
                />
              ) : (
                <WeekCalender
                  employeeAddList={employeeAddList}
                  onAddBtnClick={onAddBtnClick}
                  inputWeekList={inputWeekList}
                  addEmployeeFiledInCalendar={addEmployeeFiledInCalendar}
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  toggleSidebar={toggleSidebar}
                  arrToMap={arrToMap}
                  setArrToMap={setArrToMap}
                />
              )}
            </TabPane>
          </TabContent>
        </div>
      </div>
    </Card>
  );
};

export default EmployeeCalender;
