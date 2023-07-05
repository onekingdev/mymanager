// ** React Imports
import { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import moment from 'moment';

// ** Icons Imports
import { Check, Send, Printer, Trash, Eye } from 'react-feather';
import { BsSend } from 'react-icons/bs';
// ** Utils
import { selectThemeColors } from '@utils';

// ** Third Party Components
import Select from 'react-select';
import {
  Table,
  Badge,
  Label,
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

// ** Custom Component
import useMessage from '../../../../lib/useMessage';
import Avatar from '@components/avatar';
import NoteModal from '../../../contacts/Note';
import SaveContactModal from '../SaveContactModal';
import DeleteConfirmModal from '../DeleteConfirmModal';
import NoRankModal from '../NoRankModal';
// ** Action
import { getEventInfo, replyToEvent, registerToEvent } from '../store';
import { deleteGuestAction, deleteGuestArrAction, sendBulkInvoice } from '../store/actions';
import { progressionCategoriesRankFetchAction } from '../../../settings/tabs/progressiontab/store/actions';
import { addClientProgressionAction, contactRankListAction } from '../../../contacts/store/actions';
import * as api from '../../../contacts/store/api';
import PaymentModal from '../payment/PaymentModal';
import Swal from 'sweetalert2';
import CreateInvoiceModal from '../payment/CreateInvoiceModal';


const PromotionGuestTable = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    eventInfo,
    inviteeList,
    setInviteeList,
    contactRankList,
    curProgression,
    setCurProgression
  } = props;
  const tableData = eventInfo?.guests;
  // ** Constants
  const statusObj = {
    came: 'success',
    going: 'light-success',
    notgoing: 'light-warning',
    noreply: 'light-danger',
    maybe: 'light-info',
    'No reply': 'danger',
    notcame: 'warning'
  };

  const typeObj = {
    public: 'primary',
    private: 'light-success'
  };

  const orderColors = [
    'light-success',
    'light-danger',
    'light-warning',
    'light-info',
    'light-primary',
    'light-secondary'
  ];

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'paid', label: 'Paid' },
    { value: 'notpaid', label: 'Not paid' },
    { value: 'refund', label: 'Refund' }
  ];

  // ** Get current event
  const { eventId } = useParams();
  const { error, success } = useMessage();
  const noteData = useSelector((state) => state?.totalContacts?.notes?.data);

  const [editableRows, setEditableRows] = useState([]);
  const [isButtonShow, setIsButtonShow] = useState(false);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [isBulk, setIsBulk] = useState(false);
  // ** Notes
  const [row, setRow] = useState({});
  const [noteModal, setNoteModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [noRankModal, setNoRankModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(filterOptions[0]);
  const [filteredGuestArray, setFilteredGuestArray] = useState([]);
  const [selectedCategoryInfo, setSelectedCategoryInfo] = useState({});

  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openAddInvoice,setOpenAddInvoice] = useState(false)
  
  const togglePaymentModal = () => setOpenPaymentModal(!openPaymentModal);
  const toggleAddInvoice = () => setOpenAddInvoice(!openAddInvoice);
  // ** Redux
  //** Progression Data */
  const progressionArr = useSelector((state) => state?.totalContacts?.fetchProgressionData);

  // // ** Effect
  // useEffect(() => {
  //   if (eventInfo.progressionCategory === 'one' && categoriesArray?.length === 1) {
  //     dispatch(progressionCategoriesRankFetchAction(categoriesArray[0].categoryId));
  //   }
  // }, [categoriesArray, eventInfo]);

  useEffect(() => {
    let tmp = [];
    if (curProgression && curProgression?.categoryId) {
      for (let i = 0; i < curProgression.categoryId.length; i++) {
        if (eventInfo?.progressionCategory?.includes(curProgression.categoryId[i]._id)) {
          tmp.push({
            name: curProgression?.progressionName,
            progressionId: curProgression?._id,
            list: curProgression?.categoryId[i],
            categoryId: curProgression?.categoryId[i]?._id
          });
        }
      }
    }
    setCategoriesArray(tmp);
  }, [curProgression]);

  useEffect(() => {
    if (eventInfo?.progression && progressionArr) {
      let tmp = {};
      tmp = progressionArr.find((progression) => progression._id == eventInfo.progression);
      if (tmp) setCurProgression(tmp);
    }
  }, [eventInfo, progressionArr]);
  // ** Intial Data
  useEffect(() => {
    let tmp = [];
    tableData?.length > 0 &&
      tableData.map((selected) => {
        let filteredContactList = contactRankList.filter(
          (promoted) => promoted.contactId == selected?.contact?._id
        );
        filteredContactList.length > 0
          ? tmp.push({
              ...filteredContactList[0],
              guestId: selected._id,
              paid: selected.paid,
              fullName: selected.contact.fullName,
              email: selected.contact.email,
              status: selected.status
            })
          : tmp.push({
              ...selected.contact,
              guestId: selected._id,
              contactId: selected.contact._id,
              status: selected.status,
              paid: selected.paid
            });
      });
    setInviteeList(tmp);
  }, [tableData, contactRankList]);

  useEffect(() => {
    let tmp = [];
    if (selectedCategoryInfo?.categoryId) {
      inviteeList?.length > 0 &&
        inviteeList.map((selected) => {
          let filteredContactList = contactRankList.filter((promoted) => {
            if (selectedCategoryInfo.id == selected?.contactId) {
              return (
                promoted.contactId == selected?.contactId &&
                promoted.categoryId == selectedCategoryInfo.categoryId
              );
            } else
              return (
                promoted.contactId == selected?.contactId &&
                promoted.categoryId == selected?.categoryId
              );
          });
          filteredContactList.length > 0
            ? tmp.push({
                ...filteredContactList[0],
                fullName: selected.fullName,
                email: selected.email,
                paid: selected.paid,
                status: selected.status
              })
            : tmp.push(selected);
        });
      setInviteeList(tmp);
    }
  }, [contactRankList, selectedCategoryInfo]);

  useEffect(() => {
    let tmp = [];
    if (selectedOption?.value == 'all') {
      tmp = inviteeList;
    } else {
      inviteeList.map((invitee, index) => {
        if (selectedOption?.value == 'paid' && invitee.paid == 'paid') {
          tmp.push(invitee);
        } else if (selectedOption?.value == 'notpaid' && invitee.paid == 'notpaid') {
          tmp.push(invitee);
        }
      });
    }
    setFilteredGuestArray(tmp);
  }, [inviteeList, selectedOption]);
  // ** Handlers
  const handleSelectRows = (e) => {
    if (e.selectedRows.length > 0) {
      setIsButtonShow(true);
      setEditableRows(e.selectedRows);
    } else {
      setEditableRows([]);
      setIsButtonShow(false);
    }
  };

  const handleEyeClick = (row) => {
    if (row) {
      setRow(row);
      toggle();
    } else return;
  };

  const toggle = () => {
    setNoteModal(!noteModal);
  };

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const toggleNoRankModal = () => {
    setNoRankModal(!noRankModal);
  };

  const handlePayNowClick = async (row) => {
    setRow(row);
    togglePaymentModal();
  };

  const handleBulkPayNowClick = async () => {
    setIsBulk(true);
    togglePaymentModal();
   
  };
  const handleBulkSendInvoice = async () => {
    let tmpIdArr = editableRows.map((row, index) => {
      return row.contactId?row.contactId:row.contact._id;
    });
    dispatch(sendBulkInvoice(eventInfo._id,{contacts:tmpIdArr}))
  };

  const handleTrashClick = (row) => {
    if (row) {
      setIsBulk(false);
      setRow(row);
      toggleDeleteModal();
    } else return;
  };

  

  const handleBulkTrashClick = () => {
    setIsBulk(true);
    toggleDeleteModal();
  };

  const changeProgression = async (e, row) => {
    let jsonProgressionValue = JSON.parse(e.target.value);
    let clientProgressions = [];
    setSelectedCategoryInfo(jsonProgressionValue);

    if (
      !jsonProgressionValue?.nextRankName ||
      jsonProgressionValue?.categoryId != jsonProgressionValue?.rowCategoryId
    ) {
      clientProgressions.push({
        categoryId: jsonProgressionValue?.categoryId,
        progressionId: jsonProgressionValue?.progressionId,
        contactId: row?.contactId ? row.contactId : row._id
      });

      let payload = {
        clientProgressions: clientProgressions
      };
      api
        .getClientRankApi(payload)
        .then((value) => {
          if (
            value?.data?.updatedClientRanks?.length > 0 &&
            value.data.updatedClientRanks[0].nextRankName != ''
          ) {
            dispatch(contactRankListAction());
          } else {
            dispatch(contactRankListAction());
            toggleNoRankModal();
            error('Sorry! There is no available rank in this category');
          }
          setToggleClearRows(!toggledClearRows);
        })
        .catch((err) => {
          dispatch(contactRankListAction());
          error('Something went wrong');
        });
    }
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
  const handleDecisionClick = async ({ row, decision }) => {
    if (editableRows.length > 0) {
      let tmpIdArr = editableRows.map((row, index) => {
        return row.contactId;
      });
      await dispatch(
        replyToEvent({
          contactIdArr: tmpIdArr,
          status: decision,
          eventId: eventId
        })
      );
      await dispatch(getEventInfo(eventId));
      setToggleClearRows(!toggledClearRows);
      success('Successfully updated');
      setEditableRows([]);
    } else {
      await dispatch(
        replyToEvent({
          contactIdArr: [row.contactId],
          status: decision,
          eventId: eventId
        })
      );
      await dispatch(getEventInfo(eventId));
      setToggleClearRows(!toggledClearRows);
      success('Successfully updated');
      setEditableRows([]);
    }
  };

  const handleGotoClick = () => {
    history.push('/setting/4');
  };

  const toggleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
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

  const tableColumns = [
    {
      name: 'Full Name',
      sortable: true,
      minWidth: '217px',
      sortField: 'fullName',
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <Link className="user_name text-truncate text-body">
              <span className="fw-bolder">{row?.clientName ? row.clientName : row?.fullName}</span>
            </Link>
            <small className="text-truncate text-muted mb-0">{row?.email}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Progression',
      width: '250px',
      selector: (row) => row?.contactId,
      cell: (row) => {
        return categoriesArray?.length > 0 ? (
          <Input
            key={row._id}
            id="exampleSelect"
            name={row?._id}
            type="select"
            onChange={(e) => changeProgression(e, row)}
            value={JSON.stringify({
              id: row?.contactId,
              email: row?.email,
              categoryId: row?.categoryId,
              progressionId: row?.progressionId,
              progressionName: row?.progressionName,
              rowCategoryId: row?.categoryId,
              nextRankName: row?.nextRankName
            })}
          >
            <option value="" className="" style={{ marginBottom: '15px', marginTop: '15px' }}>
              Select Progression
            </option>
            {categoriesArray?.map((progressionItem, i) => {
              return (
                <option
                  value={JSON.stringify({
                    id: row?.contactId,
                    email: row?.email,
                    categoryId: progressionItem.categoryId,
                    progressionId: progressionItem.progressionId,
                    progressionName: row?.progressionName,
                    rowCategoryId: row?.categoryId,
                    nextRankName: row?.nextRankName
                  })}
                  style={{ padding: '5px' }}
                  key={i}
                >
                  {progressionItem?.name + ' - ' + progressionItem?.list?.categoryName}
                </option>
              );
            })}
          </Input>
        ) : (
          <div>
            <h6 className="mb-25 text-center">
              {curProgression?.progressionName
                ? curProgression.progressionName
                : row?.progressionName}
            </h6>
            <Button
              size="sm"
              color="primary"
              onClick={() => {
                handleGotoClick();
              }}
            >
              Create Category
            </Button>
          </div>
        );
      }
    },
    {
      name: 'Rank',
      sortable: true,
      selector: (row) => row?.currentRankName,
      minWidth: '230px',
      cell: (row) => (
        <div
          className="d-flex justify-content-start align-items-start"
          style={{ marginLeft: '-15px' }}
        >
          {row?.currentRankImage ? (
            <Avatar className="me-1" img={row.currentRankImage} imgWidth="42" imgHeight="42" />
          ) : (
            <div
              style={{
                background: '#9e9d9b',
                borderRadius: '50%',
                height: '42px',
                width: '42px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '11px'
              }}
            >
              N/A
            </div>
          )}
          <div className="my-auto">
            <span
              className="fw-bolder fs-5 text-center d-block mb-25 text-nowrap"
              style={{ color: '#7d7b7a' }}
            >
              {row?.currentRankName ? row?.currentRankName : 'None'}
            </span>
            <Badge color={orderColors[row?.currentRankOrder]} pill>
              {row?.currentRankOrder}
            </Badge>
          </div>
        </div>
      )
    },
    {
      name: 'Next-Rank',
      sortable: true,
      selector: (row) => row?.contact?.fullName,
      minWidth: '230px',
      cell: (row) => (
        <div
          className="d-flex justify-content-start align-items-start"
          style={{ marginLeft: '-15px' }}
        >
          {row?.nextRankImage ? (
            <Avatar className="me-1" img={row?.nextRankImage} imgWidth="42" imgHeight="42" />
          ) : (
            <div
              style={{
                background: '#9e9d9b',
                borderRadius: '50%',
                height: '42px',
                width: '42px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '11px'
              }}
            >
              N/A
            </div>
          )}
          <div className="my-auto">
            <span
              className="fw-bolder fs-5 text-center d-block mb-25 text-nowrap"
              style={{ color: '#7d7b7a' }}
            >
              {row?.nextRankName ? row?.nextRankName : 'None'}
            </span>
            <Badge color={orderColors[row?.nextRankOrder]} pill>
              {row?.nextRankOrder}
            </Badge>
          </div>
        </div>
      )
    },
    {
      name: 'Last Promoted',
      sortable: true,
      selector: (row) => {
        return (
          <div>
            {' '}
            {contactRankList.filter((x) => x?._id == row?._id).length > 0 ? (
              moment(row.updatedAt).format('MMMM  DD  YYYY')
            ) : (
              <Badge color="light-warning">Never</Badge>
            )}
          </div>
        );
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
      name: 'Status',
      sortable: true,
      cell: (row) => {
        if (row?.status) {
          return (
            <UncontrolledDropdown>
              <DropdownToggle tag="span">
                <Badge color={statusObj[row?.status]} className="text-capitalize cursor-pointer">
                  {renderStatus(row?.status)}
                </Badge>
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem
                  tag={'li'}
                  onClick={(e) => handleDecisionClick({ row: row, decision: 'came' })}
                >
                  <Badge color="success" className="text-capitalize">
                    Came
                  </Badge>
                </DropdownItem>
                <DropdownItem
                  tag={'li'}
                  onClick={(e) => handleDecisionClick({ row: row, decision: 'notcame' })}
                >
                  <Badge color="warning" className="text-capitalize">
                    Did Not Come
                  </Badge>
                </DropdownItem>
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
    <>
      <Card>
        <CardHeader>
          <div>
            <h5 className="fw-bolder text-primary d-flex align-items-center">
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
            <Select
              isClearable={false}
              options={filterOptions}
              className="react-select select-progression-category"
              classNamePrefix="select"
              theme={selectThemeColors}
              value={selectedOption}
              onChange={(data) => setSelectedOption(data)}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  width: '130px'
                })
              }}
            />
            <Button
              size={'sm'}
              className="ms-1"
              color="info"
              style={{ borderRadius: '20px' }}
              disabled={editableRows.length === 0 }
              onClick={(e) => handleBulkSendInvoice()}
            >
              <Send className="me-1" size={16} />
              Send Invoice
            </Button>
            <Button
              size={'sm'}
              className="ms-1"
              color="primary"
              style={{ borderRadius: '20px' }}
              disabled={editableRows.length === 0 || editableRows?.filter(x=>x?.invoiceId?.payNow===0)?.length > 0}
              onClick={(e) => handleBulkPayNowClick()}
            >
              <Check className="me-1" size={16} />
              Pay Now
            </Button>
            <Button
              size={'sm'}
              className="ms-1"
              color="danger"
              style={{ borderRadius: '20px' }}
              disabled={editableRows.length == 0}
              onClick={(e) => handleBulkTrashClick()}
            >
              <Trash className="me-1" size={16} />
              Remove
            </Button>

            <Button.Ripple
              className="ms-1"
              color="success"
              size={'sm'}
              style={{ borderRadius: '20px' }}
              disabled={editableRows.length == 0}
            >
              <Printer className="me-1" size={16} />
              Print
            </Button.Ripple>
          </div>
        </CardHeader>
        <div className="react-dataTable react-dataTable-selectable-rows">
          <DataTable
            noHeader
            pagination
            responsive
            selectableRows
            onSelectedRowsChange={handleSelectRows}
            paginationServer
            columns={tableColumns}
            data={filteredGuestArray}
            clearSelectedRows={toggledClearRows}
          />
          {row !== null && (
            <NoteModal
              toggle={toggle}
              isOpen={noteModal}
              row={row}
              notes={noteData || []}
              dispatch={dispatch}z
            />
          )}

          <NoRankModal noRankModal={noRankModal} toggle={toggleNoRankModal} />

          <DeleteConfirmModal
            deleteModal={deleteModal}
            guestId={row.guestId}
            eventId={eventId}
            isInAttendance={false}
            editableRows={editableRows}
            isBulk={isBulk}
            toggle={toggleDeleteModal}
            toggleClearRows={toggleClearRows}
          />
        </div>
      </Card>
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
        <CreateInvoiceModal toggle={toggleAddInvoice} open={openAddInvoice} row={row} event={eventInfo}/>
    </>
  );
};

export default PromotionGuestTable;