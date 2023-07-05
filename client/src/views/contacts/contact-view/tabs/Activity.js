// ** React Imports
import { useState, useEffect, useMemo } from 'react';

// ** Table Columns
import { storeColumns } from './storeColumns';
import { toast } from 'react-toastify';
import moment from 'moment';

// ** Third Party Components
import DataTable from 'react-data-table-component';
import { ChevronDown, Download, Trash, Edit, Send } from 'react-feather';
import Flatpickr from 'react-flatpickr';
import ReactPaginate from 'react-paginate';

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardHeader,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Label,
  Input
} from 'reactstrap';

// ** Store & Actions
import { getData } from '@src/views/apps/invoice/store';
import { useDispatch, useSelector } from 'react-redux';

// ** Styles
import '@styles/react/apps/app-invoice.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { useParams } from 'react-router-dom';
import { useDateFormatter } from '../../../../hooks/useDateFormatter';
import { editOtherReset, addOtherReset, deleteOtherReset } from '../../store/reducer';
import {
  fetchSingleClientAction,
  // editOtherAction,
  deleteOtherAction,
  editOtherAction
} from '../../store/actions';

import useMessage from '../../../../lib/useMessage';
import NoteModal from './NotesModal';
import Swal from 'sweetalert2';

const OtherTab = ({ selectedUser }) => {
  const { id } = useParams();
  // ** Store Vars
  const dispatch = useDispatch();
  const {
    clientContact: { contact, other }
  } = useSelector((state) => state);
  const store = useSelector((state) => state.invoice);
  const { isSuccess, isError } = other;

  const [otherData, setOtherData] = useState(contact?.others || []);

  // ** States
  const [centeredModal, setCenteredModal] = useState(false);
  const [value] = useState('');
  const [rowsPerPage] = useState(6);
  const [currentPage] = useState(1);
  const [statusValue] = useState('');
  const [sort, setSort] = useState('desc');
  const [sortColumn, setSortColumn] = useState('id');
  const [picker, setPicker] = useState(new Date());

  useEffect(() => {
    dispatch(
      getData({
        sort,
        q: value,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue
      })
    );
  }, [dispatch, store.data.length]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchSingleClientAction(id));
    }
  }, [isSuccess]);

  useMemo(() => {
    setOtherData(contact?.others || []);
  }, [contact]);

  const [counter, setCounter] = useState(0);
  const dataToRender = () => {
    // setCounter(contact?.others?.length)
    return otherData;
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    dispatch(
      getData({
        q: value,
        page: currentPage,
        sort: sortDirection,
        status: statusValue,
        perPage: rowsPerPage,
        sortColumn: column.sortField
      })
    );
  };

  const [state, setState] = useState({
    address: '',
    phone: '',
    startDate: new Date(),
    endDate: '',
    file: ''
  });

  function handleAddOther() {
    const ToastContent = ({ message }) => (
      <>
        <div className="toastify-header">
          <div className="title-wrapper">
            <h6 className="toast-title fw-bold">{message}</h6>
          </div>
        </div>
      </>
    );

    const { address, phone, startDate, endDate, file } = state;

    if (address === '') {
      toast.error(<ToastContent message="Address must not be empty !" />);
    } else if (phone === '') {
      toast.error(<ToastContent message="Phone must not be empty !" />);
    } else if (file === '') {
      toast.error(<ToastContent message="Please select a file !" />);
    } else if (startDate === '') {
      toast.error(<ToastContent message="Select Date a start date!" />);
    } else if (endDate === '') {
      toast.error(<ToastContent message="Select Date a start date!" />);
    } else {
      //
      const formData = new FormData();
      formData.append('address', address);
      formData.append('phone', phone);
      formData.append('file', file);
      formData.append('clientId', id);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      toast.success(<ToastContent message="Other added successfull" />);
      setCenteredModal(!centeredModal);
    }
  }

  const DeleteOther = ({ data }) => {
    const ToastContent = ({ message }) => (
      <>
        <div className="toastify-header">
          <div className="title-wrapper">
            <h6 className="toast-title fw-bold">{message}</h6>
          </div>
        </div>
      </>
    );

    const {
      contact: { _id }
    } = useSelector((state) => state.clientContact);
    const dispatch = useDispatch();
    const handleDelete = () => {
      try {
        dispatch(deleteOtherAction({ clientId: _id, _id: data._id }));
        toast.success(<ToastContent message="Other deleted successfull" />);
      } catch (err) {
        toast.success(<ToastContent message="Error. Try again" />);
      }
    };

    return <Trash className="text-body cursor-pointer me-1" size={17} onClick={handleDelete} />;
  };

  // Edit  Others
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  const { success, error } = useMessage();

  function handleChange(event) {
    const { name, value } = event.target;
    setEditData((p) => ({ ...p, [name]: value }));
  }

  function handleEditOther() {
    dispatch(editOtherAction({ clientId: id, ...editData }));
  }

  const { isLoading: updateLoading, isSuccess: updateSuccess } = other;

  useMemo(() => {
    if (updateSuccess) {
      // success message
      success('Update successfull');
      // hide modal
      setEditModal(false);

      // reset
      dispatch(editOtherReset());
      dispatch(addOtherReset());
    }
  }, [updateSuccess]);

  // ***************************** Delete
  // ***************************** Delete ============================
  // ***************************** Delete

  // Delete Cirtificate
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const {
    deleteOther: { isSuccess: isDeleteSuccess, isLoading: isDeleteLoading }
  } = useSelector((state) => state?.clientContact);

  useMemo(() => {
    if (isDeleteSuccess) {
      success('Other Deleted successfully ');
      // hdie modal
      setDeleteModal((p) => !p);
      // reset redux state
      dispatch(deleteOtherReset());
    }
  }, [isDeleteSuccess]);

  function onDeleteConfirm() {
    Swal.fire({
      title: 'Delete?',
      text: `Are you sure you want to delete this contact activity data?`,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete anyway',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteOtherAction({ _id: deleteId, clientId: selectedUser?._id }));
        toast.success('Successfully Deleted');
      }
    });
  }

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  const projectsArr = [
    {
      date: '12/1/2023',
      time: '2:10am',
      name: 'Carlo',
      type: 'BBC',
      details: 'React Project'
    },
    {
      date: '12/1/2023',
      time: '2:10am',
      name: 'Carlo',
      type: 'BBC',
      details: 'React Project'
    },
    {
      date: '12/1/2023',
      time: '2:10am',
      name: 'Carlo',
      type: 'BBC',
      details: 'React Project'
    },
    {
      date: '12/1/2023',
      time: '2:10am',
      name: 'Carlo',
      type: 'BBC',
      details: 'React Project'
    },

    {
      date: '12/1/2023',
      time: '2:10am',
      name: 'Carlo',
      type: 'BBC',
      details: 'React Project'
    },
    {
      date: '12/1/2023',
      time: '2:10am',
      name: 'Carlo',
      type: 'BBC',
      details: 'React Project'
    },
    {
      date: '12/1/2023',
      time: '2:10am',
      name: 'Carlo',
      type: 'BBC',
      details: 'React Project'
    }
  ];

  // Columns
  const storeColumns = [
    {
      name: 'Date',
      sortable: true,
      // minWidth: '200px',
      sortField: 'date',
      selector: (row) => row.date,
      cell: (row) => <span>{row.date}</span>
    },
    {
      name: 'Time',
      sortable: true,
      // minWidth: '200px',
      sortField: 'time',
      selector: (row) => row.time,
      cell: (row) => <span>{row.time}</span>
    },
    {
      name: 'Name',
      sortable: true,
      // minWidth: '200px',
      sortField: 'name',
      selector: (row) => row.name,
      cell: (row) => <span>{row.name}</span>
    },
    {
      name: 'Type',
      sortable: true,
      // minWidth: '200px',
      sortField: 'type',
      selector: (row) => row.type,
      cell: (row) => <span>{row.type}</span>
    },

    {
      name: 'Details',
      sortable: true,
      // minWidth: '200px',
      sortField: 'details',
      selector: (row) => row.details,
      cell: (row) => <span>{row.details}</span>
    },

    {
      name: 'Action',
      // minWidth: '110px',
      cell: (row) => (
        <div className="column-action d-flex align-items-center">
          {/* <EditOther data={row} /> */}

          <Edit
            className="text-body cursor-pointer me-1"
            size={17}
            onClick={() => {
              //
              setEditData(row);
              setEditModal(true);
            }}
          />

          <Trash
            className="text-body cursor-pointer me-1"
            size={17}
            onClick={(e) => {
              e.preventDefault()
              onDeleteConfirm(row?._id);
            }}
          />

          {/* <DeleteOther data={row} /> */}
          <Send className="text-body cursor-pointer" size={17} />
        </div>
      )
    }
  ];

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={10}
      breakLabel={'...'}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName={
        'pagination react-paginate separated-pagination pagination-sm justify-content-end mt-1 pe-1'
      }
    />
  );

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className="py-1">
          <CardTitle tag="h4" className="d-flex justify-content-center align-items-center">
            Activity{' '}
            <div className="ms-1 table-rating">
              <span style={{ fontSize: 13 }}>{counter}</span>
            </div>
          </CardTitle>
          <div className="d-flex">
            <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
              <Input type="select">
                <option>ALL</option>
                <option>ATTENDANCE</option>
                <option>PROGRESSION</option>
                <option>FINANCE</option>
                <option>OTHER</option>
              </Input>
            </div>

            <Modal
              isOpen={centeredModal}
              toggle={() => setCenteredModal(!centeredModal)}
              className="modal-dialog-centered"
            >
              <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
                Add New Store
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="input-default">
                      Address
                    </Label>
                    <Input
                      type="text"
                      id="input-default"
                      placeholder="Type full address"
                      value={state.address}
                      onChange={(e) => {
                        setState((p) => ({
                          ...p,
                          address: e?.target?.value
                        }));
                      }}
                    />
                  </Col>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="input-default">
                      Phone
                    </Label>
                    <Input
                      type="text"
                      id="input-default"
                      placeholder="330-806-1981"
                      value={state.phone}
                      onChange={(e) => {
                        setState((p) => ({
                          ...p,
                          phone: e?.target?.value
                        }));
                      }}
                    />
                  </Col>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="inputFile">
                      Lease Start Date
                    </Label>
                    <Flatpickr
                      className="form-control"
                      id="default-picker"
                      onChange={(date) => {
                        setState((p) => ({
                          ...p,
                          startDate: date[0]
                        }));
                      }}
                      value={state.startDate}
                      options={{ dateFormat: 'm/d/Y' }}
                    />
                  </Col>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="inputFile">
                      Lease End Date
                    </Label>
                    <Flatpickr
                      className="form-control"
                      id="default-picker"
                      onChange={(date) => {
                        setState((p) => ({
                          ...p,
                          endDate: date[0]
                        }));
                      }}
                      value={state.endDate}
                      options={{ dateFormat: 'm/d/Y' }}
                    />
                  </Col>
                  <Col sm="12" className="mb-1">
                    <Label className="form-label" for="credit-card">
                      Photo
                    </Label>
                    <Input
                      id="due-date"
                      name="due-date"
                      className="form-control"
                      type="file"
                      onChange={(e) => {
                        if (e?.target?.files[0]) {
                          setState((p) => ({
                            ...p,
                            file: e.target.files[0]
                          }));
                        }
                      }}
                    />
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={handleAddOther}
                  type="button"
                  className="mt-1 me-1"
                  color="primary"
                >
                  Save
                </Button>

                <Button
                  className="mt-1"
                  color="secondary"
                  outline
                  onClick={() => {
                    //setCenteredModal(!centeredModal)
                  }}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </CardHeader>
        <div className="invoice-list-dataTable react-dataTable">
          <DataTable
            noHeader
            sortServer
            columns={storeColumns}
            responsive={true}
            onSort={handleSort}
            // data={dataToRender()}
            data={projectsArr}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            defaultSortField="invoiceId"
            pagination
            paginationComponent={CustomPagination}
            paginationDefaultPage={currentPage + 1}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
          />
        </div>

        <Modal
          isOpen={editModal}
          toggle={() => setEditModal(!editModal)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setEditModal(!editModal)}>update Store</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="input-default">
                  Address
                </Label>
                <Input
                  type="text"
                  id="input-default"
                  placeholder="Type full address"
                  value={editData.address}
                  name="address"
                  onChange={handleChange}
                />
              </Col>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="input-default">
                  Phone
                </Label>
                <Input
                  type="text"
                  id="input-default"
                  placeholder="330-806-1981"
                  name="phone"
                  value={editData.phone}
                  onChange={handleChange}
                />
              </Col>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="inputFile">
                  Lease Start Date
                </Label>
                <Flatpickr
                  className="form-control"
                  id="default-picker"
                  onChange={(date) => {
                    setEditData((p) => ({
                      ...p,
                      startDate: date[0]
                    }));
                  }}
                  value={editData.startDate}
                  options={{ dateFormat: 'm/d/Y' }}
                />
              </Col>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="inputFile">
                  Lease End Date
                </Label>
                <Flatpickr
                  className="form-control"
                  id="default-picker"
                  onChange={(date) => {
                    setEditData((p) => ({
                      ...p,
                      endDate: date[0]
                    }));
                  }}
                  value={editData.endDate}
                  options={{ dateFormat: 'm/d/Y' }}
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleEditOther}
              type="button"
              className="mt-1 me-1"
              color="primary"
              disabled={updateLoading}
            >
              {updateLoading ? 'Loading...' : 'Save'}
            </Button>

            <Button className="mt-1" color="secondary" outline onClick={() => setEditModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* ////////////////////// ////////////////////// //////////////////////
            ////////////////////// ////////////////////// //////////////////////
            ////////////////////// ////////////////////// */}
        <Modal
          isOpen={deleteModal}
          toggle={() => setDeleteModal((p) => !p)}
          className="modal-dialog-centered"
          // onClosed={onModalClosed}
        >
          <ModalHeader
            className="bg-transparent"
            toggle={() => setDeleteModal((p) => !p)}
          ></ModalHeader>
          <ModalBody className="px-sm-5 mx-50 pb-5">
            <h3 className="text-center mb-1">Are you sure to Delete ?</h3>

            <Row>
              <Col className="text-center mt-1" xs={12}>
                <Button className="mt-1 me-1" color="secondary" outline>
                  Cancel
                </Button>
                <Button
                  onClick={onDeleteConfirm}
                  className="mt-1 "
                  color="primary"
                  disabled={isDeleteLoading}
                >
                  {isDeleteLoading ? 'Deleting...' : 'confirm'}
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </Card>
    </div>
  );
};

export default OtherTab;
