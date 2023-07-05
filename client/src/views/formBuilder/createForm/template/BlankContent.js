import React from 'react';
import { BsCursor } from "react-icons/bs"
import { Card, Button } from "reactstrap"
import { FaEdit } from "react-icons/fa";

const BlankContent = (props) => {
    const {handleClickBlankTemplate, selectedTemplate} = props;

    return (
        <>
            <Card style={{ height: "95%" }} className={`${selectedTemplate._id === 'blank' ? 'border border-primary' : ''} p-2 d-flex justify-content-center align-items-center`} onMouseOver={BsCursor}>
                <img className="img-fluid" style={{width: '120px', height: '180px'}} src="/assets/images/blank-template.svg" alt="Not authorized page" />
                <p className="text-capitalize" style={{fontSize: "20px", marginBottom: '3px'}}><b>Blank Template</b></p>
                <p style={{fontSize: "16px"}}>Start from scratch</p>
                <div className="mt-1">
                    <Button onClick={handleClickBlankTemplate} className="d-flex m-auto align-items-center" color='primary'>
                        <FaEdit size={20} />&nbsp;&nbsp;USE AS TEMPLATE
                    </Button>
                </div>
            </Card>
        </>
    )
};

export default BlankContent