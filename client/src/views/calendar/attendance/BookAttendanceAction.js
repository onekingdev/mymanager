// ** React Imports
import React, { useState } from 'react';
import { Badge, Button, Col, Modal, ModalBody, ModalHeader, Row, Label } from 'reactstrap';
import { Trash2, Calendar } from 'react-feather';
import Flatpickr from 'react-flatpickr';
import { useDispatch } from 'react-redux';
import Reschedule from './reschedule';
import { deleteBooking, getClassbookingBySeries } from '../store';
import Swal from 'sweetalert2';

const BookAttendanceAction = (props) => {
  const dispatch = useDispatch();
  const { bookingRow } = props;
  const [bookRescheduleModal, setBookRescheduleModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <div className="d-flex">
        <Button
          className="cursor-pointer btn-icon"
          color="flat primary"
          outline
          size="sm"
          onClick={() => setBookRescheduleModal(true)}
          // disabled={!(bookingRow?.status === 'no')}
        >
          <Calendar size={16} />
        </Button>
        <Button
          className="cursor-pointer btn-icon"
          color="flat"
          outline
          size="sm"
          onClick={() => {
            Swal.fire({
              title: 'Delete Class',
              html: `Are you sure you want to remove booking for <b>${bookingRow?.fullName}</b>?`,
              icon: 'question',
              confirmButtonText: 'Delete',
              confirmButtonColor: '#d33',

              showCancelButton: true,
              cancelButtonText: 'Cancel',
              cancelButtonColor: '#3085d6',

              customClass: {
                confirmButton: 'btn btn-danger',
                cancelButton: 'btn btn-outline-secondary ms-1'
              },
              buttonsStyling: false
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(deleteBooking(bookingRow?._id, bookingRow.user));
                // if (bookingRow?.classId !== undefined && bookingRow?.classId !== '') {
                dispatch(getClassbookingBySeries(bookingRow?.seriesId));
                // }
                setDeleteModal(false);
              }
            });
          }}
        >
          <Trash2 size={16} />
        </Button>
      </div>
      <Modal
        toggle={() => setBookRescheduleModal(false)}
        className="modal-dialog-centered"
        isOpen={bookRescheduleModal}
        style={{ minWidth: '1100px' }}
      >
        <ModalHeader
          className="text-center bg-transparent d-flex"
          toggle={() => setBookRescheduleModal(false)}
        >
          <h3> Reschedule Booking</h3>
        </ModalHeader>
        <ModalBody className="mx-50 pb-2">
          <Reschedule bookingRow={bookingRow} setBookRescheduleModal={setBookRescheduleModal} />
        </ModalBody>
      </Modal>

      <Modal
        toggle={() => setDeleteModal(false)}
        className="modal-dialog-centered"
        isOpen={deleteModal}
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setDeleteModal((p) => !p)}
        ></ModalHeader>
        <ModalBody className="px-sm-2 mx-50 pb-3">
          <h3 className="text-center mb-1">
            Are you sure you want to remove booking for <b>{bookingRow?.fullName}</b> ?
          </h3>
          <Row>
            <Col className="text-center mt-1" xs={12}>
              <Button className="mt-1 me-3" outline onClick={() => setDeleteModal(false)}>
                NO
              </Button>
              <Button
                //  disabled={deleteLoading}
                className="mt-1"
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(deleteBooking(bookingRow?._id, bookingRow.user));
                  // if (bookingRow?.classId !== undefined && bookingRow?.classId !== '') {
                  dispatch(getClassbookingBySeries(bookingRow?.seriesId));
                  // }
                  setDeleteModal(false);
                }}
              >
                YES
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default BookAttendanceAction;
