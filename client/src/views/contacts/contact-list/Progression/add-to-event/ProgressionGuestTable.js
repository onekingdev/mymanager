// ** React Imports
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import moment from 'moment';

// ** Icons Imports
import { Target, Tool, Trash, Eye } from 'react-feather';

import {
  Table,
  Badge,
  Label,
  Button,
  Input,
  Card,
  CardHeader,
  UncontrolledTooltip
} from 'reactstrap';

// ** Custom Component
import Avatar from '@components/avatar';
import useMessage from '../../../../../lib/useMessage';
import NoteModal from '../../../Note';

const ProgressionGuestTable = (props) => {
  const { eventId, selectedRows, stepper, noteData, contactRankList } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  // ** Constants
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
    { value: 'added', label: 'Added' }
  ];

  // ** Get current event
  const { error, success } = useMessage();

  // ** Redux Store
  const events = useSelector((state) => state.event.events);
  const progressionArr = useSelector((state) => state?.totalContacts?.fetchProgressionData);
  const eventInfo = useSelector((state) => state.event.eventInfo);
  const [editableRows, setEditableRows] = useState([]);
  const [isButtonShow, setIsButtonShow] = useState(false);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [isInAttendance, setIsInAttendance] = useState(false);
  const [isBulk, setIsBulk] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [curProgression, setCurProgression] = useState();
  // ** Notes
  const [row, setRow] = useState({});
  const [noteModal, setNoteModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(filterOptions[0]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let tmp = [];
    selectedRows?.length > 0 &&
      contactRankList?.length > 0 &&
      selectedRows.map((selected) => {
        let filteredContactList = contactRankList.filter(
          (promoted) => promoted.clientId == selected?._id
        );
        filteredContactList.length > 0
          ? tmp.push({
              ...filteredContactList[0],
              paid: selected.paid,
              name: selected.fullName,
              email: selected.email,
              status: selected.status
            })
          : tmp.push(selected);
      });
    setTableData(tmp);
  }, [contactRankList, selectedRows]);

  useEffect(() => {
    if (eventInfo?.progression && progressionArr) {
      let tmp = {};
      tmp = progressionArr.find((progression) => progression._id == eventInfo.progression);
      if (tmp) setCurProgression(tmp);
    }
  }, [eventInfo?.progression, progressionArr]);

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
  const handleManageClick = () => {
    history.push(`/event-view-list/${eventInfo._id}`);
  };
  const handleViewClick = () => {
    window.open(`/event-view/${eventInfo._id}`);
  };
  const handleTrashClick = (row) => {
    let tmp = [];
    tableData.map((item) => {
      if (item._id !== row._id) {
        tmp.push(item);
      } else return;
    });
    setTableData(tmp);
  };

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
              <span className="fw-bolder">
                {row?.clientName ? row.clientName : row?.fullName ? row.fullName : row.name}
              </span>
            </Link>
            <small className="text-truncate text-muted mb-0">{row?.email}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Progression Name',
      sortable: true,
      minWidth: '217px',
      sortField: 'fullName',
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <div className="user_name text-truncate text-body">
              <span className="fw-bolder">
                {row?.progressionName ? row.progressionName : curProgression?.progressionName}
              </span>
            </div>
            <small className="text-truncate text-muted mb-0">{row?.categoryName}</small>
          </div>
        </div>
      )
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
      selector: (row) => row?.name,
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
          <h5 className="fw-bolder">
            Below contacts have been successfully added to{' '}
            <b className="text-capitalize text-primary">{eventInfo.title} </b> event
          </h5>
        </div>
        <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
          <Button
            size={'sm'}
            className="ms-1"
            color="danger"
            style={{ borderRadius: '20px' }}
            onClick={() => handleManageClick()}
          >
            <Tool className="me-1" size={16} />
            Manage
          </Button>

          <Button.Ripple
            className="ms-1"
            color="success"
            size={'sm'}
            style={{ borderRadius: '20px' }}
            onClick={() => handleViewClick()}
          >
            <Target className="me-1" size={16} />
            View
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
          data={tableData}
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
      </div>
    </Card>
  );
};

export default ProgressionGuestTable;
