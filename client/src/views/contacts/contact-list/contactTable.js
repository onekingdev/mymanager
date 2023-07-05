// ** React Imports
import { Fragment, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** Third Party Components
import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import { ReactSortable } from 'react-sortablejs';
import { TrendingUp, Download, Share, FileText, Search } from 'react-feather';

// ** Invoice List Sidebar
import Sidebar from './Sidebar';

// ** Table Columns
import { useColumns, ExpandableTable } from './useColumns';

// reducer
import { contactNoteFetchAction, deleteContactAction, selectContactAction } from '../store/actions';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Collapse,
  Input,
  InputGroup,
  InputGroupText,
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Label,
  UncontrolledDropdown,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import Select from 'react-select';

import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
// import csv for export csv table
import { CSVLink } from 'react-csv';
import CSVReader from 'react-csv-reader';

// for PDF export
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsPrinter, BsSearch } from 'react-icons/bs';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { clientTypeOptions, status2Options } from './constants';
import { useDeleteContacts } from '../../../requests/contacts/contacts';
import NoteModal from '../Note';
import AddProgression from './Progression/AddProgression';
import AddNewTagModal from '../tags/AddNewTagModal';
import AddNewLeadSourceModal from '../tags/AddNewLeadSourceModal';
import MergeModal from './MergeModal';
import { belongsToIngerval } from './utility';
import { getContactFieldByTypeAction, updateContactFieldOrderAction } from '../store/actions';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import '@styles/react/apps/app-kanban.scss';

