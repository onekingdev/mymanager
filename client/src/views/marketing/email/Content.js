import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { BsCursor } from "react-icons/bs"
import { Input, Label, Card, Button, Modal, ModalHeader, ModalBody } from "reactstrap"
import { FaEdit } from "react-icons/fa";
import Wizard from '@components/wizard';
import { ArrowLeft, ArrowRight } from 'react-feather';
import Select from 'react-select';

const Content = forwardRef((props, ref) => {
    const {handleSubmitEmailTemplate, categoryData} = props;
    const [stepper, setStepper] = useState(null);
    const [emailTemplateName, setEmailTemplateName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({
      value: '',
      label: 'Select Category'
    });

    const planCategories = categoryData.map((category) => ({
        value: category._id,
        label: category.name,
    }));

    const steps =
        [
            {
                id: 'name',
                title: 'Name',
                subtitle: 'Type template name',
                content: (
                    <div>
                        <div className="auth-login-form my-2">
                            <Label>Enter Template Name</Label>
                            <Input 
                                type='text'
                                id='new_email_template_name'
                                value={emailTemplateName}
                                placeholder="Template name..."
                                autoFocus
                                onChange={(e) =>setEmailTemplateName(e.target.value)}
                            >
                            </Input>
                        </div>
                        <div className="d-flex justify-content-end">
                            <Button
                                color='primary'
                                className="btn-next"
                                size="sm"
                                onClick={() => {stepper.next()}}
                                disabled={!emailTemplateName}
                            >
                                <span className="align-middle d-sm-inline-block d-none">Next</span>
                                <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
                            </Button>
                        </div>
                    </div>
                )
            },
            {
                id: 'category',
                title: 'Category',
                subtitle: 'Select the category',
                content: (
                    <div>
                        <div className="auth-login-form my-2">
                            <Label>Select Category Name</Label>
                            <Select
                                isClearable={false}
                                className="react-select"
                                classNamePrefix="select"
                                options={planCategories}
                                value={currentCategory}
                                onChange={(data) => { setCurrentCategory(data); }}
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <Button onClick={() => {stepper.previous()}} size="sm" color="primary" className="btn-prev">
                                <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
                                <span className="align-middle d-sm-inline-block d-none">Previous</span>
                            </Button>
                            <Button
                                color='success'
                                className="btn-next"
                                size="sm"
                                onClick={() => handleSubmitEmailTemplate(emailTemplateName, currentCategory)}
                                disabled={!emailTemplateName || !currentCategory.value}
                            >
                                <span className="align-middle d-sm-inline-block d-none">Create</span>
                                <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
                            </Button>
                        </div>
                    </div>
                )
            }
        ]
    
    useImperativeHandle(ref, () => ({
        triggerCloseModal() {
            closeModal();
        }
    }));

    const closeModal = () => {
        setShowModal(!showModal);
        setEmailTemplateName('');
        setCurrentCategory({
            value: '',
            label: 'Select Category'
        });
    }

    return (
        <>
            <Card style={{ height: "95%" }} className="p-2 d-flex justify-content-center align-items-center" onMouseOver={BsCursor}>
                <img className="img-fluid" style={{width: '120px', height: '120px'}} src="/assets/images/blank-template.svg" alt="Not authorized page" />
                <p className="text-capitalize" style={{fontSize: "20px", marginBottom: '3px'}}><b>Blank Template</b></p>
                <p style={{fontSize: "16px"}}>Start from scratch</p>
                <div className="mt-1">
                    <Button onClick={()=>setShowModal(!showModal)} className="d-flex m-auto align-items-center" color='primary'>
                        <FaEdit size={20} />&nbsp;&nbsp;START DESIGNING
                    </Button>
                </div>
            </Card>

            <Modal
                isOpen={showModal}
                toggle={() => closeModal()}
                size='md'
                className="modal-dialog-centered"
            >
                <ModalHeader toggle={() => closeModal()}>
                    Create Template
                </ModalHeader>
                <ModalBody>
                    <div className="modern-horizontal-wizard promote-horizontal-wizard">
                        <Wizard
                            type="modern-horizontal"
                            ref={ref}
                            steps={steps}
                            options={{
                                linear: false
                            }}
                            instance={(el) => setStepper(el)}
                        />
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
});

export default Content