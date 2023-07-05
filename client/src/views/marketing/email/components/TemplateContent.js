import { Button } from "reactstrap";
import React, { Fragment, useEffect, useState } from "react"
import { Card, Modal,CardBody, ModalHeader, ModalBody } from "reactstrap"
import {FaHeart, FaPlus} from "react-icons/fa";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { deleteFormAction} from '../../../formBuilder/store/action';

const TemplateContent = (props) => {
    
    const [viewModal, setViewModal] = useState(false);
    const src = props.item?.formData[0]?.html!==''?`/form-funnel/${props.item._id}&path=home`:``;
    const bootstrapClass = '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">';
    
    const MySwal = withReactContent(Swal);
    
    const handleDeleteForm = async () => {
        const result = await MySwal.fire({
          title: 'Delete?',
          text: 'Are you sure you want to delete the email template? ',
          icon: 'danger',
          showCancelButton: true,
          confirmButtonText: 'Delete anyway',
          customClass: {
            confirmButton: 'btn btn-danger',
            cancelButton: 'btn btn-outline-danger ms-1'
          },
          buttonsStyling: false
        });
        if (result.value) {
          props.dispatch(deleteFormAction(props.item._id));
        }
    };
    return (
        <Card style={{ height: "95%", }} className="template-item-card">
            <div className="p-1 pb-0 d-flex justify-content-between">
                <p style={{fontSize:'16px'}}><b>{props.name}</b></p>
                { props.item.favorite && <FaHeart size={20}/> }
            </div>

            <div className="template-iframe">
                <div
                    className="border box-shadow"
                    style={{ borderRadius: "12px", padding: "0.5em", margin: "0.5em" }}
                >
                    <iframe
                        style={{ borderRadius: "12px" }}
                        scrolling='no'
                        width="100%"
                        height="250"
                        srcDoc={bootstrapClass+props.html+'<style>'+props.css+'</style>'}
                        title="Customized Form"
                    >
                    </iframe>
                </div>
            </div>
            
            <div className="template-btn-group p-1">
                <div className="shadow-lg rounded p-1 d-flex justify-content-between flex-column gap-2">
                    <Button color='success' className="text-capitalize" onClick={() => props.handleFormEdit(props.item)}>Edit</Button>
                    <Button color='secondary' className="text-capitalize" onClick={handleDeleteForm}>Delete</Button>
                    <Button color='primary' className="text-capitalize" onClick={() =>setViewModal(!viewModal)}>View</Button>
                    <Button color='light' className="text-capitalize" onClick={() =>props.itemAddToFavorite(props.item)}><FaHeart size={18}/>&nbsp;&nbsp;Add to favorites</Button>
                    {/* <Button color='primary' onClick={() =>setViewModal(!viewModal)}>
                        <FaEye size={13}/>&nbsp;View
                    </Button>
                    <Button color='primary' onClick={props.testFunction}>
                        <FaPlus size={13}/>&nbsp;Insert
                    </Button> */}
                </div>
            </div>
            <Modal isOpen={viewModal} toggle={() =>setViewModal(!viewModal)} className="modal-xl justify-content-center" contentClassName="email-templates-modal" centered>
                <ModalHeader toggle={() =>setViewModal(!viewModal)} style={{zIndex: 10}} className="border-bottom">
                    <h2>
                        {props.name}
                    </h2>
                </ModalHeader>
                <ModalBody style={{padding: 0}}>
                    <Card style={{ height: '100%', borderRadius: 10, margin: 0 }} className={`shadow`}>
                        <CardBody>
                            <iframe
                                className="shadow-sm"
                                scrolling={props.item?.formData[0]?.html!==''?'yes':'no'}
                                style={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    width: '100%',
                                    border: 'none',
                                    height: '100%',
                                    borderRadius: 10
                                }}
                                src={src}
                            />
                        </CardBody>
                    </Card>
                </ModalBody>
            </Modal>         
        </Card>
        
      
    )
}


export default TemplateContent;