// ** Table Header
const CustomHeader = ({
  store,
  contactTypeTitle,
  orderContactType,
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  deleteContactArr,
  tableData,
  setTableData,
  ratingType,
  setRatingType,
  partContacts,
  setDeleteModal,
  setIsMergeModalOpen,
  setContactImportModal,
  handleDeleteConfirmation
}) => {
  // ** Converts table to CSV
  let typingTimer; //timer identifier
  let doneTypingInterval = 500; //time in ms (500 ms)
  function doneTyping(val) {
    handleFilter(val);
  }

  // const tableData = contactList?.data?.list

  const formatedData =
    tableData &&
    tableData?.map(
      (
        { _id, userId, photo, tags, isFormer, isDelete, ranks, files, others, __v, ...rest },
        index
      ) => {
        const sl = index + 1;
        const restData = { sl, ...rest };
        const { address } = { ...rest };

        const reorderedAddress = {
          city: null,
          street: null,
          zipCode: null,
          state: null,
          country: null
        };
        const newAddressData = Object.assign(reorderedAddress, address);

        const addressValues = Object.values(newAddressData);
        const joinedAddressValues = addressValues
          .filter((x) => typeof x === 'string' && x.length > 0)
          .join(', ');

        /* if (joinedAddressValues === '') {
            joinedAddressValues = 'N/A'
        } */

        const fullAddress = { address: joinedAddressValues };

        const finalData = Object.assign(restData, fullAddress);

        return finalData;
      }
    );

  // Hover on CSV
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openNewTag, setOpenNewTag] = useState(false);
  const [openLeadSource, setOpenLeadSource] = useState(false);
  const [tagOptions, setTagOptions] = useState([]);
  const [leadSourceOptions, setLeadSourceOptions] = useState([]);

  const [openAddProgression, setOpenAddProgression] = useState(false);
  // const [selectedRowDataProg, setSelectedRowDataProg] = useState([]);

  const [currentRole, setCurrentRole] = useState({
    value: '',
    label: 'Select Source'
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: '',
    label: 'Select Type'
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: '',
    label: 'Select Status',
    number: 0
  });
  const [currentTag, setCurrentTag] = useState({
    value: '',
    label: 'Select Tag'
  });

  const ratingOptions = [
    {
      value: 1,
      label: 'Last Attended'
    },
    {
      value: 2,
      label: 'Last Contacted'
    }
  ];

  const toggle = () => setIsOpen(!isOpen);
  const toggleNewTag = () => setOpenNewTag(!openNewTag);
  const toggleNewLeadSource = () => setOpenLeadSource(!openLeadSource);

  const [taskSearchResult, setTaskSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // ** Columns
  useMemo(() => {
    setTaskSearchResult(store?.tasks);
  }, [store]);

  useEffect(() => {
    if (store && Array.isArray(store.tags)) {
      let options = [];
      options.push({ value: '1', label: 'Add New Tag' });
      options.push({ value: '2', label: 'Show All' });
      for (const tag of store?.tags) {
        options.push({ value: tag.value, label: tag.value });
      }
      let source = [];
      source.push({ value: '1', label: 'Add New Source' });
      source.push({ value: '2', label: 'Show All' });
      for (const src of store?.leadSource) {
        source.push({ value: src.title, label: src.title });
      }
      setTagOptions(options);
      setLeadSourceOptions(source);
    }
  }, [store]);

  return (
    <div className="invoice-list-table-header w-100">
      {orderContactType != 2 && (
        <Row
          className="mb-2 border"
          style={{ marginBottom: '10px', marginRight: '0px', cursor: 'pointer' }}
        >
          <div className="d-flex justify-content-between">
            <h4 className="text-secondary" style={{ marginTop: '5px' }}>
              Filters
            </h4>
            <div onClick={toggle} style={{ marginTop: '5px', cursor: 'pointer' }}>
              {isOpen ? (
                <FaChevronUp size={18} style={{ color: 'lightgray' }} />
              ) : (
                <FaChevronDown size={18} color="primary" />
              )}
            </div>
          </div>
          <Collapse isOpen={isOpen}>
            <Row style={{ paddingBottom: '10px' }}>
              <Col md="3">
                <Label for="role-select">Source</Label>
                <Select
                  isClearable={false}
                  value={currentRole}
                  options={leadSourceOptions}
                  className="react-select"
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  onChange={(data) => {
                    setCurrentRole(data);
                    if (data.value === '1') {
                      //open leadsModal
                      toggleNewLeadSource();
                    } else if (data.value === '2') {
                      //get all
                      setTableData(partContacts?.slice(0, rowsPerPage));
                    } else {
                      setTableData(
                        partContacts
                          ?.filter((x) => x.leadSource == data.value)
                          .slice(0, rowsPerPage)
                      );
                    }
                  }}
                />
              </Col>
              <Col className="my-md-0 my-1" md="3">
                <Label for="plan-select">{contactTypeTitle} Type</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={clientTypeOptions}
                  value={currentPlan}
                  onChange={(data) => {
                    setCurrentPlan(data);
                    if (data.value === 'all') {
                      setTableData(partContacts?.slice(0, rowsPerPage));
                    } else {
                      setTableData(
                        partContacts?.filter((x) => x.type == data.value).slice(0, rowsPerPage)
                      );
                    }
                  }}
                />
              </Col>
              <Col md="3">
                <Label for="status-select">Status</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={status2Options}
                  value={currentStatus}
                  onChange={(data) => {
                    setCurrentStatus(data);

                    setTableData(
                      partContacts?.filter((x) => x.status == data.value).slice(0, rowsPerPage)
                    );
                    // dispatch(ClientContactFetchAction({ isFormer: data.value }));
                  }}
                />
              </Col>
              <Col md="3">
                <Label for="status-select">Tag</Label>
                <Select
                  // isMulti
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select"
                  classNamePrefix="select"
                  options={tagOptions}
                  value={currentTag}
                  onChange={(data) => {
                    setCurrentTag(data);

                    if (data.value === '1') {
                      //add new tag
                      toggleNewTag();
                    } else if (data.value === '2') {
                      setTableData(partContacts?.slice(0, rowsPerPage));
                    } else {
                      setTableData(
                        partContacts?.filter((x) => x.stage == data.value).slice(0, rowsPerPage)
                      );
                    }
                  }}
                />
              </Col>
            </Row>
          </Collapse>
        </Row>
      )}
      <Row>
        <Col
          xl="12"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          {/* <div className="d-flex align-items-center mb-sm-0 mb-1 me-1 w-100"> */}
          <div className="d-flex align-content-center justify-content-between w-100 me-1">
            <InputGroup className="input-group-merge border-0 shadow-none">
              <InputGroupText className="input-group-merge border-1 shadow-none">
                <Search className="text-muted" size={14} />
              </InputGroupText>
              <Input
                id="search-invoice"
                className="border-1"
                type="text"
                // value={tempValue}
                onChange={(e) => {
                  clearTimeout(typingTimer);
                  typingTimer = setTimeout(() => doneTyping(e.target.value), doneTypingInterval);
                }}
                placeholder="Search..."
              />
            </InputGroup>
            <div style={{ minWidth: '200px' }}>
              <Select
                isClearable={false}
                value={ratingType}
                options={ratingOptions}
                className="react-select ms-1"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(data) => {
                  setRatingType(data);
                  if (data.value === 1) {
                    // For Last Attended
                  } else if (data.value === 2) {
                    // For Last Contacted
                  } else {
                  }
                }}
              />
            </div>
          </div>
          <div className="d-flex text-center">
            <div>
              {deleteContactArr?.length != 0 && (
                <Button
                  className="btn-icon me-1"
                  outline
                  color="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    // dispatch(deleteUser(row.id))
                    handleDeleteConfirmation({
                      ids: deleteContactArr?.map((x) => x._id),
                      show: true
                    });
                  }}
                >
                  <AiOutlineDelete size={16} />
                </Button>
              )}
            </div>
            <div>
              <Button
                className="btn-icon me-1"
                outline
                color="primary"
                onClick={() => setOpenAddProgression(true)}
                disabled={deleteContactArr?.length == 0}
              >
                {/* <BiUser size={16} /> */}
                <TrendingUp size={16} />
              </Button>
            </div>
            <div>
              <Button
                className="btn-icon me-1"
                outline
                color="primary"
                disabled={deleteContactArr?.length == 0}
                onClick={() => setIsMergeModalOpen(true)}
              >
                <BsPrinter size={16} />
              </Button>
            </div>

            <div>
              <Button
                className="btn-icon me-1"
                outline
                color="primary"
                onClick={() => setContactImportModal((p) => !p)}
              >
                <Download size={16} />
              </Button>
            </div>
          </div>
          <div className="d-flex align-items-center table-header-actions">
            <UncontrolledDropdown className="me-1">
              <DropdownToggle color="secondary" caret outline>
                <Share className="font-small-4 me-50" />
                <span className="align-middle">Export</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  className="w-100"
                  onClick={() => {
                    // downloadCSV(store.data)
                  }}
                >
                  <FileText className="font-small-4 me-50" />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Button
              style={{ fontSize: '12px', whiteSpace: 'nowrap' }}
              className="add-new-user"
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                dispatch(selectContactAction({}));
                toggleSidebar();
              }}
            >
              Add New {contactTypeTitle}
            </Button>
          </div>
        </Col>
      </Row>
      <AddProgression
        setOpenAddProgression={setOpenAddProgression}
        openAddProgression={openAddProgression}
        selectedRowDataProg={deleteContactArr}
        contactTypeTitle={contactTypeTitle}
      />
      {store && store?.tags && (
        <AddNewTagModal open={openNewTag} store={store} dispatch={dispatch} toggle={toggleNewTag} />
      )}
      {store && store?.leadSource && (
        <AddNewLeadSourceModal
          open={openLeadSource}
          store={store}
          dispatch={dispatch}
          toggle={toggleNewLeadSource}
        />
      )}
    </div>
  );
};

