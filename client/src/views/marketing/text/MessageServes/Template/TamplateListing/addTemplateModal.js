import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Label,
  Tooltip,
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import { uploadTemplate } from '../../../../../apps/text/store';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddTemplateModal(props) {
  const { activeMainFolder, activeSubMainFolder } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [templateText, setTemplateText] = useState('');
  const [templateName, setTemplateName] = useState('');
  const handleSaveClick = () => {
    if (activeMainFolder) {
      if (activeSubMainFolder) {
        dispatch(
          uploadTemplate({
            folderId: activeMainFolder._id,
            subfolderId: activeSubMainFolder._id,
            templateText: templateText,
            templateName: templateName
          })
        );
      } else {
        dispatch(
          uploadTemplate({
            folderId: activeMainFolder._id,
            templateText: templateText,
            templateName: templateName
          })
        );
      }
    }
    setOpen(false);
  };

  return (
    <div>
      <Button
        color="primary"
        size="small"
        fontSize="16px"
        className="me-1 rounded"
        onClick={handleClickOpen}
      >
        Add Template
      </Button>
      <Modal isOpen={open} size="lg" toggle={() => handleClose()} centered>
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
                      onChange={(e) => setTemplateName(e.target.value)}
                    />
                    <Input
                      id="smsText"
                      type="textarea"
                      rows={3}
                      placeholder="Type your message here..."
                      className="full_height_Width"
                      name={'text'}
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
export default memo(AddTemplateModal);
