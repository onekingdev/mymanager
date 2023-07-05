import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import PdfViewer from '../../../../../../../documents/edit/PdfViewer';
import SideMenu from '../../../../../../../documents/edit/SideMenu';
import { addTaskAction } from '../../../../store/employee/action'

import { DocumentContext } from '../../../../../../../../utility/context/Document';
// import PdfViewer from './PdfViewer'
// import SideMenu from './sideMenu/SideMenu'


export default function EditorModal({open,toggle,store,task}) {
    const dispatch = useDispatch();
    const {board,setBoard,setUrl,setRecipients,setSelectedItem} = useContext(DocumentContext)

    const handleSaveForm = ()=>{
        let payload = board.map(b=>{
            return {...b,icon:''}
        })
        payload = {
            ...task,
            properties:payload
        }
        console.log("board",payload)
        dispatch(addTaskAction(payload))
        setSelectedItem({})
        setBoard([])
        setUrl([])
        setRecipients([])
        toggle();
    }
  return (
    <Modal fullscreen toggle={toggle} isOpen={open}>
        <ModalHeader toggle={toggle} id="modalHeader">
            {task.title} For Role <span className='text-primary'>{store.role?.roleName}</span>
        </ModalHeader>
        <ModalBody className="bg-light-secondary">
            <div>
                <Row>
                    <Col md="2" className='mx-0 px-0'>
                        <SideMenu/>
                    </Col>
                    <Col md="10">
                        {/* <PdfViewer store={store} dispatch={dispatch}/> */}
                        <PdfViewer/>
                    </Col>
                </Row>
            </div>
        </ModalBody>
        <ModalFooter id="modalFooter">
            <div className='d-flex justify-content-end'>
                <Button color='primary' onClick={handleSaveForm}>Save</Button>
            </div>
        </ModalFooter>
    </Modal>
  )
}
