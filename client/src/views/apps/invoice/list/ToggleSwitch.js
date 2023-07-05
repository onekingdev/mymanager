import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Input, Row } from 'reactstrap';
import ListIncome from './ListIncome';
import DayView from './ListView';

const monthNames = [
  { key: 0, name: 'January', year: 2010 },
  { key: 1, name: 'February', year: 2011 },
  { key: 2, name: 'March', year: 2012 },
  { key: 3, name: 'April', year: 2013 },
  { key: 4, name: 'May', year: 2014 },
  { key: 5, name: 'June', year: 2015 },
  { key: 6, name: 'July', year: 2016 },
  { key: 7, name: 'August', year: 2017 },
  { key: 8, name: 'September', year: 2018 },
  { key: 9, name: 'October', year: 2019 },
  { key: 10, name: 'November', year: 2020 },
  { key: 11, name: 'December', year: 2021 }
];

function ToggleableView(props) {
  const [isListView, setIsListView] = useState(true);
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState();
  const [active, setActive] = useState('2');

  const locationPath = useLocation();
  const isExpenseSection = locationPath.pathname === '/finance/expense';

  const handleToggleChange = (e) => {
    setActive(e.target.checked ? '2' : '3');
  };

  const [isChecked, setIsChecked] = useState(false);

  const items = [
    { id: 1, title: 'Item 1' },
    { id: 2, title: 'Item 2' },
    { id: 3, title: 'Item 3' }
  ];

  const handleToggle = () => {
    setIsListView(!isListView);
  };

  return (
    <div>
      <div className="d-flex">
        <div className="invoice-list-table-header w-100 py-2 p-1">
          <Row className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between ">
              <div>
                <div className="filter-title">
                  <h4>EXPENSE REPORT - September 2023</h4>
                </div>
                <div className="income-total">
                  <span className="line-height-2" style={{ fontSize: '14px' }}>
                    PAST DUE :{' '}
                    <strong style={{ fontSize: '14px', color: 'red' }} className="income-amt-due">
                      $0.00
                    </strong>
                  </span>
                  <span className="line-height-2" style={{ fontSize: '14px', marginLeft: '5px' }}>
                    UPCOMING :
                    <strong style={{ fontSize: '14px' }} className="income-amt-coming">
                      ${'2200'}
                    </strong>
                  </span>
                  <span className="line-height-2" style={{ fontSize: '14px', marginLeft: '5px' }}>
                    TOTAL COLLECTED :
                    <strong
                      style={{ fontSize: '14px', color: 'green' }}
                      className="income-amt-collected"
                    >
                      ${'2000'}
                    </strong>
                  </span>
                </div>
              </div>

              <div className="d-flex flex-wrap">
                <div style={{ width: '120px' }}>
                  <Input id="exampleSelect" name="select" type="select">
                    <option>All Income</option>
                    <option>In house Payment</option>
                    <option>Auto Payment</option>
                    <option>Product</option>
                  </Input>
                </div>
                <div>
                  <Input id="exampleSelect" name="select" type="select">
                    {monthNames.map((item) => {
                      return <option>{item?.name}</option>;
                    })}
                  </Input>
                </div>
                <div>
                  <Input id="exampleSelect" name="select" type="select">
                    {monthNames.map((item) => {
                      return <option>{item?.year ? year : item?.year}</option>;
                    })}
                  </Input>
                </div>
                <div
                  className="form-check form-switch switch-income-data"
                  style={{ marginLeft: '5px' }}
                >
                 <input
                    className="form-check-input switch-data"
                    type="checkbox"
                    role="switch"
                    id="grid-list"
                    checked={!isListView}
                    onChange={handleToggle}
                    
                  />
                  <label
                    className={`${isListView ? 'form-check-label-view' : 'form-check-label-day'}`}
                    checked={!isListView}
                    onChange={handleToggle}
                    htmlFor='grid-list'
                  >
                    {isListView ? 'Day' : 'Month'}
                  </label>
                </div>
                {/* <Button
                  className="btn btn-sm"
                  color="primary"
                  style={{ height: '40px', marginLeft: '5px' }}
                >
                  Filter
                </Button> */}
              </div>
            </div>
          </Row>
        </div>
      </div>
      {isListView ? <ListIncome /> : <DayView />}
    </div>
  );
}

export default ToggleableView;
