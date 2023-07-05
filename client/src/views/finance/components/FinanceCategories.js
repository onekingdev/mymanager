// ** Custom Components
import Avatar from '@components/avatar';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** Icons Imports
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label
} from 'reactstrap';
import AddIncome from './AddIncome';


const months = [
  'January','February','March','April','May','June','July','August','September','October','November','December'
]

const FinanceCategories = ({year,month,setMonth,categories,total,type,dispatch}) => {

  const renderTransactions = () => {
    return categories?.map((item) => {
      return (
        <div key={item.title} className="transaction-item">
          <div className="d-flex">
            {/* <Avatar className="rounded" color={item.color} icon={<item.Icon size={18} />} /> */}
            <Avatar className="rounded" color={item.labelColor} icon={<Icon.DollarSign size={18} />}/>
            <div className="d-flex align-items-center">
              <p className="transaction-title">{item.title}</p>
              {/* <small>{item.subtitle}</small> */}
            </div>
          </div>
          <div className={`fw-bolder ${item.amount<=0 ? 'text-danger' : 'text-success'}`}>
          $ {item.amount.toFixed(2)}
          </div>
        </div>
      );
    });
  };

  return (
    <Card className="card-transaction">
      <CardHeader>
        <div>
          <CardTitle tag="h5">{months[month] + " " + year} </CardTitle>
          <div>Income by Type</div>
        </div>
        <div className="d-flex">
          <div className="d-flex">
            <div>
              <Input name="select" type="select" value={month} onChange={(e) => setMonth(e.target.value)}>
                {months.map((item,idx) => {
                  return (<option key={idx} value={idx}>{item}</option>)
                })}
              </Input>
            </div>
          </div>
          <AddIncome
            type={type}
            categories={categories}
            dispatch={dispatch}
          />
        </div>
      </CardHeader>
      <CardBody>
        <div className="pb-2 border-bottom">{renderTransactions()}</div>
        <div className="pt-2">
          <div  className="transaction-item">
            <div className="d-flex">
              <Avatar
                className="rounded"
                color='light-danger'
                icon={<Icon.TrendingUp size={18} />}
              />
              <div className="d-flex align-items-center">
                <h6 className="transaction-title">Total {type==='expense'?'Expenses':'Income'}</h6>
                {/* <small>{transactionsArr[2].subtitle}</small> */}
              </div>
            </div>
            <div
              className={`fw-bolder ${total<=0 ? 'text-danger' : 'text-success'}`}
            >
              $ {Number(total).toFixed(2)}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default FinanceCategories;
