/* eslint-disable no-unused-vars */
// ** React Imports
import { Link, useParams } from 'react-router-dom';
// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { useState } from 'react';
import moment from 'moment';

const InvoiceSidebar = ({invoices,setInvoices,store}) => {
  const [active, setactive] = useState('THIS MONTH');
  // ** Props
  const handleActiveItem = (value) => {
    if (active === value) {
      return true;
    } else {
      return false;
    }
  };
  const handlechange = (value) => {
    setactive(value);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content email-app-sidebar">

          <div className="email-app-menu">
            <div className="form-group-compose text-center compose-btn">
              <Button
                tag={Link}
                to={{
                  pathname: '/invoice/add',
                  state: {
                    type: 'add'
                  }
                }}
                color="primary"
                className='w-100'
              >
                Create Invoice
              </Button>
            </div>
            <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
              <ListGroup tag="div" className="list-group-messages">
              <ListGroupItem
                  className="cursor-pointer"
                  action
                  active={handleActiveItem('ALL INVOICES')}
                  onClick={() => {
                    handlechange('ALL INVOICES');
                    
                    setInvoices(store?.invoiceList)
                  }}
                >
                  <span className="align-middle">All Invoices</span>
                  <Badge className="float-end" color="light-primary" pill>
                    {
                      store?.invoiceList?.length
                    }
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  className="cursor-pointer"
                  action
                  active={handleActiveItem('This Week')}
                  onClick={() => {
                    handlechange('This Week');
                    const thisWeek = moment().week()
                    setInvoices(store?.invoiceList?.filter(x=>moment(x.dueDate).week()===thisWeek && moment(x.dueDate).year()===moment().year()))
                  }}
                >
                  <span className="align-middle">This Week</span>
                  <Badge className="float-end" color="light-primary" pill>
                    {
                      
                      store?.invoiceList?.filter(x=>moment(x.dueDate).week()===moment().week() && moment(x.dueDate).year()===moment().year()).length
                    }
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  className="cursor-pointer"
                  action
                  active={handleActiveItem('THIS MONTH')}
                  onClick={() => {
                    handlechange('THIS MONTH');
                    const thisMonth = moment().month()
                    setInvoices(store?.invoiceList?.filter(x=>moment(x.dueDate).month()===thisMonth && moment(x.dueDate).year()===moment().year()) )
                  }}
                >
                  <span className="align-middle">This Month</span>
                  <Badge className="float-end" color="light-primary" pill>
                    {store?.invoiceList?.filter(x=>moment(x.dueDate).month()===moment().month() && moment(x.dueDate).year()===moment().year()).length}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  className="cursor-pointer"
                  action
                  active={handleActiveItem('NEXT MONTH')}
                  onClick={() => {
                    handlechange('NEXT MONTH');
                    const nextMonth = moment().add(1,"month").month()
                    setInvoices(store?.invoiceList?.filter(x=>moment(x.dueDate).month()===nextMonth && moment(x.dueDate).year()===moment().year()))
                  }}
                >
                  <span className="align-middle">Next Month</span>
                  <Badge className="float-end" color="light-primary" pill>
                    {store?.invoiceList?.filter(x=>moment(x.dueDate).month()===moment().add(1,"month").month() && moment(x.dueDate).year()===moment().year()).length}
                  </Badge>
                </ListGroupItem>
              </ListGroup>
              <h6 className="section-label mt-3 mb-1 px-2">Status</h6>
              <ListGroup tag="div" className="list-group-labels">
                <ListGroupItem
                  className="cursor-pointer"
                  active={handleActiveItem('SENT')}
                  action
                  onClick={() => {
                    handlechange('SENT');
                    setInvoices(store?.invoiceList?.filter(x=>x.status==='SENT'))
                  }}
                >
                  <span className="bullet bullet-sm bullet-secondary me-1"></span>
                  SENT
                  <Badge className="float-end" color="light-secondary" pill>
                  {store?.invoiceList?.filter(x=>x.status==='SENT').length}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  className="cursor-pointer"
                  active={handleActiveItem('PAID')}
                  action
                  onClick={() => {
                    handlechange('PAID');
                    setInvoices(store?.invoiceList?.filter(x=>x.status==='PAID'))
                  }}
                >
                  <span className="bullet bullet-sm bullet-success me-1"></span>
                  PAID
                  <Badge className="float-end" color="light-secondary" pill>
                  {store?.invoiceList?.filter(x=>x.status==='PAID').length}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  className="cursor-pointer"
                  active={handleActiveItem('DRAFT')}
                  action
                  onClick={() => {
                    handlechange('DRAFT');
                    setInvoices(store?.invoiceList?.filter(x=>x.status==='DRAFT'))
                  }}
                >
                  <span className="bullet bullet-sm bullet-primary me-1"></span>
                  DRAFT
                  <Badge className="float-end" color="light-secondary" pill>
                  {store?.invoiceList?.filter(x=>x.status==='DRAFT').length}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  className="cursor-pointer"
                  active={handleActiveItem('DUE')}
                  onClick={() => {
                    handlechange('DUE');
                    setInvoices(store?.invoiceList?.filter(x=>x.status==='DUE'))
                  }}
                  action
                >
                  <span className="bullet bullet-sm bullet-danger me-1"></span>
                  DUE
                  <Badge className="float-end" color="light-secondary" pill>
                  {store?.invoiceList?.filter(x=>x.status==='DUE').length}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  className="cursor-pointer"
                  active={handleActiveItem('PARTIAL PAYMENT')}
                  onClick={() => {
                    handlechange('PARTIAL PAYMENT');
                    setInvoices(store?.invoiceList?.filter(x=>x.status==='PARTIAL PAYMENT'))
                  }}
                  action
                >
                  <span className="bullet bullet-sm bullet-warning me-1"></span>
                  PARTIAL PAYMENT
                  <Badge className="float-end" color="light-secondary" pill>
                  {store?.invoiceList?.filter(x=>x.status==='PARTIAL PAYMENT').length}
                  </Badge>
                </ListGroupItem>
              </ListGroup>
            </PerfectScrollbar>
          </div>
     
      </div>
    </div>
  );
};

export default InvoiceSidebar;
