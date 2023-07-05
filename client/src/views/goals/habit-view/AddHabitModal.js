import React from 'react'
import { Modal } from 'reactstrap'
import AddHabit from './AddHabit'


export default function AddHabitModal({open,toggle,type,task}) {
  return (
    <Modal isOpen={open} toggle={toggle}>
<AddHabit open={open} toggle={toggle} type={type} task={task}/>
    </Modal>
  )
}
