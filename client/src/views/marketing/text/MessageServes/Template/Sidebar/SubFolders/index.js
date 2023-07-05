import React, { memo, useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Label,
  Modal,
  ModalHeader,
  Button,
  ModalBody
} from 'reactstrap';
import { uploadSubfolder } from '../../../../../../apps/text/store';
import { useDispatch } from 'react-redux';

const CreateAndEditSubFolder = (props) => {
  const dispatch = useDispatch();
  const { parent } = props;
  const [open, setOpen] = useState(props.item ? true : false);
  const [subfolderName, setSubfolderName] = useState('');

  // ** Handlers
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddSubfolder = () => {
    dispatch(uploadSubfolder({ parentId: parent._id, subfolderName: subfolderName }));
    setOpen(false);
  };

  return (
    <div className="my-50">
      {props.item ? null : (
        <Button
          color="primary"
          className="w-auto ms-auto"
          block
          onClick={(e) => {
            handleClickOpen();
          }}
        >
          + Add Subfolder
        </Button>
      )}

      <Modal isOpen={open} toggle={handleClose} centered>
        <ModalHeader>{props.item ? 'Edit Sub Folder' : 'Add New Sub Folder'}</ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <Form className="mt-1">
                <Row>
                  <Col sm="12">
                    <FormGroup className="form-label-group">
                      <Input
                        type="text"
                        name="subFolderName"
                        defaultValue={subfolderName}
                        onChange={(e) => setSubfolderName(e.target.value)}
                        id="subFolderName"
                        placeholder="Sub Folder Name"
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <FormGroup className="d-flex justify-content-between">
                      <Button color="primary" onClick={(e) => handleAddSubfolder()}>
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
};

export default memo(CreateAndEditSubFolder);
