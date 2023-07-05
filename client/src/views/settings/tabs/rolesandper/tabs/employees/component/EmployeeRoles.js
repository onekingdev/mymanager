import React, { Fragment } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { useSelector } from 'react-redux';
import {
  Button,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';

export default function EmployeeRoles({ stepper,task,setTask }) {
  //get employee roles
  const store = useSelector((state) => state.roles);
  const rolesList = store?.rolesList;

  const handleOnSelect = (role)=>{
    setTask({...task,empRoleId:role});
  }

  return (
    <Fragment>
      <div className='my-2'>
      <Label>Select employee role to add task to</Label>
      <ListGroup tag="div" className="list-group-labels" style={{overflow:"scroll"}}>
        {rolesList.map((r, idx) => {
          return (
            <ListGroupItem key={idx}>
              <Input type="radio" name='roles' onChange={()=>handleOnSelect(r._id)}/>
              <Label className='ms-1'>{r.roleName}</Label>
            </ListGroupItem>
          );
        })}
      </ListGroup>
      </div>
      <div className="d-flex justify-content-between">
        <Button color="primary" className="btn-prev" disabled>
          <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">Previous</span>
        </Button>
        <Button color="primary" className="btn-next" onClick={() => stepper.next()}>
          <span className="align-middle d-sm-inline-block d-none">Next</span>
          <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
        </Button>
      </div>
    </Fragment>
  );
}
