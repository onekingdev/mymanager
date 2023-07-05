import React from 'react';
import { Button, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export default function RoleDeleteModal({ setDeleteModal, deleteModal, rolesDeleteAction,dispatch }) {
  const handleDeleteRequest = (e) => {
    e.preventDefault();
    dispatch(rolesDeleteAction(deleteModal.id));
    setDeleteModal({ show: false });
  };
  return (
    <>
      <Modal
        centered={true}
        isOpen={deleteModal?.show}
        toggle={() => setDeleteModal({ show: !deleteModal?.show })}
        size="md"
      >
        <Form onSubmit={handleDeleteRequest} encType="multipart/form-data">
          <ModalHeader toggle={() => setDeleteModal({ show: !deleteModal?.show })}>
            Delete {deleteModal?.roleName}{' '}
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <h4>Are you Sure to Delete {deleteModal?.roleName}?</h4>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="btn btn-outline-danger"
              onClick={() => setDeleteModal({ show: !deleteModal?.show })}
            >
              Cancel
            </Button>{' '}
            <Button type="submit" color="btn btn-danger">
              Delete
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
}
