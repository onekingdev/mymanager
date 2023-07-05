// ** React Imports
import React, { useState } from 'react';
import { Trash2 } from 'react-feather';
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { deleteAttendance, getAttendance } from '../store';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const StudentAttendanceAction = (props) => {
  const dispatch = useDispatch();
  const { classRow, markDate } = props;
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <div>
      <div className="d-flex">
        <div
          className="cursor-pointer"
          onClick={() => {
            Swal.fire({
              title: 'Unmark?',
              text: `Are you sure you want to unmark attendance for ${classRow?.fullName}?`,
              // icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#d33',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Unmark anyway',
              cancelButtonText: 'Cancel',
              customClass: {
                confirmButton: 'btn btn-danger',
                cancelButton: 'btn btn-outline-danger ms-1'
              },
              buttonsStyling: false
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(deleteAttendance(classRow?._id)).then((deleteResult) => {
                  if (deleteResult) {
                    if (classRow?.classId !== undefined && classRow?.classId !== '') {
                      dispatch(
                        getAttendance({
                          classId: classRow?.classId,
                          startDate: markDate.toLocaleDateString()
                        })
                      );
                    }
                    setDeleteModal(false);
                    Swal.fire(
                      'Succefully unmarked!',
                      `${classRow?.fullName} has been unmarked.`,
                      'success'
                    );
                  }
                });
              }
            });
          }}
        >
          {/* <div className="cursor-pointer" onClick={() => setDeleteModal(true)}> */}
          <Trash2 size={16} style={{ color: '#625f6e', marginLeft: '5px' }} />
        </div>
      </div>

      <Modal
        toggle={() => setDeleteModal(false)}
        className="modal-dialog-centered"
        isOpen={deleteModal}
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setDeleteModal((p) => !p)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <h3 className="text-center mb-1">Are you sure to Delete ?</h3>
          <Row>
            <Col className="text-center mt-1" xs={12}>
              <Button className="mt-1 me-3" outline onClick={() => setDeleteModal(false)}>
                Cancel
              </Button>
              <Button
                //  disabled={deleteLoading}
                className="mt-1"
                color="primary"
                onClick={() => {
                  dispatch(deleteAttendance(classRow?._id));
                  if (classRow?.classId !== undefined && classRow?.classId !== '') {
                    dispatch(getAttendance(classRow?.classId));
                  }
                  setDeleteModal(false);
                }}
              >
                Confirm
              </Button>{' '}
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default StudentAttendanceAction;
