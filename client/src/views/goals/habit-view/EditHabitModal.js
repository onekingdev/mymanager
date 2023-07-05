import React from 'react'
import { Modal } from 'reactstrap'
import EditHabit from './EditHabit'



export default function EditHabitModal({open,toggle,type,task}) {
  return (
    <Modal isOpen={open} toggle={toggle}>
<EditHabit open={open} toggle={toggle} type={type} task={task}/>
    </Modal>
  )
}
