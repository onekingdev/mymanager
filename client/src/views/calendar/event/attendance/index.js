import { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import DataTable from 'react-data-table-component';
import Select from 'react-select';
// ** React Icons
import { TrendingUp, Printer, User, Save } from 'react-feather';
import { MdDeleteSweep } from 'react-icons/md';

// ** Reactstrap Imports
import {
  Table,
  Button,
  Row,
  Col,
  Input,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';

import { ChevronDown, HelpCircle, UserPlus, UserMinus } from 'react-feather';
import { selectThemeColors } from '@utils';
// for PDF export
import 'jspdf-autotable';

// ** Custom Components
import useColumns from './useColumns';
import useMessage from '../../../../lib/useMessage';
import NoteModal from '../../../contacts/Note';
import SaveContactModal from '../SaveContactModal';
import DeleteConfirmModal from '../DeleteConfirmModal';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';

// ** Actions
import { getEventInfo, replyToEvent } from '../store';
import { deleteGuestArrAction } from '../store/actions';
import { useAddAndUpdateContactsBulk } from '../../../../requests/contacts/contacts';
import ReactPaginate from 'react-paginate';

const customStyles = {};
// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));

// ** Table Header
const CustomHeader = ({
  eventInfo,
  search,
  editableRows,
  selectedOption,
  setSelectedOption,
  handleRemoveClick,
  handleSearchChange,
  handleDecisionClick,
  handleSaveClick
}) => {
  return (
    <div className="invoice-list-table-header w-100 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center mb-sm-0 mb-1">
          <div className="me-1 d-flex align-items-center">
            <Input
              id="search-invoice"
              placeholder="Search Attendees"
              type="text"
              className="w-100 me-50"
              style={{ maxWidth: '200px' }}
              value={search}
              onChange={(e) => handleSearchChange(e)}
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
        </Col>
        <Col xl="6" className="justify-content-end d-flex align-items-center">
          <div className="d-flex align-items-center">
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
        </Col>
      </Row>
    </div>
  );
};

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'attended', label: 'Only Attended' }
];

const Attendance = (props) => {
  const dispatch = useDispatch();
  const { eventInfo, active } = props;
  const { eventId } = useParams();
  const { error, success } = useMessage();
  const { mutate: createNewContactBulk } = useAddAndUpdateContactsBulk();
  const noteData = useSelector((state) => state?.totalContacts?.notes?.data);
  // ** States
  const [editableRows, setEditableRows] = useState([]);
  const [isButtonShow, setIsButtonShow] = useState(false);
  const [search, setSearch] = useState('');
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [attendArray, setAttendArray] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [contactModal, setContactModal] = useState(false);
  const [isBulk, setIsBulk] = useState(false);
  // ** Notes
  const [row, setRow] = useState({});
  const [noteModal, setNoteModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(filterOptions[0]);

  const toggle = () => {
    setNoteModal(!noteModal);
  };

  // ** Effects
  useEffect(() => {
    let tmp = [];
    active == 2 &&
      eventInfo?.guests &&
      eventInfo.guests.map((item, index) => {
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
    setAttendArray(tmp);
  }, [eventInfo?.guests, active, selectedOption]);

  // ** Handlers
  const addClickAttendance = (e) => {
    if (e.selectedRows.length > 0) {
      setIsButtonShow(true);
      setEditableRows(e.selectedRows);
    } else {
      setEditableRows([]);
      setIsButtonShow(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSaveContactClick = async (category) => {
    if (editableRows.length > 0) {
      const res = createNewContactBulk({ inviteeArr: editableRows, category, eventId });
      setToggleClearRows(!toggledClearRows);
    } else {
      error('Failed to add contacts');
    }
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

  const toggleContactModal = () => {
    setContactModal(!contactModal);
  };

  const handleSaveClick = () => {
    setContactModal(true);
  };

  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const toggleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  };

  const filteredAttendArray = attendArray.filter(
    (item) =>
      item.contact.fullName && item.contact.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    const count = Math.ceil(filteredAttendArray.length / rowsPerPage);

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

  const { columns } = useColumns({
    row,
    setRow,
    toggle,
    toggleDeleteModal,
    handleDecisionClick,
    setIsBulk,
    eventInfo
  });

  return (
    <Card>
      <div className="react-dataTable" style={{ height: 'auto', maxHeight: '100%' }}>
        <DataTable
          noHeader
          subHeader
          sortServer
          pagination
          responsive
          paginationServer
          columns={columns}
          selectableRows
          selectableRowsComponent={BootstrapCheckbox}
          onSelectedRowsChange={addClickAttendance}
          paginationComponent={CustomPagination}
          customStyles={customStyles}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          data={filteredAttendArray}
          clearSelectedRows={toggledClearRows}
          subHeaderComponent={
            <CustomHeader
              isButtonShow={isButtonShow}
              search={search}
              eventInfo={eventInfo}
              editableRows={editableRows}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              handleSearchChange={handleSearchChange}
              handleDecisionClick={handleDecisionClick}
              handleRemoveClick={handleRemoveClick}
              handleSaveContactClick={handleSaveContactClick}
              handleSaveClick={handleSaveClick}
            />
          }
        />
        {row !== null && (
          <NoteModal
            toggle={toggle}
            isOpen={noteModal}
            row={row}
            notes={noteData || []}
            dispatch={dispatch}
            setDeleteModal={setDeleteModal}
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

export default Attendance;
