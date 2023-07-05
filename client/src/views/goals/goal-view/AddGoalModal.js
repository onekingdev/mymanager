import React from 'react'
import { Modal } from 'reactstrap'
import AddGoal from './AddGoal'

export default function AddGoalModal({ open, toggle, type, task,workspaceId }) {
  return (
    <Modal isOpen={open} toggle={toggle} >
      <AddGoal open={open} toggle={toggle} type={type} task={task} workspaceId={workspaceId} />
    </Modal>
  )
}
