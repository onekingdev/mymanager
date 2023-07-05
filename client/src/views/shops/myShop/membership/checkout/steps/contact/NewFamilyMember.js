import React, { useState } from 'react'
import { Button, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { addFamilyContactAction, addFamilyToContactAction } from '../../../../../store/action'
import { useSelector } from 'react-redux'

export default function NewFamilyMember({open,toggle,dispatch,setFamilyMembers,familyMembers,primaryMember}) {
    const [form,setForm] = useState()

    const contactStore = useSelector(state=>state.totalContacts)
    
    const handleFormChange = (e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    const handleSubmitForm = ()=>{
        //save to contact 
       
        let contactType = contactStore.contactTypeList.find(x=>x.type==='client')
        dispatch(addFamilyContactAction({...form,contactType:[contactType._id]})).then(res=>{
            setFamilyMembers([...familyMembers,{...res.contact,relation:form.relation}])
            //set family
            dispatch(addFamilyToContactAction({id:res.contact._id,relation:form.relation,contactId:primaryMember._id}))
        })
    }

  return (
    <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New Family Member</ModalHeader>
        <ModalBody>
            <div>
                <Label>Name</Label>
                <Input type='text' name='fullName' onChange={handleFormChange}/>
            </div>
            <div>
                <Label>Email</Label>
                <Input type='text' name='email' onChange={handleFormChange}/>
            </div>
            <div>
                <Label>Date of Birth</Label>
                <Input type='date' name='dob' onChange={handleFormChange}/>
            </div>
            <div>
                <Label>Gender</Label>
                <div className='d-flex justify-content-start'>
                    <div >
                        <Input type='radio' name='gender' value='male' className='me-25' onClick={handleFormChange}/>
                        <Label>Male</Label>
                    </div>
                    <div className='ms-1'>
                    <Input type='radio' name='gender' value='female' className='me-25' onClick={handleFormChange}/>
                        <Label>Female</Label>
                    </div>
                </div>
            </div>
            <div>
                <Label>Relation</Label>
                <Input type='text' name='relation' onChange={handleFormChange}/>
            </div>
            <div className='d-flex justify-content-end mt-1'>
                <Button color='primary' onClick={handleSubmitForm}>Add Family Member</Button>
            </div>
        </ModalBody>
    </Modal>
  )
}
