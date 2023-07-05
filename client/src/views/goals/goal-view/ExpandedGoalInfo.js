import React from 'react'
import {
    Modal,
    Col,
    Row,
    ModalBody,
    ModalHeader
} from 'reactstrap'


function ExpandedGoalInfo({ defaultImage, componentData, open, toggle }) {
    return (


        <Modal isOpen={open} toggle={toggle} >
            <ModalHeader  toggle={toggle}>Goal Details</ModalHeader>
            <ModalBody>
                <div>
                    <div className="container pb-1">
                        <Row>
                            <Col md="12" className="mt-auto mb-0">
                                <div>
                                    <div className="text-center">
                                        <img
                                            src={componentData?.pictureUrl || defaultImage}
                                            className=" img-thumbnail img-fluid"

                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col md="12">
                                <Row>
                                    {componentData.vision != undefined && <div className="p-1 shadow mt-1"><span className="fw-bold">Vision - </span>{componentData?.vision}</div>}
                                    {componentData.purpose != undefined && <div className="p-1 shadow mt-1"><span className="fw-bold">Purpose - </span>{componentData?.purpose}</div>}
                                    {componentData.obstacle != undefined && <div className="p-1 shadow mt-1"><span className="fw-bold">Obstacle - </span>{componentData?.obstacle}</div>}
                                    {componentData.resource != undefined && <div className="p-1 shadow mt-1"><span className="fw-bold">Resource - </span>{componentData?.resource}</div>}



                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            </ModalBody>


        </Modal>
    )
}

export default ExpandedGoalInfo