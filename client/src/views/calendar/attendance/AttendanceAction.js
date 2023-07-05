// ** React Imports
import React, { useState } from 'react';
import { Calendar, Trash2 } from 'react-feather';
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { deleteClass } from '../store';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const AttendanceAction = (props) => {
  const dispatch = useDispatch();
  const { classRow, actionFrom, setOpenAddClass, initState } = props;
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <div>
      <div className="d-flex">
        {actionFrom === 'classModel' ? (
          <Button
            className="me-1 d-flex"
            onClick={() => {
              classRow.wholeSeriesStartDate == classRow.wholeSeriesEndDate
                ? Swal.fire({
                    title: 'Delete Class',
                    text: `Are you sure to Delete this class?`,
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
                      // Delete single class
                      dispatch(deleteClass({ classId: classRow?._id, type: 'single' }));
                      setDeleteModal(false);
                      if (actionFrom === 'classModel') {
                        setOpenAddClass(false);
                      }
                      initState();
                    }
                  })
                : Swal.fire({
                    title: 'Delete Class',
                    text: `Are you sure to Delete this class?`,
                    icon: 'question',
                    confirmButtonText: 'Delete All',
                    confirmButtonColor: '#d33',

                    showDenyButton: true,
                    denyButtonColor: '#3d3',
                    denyButtonText: 'Delete Single',

                    showCancelButton: true,
                    cancelButtonText: 'Cancel',
                    cancelButtonColor: '#3085d6',

                    customClass: {
                      confirmButton: 'btn btn-danger',
                      denyButton: 'btn btn-success ms-1',
                      cancelButton: 'btn btn-outline-secondary ms-1'
                    },
                    buttonsStyling: false
                  }).then((result) => {
                    if (result.isConfirmed) {
                      // Delete all series class
                      dispatch(deleteClass({ classId: classRow?.seriesId, type: 'all' }));
                      setDeleteModal(false);
                      if (actionFrom === 'classModel') {
                        setOpenAddClass(false);
                      }
                      initState();
                    } else if (result.isDenied) {
                      // Delete single class
                      dispatch(deleteClass({ classId: classRow?._id, type: 'single' }));
                      setDeleteModal(false);
                      if (actionFrom === 'classModel') {
                        setOpenAddClass(false);
                      }
                      initState();
                    }
                  });
            }}
            color="danger"
            outline
          >
            {' '}
            {`Delete`}
            <div
              className="cursor-pointer"
              onClick={() => {
                classRow.wholeSeriesStartDate == classRow.wholeSeriesEndDate
                  ? Swal.fire({
                      title: 'Delete Class',
                      text: `Are you sure to Delete this class?`,
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
                        // Delete single class
                        dispatch(deleteClass({ classId: classRow?._id, type: 'single' }));
                        setDeleteModal(false);
                        if (actionFrom === 'classModel') {
                          setOpenAddClass(false);
                        }
                        initState();
                      }
                    })
                  : Swal.fire({
                      title: 'Delete Class',
                      text: `Are you sure to Delete this class?`,
                      icon: 'question',
                      confirmButtonText: 'Delete All',
                      confirmButtonColor: '#d33',

                      showDenyButton: true,
                      denyButtonColor: '#3d3',
                      denyButtonText: 'Delete Single',

                      showCancelButton: true,
                      cancelButtonText: 'Cancel',
                      cancelButtonColor: '#3085d6',

                      customClass: {
                        confirmButton: 'btn btn-danger',
                        denyButton: 'btn btn-success ms-1',
                        cancelButton: 'btn btn-outline-secondary ms-1'
                      },
                      buttonsStyling: false
                    }).then((result) => {
                      if (result.isConfirmed) {
                        // Delete all series class
                        dispatch(deleteClass({ classId: classRow?.seriesId, type: 'all' }));
                        setDeleteModal(false);
                        if (actionFrom === 'classModel') {
                          setOpenAddClass(false);
                        }
                      } else if (result.isDenied) {
                        // Delete single class
                        dispatch(deleteClass({ classId: classRow?._id, type: 'single' }));
                        setDeleteModal(false);
                        if (actionFrom === 'classModel') {
                          setOpenAddClass(false);
                        }
                      }
                    });
              }}
            >
              <Trash2 size={16} style={{ color: '#dc3545', marginLeft: '5px' }} />
            </div>
          </Button>
        ) : (
          <div className="cursor-pointer" onClick={() => setDeleteModal(true)}>
            <Trash2 size={16} />
          </div>
        )}
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
              {classRow?.seriesId ? (
                <>
                  <Button
                    className="mt-1 me-3"
                    outline
                    onClick={() => {
                      dispatch(deleteClass({ classId: classRow?._id, type: 'single' }));
                      setDeleteModal(false);
                      if (actionFrom === 'classModel') {
                        setOpenAddClass(false);
                      }
                      initState();
                    }}
                  >
                    Delete Single
                  </Button>
                  <Button
                    // disabled={deleteLoading}
                    className="mt-1"
                    color="primary"
                    onClick={() => {
                      dispatch(deleteClass({ classId: classRow?.seriesId, type: 'all' }));
                      setDeleteModal(false);
                      if (actionFrom === 'classModel') {
                        setOpenAddClass(false);
                      }
                      initState();
                    }}
                  >
                    Delete All
                  </Button>
                </>
              ) : (
                <>
                  <Button className="mt-1 me-3" outline onClick={() => setDeleteModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    // disabled={deleteLoading}
                    className="mt-1"
                    color="primary"
                    onClick={() => {
                      dispatch(deleteClass({ classId: classRow?._id, type: 'single' }));
                      setDeleteModal(false);
                      initState();
                    }}
                  >
                    Delete
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AttendanceAction;
