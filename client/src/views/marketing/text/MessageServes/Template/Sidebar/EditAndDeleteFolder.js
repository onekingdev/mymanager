import React, { memo, useState } from 'react';
import { Edit, Trash } from 'react-feather';
import { MoreVertical } from 'react-feather/dist';
import { useDispatch } from 'react-redux';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Button,
  Row,
  Col
} from 'reactstrap';

import {
  updateFolder,
  updateSubfolder,
  deleteFolder,
  deleteSubfolder
} from '../../../../../apps/text/store';

function EditDeleteFolder(props) {
  const { item, subfolder, folderType } = props;

  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const deleteToggle = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };

  const editToggle = () => {
    setIsEditOpen(!isEditOpen);
  };

  const handleEditModalClose = () => {
    setIsEditOpen(false);
  };

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };
  const handleDeleteFolder = (id) => {
    if (folderType == 'folder') {
      dispatch(deleteFolder(item._id));
    } else {
      dispatch(deleteSubfolder({ folderId: item._id, subfolderId: subfolder._id }));
    }
    setIsDeleteOpen(false);
  };

  const handleEditSaveClick = () => {
    if (folderType == 'folder') {
      dispatch(updateFolder({ id: item._id, name: newName }));
    } else {
      dispatch(updateSubfolder({ id: subfolder._id, name: newName }));
    }
    handleEditModalClose();
  };
  return (
    <>
      <UncontrolledDropdown>
        <DropdownToggle nav className="p-0">
          <MoreVertical size={16} />
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem className="w-100" onClick={(e) => editToggle()}>
            <Edit size={16} style={{ color: '#5aa65c', marginRight: '1rem' }} />
            <span>Edit</span>
          </DropdownItem>
          <DropdownItem className="w-100" onClick={(e) => deleteToggle()}>
            <Trash style={{ color: '#e05252', marginRight: '1rem' }} size={16} />
            <span>Delete</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>

      {/* Delete Modal */}
      <Modal toggle={deleteToggle} centered isOpen={isDeleteOpen}>
        <ModalBody>
          <div>
            <h3>Are you sure to Delete ?</h3>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button size="sm" onClick={(e) => deleteToggle()}>
            No
          </Button>
          <Button
            // disabled={deleteLoading}
            size="sm"
            color="primary"
            onClick={() => {
              handleDeleteFolder(item._id);
            }}
          >
            Yes
          </Button>{' '}
        </ModalFooter>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} toggle={editToggle} centered>
        <ModalHeader>{folderType == 'folder' ? 'Edit Folder' : 'Edit Subfolder'}</ModalHeader>
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
                        defaultValue={
                          folderType == 'folder' ? item.folderName : subfolder.subFolderName
                        }
                        id="name"
                        onChange={(e) => handleChangeName(e)}
                        placeholder="Folder Name"
                      />
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <FormGroup className="d-flex justify-content-between">
                      <Button color="primary" onClick={(e) => handleEditSaveClick()}>
                        Save
                      </Button>
                      <Button
                        outline
                        color="warning"
                        type="reset"
                        onClick={(e) => handleEditModalClose()}
                      >
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
    </>
  );
}

export default memo(EditDeleteFolder);
