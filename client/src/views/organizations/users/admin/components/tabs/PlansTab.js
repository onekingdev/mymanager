import React, { Fragment, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ArrowUp, CreditCard, Lock, Plus } from 'react-feather';
import { BiUpArrow } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { Badge, Button, Card, CardBody, Col, Row } from 'reactstrap';
import { convertDate } from '../../../../../goals/helpers/converters';
import NewPlanModal from '../../../../plans/create/NewPlanModal';
import PaymentModal from '../PaymentModal';

const ExpandedRows = ({data})=>{
  return (
   <div className='p-1'>
    <p>{data?.description}</p>
   <h6>Benefits</h6>
   <ul>
   {
    data?.benefits?.map((x,idx)=>{
      return <li key={idx}>{x}</li>
    })
   }
   </ul>
   {data?.payByUser===true ? <p>Amount divides between all users</p>:<p>Your users use benefits free</p>}
   <ul>
    {
      data?.permissions?.map((x,idx)=>{
        return <>
        {x.read === true && x.write===true && x.delete===true && x.update===true &&  <li key={idx}>Full Access to {x.elementTitle}</li>}
        
        </>
      })
    }
   </ul>
   </div>
  )
}
export default function PlansTab({ plans }) {
  const [openPayment,setOpenPayment] = useState(false)
  const [selectedRow,setSelectedRow] = useState()

  const togglePayModal =()=>setOpenPayment(!openPayment)

  const handleViewPermissions =(row)=>{

  }
  const statusColor ={
    waiting:'light-warning',
    active:'light-success',
    suspended:'light-danger',

  }
  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name,
      width: '10%'
    },
    {
      name: 'Trial',
      selector: (row) => row.trialTime,
      width: '10%'
    },
    {
      name: 'Monthly',
      selector: (row) => row.pricePerMonth,
      width: '15%',
      cell: (row) => <span>{row?.pricePerMonth} $/Month</span>
    },
    {
      name: 'Yearly',
      selector: (row) => row.pricePerYear,
      width: '15%',
      cell: (row) => <span>{row?.pricePerYear} $/Year</span>
    },
    {
      name: 'Start At',
      selector: (row) => row.createdAt,
      width: '15%',
      cell: (row) => <span>{convertDate(row?.createdAt)}</span>
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      width: '10%',
      cell:(row)=><Badge color={`${statusColor[row.status]}`}>{row.status}</Badge>
    },
    {
      name: 'Actions',
      selector: (row) => row._id,
      width: '20%',
      cell:(row)=> <div className='d-flex justify-content-between'>
        
        <CreditCard size="18" className='text-success mx-50' style={{cursor:"pointer"}} onClick={()=>{setSelectedRow(row); togglePayModal()}}/>
        <ArrowUp size="18" className='text-primary mx-50' style={{cursor:"pointer"}} onClick={()=>{toast.success("For upgrading your plan please contact support")}}/>
      </div>
    },
  ];
  
  return (
    <Fragment>
      <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
          <div className="task-application">
            {plans ? (
              <div className="list-group task-task-list-wrapper">
           
                <DataTable
                  noHeader
                  responsive
                  className="react-dataTable"
                  columns={columns}
                  data={plans}
                  expandableRows
                  expandableRowsComponent={ExpandedRows}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </Col>
      </Row>
      {selectedRow && <PaymentModal open={openPayment} toggle={togglePayModal} plan={selectedRow}/>}
    </Fragment>
  );
}
