import React, { Fragment, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Card, Col, Input, Row } from 'reactstrap';
import { updatePlanByIdAction } from '../../store/action';

export default function PermissionForm({dispatch,toggle , org,location}) {
    const [permissions, setPermissions] = useState([]);
    const [locationPermissions,setLocationPermissions] = useState([]);

  const handleSubmitPermissions = ()=>{
    const planDetailsId = org.plans[org.plans.length - 1]._id
    let planPer = org.planDetails.find(x=>x._id===planDetailsId).permissions
    locationPermissions.map(x=>{
      if(x===planPer.defaultId){
        planPer.locationIds.push(location._id)
      }
    })
    //update plan 
    dispatch(updatePlanByIdAction(planDetailsId,{permissions:planPer}))
  }

  const handleOnChange = (e, row) => {
    let p = permissions;
    p = permissions.map((x) => {
      let i = x;
      if (i.defaultId === row.defaultId) {
        i = { ...i, [e.target.name]: e.target.checked };
        if (e.target.checked === false) {
          i.locationIds.push(location._id)
          setLocationPermissions([...locationPermissions,i.defaultId])
        }
        else {
          setLocationPermissions(locationPermissions.filter(x=>x!==i.defaultId))
        }
      }
      return i;
    });
    setPermissions(p);
  };
  useEffect(()=>{

    setPermissions(org.plans[org.plans.length - 1].permissions.filter(x=>x.read===true))
  },[location])

  const columns = [
    {
      name: 'MODULE',
      selector: (row) => row.defaultId,
      width: '20%',
      cell: (row) => (
        <div className="d-flex justify-content-between w-100">
           <span>{row.elementTitle}</span>
        </div>
      )
    },
    {
      name: 'READ',
      selector: (row) => row.read,
      width: '20%',
      cell: (row) => (
        <Input
          type="checkbox"
          checked={row?.read}
          name="read"
          onChange={(e) => handleOnChange(e, row)}
        />
      )
    },
    
  ];
  const ExpandedRow = (data) => {
    let p = permissions.filter((x) => x.elementParent === data.data.defaultId && (x.read===true || x.locationIds.includes(location._id)));

    return (
      <>
        <Card>
          <DataTable
            striped
            noHeader
            responsive
            className="react-dataTable"
            columns={columns}
            data={p}
          />
        </Card>
      </>
    );
  };
  const rowPreDisabled = (row) =>
    permissions.filter((x) => x.elementParent === row.defaultId).length === 0;

  return (
    <Fragment>
    <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
      <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
        <div className="task-application">
          <div className="list-group task-task-list-wrapper">
          <DataTable
                striped
                noHeader
                responsive
                className="react-dataTable"
                columns={columns}
                data={permissions.filter((x) => x.elementParent === null)}
                expandableRows
                expandableRowDisabled={rowPreDisabled}
                expandableRowsComponent={ExpandedRow}
              />
            
          </div>
        </div>
      </Col>
    </Row>
    <div className="d-flex justofy-conten-end">
      <Button color="primary mt-50" onClick={handleSubmitPermissions}>
        Set Permissions
      </Button>
    </div>
  </Fragment>
  )
}
