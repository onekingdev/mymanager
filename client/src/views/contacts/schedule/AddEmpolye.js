import React, { useState } from 'react';
import {
  FormText,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Col,
  Form
} from 'reactstrap';
import { Input } from 'reactstrap';
import EmployeeTable from './EmployeeTable';
import { saveEmpArrToMapAction } from '../store/actions';
import { useDispatch } from 'react-redux';

const AddEmpolye = (props) => {
  // tmp
  const { empArrToMap, setEmpArrToMap } = props;
  const dispatch = useDispatch();
  // const [state, setState] = useState({});
  const [unassignedEmployeeArr, setUnassignedEmployeeArr] = useState([]);
  const [existingOpen, setExistingOpen] = useState(false);

  const [data, setdata] = React.useState([
    {
      employename: '',
      hourlywegas: '',
      rolestheyperform: '',
      phone: '',
      email: ''
    }
  ]);
  const handleAddRow = () => {
    let copy = [...data];
    const item = {
      employename: '',
      hourlywegas: '',
      rolestheyperform: '',
      phone: '',
      email: ''
    };
    copy.push(item);
    setdata(copy);
  };
  const handleClickOpen = () => {
    setExistingOpen(!existingOpen);
  };
  const handleClose = () => {
    setExistingOpen(false);
  };
  const handleSaveClick = (e, unassignedEmployeeArr) => {
    dispatch(saveEmpArrToMapAction(unassignedEmployeeArr));
    handleClose();
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleClickOpen}>
        Add Employee
      </button>

      <Modal isOpen={existingOpen} toggle={handleClickOpen} size="lg">
        <ModalHeader toggle={handleClose}>Employee Assignment</ModalHeader>
        <ModalBody>
          <Row>
            <EmployeeTable
              unassignedEmployeeArr={unassignedEmployeeArr}
              setUnassignedEmployeeArr={setUnassignedEmployeeArr}
            />
          </Row>
        </ModalBody>
        <ModalFooter>
          <button className="btn" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={(e) => handleSaveClick(e, unassignedEmployeeArr)}
          >
            Save
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddEmpolye;
