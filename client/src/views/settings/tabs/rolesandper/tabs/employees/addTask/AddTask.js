import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import TaskType from './TaskType'


export default function AddTask({open,toggle}) {
  const[task,setTask] = useState({});

  return (
    <Modal
      isOpen={open}
      toggle={toggle}
      fullscreen="lg"
      size="lg"
      centered="true"
      scrollable="false"
    >
      <ModalHeader toggle={toggle}>Add Employee Task</ModalHeader>
      <ModalBody style={{ padding: 0 }}>
        <TaskType setTask={setTask} task = {task} toggle={toggle}/>
      </ModalBody>
    </Modal>
  );
}
