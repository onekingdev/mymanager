import React, { useEffect, useState } from 'react';
import { Col, Input, Label } from 'reactstrap';

const timeArr = [
  '12 AM',
  '1 AM',
  '2 AM',
  '3 AM',
  '4 AM',
  '5 AM',
  '6 AM',
  '7 AM',
  '8 AM',
  '9 AM',
  '10 AM',
  '11 AM',
  '12 PM',
  '1 PM',
  '2 PM',
  '3 PM',
  '4 PM',
  '5 PM',
  '6 PM',
  '7 PM',
  '8 PM',
  '9 PM',
  '10 PM',
  '11 PM'
];

const getDateFromDateTimeAttribute = (element) => {
  const dateTime = element?.attributes?.attributes?.endTime || Date.now();
  return new Date(dateTime);
};

function msToHMS(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 7);
  const weeks = Math.floor(ms / (1000 * 60 * 60 * 24 * 7));

  return {
    days,
    weeks,
    hours: hours < 10 ? `0${hours}` : hours,
    minutes: minutes < 10 ? `0${minutes}` : minutes,
    seconds: seconds < 10 ? `0${seconds}` : seconds
  };
}

function formatDateAsTime(dateObj) {
  const hour = dateObj.getHours();
  const isPM = hour >= 12;
  const displayHour = hour % 12 || 12;
  const timeString = `${displayHour} ${isPM ? 'PM' : 'AM'}`;
  return timeString;
}

function updateElementTime(element, time) {
  const spanDomElem = document.createElement('span');
  spanDomElem.innerHTML = element?.attributes?.content;
  const pTimeDom = spanDomElem.querySelector('[testId]');
  if (pTimeDom) {
    pTimeDom.innerHTML = time;
    element.set({ content: spanDomElem.innerHTML });
  }
}
export default function CountDownSetting({ getSelectedHtmlElement }) {
  const element = getSelectedHtmlElement();
  const [endDate, setEndDate] = useState(getDateFromDateTimeAttribute(element));

  useEffect(() => {
    const oldTimerId = element?.attributes?.attributes.timerId;
    if (oldTimerId) {
      clearInterval(oldTimerId);
    }
    const timerId = setInterval(() => {
      const endTime = endDate.getTime();
      const currentTime = Date.now();
      const timeLeftinMS = endTime - currentTime;
      if (timeLeftinMS < 0) {
        clearInterval(timerId);
        return;
      }
      const { days, weeks, hours, seconds, minutes } = msToHMS(timeLeftinMS);
      const hoursElement = element.find('div[type="HOURS"]')[0];
      const secondsElement = element.find('div[type="SECONDS"]')[0];
      const minutesElement = element.find('div[type="MINUTES"]')[0];
      const daysElement = element.find('div[type="DAYS"]')[0];
      const weeksElement = element.find('div[type="WEEKS"]')[0];
      updateElementTime(hoursElement, hours);
      updateElementTime(minutesElement, minutes);
      updateElementTime(secondsElement, seconds);
      updateElementTime(daysElement, days);
      updateElementTime(weeksElement, weeks);
    }, 1000);
    element.addAttributes({ timerId: timerId });
  }, [endDate.getTime()]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newDate = new Date();
    if (name === 'date') {
      newDate = new Date(value);
      newDate.setHours(endDate.getHours());
    } else {
      const [time, amOrPM] = value.split(' ');
      const updatedTime = amOrPM == 'AM' ? Number(time) : Number(time) + 12;
      endDate.setHours(updatedTime);
      newDate.setTime(endDate.getTime());
    }
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    setEndDate(newDate);
    element.addAttributes({ endTime: newDate.getTime() });
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>End Date</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input
            name="date"
            value={endDate.toISOString().slice(0, 10)}
            type="date"
            onChange={handleChange}
          />
        </Col>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-1">
        <Col xl="6" xs="6">
          <Label>End Time</Label>
        </Col>
        <Col xl="6" xs="6">
          <Input
            name="time"
            value={formatDateAsTime(endDate)}
            type="select"
            onChange={handleChange}
          >
            {timeArr.map((x, idx) => {
              return (
                <option key={idx} value={x}>
                  {x}
                </option>
              );
            })}
          </Input>
        </Col>
      </div>
    </>
  );
}
