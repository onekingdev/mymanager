import React from 'react';
import { Modal } from 'reactstrap';
import EditGoal from './EditGoal';

export default function EditGoalModal({ open, toggle, type, task }) {
  return (
    <Modal isOpen={open} toggle={toggle}>
      <EditGoal open={open} toggle={toggle} type={type} task={task} />
    </Modal>
  );
}
