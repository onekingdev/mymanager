import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import img5 from '@src/assets/images/portrait/small/avatar-s-4.jpg';
import { Card, Input, FormGroup, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import ShowWeekTimeLine from './ShowWeekTimeLine';
import Avatar from '../../../../@core/components/avatar';
import '@styles/base/pages/workhistory.css';

const WeekCalender = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [currentDate, setCurrentDate] = useState(moment());
  const [days, setDays] = useState([]);

  const allHistoryData = useSelector((state) => state.employeeContact.workAllHistory);

  useEffect(() => {
    const daysInWeek = [];
    for (let i = -6; i < 1; i++) {
      daysInWeek.push(moment().add(i, 'days'));
    }
    setDays(daysInWeek);
  }, [currentDate]);
  let currentData = [];
  if (allHistoryData.allHistory != 0) {
    allHistoryData.allHistory.allhistory.map((item, index) => {
      const new_data = {
        _id: item._id,
        name: item.fullName,
        tracker: 0,
        history: []
      };
      if (item.history.length != 0) {
        for (let i = 0; i < 7; i++) {
          const day_data = item.history.filter((item_data) => {
            const d = new Date(days[i]);
            const convertDate = new Date(item_data.startTime);
            let isMatch = false;
            if (convertDate.getMonth() == d.getMonth() && convertDate.getDay() == d.getDay())
              isMatch = true;
            return isMatch;
          });
          let total_mins = 0;
          if (day_data.length != 0) {
            day_data.map((j) => {
              const i_start = new Date(j.startTime);
              const start_mins = i_start.getHours() * 60 + i_start.getMinutes();
              const i_end = new Date(j.endTime);
              const end_mins = i_end.getHours() * 60 + i_end.getMinutes();
              total_mins = total_mins + end_mins - start_mins;
            });
          }
          new_data.history.push({ id: i, data: day_data, tracker: total_mins });
        }
        let total_min = 0;
        if (new_data.history.length != 0) {
          new_data.history.map((history) => {
            total_min = total_min + history.tracker;
          });
        }
        new_data.tracker = total_min;
      }
      currentData.push(new_data);
    });
  }

  const handlePageChange = (event) => {
    setSelectedPage(parseInt(event.target.value));
  };

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
                <th scope="col" className="cursor-pointer text-center">
                  <span>Status & Name</span>
                </th>
                <th scope="col" className="cursor-pointer text-center" style={{ width: '150px' }}>
                  <span>Time Tracked</span>
                </th>

                {days.map((day) => (
                  <th
                    className="cursor-pointer text-center"
                    key={day.format('MMM DD')}
                    style={{ padding: '5px' }}
                  >
                    <span>
                      <b>{day.format('ddd')}</b>
                    </span>
                    <br />
                    <span style={{ fontWeight: '200' }}> {day.format('MMM DD')}</span>
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
                  <tr key={i}>
                    <th className="border cursor-pointer" style={{ width: '200px' }}>
                      <div className="d-flex p-1">
                        <Avatar
                          className="me-1 text-center"
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
                    <ShowWeekTimeLine data={item.history} />
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
            <p style={{ marginLeft: '10px' }}>In house Time</p>
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
    </Fragment>
  );
};

export default WeekCalender;
