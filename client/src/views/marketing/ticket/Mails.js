// ** React Imports
import { Fragment, useEffect, useState } from 'react';

// ** Mail Components Imports
import MailCard from './MailCard';
import MailDetails from './MailDetails';
import ComposePopUp from './ComposePopup';

// ** Utils
import { formatDateToMonthShort, formatTime } from '@utils';

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Menu,
  Search,
  Mail,
  Clipboard,
  Tag,
  Trash,
  Edit2,
  Info,
  Send,
  Paperclip
} from 'react-feather';

// ** Reactstrap Imports
import {
  Input,
  Label,
  Badge,
  InputGroup,
  DropdownMenu,
  DropdownItem,
  InputGroupText,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import { getTickets, resetSelectedTickets } from './store';
import { useParams } from 'react-router-dom';

import useMessage from '../../../lib/useMessage';

const Mails = (props) => {
  // ** Props
  const {
    query,
    store,
    setQuery,
    dispatch,
    selectMail,
    composeOpen,
    updateMails,
    selectTicket,
    updateTickets,
    paginateMail,
    selectAllMail,
    toggleCompose,
    setSidebarOpen,
    updateMailLabel,
    selectAllTickets,
    resetSelectedMail,
    selectCurrentMail,
    selectCurrentTicket,
    deleteTickets,
    openMail,
    setOpenMail
  } = props;

  const { mails, selectedMails, tickets, selectedTickets } = store;

  const { error, success } = useMessage();
  const [arrToMap, setArrToMap] = useState([]);
  // ** Params
  const params = useParams();
  const section = params.section;
  const status = params.subsection;
  useEffect(() => {
    if (section === 'ticket') {
      if (tickets.filter((ticket) => ticket.status.toLowerCase() === status).length) {
        setArrToMap(tickets.filter((ticket) => ticket.status.toLowerCase() === status));
      } else setArrToMap([]);
    } else if (section === 'tag') {
      let tmp = [];
      tickets.forEach((ticket) =>
        ticket.tag.map((item, index) => {
          if (item === status) {
            tmp.push(ticket);
          }
        })
      );
      setArrToMap(tmp);
    }
  }, [status, tickets]);
  // ** States
  // const [openMail, setOpenMail] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  // ** Variables
  const labelColors = {
    pending: 'success',
    open: 'primary',
    completed: 'warning',
    delete: 'danger'
  };

  // ** Handles Update Functions
  const handleMailClick = (id) => {
    dispatch(selectCurrentTicket(id));
    setOpenMail(true);
  };

  // ** Handles SelectAll
  const handleSelectAll = (e) => {
    // dispatch(selectAllMail(e.target.checked))
    dispatch(selectAllTickets({ checked: e.target.checked, status }));
  };

  /*eslint-disable */

  // ** Handles Folder Update
  const handleFolderUpdate = (e, status, ids = selectedTickets, employeeFullName = '') => {
    e.preventDefault();
    dispatch(
      updateTickets({
        ticketIds: ids,
        dataToUpdate: { status: status, assignee: employeeFullName }
      })
    );
    dispatch(resetSelectedTickets());
    dispatch(getTickets());
    dispatch(updateMails({ emailIds: ids, dataToUpdate: { status } }));
    dispatch(resetSelectedMail());
  };

  // // ** Handles Ticket Status Update
  // const handleFolderUpdate = (e, status, ids = selectedTickets) => {
  //   e.preventDefault()
  //   dispatch(updateTickets({ ticketIds: ids, dataToUpdate: { status }}))
  //   dispatch(updateMails({ emailIds: ids, dataToUpdate: { folder } }))
  //   dispatch(resetSelectedMail())
  // }

  // ** Handles Label Update
  const handleLabelsUpdate = (e, label, ids = selectedMails) => {
    e.preventDefault();
    dispatch(updateMailLabel({ emailIds: ids, label }));
    dispatch(resetSelectedMail());
  };

  // ** Handles Mail Read Update
  const handleMailReadUpdate = (arr, bool) => {
    dispatch(updateMails({ emailIds: arr, dataToUpdate: { isRead: bool } })).then(() =>
      dispatch(resetSelectedMail())
    );
    dispatch(selectAllMail(false));
  };

  // ** Handles Move to Trash
  const handleMailToTrash = (ids) => {
    dispatch(updateTickets({ ticketIds: ids, dataToUpdate: { status: 'trash' } }));
    dispatch(resetSelectedTickets());
    dispatch(resetSelectedMail());
  };
  /*eslint-enable */

  // ** Renders Mail
  const renderMails = () => {
    return arrToMap.map((ticket, index) => {
      return (
        <MailCard
          ticket={ticket}
          key={index}
          dispatch={dispatch}
          selectMail={selectMail}
          selectTicket={selectTicket}
          updateMails={updateMails}
          labelColors={labelColors}
          selectedMails={selectedMails}
          selectedTickets={selectedTickets}
          handleMailClick={handleMailClick}
          handleMailReadUpdate={handleMailReadUpdate}
          formatDateToMonthShort={formatDateToMonthShort}
        />
      );
    });
  };

  return (
    <Fragment>
      <div className="email-app-list">
        <div className="app-fixed-search d-flex align-items-center">
          <div
            className="sidebar-toggle d-block d-lg-none ms-1"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size="21" />
          </div>
          <div className="d-flex align-content-center justify-content-between w-100">
            <InputGroup className="input-group-merge">
              <InputGroupText>
                <Search className="text-muted" size={14} />
              </InputGroupText>
              <Input
                id="email-search"
                placeholder="Search ticket"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>
        <div className="app-action">
          <div className="action-left form-check">
            <Input
              type="checkbox"
              id="select-all"
              onChange={handleSelectAll}
              checked={
                selectedTickets.length &&
                selectedTickets.length ===
                  tickets.filter((ticket) => ticket.status.toLowerCase() === status).length
              }
            />
            <Label className="form-check-label fw-bolder ps-25 mb-0" for="select-all">
              Select All
            </Label>
          </div>
          {selectedTickets.length ? (
            <div className="action-right">
              <ul className="list-inline m-0">
                {status === 'open' || status === 'pending' ? (
                  <li
                    className="list-inline-item me-1 cursor-pointer hover-primary"
                    onClick={(e) => handleFolderUpdate(e, 'completed')}
                  >
                    <Edit2 size={18} className="me-75" />
                    <span className="align-middle">Close</span>
                  </li>
                ) : (
                  <li
                    className="list-inline-item me-1 cursor-pointer hover-primary"
                    onClick={(e) => handleFolderUpdate(e, 'open')}
                  >
                    <Mail size={18} className="me-75" />
                    <span className="align-middle">Reopen</span>
                  </li>
                )}

                <li
                  className="list-inline-item me-1 cursor-pointer hover-primary"
                  onClick={() => handleMailToTrash(selectedTickets)}
                >
                  <Trash size={18} className="me-75" />
                  <span className="align-middle">Delete</span>
                </li>
              </ul>
            </div>
          ) : null}
        </div>

        <PerfectScrollbar className="email-user-list" options={{ wheelPropagation: false }}>
          {mails.length ? (
            <ul className="email-media-list">{renderMails()}</ul>
          ) : (
            <div className="no-results d-block">
              <h5>No Items Found</h5>
            </div>
          )}
        </PerfectScrollbar>
      </div>
      <MailDetails
        openMail={openMail}
        dispatch={dispatch}
        isDetail={isDetail}
        setIsDetail={setIsDetail}
        mail={store.currentMail}
        ticket={store.currentTicket}
        labelColors={labelColors}
        setOpenMail={setOpenMail}
        updateMails={updateMails}
        paginateMail={paginateMail}
        updateMailLabel={updateMailLabel}
        handleMailToTrash={handleMailToTrash}
        handleFolderUpdate={handleFolderUpdate}
        handleLabelsUpdate={handleLabelsUpdate}
        handleMailReadUpdate={handleMailReadUpdate}
        formatDateToMonthShort={formatDateToMonthShort}
      />
      <ComposePopUp composeOpen={composeOpen} toggleCompose={toggleCompose} />
    </Fragment>
  );
};

export default Mails;
