// ** React Imports
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';

// ** Icons Imports
import {
  HelpCircle,
  UserPlus,
  UserMinus,
  UserCheck,
  Printer,
  Send,
  Trash,
  Check,
  Save,
  Eye
} from 'react-feather';
import { BsSend } from 'react-icons/bs';
import { MdDeleteSweep } from 'react-icons/md';

import 'jspdf-autotable';

// ** Reactstrap Imports
import {
  Badge,
  Button,
  Input,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown
} from 'reactstrap';
import ReactPaginate from 'react-paginate';

// ** Custom Component
import useMessage from '../../../../lib/useMessage';
import NoteModal from '../../../contacts/Note';
import SaveContactModal from '../SaveContactModal';
import DeleteConfirmModal from '../DeleteConfirmModal';
// ** Action
import { getEventInfo, replyToEvent } from '../store';
import { renderCategoryName } from '../../../../utility/Utils';
import PaymentModal from '../payment/PaymentModal';
import CreateInvoiceModal from '../payment/CreateInvoiceModal';
import { sendBulkInvoice } from '../store/actions';

const GuestTable = (props) => {
  const dispatch = useDispatch();
  const { eventInfo, active } = props;

  // ** Constants
  const filterOptions = [
    { value: '', label: 'Select Filter' },
    { value: 'coming', label: 'Coming' },
    { value: 'nextTime', label: 'Next Time' },
    { value: 'noreply', label: 'No Reply' },
    { value: 'paid', label: 'Paid' },
    { value: 'notPaid', label: 'Not Paid' }
  ];

  const statusObj = {
    came: 'success',
    going: 'light-success',
    notgoing: 'light-warning',
    noreply: 'light-danger',
    maybe: 'light-info',
    'No reply': 'danger',
    notcame: 'warning'
  };

  const categoryObj = {
    client: 'primary',
    employee: 'light-success',
    lead: 'light-warning',
    relationship: 'light-danger',
    vendor: 'light-info'
  };

  const typeObj = {
    public: 'primary',
    private: 'light-success'
  };

  // ** Get current event
  const { eventId } = useParams();
  const { error, success } = useMessage();

  const [editableRows, setEditableRows] = useState([]);
  const [isButtonShow, setIsButtonShow] = useState(false);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [addToEventContactList, setAddToEventContactList] = useState([]);
  const [selectedTableRows, setSelectedTableRows] = useState([]);
  const [guestArray, setGuestArray] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [contactModal, setContactModal] = useState(false);
  const [isBulk, setIsBulk] = useState(false);
  // ** Notes
  const [row, setRow] = useState({});
  const [noteModal, setNoteModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openAddInvoice,setOpenAddInvoice] = useState(false)

  const tableData = eventInfo?.guests;

  const promotedData = useSelector((state) => [
    ...state?.totalContacts?.promotedClientList,
    ...state?.totalContacts?.progressionListClientData
  ]);
  const noteData = useSelector((state) => state?.totalContacts?.notes?.data);
  const contactTypes = useSelector((state) => state?.totalContacts?.contactTypeList);

  // ** Effect
  useEffect(() => {
    let tmp = [];

    active == 1 &&
      eventInfo.guests &&
      eventInfo.guests.map((item, index) => {
        if (item.status == 'came' || item.status == 'going' || item.status === 'notcame') {
          item = { ...item, status: 'going' };
        } else if (item.status == 'maybe') {
          item = { ...item, status: 'maybe' };
        } else if (item.status == 'notgoing') {
          item = { ...item, status: 'notgoing' };
        } else {
          item = { ...item, status: 'noreply' };
        }
        if (contactTypes) {
          item = { ...item, category: renderCategoryName(contactTypes, item.contact.contactType) };
          tmp.push(item);
        }
      });
    setGuestArray(tmp);
  }, [eventInfo?.guests, active, contactTypes]);

  useEffect(() => {
    setAddToEventContactList(
      tableData?.map((selected) => {
        let filteredPromotedData = promotedData.filter(
          (promoted) => promoted.clientId == selected?.clientId
        );
        return filteredPromotedData.length > 0 ? filteredPromotedData[0] : selected;
      })
    );
  }, [tableData, promotedData?.length]);

  // ** Handlers
  const handleSelectRows = (e) => {
    if (e.selectedRows.length > 0) {
      setIsButtonShow(true);
      setEditableRows(e.selectedRows);
      setSelectedTableRows(e.selectedRows);
    } else {
      setEditableRows([]);
      setIsButtonShow(false);
    }
  };

  const handleDecisionClick = async ({ row, decision }) => {
    if (editableRows.length > 0) {
      let tmpIdArr = editableRows.map((row, index) => {
        return row.contact._id;
      });
      dispatch(
        replyToEvent({
          contactIdArr: tmpIdArr,
          status: decision,
          eventId: eventId
        })
      );
      dispatch(getEventInfo(eventId));
      setToggleClearRows(!toggledClearRows);
      success('Successfully updated');
      setEditableRows([]);
    } else {
      dispatch(
        replyToEvent({
          contactIdArr: [row.contact._id],
          status: decision,
          eventId: eventId
        })
      );
      dispatch(getEventInfo(eventId));
      setToggleClearRows(!toggledClearRows);
      success('Successfully updated');
      setEditableRows([]);
    }
  };

  const handleRemoveClick = () => {
    setIsBulk(true);
    toggleDeleteModal();
  };

  const handleEyeClick = (row) => {
    if (row) {
      setRow(row);
      toggle();
    } else return;
  };

  const handleTrashClick = (row) => {
    if (row) {
      setRow(row);
      toggleDeleteModal();
    } else return;
  };

  const toggle = () => {
    setNoteModal(!noteModal);
  };

  const toggleContactModal = () => {
    setContactModal(!contactModal);
  };

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const toggleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  };

  const togglePaymentModal = () => setOpenPaymentModal(!openPaymentModal);
  const toggleAddInvoice = () => setOpenAddInvoice(!openAddInvoice);

  const handlePayNowClick = async (row) => {
    setRow(row);
    togglePaymentModal();
  };

  const handleSaveClick = () => {
    setContactModal(true);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handleBulkPayNowClick = async () => {
    // if (editableRows.length > 0) {
    //   let tmpIdArr = editableRows.map((row, index) => {
    //     return row.contact._id;
    //   });

    //   dispatch(
    //     replyToEvent({
    //       contactIdArr: tmpIdArr,
    //       paid: 'paid',
    //       eventId: eventId
    //     })
    //   );
    //   dispatch(getEventInfo(eventId));
    //   success('Successfully Updated');
    //   setToggleClearRows(!toggledClearRows);
    //   setEditableRows([]);
    // } else {
    //   return;
    // }

    setIsBulk(true);
    togglePaymentModal();
  };
  const handleBulkSendInvoice = async () => {
    let tmpIdArr = editableRows.map((row, index) => {
      return row.contactId?row.contactId:row.contact._id;
    });
    dispatch(sendBulkInvoice(eventInfo._id,{contacts:tmpIdArr}))
  };
  const renderStatus = (status) => {
    if (status == 'going') {
      return 'Going';
    } else if (status == 'notgoing') {
      return 'Not Going';
    } else if (status == 'No reply' || status == 'noreply') {
      return 'No Reply';
    } else if (status == 'notcame') {
      return 'Did Not Come';
    } else return status;
  };

  const handleViewInvoice =(row)=>{
    setRow(row)
    if(row.invoiceId){
      window.open(`/invoice-preview/${row.invoiceId._id}`)
    }
    else{
      //create invoice
      dispatch(sendBulkInvoice(eventInfo._id,{contacts:[row.contact._id]}))
    }
  }
  const handleSendInvoice =(row)=>{
    setRow(row)
    dispatch(sendBulkInvoice(eventInfo._id,{contacts:[row.contact._id]}))
  }

  const CustomPagination = () => {
    const count = Math.ceil(guestArray?.length / rowsPerPage);

    return (
      <div className="d-flex justify-content-end">
        <div className="d-flex align-items-center justify-content-end">
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

  const tableColumns =
    eventInfo.checkoutType != 'none'
      ? [
          {
            name: 'Name',
            sortable: true,
            minWidth: '220px',
            cell: (row) => (
              <div className="d-flex justify-content-left align-items-center">
                <div className="d-flex flex-column">
                  <Link className="user_name text-truncate text-body">
                    <span className="fw-bolder">{row?.contact.fullName}</span>
                  </Link>
                  <small className="text-truncate text-muted mb-0">{row?.contact.email}</small>
                </div>
              </div>
            )
          },
          {
            name: 'Phone',
            sortable: true,
            sortField: 'phone',
            selector: (row) => row?.contact.phone,
            cell: (row) =>
              row?.contact.phone ? (
                <span className="text-capitalize">{row.contact.phone}</span>
              ) : (
                <Badge color="light-warning">Unknown</Badge>
              )
          },
          {
            name: 'Type',
            sortable: true,
            sortField: 'category',
            selector: (row) => row?.contact.contactType,
            cell: (row) => (
              <Badge
                className="text-capitalize"
                color={categoryObj[row.category.toLowerCase()]}
                pill
              >
                {row.category}
              </Badge>
            )
          },
          {
            name: 'Status',
            sortable: true,
            sortField: 'status',
            selector: (row) => row?.status,
            cell: (row) => {
              if (row?.status) {
                return (
                  <UncontrolledDropdown>
                    <DropdownToggle tag="span">
                      <Badge
                        color={statusObj[row?.status]}
                        className="text-capitalize cursor-pointer"
                      >
                        {renderStatus(row?.status)}
                      </Badge>
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem
                        tag={'li'}
                        onClick={(e) => handleDecisionClick({ row: row, decision: 'going' })}
                      >
                        <Badge color="light-success" className="text-capitalize">
                          Going
                        </Badge>
                      </DropdownItem>
                      <DropdownItem
                        tag={'li'}
                        onClick={(e) => handleDecisionClick({ row: row, decision: 'notgoing' })}
                      >
                        <Badge color="light-warning" className="text-capitalize">
                          Not Going
                        </Badge>
                      </DropdownItem>
                      <DropdownItem
                        tag={'li'}
                        onClick={(e) => handleDecisionClick({ row: row, decision: 'maybe' })}
                      >
                        <Badge color="light-info" className="text-capitalize">
                          Maybe
                        </Badge>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                );
              }
            }
          },
          {
            name: 'Invoice',
            sortable: true,
            cell: (row) => (
              <>
                <BsSend className="font-medium-3 text-body me-1" style={{cursor:"pointer"}} onClick={()=>handleSendInvoice(row)}/>
                <Eye className="font-medium-3 text-body me-1" style={{cursor:"pointer"}} onClick={()=>handleViewInvoice(row)}/>
              </>
            )
          },
          {
            name: 'Paid',
            sortable: true,
            cell: (row) => {
              if (row?.invoiceId && row?.invoiceId?.payNow===0) {
                return <Badge color="success">Paid</Badge>;
              } else {
                return (
                  <Button
                    color="primary"
                    className="text-nowrap"
                    size="sm"
                    onClick={(e) => handlePayNowClick(row)}
                  >
                    Pay Now
                  </Button>
                );
              }
            }
          },
          {
            name: 'Note',
            sortable: true,
            sortField: 'note',
            cell: (row) => (
              <>
                <Eye
                  size={20}
                  className="cursor-pointer"
                  id="detail"
                  onClick={(e) => handleEyeClick(row)}
                />
                <UncontrolledTooltip placement="left" target="detail">
                  Guest Detail
                </UncontrolledTooltip>
              </>
            )
          },
          {
            name: 'Actions',
            cell: (row) => (
              <>
                <Trash
                  size={20}
                  className="cursor-pointer me-50"
                  id="delete"
                  onClick={(e) => handleTrashClick(row)}
                />
                <UncontrolledTooltip placement="left" target="delete">
                  Remove Guest
                </UncontrolledTooltip>
              </>
            )
          }
        ]
      : [
          {
            name: 'Name',
            sortable: true,
            minWidth: '220px',
            cell: (row) => (
              <div className="d-flex justify-content-left align-items-center">
                <div className="d-flex flex-column">
                  <Link className="user_name text-truncate text-body">
                    <span className="fw-bolder">{row?.contact.fullName}</span>
                  </Link>
                  <small className="text-truncate text-muted mb-0">{row?.contact.email}</small>
                </div>
              </div>
            )
          },
          {
            name: 'Phone',
            sortable: true,
            sortField: 'phone',
            selector: (row) => row?.contact.phone,
            cell: (row) =>
              row?.contact.phone ? (
                <span className="text-capitalize">{row.contact.phone}</span>
              ) : (
                <Badge color="light-warning">Unknown</Badge>
              )
          },
          {
            name: 'Type',
            sortable: true,
            sortField: 'category',
            selector: (row) => row?.contact.contactType,
            cell: (row) => (
              <Badge
                className="text-capitalize"
                color={categoryObj[row.category.toLowerCase()]}
                pill
              >
                {row.category}
              </Badge>
            )
          },
          {
            name: 'Status',
            sortable: true,
            sortField: 'status',
            selector: (row) => row?.status,
            cell: (row) => {
              if (row?.status) {
                return (
                  <UncontrolledDropdown>
                    <DropdownToggle tag="span">
                      <Badge
                        color={statusObj[row?.status]}
                        className="text-capitalize cursor-pointer"
                      >
                        {renderStatus(row?.status)}
                      </Badge>
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem
                        tag={'li'}
                        onClick={(e) => handleDecisionClick({ row: row, decision: 'going' })}
                      >
                        <Badge color="light-success" className="text-capitalize">
                          Going
                        </Badge>
                      </DropdownItem>
                      <DropdownItem
                        tag={'li'}
                        onClick={(e) => handleDecisionClick({ row: row, decision: 'notgoing' })}
                      >
                        <Badge color="light-warning" className="text-capitalize">
                          Not Going
                        </Badge>
                      </DropdownItem>
                      <DropdownItem
                        tag={'li'}
                        onClick={(e) => handleDecisionClick({ row: row, decision: 'maybe' })}
                      >
                        <Badge color="light-info" className="text-capitalize">
                          Maybe
                        </Badge>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                );
              }
            }
          },
          {
            name: 'Note',
            sortable: true,
            sortField: 'note',
            cell: (row) => (
              <>
                <Eye
                  size={20}
                  className="cursor-pointer"
                  id="detail"
                  onClick={(e) => handleEyeClick(row)}
                />
                <UncontrolledTooltip placement="left" target="detail">
                  Guest Detail
                </UncontrolledTooltip>
              </>
            )
          },
          {
            name: 'Actions',
            cell: (row) => (
              <>
                <Trash
                  size={20}
                  className="cursor-pointer me-50"
                  id="delete"
                  onClick={(e) => handleTrashClick(row)}
                />
                <UncontrolledTooltip placement="left" target="delete">
                  Remove Guest
                </UncontrolledTooltip>
              </>
            )
          }
        ];

  return (
    <Card>
      <CardHeader>
        <div>
          <h5 className="fw-bolder text-primary">
            <span className="text-capitalize">{eventInfo?.eventCategory} Event</span>
            <Badge
              className="text-capitalize ms-50"
              color={eventInfo?.type ? typeObj[eventInfo.type.toLowerCase()] : 'primary'}
              pill
            >
              {eventInfo?.type}
            </Badge>
          </h5>
          <h5>
            Goal:{' '}
            <span className="text-capitalize ms-25">
              {eventInfo?.checkoutType == 'none' ? 'RSVP' : eventInfo?.checkoutType}
            </span>
            {}
          </h5>
        </div>
        <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
          <Button
            size={'sm'}
            className="ms-1"
            color="info"
            style={{ borderRadius: '20px' }}
            onClick={() => handleSaveClick()}
            disabled={editableRows.length == 0}
          >
            <Save className="me-1" size={16} />
            Save Contact
          </Button>
          <Button.Ripple
            size={'sm'}
            className="ms-1"
            color="primary"
            style={{ borderRadius: '20px' }}
            disabled={editableRows.length == 0}
          >
            <Printer className="me-1" size={16} />
            Print
          </Button.Ripple>
          <Button
            size={'sm'}
            className="ms-1 btn-purple"
            color="info"
            style={{ borderRadius: '20px' }}
            
            disabled={editableRows.length == 0 }
              onClick={(e) => handleBulkSendInvoice()}
          >
            <Send className="me-1" size={16} />
            Send Invoice
          </Button>
          {eventInfo.checkoutType != 'none' && (
            <Button
              size={'sm'}
              className="ms-1 btn-orange"
              style={{
                borderRadius: '20px'
              }}
              disabled={editableRows.length === 0 || editableRows.filter(x=>x?.invoiceId?.payNow===0).length > 0}
            onClick={(e) => handleBulkPayNowClick()}
            >
              <Check className="me-1" size={16} />
              Pay Now
            </Button>
          )}
          <Button.Ripple
            size={'sm'}
            className="ms-1"
            color="danger"
            style={{ borderRadius: '20px' }}
            disabled={editableRows.length == 0}
            onClick={(e) => handleRemoveClick()}
          >
            <MdDeleteSweep className="me-1" size={16} />
            Remove
          </Button.Ripple>
          <UncontrolledDropdown>
            <DropdownToggle tag="span">
              <Button
                size={'sm'}
                className="ms-1"
                color="success"
                style={{ borderRadius: '20px' }}
                disabled={editableRows.length == 0}
              >
                <HelpCircle className="me-1" size={16} />
                Mark
              </Button>
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag={'li'} onClick={(e) => handleDecisionClick({ decision: 'going' })}>
                <UserPlus className="me-50" size={14} />
                <span className="align-middle">Going</span>
              </DropdownItem>
              <DropdownItem
                tag={'li'}
                onClick={(e) => handleDecisionClick({ decision: 'notgoing' })}
              >
                <UserMinus className="me-50" size={14} />
                <span className="align-middle">Not Going</span>
              </DropdownItem>
              <DropdownItem tag={'li'} onClick={(e) => handleDecisionClick({ decision: 'maybe' })}>
                <UserCheck className="me-50" size={14} />
                <span className="align-middle">Maybe</span>
              </DropdownItem>
              <DropdownItem
                tag={'li'}
                onClick={(e) => handleDecisionClick({ decision: 'noreply' })}
              >
                <UserCheck className="me-50" size={14} />
                <span className="align-middle">Not Respond</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </CardHeader>
      <div className="react-dataTable react-dataTable-selectable-rows">
        <DataTable
          noHeader
          pagination
          responsive
          selectableRows
          onSelectedRowsChange={handleSelectRows}
          paginationComponent={CustomPagination}
          paginationServer
          columns={tableColumns}
          data={guestArray}
          clearSelectedRows={toggledClearRows}
        />
        {row !== null && (
          <NoteModal
            toggle={toggle}
            isOpen={noteModal}
            row={row}
            notes={noteData || []}
            dispatch={dispatch}
          />
        )}
        {editableRows?.length > 0 && (
          <SaveContactModal
            contactModal={contactModal}
            toggle={toggleContactModal}
            guests={editableRows}
            setToggleClearRows={setToggleClearRows}
            toggledClearRows={toggledClearRows}
            eventId={eventId}
          />
        )}
       
        <DeleteConfirmModal
          deleteModal={deleteModal}
          toggle={toggleDeleteModal}
          guestId={row._id}
          eventId={eventId}
          isBulk={isBulk}
          editableRows={editableRows}
          isInAttendance={false}
          toggleClearRows={toggleClearRows}
        />
      </div>
      <PaymentModal
          open={openPaymentModal}
          toggle={togglePaymentModal}
          dispatch={dispatch}
          selectedRow={row}
          event={eventInfo}
          rows={editableRows}
          isBulk={isBulk}
          setEditableRows={setEditableRows}
          setToggleClearRows={setToggleClearRows}
          toggledClearRows = {toggledClearRows}
        />
        {row!==null && <CreateInvoiceModal toggle={toggleAddInvoice} open={openAddInvoice} row={row} event={eventInfo}/>}
    </Card>
  );
};

export default GuestTable;
