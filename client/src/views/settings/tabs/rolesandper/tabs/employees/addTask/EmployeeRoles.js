import React, { Fragment, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
 
} from 'reactstrap';
import Select from 'react-select'
import { contactListRequest } from '../../../../../../contacts/store/actions';
import { setSelectedRoleReducer } from '../../../store/employee/reducer';

export default function EmployeeRoles({ stepper, task, setTask }) {
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  //get employee roles
  const store = useSelector((state) => state.roles);
  const storeEmployees = useSelector((state) => state.employeeContact);
  const rolesList = store?.rolesList;
  const dispatch = useDispatch();

  const handleOnSelect = (e) => {
    dispatch(setSelectedRoleReducer(rolesList.find((r) => r._id === e.target.value)));
    //select employees in the role
    let emp = storeEmployees.employeeList.data.list?.filter((x) => x.role === e.target.value);
    emp = emp.map(x=>{
      return {value:x._id,label:x.fullName}
    })
    setSelectedEmployees(emp);
    const empList = emp.map((x) => {
      return x.value;
    });

    setTask({ ...task, empRoleId: e.target.value, empIds: empList });
  };

  const handleAddRemoveEmployee = (e) => {

    let empList =[];
    for (const i of e) {
      empList.push(i.value)
    }

    setTask({ ...task, empList: empList });
  };
  useEffect(() => {
   
   
    dispatch(setSelectedRoleReducer(rolesList.find((r) => r._id === rolesList[0]?._id)));
    let emp = storeEmployees.employeeList.data.list?.filter((x) => x.role === rolesList[0]?._id);
    emp = emp.map(x=>{
      return {value:x._id,label:x.fullName}
    })
    setSelectedEmployees(emp);
    const empList = emp.map((x) => {
      return x.value;
    });
    setTask({ ...task, empRoleId: rolesList[0]?._id, empIds: empList });
  }, []);



  return (
    <Fragment>
      <div className="my-2">
        <FormGroup>
          <Label>Select employee role to add task to</Label>
          <Input type="select" onChange={handleOnSelect}>
            {rolesList.map((r, idx) => {
              return (
                <option key={idx} value={r._id}>
                  {r.roleName}
                </option>
              );
            })}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label>Employees</Label>
         
          <Select options={selectedEmployees} isMulti  onChange={handleAddRemoveEmployee} value={selectedEmployees.filter(x=>task.empIds.includes(x.value))}/>
        </FormGroup>
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
