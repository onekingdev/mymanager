import React, { useState } from 'react'
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { updateElementAction } from '../store/action'


export default function EditElementModal({open,toggle,element,dispatch}) {
    const [elem,setElem] = useState(element)
    const handleChange = (e)=>{
        setElem({...elem, elementTitle:e.target.value})
    }
    const updateElement = ()=>{
        dispatch(updateElementAction(elem))
    }
  return (
    <Modal isOpen={open} toggle={toggle}>
        <ModalHeader>Edit Element</ModalHeader>
        <ModalBody>
            <div>
                <Label>What do you want to show?</Label>
                <Input type='text' defaultValue={elem.elementTitle} onChange={handleChange}/>
            </div>

        </ModalBody>
        <ModalFooter>
            <div className='d-flex justify-content-between'>
                <Button color='primary' onClick={updateElement}>Submit</Button>
            </div>
        </ModalFooter>
    </Modal>
  )
}
