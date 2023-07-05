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
import Select, { components } from 'react-select';

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
  const [modal, setModal] = useState(false);

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
      text: `Are you sure you want to delete this contact file data?`,
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

  const toggle = () => setModal(!modal);

  const projectsArr = [
    {
      progress: '1/1/2023',
      name: 'Carlo',
      category: 'file',
      startTime: '12/1/2023, 2:10am',
      endTime: '11/1/2023, 2:10am',
      address: 'Address',
      phone: '1235678',
      stripe: '1',
      hours: '210:30h',
      progressColor: 'info',
      totalTasks: ' Korrie O Crevy',
      subtitle: 'React Project',
      title: 'BBC ',
      img: require('@src/assets/images/icons/brands/react-label.png').default
    },
    {
      hours: '89h',
      phone: '1235678',
      name: 'Carlo',
      category: 'file',
      startTime: '12/1/2023, 2:10am',
      endTime: '11/1/2023, 2:10am',
      address: 'Address',
      stripe: '1',
      progress: '1/1/2023',
      totalTasks: ' Korrie O Crevy',
      progressColor: 'danger',
      subtitle: 'UI/UX Project',
      title: ' LC',
      img: require('@src/assets/images/icons/brands/xd-label.png').default
    },
    {
      progress: '1/1/2023',
      stripe: '1',
      phone: '1235678',
      name: 'Carlo',
      category: 'file',
      startTime: '12/1/2023, 2:10am',
      endTime: '11/1/2023, 2:10am',
      address: 'Address',
      hours: '129:45h',
      totalTasks: ' Korrie O Crevy',
      progressColor: 'success',
      subtitle: 'Vuejs Project',
      title: ' MC',
      img: require('@src/assets/images/icons/brands/vue-label.png').default
    },
    {
      hours: '45h',
      progress: '1/1/2023',
      name: 'Carlo',
      category: 'file',
      startTime: '12/1/2023, 2:10am',
      endTime: '11/1/2023, 2:10am',
      stripe: '1',
      address: 'Address',
      phone: '1235678',
      totalTasks: ' Korrie O Crevy',
      progressColor: 'warning',
      subtitle: 'iPhone Project',
      title: ' BBC',
      img: require('@src/assets/images/icons/brands/sketch-label.png').default
    },

    {
      progress: '1/1/2023',
      stripe: '1',
      phone: '1235678',
      name: 'Carlo',
      category: 'file',
      startTime: '12/1/2023, 2:10am',
      endTime: '11/1/2023, 2:10am',
      address: 'Address',
      hours: '67:10h',
      totalTasks: ' Korrie O Crevy',
      progressColor: 'info',
      subtitle: 'React Project',
      title: ' MC',
      img: require('@src/assets/images/icons/brands/react-label.png').default
    },
    {
      progress: '1/1/2023',
      stripe: '1',
      hours: '108:39h',
      name: 'Carlo',
      category: 'file',
      startTime: '12/1/2023, 2:10am',
      endTime: '11/1/2023, 2:10am',
      address: 'Address',
      phone: '1235678',
      totalTasks: ' Korrie O Crevy',
      title: ' BC',
      progressColor: 'success',
      subtitle: 'Crypto Website',
      img: require('@src/assets/images/icons/brands/html-label.png').default
    },
    {
      progress: '1/1/ 2023',
      stripe: '1',
      hours: '88:19h',
      name: 'Carlo',
      category: 'file',
      startTime: '12/1/2023, 2:10am',
      endTime: '11/1/2023, 2:10am',
      address: 'Address',
      phone: '1235678',
      totalTasks: ' Korrie O Crevy',
      progressColor: 'success',
      subtitle: 'Vuejs Project',
      title: ' BBC',
      img: require('@src/assets/images/icons/brands/vue-label.png').default
    }
  ];

  // Columns
  const storeColumns = [
    {
      name: 'Name',
      sortable: true,
      // minWidth: '200px',
      sortField: 'name',
      selector: (row) => row.name,
      cell: (row) => <span>{row.name}</span>
    },
    {
      name: 'Category',
      sortable: true,
      // minWidth: '200px',
      sortField: 'category',
      selector: (row) => row.category,
      cell: (row) => <span>{row.category}</span>
    },
    {
      name: 'Start',
      sortable: true,
      // minWidth: '200px',
      sortField: 'startDate',
      selector: (row) => row.startDate,
      cell: (row) => <span>{moment(row.startDate).format('L')}</span>
    },
    {
      name: 'End',
      sortable: true,
      // minWidth: '200px',
      sortField: 'endDate',
      selector: (row) => row.endDate,
      cell: (row) => <span>{moment(row.endDate).format('L')}</span>
    },
    {
      name: 'Lease doc',
      // width: '140px',
      center: true,
      cell: (row) => (
        <div className="column-action d-flex align-items-center">
          <a href={row?.file} target="_blank">
            <Button.Ripple className="btn-icon rounded-circle" outline color="primary">
              <Download size={16} />
            </Button.Ripple>
          </a>
        </div>
      )
    },
    {
      name: 'Notes',
      sortable: true,
      // minWidth: '200px',
      sortField: 'notes',
      selector: (row) => row.notes,
      cell: (row) => <NoteModal />
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
  const data = [
    {
      value: 'Lease',
      label: 'Lease',
      color: 'flat-success'
    },
    {
      value: 'Insurance',
      label: 'Insurance',
      color: 'flat-success'
    }
  ];
  const [options, setOptions] = useState([
    ...data,
    {
      value: 'Add category',
      label: 'Add category',
      type: 'button',
      color: 'flat-success'
    }
  ]);
  const [open1, setOpen1] = useState(false);

  useEffect(() => {
    const arr = options;
    data?.data?.map((item) => arr.push({ value: item._id, label: item.fullName }));
    setOptions([...arr]);
  }, [data?.data]);

  const OptionComponent = ({ data, ...props }) => {
    if (data.type !== 'button') {
      return (
        <components.Option {...props}>
          {open1 && data.value !== 'Add category' ? <Input type="text" /> : data.label}
        </components.Option>
      );
    } else {
      return (
        <>
          <Button
            className="text-start rounded-0 px-50"
            color={data.color}
            block
            onClick={handleAddCategory}
          >
            <span className="align-middle">{data.label}</span>
          </Button>
        </>
      );
    }
  };

  const handleAddCategory = () => {
    const input = window.prompt('Enter a new category:');
    if (input) {
      const newCategory = {
        value: input,
        label: input,
        color: 'flat-success'
      };
      setOptions([...options, newCategory]);
    }
  };

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className="py-1">
          <CardTitle tag="h4" className="d-flex justify-content-center align-items-center">
            Files{' '}
            <div className="ms-1 table-rating">
              <span style={{ fontSize: 13 }}>{counter}</span>
            </div>
          </CardTitle>
          <div className="d-flex">
            <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
              <Button color="primary" onClick={toggle}>
                Add File
              </Button>
            </div>
            {/* <Button
                            color="primary"
                            onClick={() => setCenteredModal(!centeredModal)}
                        >
                            Add New Store
                        </Button> */}
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

      <Card>
        <CardHeader className="py-1">
          <CardTitle tag="h4" className="d-flex justify-content-center align-items-center">
            Notes{' '}
            <div className="ms-1 table-rating">
              <span style={{ fontSize: 13 }}>{counter}</span>
            </div>
          </CardTitle>
          <div className="d-flex">
            {/* <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
                            <Input
                                id="search-invoice"
                                className="ms-50 w-100"
                                type="text"
                                placeholder="Search Store ..."
                                // value={searchTerm}
                                // onChange={(e) => handleFilter(e.target.value)}
                            />
                        </div> */}
            <Button color="primary" onClick={() => setCenteredModal(!centeredModal)}>
              Add Note
            </Button>
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
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            defaultSortField="invoiceId"
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

      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Add Files</ModalHeader>
        <ModalBody>
          <div>
            <Label>Title</Label>
            <Input type="text" placeholder="Give your title here..." />
          </div>
          <div className="mt-1">
            <Label>Upload Doc</Label>
            <Input type="file" placeholder="Give your title here..." />
          </div>
          <div className="d-flex justify-content-between mt-1">
            <div style={{ width: '200px' }}>
              <Label>Start Date</Label>
              <Flatpickr
                defaultValue="1-10-2023"
                options={{
                  dateFormat: 'm-d-Y'
                }}
                className="form-control invoice-edit-input date-picker"
              />
            </div>
            <div style={{ width: '200px' }}>
              <Label>End Date</Label>
              <Flatpickr
                defaultValue="1-10-2023"
                options={{
                  dateFormat: 'm-d-Y'
                }}
                className="form-control invoice-edit-input date-picker"
              />
            </div>
          </div>
          <div className="mt-1">
            <Label>Notes</Label>
            <Input type="textarea" placeholder="Give your title here..." />
          </div>
          <div className="mt-1">
            <Label for="exampleSelect">Category</Label>
            <Select
              className="react-select"
              classNamePrefix="select"
              id="label"
              options={options}
              components={{
                Option: OptionComponent
              }}
            />
          </div>
        </ModalBody>
        <div className="d-flex justify-content-end p-1">
          <div className="d-flex">
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
            <Button color="primary" onClick={toggle} style={{ marginLeft: '10px' }}>
              Save
            </Button>{' '}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OtherTab;
