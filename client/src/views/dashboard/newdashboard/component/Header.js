import React, { Fragment, useState } from 'react';
import { Folder } from 'react-feather';
import { Col, Input, Label, Row } from 'reactstrap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

import './style.css';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';

const data = [
  { key: 1, name: 'Mon', uv: 100, pv: 100, amt: 100 },
  { key: 2, name: 'Tue', uv: 180, pv: 180, amt: 180 },
  { key: 3, name: 'Wed', uv: 110, pv: 110, amt: 100 },
  { key: 4, name: 'Thu', uv: 110, pv: 110, amt: 100 },
  { key: 5, name: 'Fri', uv: 110, pv: 110, amt: 100 },
  { key: 6, name: 'Sat', uv: 110, pv: 110, amt: 100 },
  { key: 7, name: 'Sun', uv: 110, pv: 110, amt: 100 }
];

function Header() {
  // Existing users list

  return (
    <Fragment>
      
      <Row>
        <Col md={5}>
          <h4 className="text-white m-2">Payments this month</h4>
          <Row className="m-2">
            <Col md={4} className="text-white progress-bar-dashboard">
              <CircularProgressbarWithChildren
                value={29}
                styles={buildStyles({
                  pathColor: '#05BFDB',
                  trailColor: '#DAF5FF'
                })}
                style={{ width: '100px', height: '100px' }}
              >
                <div style={{ fontSize: 16, marginTop: -5, color: '#fff' }}>
                  <strong>$3,749.00</strong>
                </div>
              </CircularProgressbarWithChildren>

              <Label
                className="text-white"
                style={{ fontSize: 16, marginTop: '15px', marginLeft: '30px' }}
              >
                Scheduled
              </Label>
            </Col>
            <Col md={4} className="text-white progress-bar-dashboard">
              <CircularProgressbarWithChildren
                value={66}
                styles={buildStyles({
                  pathColor: '#5D9C59',
                  trailColor: '#DAF5FF'
                })}
                style={{ width: '100px !important', height: '100px' }}
              >
                <div style={{ fontSize: 16, marginTop: -5, color: '#fff' }}>
                  <strong>$3,749.00</strong>
                </div>
              </CircularProgressbarWithChildren>
              <Label
                className="text-white"
                style={{ fontSize: 16, marginTop: '15px', marginLeft: '40px' }}
              >
                Paid
              </Label>
            </Col>
            <Col md={4} className="text-white progress-bar-dashboard">
              <CircularProgressbarWithChildren
                value={10}
                styles={buildStyles({
                  pathColor: 'red',
                  trailColor: '#DAF5FF'
                })}
                style={{ width: '100px', height: '100px' }}
              >
                <div style={{ fontSize: 16, marginTop: -5, color: '#fff' }}>
                  <strong>$3,749.00</strong>
                </div>
              </CircularProgressbarWithChildren>
              <Label
                className="text-white"
                style={{ fontSize: 16, marginTop: '15px', marginLeft: '30px' }}
              >
                Overdue
              </Label>
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <h4 className="text-white">Atetendance</h4>
          <div style={{ width: '100%', maxWidth: '700px' }} className="chart-container">
            <BarChart width={700} className="chart" height={250} data={data}>
              <XAxis dataKey="name" stroke="#fff" />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <CartesianGrid
                stroke="rgb(218 218 218"
                strokeDasharray="0"
                horizontal={true}
                vertical={false}
              />
              <Bar
                dataKey="uv"
                barSize={30}
                fill="url(#colorGradient)" // Specify the gradient URL
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B9EDDD" />
                  <stop offset="95%" stopColor="#8696FE" />
                </linearGradient>
              </defs>
            </BarChart>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
}

export default Header;
