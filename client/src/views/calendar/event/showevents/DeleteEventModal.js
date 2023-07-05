import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { confirm } from 'react-confirm-box';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteEvent } from '../store';

function DeleteEventModal({ toggleDeleteModal, deleteModal, eventId }) {
  const dispatch = useDispatch();

  //Delete Icon Click Handler
  const deleteEventHandler = () => {
    if (eventId) {
      dispatch(deleteEvent(eventId)).then((res) => {
        toast.success('Successfully Deleted');
        toggleDeleteModal();
      });
    } else return;
  };

  return (
    <Modal isOpen={deleteModal} toggle={toggleDeleteModal} size="sm" centered>
      <ModalBody>
        <div>
          <h3 className="mb-0 fw-bolder">Are you sure you want to delete this event ?</h3>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          size="sm"
          onClick={() => {
            toggleDeleteModal();
          }}
        >
          No
        </Button>
        <Button
          size="sm"
          color="primary"
          onClick={() => {
            deleteEventHandler();
          }}
        >
          Yes
        </Button>{' '}
      </ModalFooter>
    </Modal>
  );
}

export default DeleteEventModal;
