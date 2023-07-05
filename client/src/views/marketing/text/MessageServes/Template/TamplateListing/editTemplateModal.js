import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import { updateTemplate } from '../../../../../apps/text/store';

function EditTemplateModal(props) {
  const { selectedTemplate, open, toggle } = props;
  const dispatch = useDispatch();

  const [templateText, setTemplateText] = useState('');
  const [templateName, setTemplateName] = useState('');
  console.log(selectedTemplate);
  // ** Handlers
  const handleSaveClick = () => {
    dispatch(
      updateTemplate({
        _id: selectedTemplate._id,
        templateText: templateText,
        templateName: templateName
      })
    );

    toggle();
  };

  const handleClose = () => {
    toggle();
  };

  return (
    <div>
      <Modal isOpen={open} size="lg" toggle={toggle} centered>
        <ModalHeader>SMS Template</ModalHeader>
        <ModalBody>
          <CardBody>
            <Form className="mt-10">
              <Row>
                <Col sm="12">
                  <FormGroup className="form-label-group">
                    <Input
                      type="text"
                      maxLength={30}
                      placeholder="Template name"
                      style={{ marginBottom: 8 }}
                      name={'template_name'}
                      className="full_height_Width"
                      defaultValue={selectedTemplate?.templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                    />
                    <Input
                      id="smsText"
                      type="textarea"
                      rows={3}
                      placeholder="Type your message here..."
                      className="full_height_Width"
                      defaultValue={selectedTemplate?.text}
                      name="text"
                      onChange={(e) => setTemplateText(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col sm="12" className="d-flex justify-content-end">
                  <FormGroup className="d-flex gap-2">
                    <Button variant="outlined" color="warning" onClick={(e) => handleClose()}>
                      Cancel
                    </Button>
                    <Button color="primary" onClick={(e) => handleSaveClick()}>
                      Save
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default memo(EditTemplateModal);
