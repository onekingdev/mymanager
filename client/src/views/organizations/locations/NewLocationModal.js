import React, { useState } from 'react'
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { addNewOrgLocationAction } from '../store/action'
import NewLocationForm from './NewLocationForm'


export default function NewLocationModal({open,toggle,selectedOrg,dispatch}) {
    const [form,setForm] = useState({})
  const handleInputChanged = (e)=>{
      setForm({...form,[e.target.name]:e.target.value})
  }
  const handleSubmit = ()=>{
    dispatch(addNewOrgLocationAction(selectedOrg._id,{...form}))
    toggle()
  }
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create New Location</ModalHeader>
      <ModalBody>
       
        <NewLocationForm form={form} handleInputChanged={handleInputChanged}/>
        
      </ModalBody>
      <ModalFooter>
        <div className='d-flex justify-content-end'>
            <Button color='primary' onClick={handleSubmit}>
                Create
            </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}