const ContactList = ({
  store,
  contactTypeId,
  contactTypeTitle,
  selectedLeadSource,
  selectedStage,
  activeSidebar
}) => {
  // ** props && constants
  const dispatch = useDispatch();
  const contactList = store?.contactList?.list;
  const orderContactType = store?.contactTypeList?.map((x) => x._id)?.indexOf(contactTypeId);
  // ** User filter options
  const roleOptions = [
    { value: '', label: 'Select Position' },
    { value: 'Owner', label: 'Owner' },
    { value: 'Assistant', label: 'Assistant' },
    { value: 'Billing', label: 'Billing' }
  ];

  const { mutate } = useDeleteContacts();
  // ** States
  const [partContacts, setPartContacts] = useState(
    store?.contactList?.list?.filter((x) => x.contactType.indexOf(contactTypeId) > -1)
  );
  const [tableData, setTableData] = useState(partContacts?.slice(0, 10));
  const [modal, setModal] = useState(false);
  const [row, setRow] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    ids: [],
    show: false
  });
  const [isMergeModalOpen, setIsMergeModalOpen] = useState(false);
  const [contactImportModal, setContactImportModal] = useState(false);
  const [contactImportStep, setContactImportStep] = useState('first');
  const [sort, setSort] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingType, setRatingType] = useState({ value: 1, label: 'Last Attended' });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState('id');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dragColumns, setDragColumns] = useState([]);
  const [deleteContactArr, setDeleteContactArr] = useState([]);
  const [clientContactFields, setClientContactFields] = useState([]);
  const [currentRole, setCurrentRole] = useState({
    value: '',
    label: 'Select Position'
  });
  const [currentPlan, setCurrentPlan] = useState({
    value: '',
    label: 'Select Type'
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: '',
    label: 'Select Stage',
    number: 0
  });

  // ** Handlers
  const toggle = () => setModal(!modal);

  const fetchNotes = (id) => {
    dispatch(contactNoteFetchAction(id));
  };

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleDeleteConfirmation = (ids) => {
    Swal.fire({
      title: 'Delete?',
      text: `Are you sure you want to delete this contact ${contactTypeTitle} data?`,
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
        // Perform delete action
        mutate({ ids });
      }
    });
  };

  const { columns } = useColumns({
    store,
    setDeleteModal,
    toggle,
    toggleSidebar,
    setRow,
    fetchNotes,
    orderContactType,
    ratingType,
    handleDeleteConfirmation
  });

  const changeViewGoal = (e) => {
    dispatch(changeViewGoalAction(e));
  };

  // ** Function in get data on page change
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val.toLowerCase());
  };

  const handleRowSelected = (data) => {
    setDeleteContactArr(data.selectedRows);
  };
  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(partContacts?.length / rowsPerPage);

    return (
      <div className="d-flex justify-content-end">
        <div
          className="d-flex align-items-center justify-content-end"
          style={{ marginTop: '10px' }}
        >
          {/* <label htmlFor="rows-per-page">Show</label> */}
          <Input
            className="mx-50"
            type="select"
            id="rows-per-page"
            value={rowsPerPage}
            onChange={handlePerPage}
            style={{ width: '5rem' }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </Input>
          <label htmlFor="rows-per-page" style={{ marginRight: '1rem' }}>
            Per Page
          </label>
        </div>
        <ReactPaginate
          previousLabel={''}
          nextLabel={''}
          pageCount={count || 1}
          activeClassName="active"
          forcePage={currentPage !== 0 ? currentPage - 1 : 0}
          onPageChange={(page) => handlePagination(page)}
          pageClassName={'page-item'}
          nextLinkClassName={'page-link'}
          nextClassName={'page-item next'}
          previousClassName={'page-item prev'}
          previousLinkClassName={'page-link'}
          pageLinkClassName={'page-link'}
          containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
        />
      </div>
    );
  };

  const handleColumnsOrderChange = (newColumns) => {
    setDragColumns(newColumns);
    let orderArr = [];
    newColumns.map((col, index) => {
      orderArr.push({
        name: col.name,
        order: index
      });
    });
    dispatch(updateContactFieldOrderAction({ contactTypeId, orderArr }));
  };

  // ** Effects

  useEffect(() => {
    if (contactTypeId) {
      dispatch(getContactFieldByTypeAction(contactTypeId));
    }
  }, [contactTypeId]);

  useMemo(() => {
    if (!store?.contactUpload?.fileProcessing && store?.contactUpload?.contacts?.length > 0) {
      setContactImportStep('second');
      setContacts(store?.contactUpload.contacts);
    } else {
      setContactImportStep('first');
    }
    if (store?.contactUpload?.uploadState === 'success') {
      setContactImportModal(false);
      // // Recall Fetch data again
      fetchData();
      // // Reset upload state
      dispatch(importProcessingReset());
      dispatch(totalClientCountAction());
      toast.success(<ToastContent message="Contacts import successfully" />);
    }
    if (store?.tags?.data?.length > 0) {
      let buildTags = store?.tags?.data.map((x, i) => ({
        value: x,
        label: x,
        number: i
      }));
      buildTags = [{ value: '', label: 'Select Tag', number: buildTags.length }, ...buildTags];
      setTags(buildTags);
    }
  }, [store]);
  useMemo(() => {
    setTableData(partContacts?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage));
  }, [partContacts, rowsPerPage, currentPage]);

  useEffect(() => {
    setTableData(
      partContacts
        ?.filter(
          (x) =>
            x?.fullName?.toLowerCase()?.indexOf(searchTerm) > -1 ||
            x?.phone?.toLowerCase()?.indexOf(searchTerm) > -1 ||
            x?.type?.toLowerCase()?.indexOf(searchTerm) > -1
        )
        ?.slice(0, rowsPerPage)
    );
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    // fetchData();
    //
  }, [
    dispatch,
    sort,
    sortColumn,
    currentPage,
    currentRole,
    currentStatus,
    currentPlan,
    rowsPerPage,
    searchTerm
  ]);
  useEffect(() => {
    if (
      orderContactType == 2 &&
      selectedStage?.stage?.value.toLowerCase() !== 'win' &&
      selectedStage?.stage?.value.toLowerCase() !== 'lost'
    ) {
      setPartContacts(
        store?.contactList?.list?.filter(
          (x) =>
            x?.contactType.indexOf(contactTypeId) > -1 &&
            belongsToIngerval(activeSidebar, x?.updatedAt) &&
            (selectedLeadSource?.value
              ? x?.leadSource?.map((src) => src.value)?.includes(selectedLeadSource?.value)
              : true) &&
            (selectedStage?.stage?.value ? x.stage == selectedStage?.stage?.value : true)
        )
      );
    } else {
      setPartContacts(
        store?.contactList?.list?.filter(
          (x) =>
            x?.contactType.indexOf(contactTypeId) > -1 &&
            belongsToIngerval(activeSidebar, x?.updatedAt)
        )
      );
    }
    setCurrentPage(1);
  }, [store, activeSidebar, selectedLeadSource, selectedStage]);

  useEffect(() => {
    if (columns?.length > 0) {
      setDragColumns(columns);
    }
  }, [columns]);
  return (
    <Fragment>
      <Card className="mb-0 wrapper-table-contact">
        <div className="react-dataTable" style={{ height: 'auto', maxHeight: '100%' }}>
          {/* <ReactSortable
            tag="ul"
            list={tableData}
            handle=".drag-icon"
            className="task-task-list media-list"
            setList={(newState) => handleSetList(newState)}
            overFlow="auto"
          > */}
          <DataTable
            noHeader
            subHeader
            // sortServer
            pagination
            responsive
            selectableRows
            paginationServer
            columns={dragColumns}
            // onSort={handleSort}
            title={'contacts'}
            striped={true}
            highlightOnHover={true}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            onSelectedRowsChange={handleRowSelected}
            paginationComponent={CustomPagination}
            expandableRows={orderContactType == 1}
            expandOnRowClicked={orderContactType == 1}
            expandableRowsComponent={ExpandableTable}
            onColumnOrderChange={handleColumnsOrderChange}
            // data={dataToRender()}
            data={tableData}
            subHeaderComponent={
              <CustomHeader
                store={store}
                contactTypeTitle={contactTypeTitle}
                orderContactType={orderContactType}
                tableData={tableData}
                setTableData={setTableData}
                ratingType={ratingType}
                setRatingType={setRatingType}
                partContacts={partContacts}
                deleteContactArr={deleteContactArr}
                setDeleteModal={setDeleteModal}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
                setIsMergeModalOpen={setIsMergeModalOpen}
                setContactImportModal={setContactImportModal}
                handleDeleteConfirmation={handleDeleteConfirmation}
                // showdelete={showdelete}
              />
            }
            // onSelectedRowsChange={handleRowSelected}
            // selectableRows
          />
          {/* </ReactSortable> */}
        </div>
      </Card>

      {row !== null && (
        <NoteModal
          toggle={toggle}
          isOpen={modal}
          row={row}
          notes={store?.notes?.data || []}
          dispatch={dispatch}
          setDeleteModal={setDeleteModal}
          orderContactType={orderContactType}
        />
      )}

      <Sidebar
        store={store}
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        setSidebarOpen={setSidebarOpen}
        setCurrentPage={setCurrentPage}
        tableData={tableData}
        contactTypeTitle={contactTypeTitle}
        orderContactType={orderContactType}
        // leadRefetch={leadRefetch}
      />

      {/* // Delete Modal  */}
      <Modal
        toggle={() => {
          setDeleteModal({
            id: [],
            show: false
          });
        }}
        centered
        isOpen={deleteModal.show}
      >
        <ModalBody>
          <div>
            <h3>Are you sure to Delete ?</h3>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            onClick={() => {
              setDeleteModal({
                id: [],
                show: false
              });
            }}
          >
            No
          </Button>
          <Button
            // disabled={deleteLoading}
            size="sm"
            color="primary"
            onClick={() => {
              mutate({ ids: deleteModal?.ids });
              // dispatch(deleteEmployeeContact({ _id: deleteModal?.id }));
            }}
          >
            {'Yes'}
          </Button>{' '}
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={contactImportModal}
        toggle={() => setContactImportModal(false)}
        className={`modal-dialog-centered ${
          contactImportStep === 'first' ? 'modal-sm' : 'modal-xl'
        }`}
        key={123}
      >
        <ModalHeader toggle={() => setContactImportModal(false)}>
          {contactImportStep === 'first' ? 'Choose CSV file' : 'Final Check to import '}
        </ModalHeader>
        <ModalBody>
          {contactImportStep === 'first' ? (
            <Fragment>
              <CSVReader
                onFileLoaded={(data, fileInfo, originalFile) => {
                  let contactData = [];
                  contactData = data.filter((x, i) => {
                    let isEmpty = true;
                    for (let each of Object.values(x)) {
                      if (each !== '') {
                        isEmpty = false;
                      }
                    }
                    return !isEmpty;
                  });
                  contactData = contactData.map((x, i) => {
                    let data = Object.values(x).filter((x) => x !== '');
                    return {
                      ...data
                    };
                  });

                  setContacts(contactData);
                  setContactImportStep('second');
                }}
              />
            </Fragment>
          ) : (
            <Fragment>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  alignItems: 'center'
                }}
              >
                <span style={{ textAlign: 'center', flex: 1 }}>Serial</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Full Name</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Email</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Contact</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Type</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Company</span>
                <span style={{ textAlign: 'center', flex: 5 }}>Position</span>
              </div>
              {contacts &&
                contacts.map((contact, index) => (
                  <div
                    key={index + 1}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Input style={{ flex: 1 }} value={index + 1} />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[0]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 0, e.target.value)}
                    />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[1]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 1, e.target.value)}
                    />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[2]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 2, e.target.value)}
                    />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[3]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 3, e.target.value)}
                    />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[4]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 4, e.target.value)}
                    />
                    <Input
                      style={{ flex: 5 }}
                      value={contact[5]}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => onchangeImportContact(index, 5, e.target.value)}
                    />
                  </div>
                ))}
            </Fragment>
          )}
        </ModalBody>
        <ModalFooter>
          {contactImportStep !== 'first' && (
            <Button
              onClick={() => {
                setContactImportStep('first');
              }}
              color="primary"
              outline
            >
              Upload Again
            </Button>
          )}
          <Button
            color="primary"
            outline
            onClick={() => {
              if (contactImportStep === 'first') {
                if (contactImportCsvFile === null) {
                  return;
                }
                // let form = new FormData()
                // form.append('file', contactImportCsvFile)
                // form.append('type', 'csv')
                // dispatch(contactFileUploadAction(form))

                // Lets Parse This Here
              } else {
                // Import Contact
                // Check if type has Error or Not
                const CheckInvalidType = contacts.find((x, i) => {
                  if (x[3] === 'individual' || x[3] === 'company') {
                    return false;
                  }
                  return true;
                });
                if (CheckInvalidType) {
                  toast.error(
                    <ToastContent message="Type Column must have value individual or company" />
                  );
                  return;
                }
                // Check Position Error
                const CheckInvalidPosition = contacts.find((x, i) => {
                  if (
                    x[5] === 'owner' ||
                    x[5] === 'assitant' ||
                    x[5] === 'billing' ||
                    x[5] === 'n/a'
                  ) {
                    return false;
                  }
                  return true;
                });

                if (CheckInvalidPosition) {
                  toast.error(
                    <ToastContent message="Position Column must have value owner / assitant / billing / n/a" />
                  );
                  return;
                }
                dispatch(contactImportAction({ contacts }));
              }
            }}
          >
            {contactImportStep === 'first' ? 'submit' : ' finish import'}
          </Button>
        </ModalFooter>
      </Modal>
      <MergeModal isMergeModalOpen={isMergeModalOpen} setIsMergeModalOpen={setIsMergeModalOpen} />
    </Fragment>
  );
};

export default ContactList;
