import React, { memo, useState } from 'react';
import { uploadFolder } from '../../../../../../apps/text/store';
import { useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Input,
  Card,
  CardBody,
  Form,
  FormGroup
} from 'reactstrap';

function AddFolder(props) {
  const dispatch = useDispatch();
  // ** States
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  // ** Handlers
  const handleClickOpen = () => {
    setName('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddFolderClick = () => {
    dispatch(uploadFolder(name));
    setOpen(false);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="pb-1">
      <Button color="primary" block onClick={(e) => handleClickOpen()}>
        + ADD FOLDER
      </Button>
      <Modal isOpen={open} toggle={handleClose} centered>
        <ModalHeader>Add New Folder</ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Form className="mt-1">
                <Row>
                  <Col sm="12">
                    <FormGroup className="form-label-group">
                      <Input
                        type="text"
                        name="name"
                        defaultValue={name}
                        id="name"
                        onChange={(e) => handleChangeName(e)}
                        placeholder="Folder Name"
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <FormGroup className="d-flex justify-content-between">
                      <Button color="primary" onClick={(e) => handleAddFolderClick()}>
                        Save
                      </Button>
                      <Button outline color="warning" type="reset" onClick={handleClose}>
                        Cancel
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default memo(AddFolder);
