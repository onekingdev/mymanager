import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { confirm } from 'react-confirm-box';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteGuestAction, deleteGuestArrAction } from './store/actions';
import { getEventInfo } from './store';

function DeleteConfirmModal({
  editableRows,
  isBulk,
  eventId,
  guestId,
  isInAttendance,
  deleteModal,
  toggle,
  toggleClearRows
}) {
  const dispatch = useDispatch();

  //Delete Icon Click Handler
  const deleteGuestClickHandler = () => {
    if (isBulk) {
      let guestIdArr = editableRows.map((item) => (item.guestId ? item.guestId : item._id));
      dispatch(deleteGuestArrAction({ eventId, guestIdArr, isInAttendance }));
    } else {
      dispatch(deleteGuestAction({ guestId, eventId, isInAttendance }));
    }
    toggleClearRows();
    toggle();
  };

  return (
    <Modal isOpen={deleteModal} toggle={toggle} size="sm" centered>
      <ModalBody>
        <div>
          <h3 className="mb-0 fw-bolder">Are you sure you want to remove from invited list ?</h3>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          size="sm"
          onClick={() => {
            toggle();
          }}
        >
          No
        </Button>
        <Button
          size="sm"
          color="primary"
          onClick={() => {
            deleteGuestClickHandler();
          }}
        >
          Yes
        </Button>{' '}
      </ModalFooter>
    </Modal>
  );
}

export default DeleteConfirmModal;
