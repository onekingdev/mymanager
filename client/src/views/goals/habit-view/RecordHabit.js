import { useState } from 'react';

import {
  Button,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { actionPlanAddAction } from '../../taskngoals/store/actions';


const RecordHabit = ({task, toggle,isOpen,fullDate,workspaceId,closeMain}) => {
  const dispatch=useDispatch();
  const [notes,setNotes]=useState("");

  const cancleBtnClicked = () => {
   toggle()
  };
  const handleAdd=(e)=>{
    e.preventDefault()
    let payload ={}
    payload.action="accomplised"
    payload.date=fullDate;
    payload.description=notes;
    payload.status="done";
    dispatch(actionPlanAddAction(task._id,workspaceId._id,payload,true))
    cancleBtnClicked();
    closeMain(false);
  }
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggle}>Record a Habit</ModalHeader>
      <Form onSubmit={handleAdd}>
      <ModalBody>
        <div>
          <Label className="fs-6 form-label " for="validState">
            Are you sure to record habit?
          </Label>


        </div>

        <Label className="mt-1">Notes</Label>
        <Input onChange={(e)=>setNotes(e.target.value)}></Input>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          type="submit"
          
        >
          Submit
        </Button>
        <Button color="secondary" onClick={cancleBtnClicked}>
          Cancel
        </Button>
      </ModalFooter>
      </Form>
    </Modal>
  );
};

export default RecordHabit;
