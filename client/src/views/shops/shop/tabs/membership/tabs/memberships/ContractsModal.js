import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { getTemplatesDocuments } from '../../../../../../../requests/documents/create-doc';

export default function ContractsModal({open,toggle,form,setForm}) {
    const [templates, setTemplates] = useState([]);
    const [allTemplates, setAllTemplates] = useState([]);
    useEffect(() => {
        //get templates
        getTemplatesDocuments().then((res) => {
          setTemplates(res?.filter((x) => x.docType === 'contract'));
          setAllTemplates(res?.filter((x) => x.docType === 'contract'));
        });
      }, []);
  return (
    <Modal isOpen={open} toggle={toggle} size='lg'>
        <ModalHeader toggle={toggle}>Select Default Contract</ModalHeader>
        <ModalBody>
            <div>
                <Row>
                {templates?.map((item,idx)=>{
                    return (
                        <Col md="4" key={idx}>
                          <Card className="border">
                            <CardBody>
                              <h6>{item?.title}</h6>
                              <iframe
                                src={item.documentUrl}
                                scrolling="no"
                                className="shadow-sm"
                                style={{
                                  position: 'relative',
                                  overflow: 'hidden',
                                  width: '100%',
                                  border: 'none',
                                  height: '200px',
                                  borderRadius: 10
                                }}
                                onClick={(e) => e.stopPropagation()}
                              ></iframe>
                              <Button
                                key={item._id}
                                id={item._id}
                                color="primary"
                                outline
                                className={`w-100 mx-auto`}
                                onClick={() => setForm({ ...form, defaultContract: item._id })}
                              >
                                Select
                              </Button>
                            </CardBody>
                          </Card>
                        </Col>
                      )
                })}
                </Row>
            </div>
        </ModalBody>
    </Modal>
  )
}
