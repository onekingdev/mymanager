// ** React Imports
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import moment from 'moment';

// ** Icons Imports
import { TrendingUp, UserMinus, Printer, HelpCircle, UserPlus, List, Eye } from 'react-feather';
import { toast } from 'react-toastify';
// ** Utils
import { selectThemeColors } from '@utils';

// ** Third Party Components
import {
  Card,
  CardHeader,
  Input,
  Button,
  Badge,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown
} from 'reactstrap';

// ** Custom Component
import Avatar from '@components/avatar';
import useMessage from '../../../../lib/useMessage';
import NoteModal from '../../../contacts/Note';
import ConfirmPromoteModal from '../ConfirmPromoteModal';
import DeleteConfirmModal from '../DeleteConfirmModal';
// import RankRemoveModal from '../RankRemoveModal';
// ** Action
import { replyToEvent, getEventInfo } from '../store';
// import { progressionCategoriesRankFetchAction } from '../../../settings/tabs/progressiontab/store/actions';
import '@styles/react/libs/react-select/_react-select.scss';

const PromotionAttendanceTable = (props) => {
  const dispatch = useDispatch();
  const { error, success } = useMessage();
  const { eventInfo, inviteeList, contactRankList, curProgression } = props;

  // ** Constants
  const statusObj = {
    going: 'light-success',
    notgoing: 'light-warning',
    maybe: 'light-info',
    noreply: 'light-danger',
    'No reply': 'danger',
    notcame: 'warning',
    came: 'success'
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
    { value: 'attended', label: 'Attended' }
  ];

  // ** Get current event
  const { eventId } = useParams();

  const [editableRows, setEditableRows] = useState([]);
  const [isButtonShow, setIsButtonShow] = useState(false);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [tableData, setTableData] = useState([]);

  // ** Notes
  const [row, setRow] = useState({});
  const [noteModal, setNoteModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [confirmPromoteModal, setConfirmPromoteModal] = useState(false);
  const [rankRemoveModal, setRankRemoveModal] = useState(false);
  const [search, setSearch] = useState('');
  const [isBulk, setIsBulk] = useState(false);

  const [promoteSingle, setPromoteSingle] = useState([]);
  const [promoteBulk, setPromoteBulk] = useState([]);
  const [checkClickedProgression, setCheckClickedProgression] = useState(true);
  const [categoriesArray, setCategoriesArray] = useState([]);
  const [progressionValue, setProgressionValue] = useState({});
  const [selectedOption, setSelectedOption] = useState(filterOptions[0]);
  const [pendingSign, setPendingSign] = useState(false);
  // ** Redux
  //** Progression Data */
  const noteData = useSelector((state) => state?.totalContacts?.notes?.data);

  useEffect(() => {
    let tmp = [];
    if (curProgression && curProgression?.categoryId) {
      for (let i = 0; i < curProgression.categoryId.length; i++) {
        tmp.push({
          name: curProgression?.progressionName,
          progressionId: curProgression?._id,
          list: curProgression?.categoryId[i],
          categoryId: curProgression?.categoryId[i]?._id
        });
      }
    }
    setCategoriesArray(tmp);
  }, [curProgression]);

  // ** Effects
  useEffect(() => {
    let tmp = [];
    inviteeList.map((item, index) => {
      if (item.status == 'came') {
        tmp.push(item);
      } else if (item.status == 'notcame' || item.status == 'going') {
        item = { ...item, status: 'notcame' };
        tmp.push(item);
      } else {
        if (selectedOption?.value == 'all') {
          tmp.push(item);
        } else return;
      }
    });
    setTableData(tmp);
  }, [inviteeList, selectedOption]);

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
  const handleRowSelected = ({ selectedRows }) => {
    if (selectedRows.length > 0) {
      setCheckClickedProgression(false);
      setIsButtonShow(true);
      setEditableRows(selectedRows);
    }
    let clientProgressions = [];
    selectedRows.map((selected, index) => {
      if (selected.nextRankName != '') {
        {
          clientProgressions.push({
            categoryId: selected?.categoryId
              ? selected?.categoryId
              : curProgression.categoryId[0]._id,
            progressionId: selected?.progressionId ? selected.progressionId : curProgression._id,
            contactId: selected?.contactId
          });
        }
      }
    });

    let payload = {
      clientProgressions: clientProgressions
    };
    setPromoteBulk(payload);
  };

  const handleDecisionClick = async ({ row, decision }) => {
    if (editableRows.length > 0) {
      let tmpIdArr = editableRows.map((row, index) => {
        return row.contactId;
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

  const promoteClientBulk = () => {
    setIsBulk(true);
    setRow({});
    togglePromoteModal();
  };

  const promotClientSingle = (row) => {
    if (row?.categoryId) {
      let clientProgressions = {
        clientProgressions: [
          {
            categoryId: row?.categoryId,
            progressionId: row?.progressionId,
            contactId: row?.contactId
          }
        ]
      };
      setPromoteSingle(clientProgressions);
      setRow(row);
      setIsBulk(false);
      togglePromoteModal();
    } else {
      toast.error('Please select progression/category before promote');
    }
  };
  const togglePromoteModal = () => {
    setConfirmPromoteModal(!confirmPromoteModal);
  };

  // const toggleRankRemoveModal = () => {
  //   setRankRemoveModal(!rankRemoveModal);
  // };

  const toggleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  };

  const handleRemoveClick = () => {
    setIsBulk(true);
    toggleDeleteModal();
    // toggleRankRemoveModal();
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
                {row?.contactName ? row.contactName : row?.fullName}
              </span>
            </Link>
            <small className="text-truncate text-muted mb-0">{row?.email}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Progression',
      width: '257px',
      selector: (row) => row?.clientId,
      cell: (row) => {
        return (
          <Input
            key={row._id}
            id="exampleSelect"
            name={row?._id}
            type="select"
            style={{ marginLeft: '-15px' }}
            disabled
            value={JSON.stringify({
              categoryId: row?.categoryId,
              progressionId: row?.progressionId,
              id: row?.clientId,
              progressionName: row?.progressionName
            })}
          >
            <option value="" className="" style={{ marginBottom: '15px', marginTop: '15px' }}>
              Select Progression
            </option>
            {categoriesArray?.map((progressionItem, i) => {
              return (
                <option
                  value={JSON.stringify({
                    categoryId: progressionItem.categoryId,
                    progressionId: progressionItem.progressionId,
                    id: row?.clientId,
                    progressionName: row?.progressionName
                  })}
                  key={i}
                  className=""
                  style={{ marginBottom: '15px' }}
                >
                  {progressionItem?.name + ' - ' + progressionItem?.list?.categoryName}
                </option>
              );
            })}
          </Input>
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
              {row?.currentRankName ? row?.currentRankName : 'No Belt'}
            </span>
            <Badge
              color={
                orderColors[row?.currentRankOrder]
                  ? orderColors[row.currentRankOrder]
                  : 'light-success'
              }
              pill
            >
              {row?.currentRankOrder ? row.currentRankOrder : 0}
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
              {row?.nextRankName ? row.nextRankName : 'No Belt'}
            </span>
            <Badge
              color={
                orderColors[row?.nextRankOrder] ? orderColors[row?.nextRankOrder] : 'light-success'
              }
              pill
            >
              {row?.nextRankOrder ? row?.nextRankOrder : 0}
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
      width: '150px',
      // allowOverflow: true,
      cell: (row) => {
        return (
          <div className="">
            <Button
              color="primary"
              className=""
              onClick={(e) => promotClientSingle(row)}
              size="sm"
              disabled={!row.nextRankName}
            >
              <span className="">{'promote'}</span>
            </Button>
          </div>
        );
      }
    }
  ];

  const filteredAttendArray = tableData.filter((item) => {
    if (search) {
      return item.clientName
        ? item.clientName.toLowerCase().includes(search.toLowerCase())
        : item.fullName.toLowerCase().includes(search.toLowerCase());
    } else return true;
  });

  return (
    <Card>
      <CardHeader>
        <div className="d-flex align-items-center">
          <Input
            id="search-invoice"
            placeholder="Search Attendees"
            type="text"
            className="w-100 me-50"
            style={{ maxWidth: '200px' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <UncontrolledDropdown>
            <DropdownToggle tag="span">
              <Button
                size={'sm'}
                className="ms-1 d-flex align-items-center"
                color="primary"
                style={{ borderRadius: '20px' }}
              >
                <TrendingUp className="me-1" size={16} />
                <span>Submit</span>
              </Button>
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag={'li'} onClick={(e) => handleDecisionClick({ decision: 'came' })}>
                <UserPlus className="me-50" size={14} />
                <span className="align-middle">Attend</span>
              </DropdownItem>
              <DropdownItem
                tag={'li'}
                onClick={(e) => handleDecisionClick({ decision: 'notcame' })}
              >
                <UserMinus className="me-50" size={14} />
                <span className="align-middle">Did Not Come</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
          <Select
            isClearable={false}
            options={filterOptions}
            className="react-select"
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
            color="primary"
            style={{ borderRadius: '20px' }}
            disabled={editableRows.length == 0}
            onClick={() => {
              promoteClientBulk();
            }}
          >
            <TrendingUp className="me-1" size={16} />
            Promote
          </Button>
          <Button.Ripple
            className="ms-1"
            color="danger"
            size={'sm'}
            style={{ borderRadius: '20px' }}
            disabled={editableRows.length == 0}
            onClick={() => handleRemoveClick()}
          >
            <Printer className="me-1" size={16} />
            Remove
          </Button.Ripple>
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

          <UncontrolledDropdown>
            <DropdownToggle tag="span">
              <Button
                size={'sm'}
                className="ms-1"
                color="info"
                style={{ borderRadius: '20px' }}
                disabled={editableRows.length == 0}
              >
                <HelpCircle className="me-1" size={16} />
                Mark
              </Button>
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag={'li'} onClick={(e) => handleDecisionClick({ decision: 'came' })}>
                <UserPlus className="me-50" size={14} />
                <span className="align-middle">Came</span>
              </DropdownItem>
              <DropdownItem
                tag={'li'}
                onClick={(e) => handleDecisionClick({ decision: 'notcame' })}
              >
                <UserMinus className="me-50" size={14} />
                <span className="align-middle">Did Not Come</span>
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
          onSelectedRowsChange={handleRowSelected}
          paginationServer
          columns={tableColumns}
          data={filteredAttendArray}
          clearSelectedRows={toggledClearRows}
        />
        <ConfirmPromoteModal
          confirmPromoteModal={confirmPromoteModal}
          toggle={togglePromoteModal}
          promoteBulk={promoteBulk}
          promoteSingle={promoteSingle}
          toggledClearRows={toggledClearRows}
          setToggleClearRows={setToggleClearRows}
          tableData={tableData}
          isBulk={isBulk}
          setPendingSign={setPendingSign}
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

        <DeleteConfirmModal
          isInAttendance={true}
          deleteModal={deleteModal}
          toggle={toggleDeleteModal}
          editableRows={editableRows}
          isBulk={isBulk}
          guestId={row._id}
          eventId={eventId}
          toggleClearRows={toggleClearRows}
        />
      </div>
    </Card>
  );
};

export default PromotionAttendanceTable;
