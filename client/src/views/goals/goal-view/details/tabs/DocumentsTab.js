import React, { Fragment } from 'react'
import { Card, CardBody, Col, Form, Row,Button } from 'reactstrap'
import FileUploaderMultiple from './FileUploaderMultiple'

import '@styles/react/libs/file-uploader/file-uploader.scss'
export default function DocumentsTab() {
  return (
    <Fragment>
        <Card>
            <CardBody>
            <Form onSubmit={(e) => e.preventDefault()}>
                <Row>
                    <Col sm="12">
                        <FileUploaderMultiple />
                    </Col>
                </Row>
                <div className="float-end">
                    <Button
                        color="primary"
                        className="btn-next"
                      
                    >
                        <span className="align-middle d-sm-inline-block d-none">
                            Upload
                        </span>
                        
                    </Button>
                </div>
                
            </Form>
            </CardBody>
        </Card>
    </Fragment>
  )
}
