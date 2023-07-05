import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button, Input, Row } from 'reactstrap';

import DayView from './ListView';
import moment from 'moment';
import ListIncome from './ListIncome';


const months = [
  'January','February','March','April','May','June','July','August','September','October','November','December'
]
const years = [2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023]
function ToggleableView({type, incomeList, year, setYear, month, setMonth,total,upcoming,pastDue}) {
  const [isListView, setIsListView] = useState(true);
  

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
                  <h4>{type === "income" ? "INCOME" : "EXPENSE"} REPORT - {months[month] + " " + year}</h4>
                </div>
                <div className="income-total">
                  <span className="line-height-2" style={{ fontSize: '14px' }}>
                    PAST DUE :{' '}
                    <strong style={{ fontSize: '14px', color: 'red' }} className="income-amt-due">
                      $ {pastDue}
                    </strong>
                  </span>
                  <span className="line-height-2" style={{ fontSize: '14px', marginLeft: '5px' }}>
                    UPCOMING :
                    <strong style={{ fontSize: '14px' }} className="income-amt-coming">
                      ${upcoming}
                    </strong>
                  </span>
                  <span className="line-height-2" style={{ fontSize: '14px', marginLeft: '5px' }}>
                    TOTAL COLLECTED :
                    <strong
                      style={{ fontSize: '14px', color: 'green' }}
                      className="income-amt-collected"
                    >
                      ${Number(total).toFixed(2)}
                    </strong>
                  </span>
                </div>
              </div>

              <div className="d-flex flex-wrap">
                <div style={{ width: '120px' }}>
                  <Input  name="select" type="select">
                    <option>All {type === "income" ? "Income" : "Expense"}</option>
                    <option>In house Payment</option>
                    <option>Auto Payment</option>
                    <option>Product</option>
                  </Input>
                </div>
                <div>
                  <Input  name="select" type="select" value={month} onChange={(e) => setMonth(e.target.value)}>
                    {months.map((item,idx) => {
                      return <option key={idx} value={idx}>{item}</option>;
                    })}
                  </Input>
                </div>
                <div>
                  <Input  name="select" type="select" onChange={(e) => setYear(e.target.value)} value={year}>
                    {years.map((item) => {
                      return <option value={item}>{item}</option>;
                    })} 
                  </Input>
                </div>
                <div
                  className="form-check form-switch switch-income-data"
                  style={{ marginLeft: '5px' }}
                >
                  <input
                    className="form-check-input switch-data-income"
                    type="checkbox"
                    role="switch"
                    id="grid-list-switch"
                    checked={!isListView}
                    onChange={handleToggle}
                    
                  />
                  <label
                    className={`${isListView ? 'form-check-label-view' : 'form-check-label-day'}`}
                    checked={!isListView}
                    onChange={handleToggle}
                    htmlFor='grid-list-switch'
                  >
                   
                  </label>
                </div>
               
              </div>
            </div>
          </Row>
        </div>
      </div>
      {isListView ? <ListIncome type={type} incomeList={incomeList} month={month} year={year} /> : <DayView type={type} incomeList={incomeList} month={month} year={year}/>}
    </div>
  );
}

export default ToggleableView;
