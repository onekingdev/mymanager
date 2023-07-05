import React, { useEffect } from 'react'
import { Paperclip } from 'react-feather';
import { useDispatch } from 'react-redux'
import { Button, DropdownItem, DropdownMenu, DropdownToggle, Form, Input, Label, Modal, ModalBody, ModalHeader, UncontrolledDropdown } from 'reactstrap'
import { updateTaskByUserAction } from '../../../store/employee/action';


import { setSelectedTaskReducer } from '../../../store/employee/reducer';

export default function EditTask({open,toggle,store,dispatch,toggleView}) {
   
    const statusList = [
        {
            name:"Approve",
            value:"approved",
            color:"light-success"
        },
        {
            name:"Decline",
            value:"declined",
            color:"light-warning"
        },
        {
            name:"Reject",
            value:"reject",
            color:"light-danger"
        },
        {
            name:"Pending",
            value:"pending",
            color:"light-primary"
        },
    ]
    const handleOnChange = (e)=>{
        dispatch(setSelectedTaskReducer({...store.selectedTask,[e.target.name]:e.target.value}))
        // setRow({...row,[e.target.name]:e.target.value})
    }
    const handleStatusChanged = (value)=>{
 
        dispatch(setSelectedTaskReducer({...store.selectedTask,status:value}))
       
    }
    const updateTask = ()=>{
        dispatch(updateTaskByUserAction(store.selectedTask._id,store.selectedTask));
        toggle()
    }
    const handleViewDocument =()=>{
        //show preview document page
        toggleView()
    }

  return (
    <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Task</ModalHeader>
        <ModalBody>
            <Form>

            <Label className="form-label" for="title">
              Title
            </Label>
            <Input type="text" name="title" onChange={handleOnChange} value={store.selectedTask.title} disabled/>
            <Label className="form-label" for="title">
              Status
            </Label>
            <UncontrolledDropdown  >
                <DropdownToggle caret nav className='btn btn-outline-secondary w-100' >{statusList.find(x=>x.value===store.selectedTask.status)?.name}</DropdownToggle>
                <DropdownMenu className='w-100' >
                    {statusList.map((status,idx)=>{
                        return <DropdownItem className='w-100' key={idx}  onClick={()=>handleStatusChanged(status.value)}>{status.name}</DropdownItem>
                    })}
                </DropdownMenu>
            </UncontrolledDropdown>
            {
                (store.selectedTask.documentUrl && store.selectedTask.documentUrl!=='')?(
                    <div>
                    <Label>Form uploaded</Label>
                    <Button color='link' onClick={handleViewDocument}>
                    <Paperclip/> View Document
                    </Button>
                    </div>
                ):null
            }
            
            <Label className="form-label" for="des">
              Description
            </Label>
            <Input
              id="exampleText"
              name="description"
              type="textarea"
              placeholder="Write your notes..."
              style={{ height: '150px' }}
              onChange={handleOnChange}
              value={store.selectedTask.description}
              disabled
            />
          <Button color='primary' onClick={updateTask} className="my-1"> Update</Button>
            </Form>
        </ModalBody>

    </Modal>
  )
}
