import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import img5 from '@src/assets/images/portrait/small/avatar-s-4.jpg';
import { Card, Input, FormGroup, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../../../../@core/components/avatar';
import AvatarSizes from '../../../components/avatar/AvatarSizes';
import Sidebar from './Sidebar';
import '@styles/base/pages/workhistory.css';
// const weather = [Sun]
const times = [
  '2 AM',
  '4 AM',
  '6 AM',
  '8 AM',
  '10 AM',
  '12 PM',
  '2 PM',
  '4 PM',
  '6 PM',
  '8 PM',
  '10 PM',
  '0 AM'
];

const DayCalender = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [currentDate, setCurrentDate] = useState(moment());
  const [days, setDays] = useState([]);
  const [isShowPersonModal, setIsShowPersonModal] = useState(false);
  const [showModalId, setShowModalId] = useState(null);
  const [showWorkHistoryData, setShowWorkHistoryData] = useState(null);

  const allHistoryData = useSelector((state) => state.employeeContact.workAllHistory);
  let currentData = [];

  if (allHistoryData.allHistory != 0) {
    allHistoryData.allHistory.allhistory.map((item, index) => {
      const new_data = {
        _id: item._id,
        name: item.fullName,
        // workType: item.workType,
        tracker: 0,
        startTime: 0,
        endTime: 0,
        history: []
      };
      if (item.history.length != 0) {
        const currentDayData = item.history.filter((timedata) => {
          const convertDate = new Date(timedata.startTime);
          const d = new Date();
          let is_current = false;
          if (convertDate.getMonth() == d.getMonth() && convertDate.getDay() == d.getDay())
            is_current = true;
          return is_current;
        });
        new_data.history = currentDayData;

        if (currentDayData.length != 0) {
          let total_mins = 0;
          currentDayData.map((i) => {
            const i_start = new Date(i.startTime);
            const start_mins = i_start.getHours() * 60 + i_start.getMinutes();
            const i_end = new Date(i.endTime);
            const end_mins = i_end.getHours() * 60 + i_end.getMinutes();
            total_mins = total_mins + end_mins - start_mins;
          });
          new_data.tracker = total_mins;
          const first = new Date(currentDayData[0].startTime);
          const firstTime = first.getHours() * 60 + first.getMinutes();
          const last = new Date(currentDayData[currentDayData.length - 1].endTime);
          const lastTime = last.getHours() * 60 + last.getMinutes();
          new_data.startTime = firstTime;
          new_data.endTime = lastTime;
        }
      }
      currentData.push(new_data);
    });
  }

  // Use the current date to calculate the next 7 days to display
  useEffect(() => {
    const daysInWeek = [];
    for (let i = 0; i < 12; i++) {
      daysInWeek.push(moment().add(i, 'days'));
    }
    setDays(daysInWeek);
  }, []);

  const handlePageChange = (event) => {
    setSelectedPage(parseInt(event.target.value));
  };

  const showOneHistory = (userId) => {
    setIsShowPersonModal(true);
    setShowModalId(userId);
    const selectedData = currentData.find((item) => item._id === userId);
    setShowWorkHistoryData(selectedData);
  };
  const toggleSidebar = () => setIsShowPersonModal(!isShowPersonModal);
  const indexOfLastPost = selectedPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const displayData = currentData.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Fragment>
      <Card>
        <div className="w-100 rounded">
          <table className="w-100 ">
            <thead>
              <tr>
                <th scope="col" className="cursor-pointer text-center" style={{ width: '20%' }}>
                  <span>Status & Name</span>
                </th>
                <th scope="col" className="cursor-pointer text-center" style={{ width: '10%' }}>
                  <span>Time Tracked</span>
                </th>
                <th scope="col" className="cursor-pointer text-center" style={{ width: '10%' }}>
                  <span>Time Start</span>
                </th>
                <th scope="col" className="cursor-pointer text-center" style={{ width: '10%' }}>
                  <span>Time End</span>
                </th>
                {times.map((day) => (
                  <th className="cursor-pointer text-end ms-1">
                    <span style={{ fontWeight: '200' }}> {day}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayData.map((item, i) => {
                const stateNum = Math.floor(Math.random() * 6),
                  states = [
                    'light-success',
                    'light-danger',
                    'light-warning',
                    'light-info',
                    'light-primary',
                    'light-secondary'
                  ],
                  color = states[stateNum];
                return (
                  <tr key={i} onClick={() => showOneHistory(item._id)}>
                    <th className="border cursor-pointer">
                      <div className="d-flex p-1 text-center">
                        <Avatar
                          className="me-1 text-center workhistory"
                          color={color}
                          content={item.name}
                          style={{
                            width: '38px',
                            height: '38px',
                            padding: 'auto',
                            fontSize: '16px'
                          }}
                          // id={`av-tooltip-${data.name}`}
                          initials
                        />
                        <div className="text-center" style={{ marginTop: '10px' }}>
                          <h5 className="font-weight-bold">{item.name}</h5>
                        </div>
                      </div>
                    </th>
                    <th className="border cursor-pointer text-center">
                      {parseInt(item.tracker / 60)}h {item.tracker % 60}m
                    </th>
                    <th className="border cursor-pointer text-center">
                      {parseInt(item.startTime / 60) < 10 ? '0' : ''}
                      {parseInt(item.startTime / 60)}:
                      {parseInt(item.startTime % 60) < 10 ? '0' : ''}
                      {item.startTime % 60}
                    </th>
                    <th className="border cursor-pointer text-center">
                      {parseInt(item.endTime / 60) < 10 ? '0' : ''}
                      {parseInt(item.endTime / 60)}:{parseInt(item.endTime % 60) < 10 ? '0' : ''}
                      {item.endTime % 60}
                    </th>
                    <th className="border cursor-pointer">
                      {item.history.length != 0 &&
                        item.history.map((time, index) => {
                          const window_width = screen.width;
                          const start = new Date(time.startTime);
                          const end = new Date(time.endTime);
                          const startDiff = start.getHours() * 60 + start.getMinutes();
                          const duration =
                            end.getHours() * 60 +
                            end.getMinutes() -
                            start.getHours() * 60 -
                            start.getMinutes();
                          return (
                            <div
                              key={index}
                              style={{
                                position: 'absolute',
                                marginLeft: `calc(50%*${startDiff}/1440)`,
                                width: `calc(50%*${duration}/1440)`,
                                height: '20px',
                                backgroundColor: '#27c26c'
                              }}
                            ></div>
                          );
                        })}
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
                  </tr>
                );
              })}
            </tbody>

            <FormGroup
              style={{
                width: '100px',
                position: 'absolute',
                right: '35px',
                display: 'flex',
                bottom: '0'
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
              >
                {Array.from({ length: Math.ceil(currentData.length / postsPerPage) }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </table>
        </div>
        <div className="d-flex p-1">
          <div className="d-flex p-1">
            <div style={{ background: '#27c26c', height: '20px', width: '20px' }}></div>
            <p style={{ marginLeft: '10px' }}>Remote Time</p>
          </div>
          <div className="d-flex p-1">
            <div style={{ background: '#f7b82f', height: '20px', width: '20px' }}></div>
            <p style={{ marginLeft: '10px' }}>Manual Time</p>
          </div>
          <div className="d-flex p-1">
            <div style={{ background: '#3c4ad9', height: '20px', width: '20px' }}></div>
            <p style={{ marginLeft: '10px' }}>Rest Time</p>
          </div>
          <div className="d-flex p-1">
            <div style={{ background: '#a4a7b2', height: '20px', width: '20px' }}></div>
            <p style={{ marginLeft: '10px' }}>Ideal Time</p>
          </div>
        </div>
      </Card>
      {isShowPersonModal && (
        <Sidebar
          open={isShowPersonModal}
          userId={showModalId}
          data={showWorkHistoryData}
          times={times}
          toggleSidebar={toggleSidebar}
        />
      )}
    </Fragment>
  );
};

export default DayCalender;
