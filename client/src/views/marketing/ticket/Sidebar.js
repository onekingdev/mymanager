// ** React Imports
import { Link, useParams } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Mail, Send, Edit2, Star, Info, Trash } from 'react-feather';

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem, Badge, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useState } from 'react';
import TicketInfo from './TicketInfo';

const Sidebar = (props) => {
  // ** Props
  const {
    store,
    sidebarOpen,
    toggleCompose,
    dispatch,
    getMails,
    resetSelectedMail,
    setSidebarOpen,
    resetSelectedTickets,
    setOpenMail,
    active
  } = props;

  // ** State Vars
  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);

  // ** Vars
  const params = useParams();

  // ** Functions To Handle Folder, Label & Compose
  const handleFolder = (folder) => {
    // dispatch(getMails({ ...store.params, folder }))
    // dispatch(resetSelectedMail())
    setOpenMail(false);
    dispatch(resetSelectedTickets());
  };

  const handleLabel = (label) => {
    dispatch(getMails({ ...store.params, label }));
    dispatch(resetSelectedMail());
  };

  const handleCreateTicketClick = () => {
    setIsCreateTicketModalOpen(true);
    setSidebarOpen(false);
  };

  // ** Functions To Active List Item
  const handleActiveItem = (value) => {
    if (
      (params.subsection && params.subsection === value) ||
      (params.section && params.section === value)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      className={classnames('sidebar-left', {
        show: sidebarOpen
      })}
    >
      <div className="sidebar">
        <div className="sidebar-content email-app-sidebar">
          <div className="email-app-menu">
            <div className="form-group-compose text-center compose-btn">
              <Button
                className="compose-email"
                color="primary"
                block
                onClick={handleCreateTicketClick}
              >
                Create a new ticket
              </Button>
            </div>
            <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
              <ListGroup tag="div" className="list-group-messages">
                <ListGroupItem
                  tag={Link}
                  // href="/marketing/ticket/open"
                  // onClick={() => handleFolder('inbox')}
                  action
                  active={!Object.keys(params).length || handleActiveItem('open')}
                >
                  <Link to="/marketing/ticket/open" className="w-100 d-inline-block">
                    <Mail size={18} className="me-75" />
                    <span className="align-middle">Open</span>
                    {store.ticketsMeta?.open ? (
                      <Badge className="float-end" color="light-primary" pill>
                        {store.ticketsMeta?.open}
                      </Badge>
                    ) : null}
                  </Link>
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  href="/marketing/ticket/pending"
                  onClick={() => handleFolder('sent')}
                  action
                  active={handleActiveItem('pending')}
                  // active={active === 'sent'}

                >
                  <Link to="/marketing/ticket/pending" className="w-100 d-inline-block">
                    <Send size={18} className="me-75" />
                    <span className="align-middle">Pending</span>
                    {store.ticketsMeta?.pending ? (
                      <Badge className="float-end" color="light-primary" pill>
                        {store.ticketsMeta?.pending}
                      </Badge>
                    ) : null}
                  </Link>
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  href="/marketing/ticket/completed"
                  onClick={() => handleFolder('draft')}
                  action
                  active={handleActiveItem('completed')}
                >
                  <Link to="/marketing/ticket/completed" className="w-100 d-inline-block">
                    <Edit2 size={18} className="me-75" />
                    <span className="align-middle">Completed</span>
                    {store.ticketsMeta?.completed ? (
                      <Badge className="float-end" color="light-primary" pill>
                        {store.ticketsMeta?.completed}
                      </Badge>
                    ) : null}
                  </Link>
                </ListGroupItem>
                {/* <ListGroupItem
                  tag={Link}
                  to='/marketing/ticket/starred'
                  onClick={() => handleFolder('starred')}
                  action
                  active={handleActiveItem('starred')}
                >
                  <Star size={18} className='me-75' />
                  <span className='align-middle'>Starred</span>
                </ListGroupItem> */}
                <ListGroupItem
                  tag={Link}
                  href="/marketing/ticket/trash"
                  onClick={() => handleFolder('trash')}
                  action
                  active={handleActiveItem('trash')}
                >
                  <Link to="/marketing/ticket/trash" className="w-100 d-inline-block">
                    <Trash size={18} className="me-75" />
                    <span className="align-middle">Trash</span>
                    {store.ticketsMeta?.trash ? (
                      <Badge className="float-end" color="light-primary" pill>
                        {store.ticketsMeta?.trash}
                      </Badge>
                    ) : null}
                  </Link>
                </ListGroupItem>
              </ListGroup>
              <h6 className="section-label mt-3 mb-1 px-2">Labels</h6>
              <ListGroup tag="div" className="list-group-labels">
                <ListGroupItem
                  tag={Link}
                  href="/marketing/tag/personal"
                  onClick={() => handleLabel('personal')}
                  active={handleActiveItem('personal')}
                  action
                >
                  <Link to="/marketing/tag/personal" className="w-100 d-inline-block">
                    <span className="bullet bullet-sm bullet-success me-1"></span>
                    Personal
                  </Link>
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  href="/marketing/tag/company"
                  onClick={() => handleLabel('company')}
                  active={handleActiveItem('company')}
                  action
                >
                  <Link to="/marketing/tag/company" className="w-100 d-inline-block">
                    <span className="bullet bullet-sm bullet-primary me-1"></span>
                    Company
                  </Link>
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  href="/marketing/tag/important"
                  onClick={() => handleLabel('important')}
                  active={handleActiveItem('important')}
                  action
                >
                  <Link to="/marketing/tag/important" className="w-100 d-inline-block">
                    <span className="bullet bullet-sm bullet-warning me-1"></span>
                    Important
                  </Link>
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  href="/marketing/tag/private"
                  onClick={() => handleLabel('private')}
                  active={handleActiveItem('private')}
                  action
                >
                  <Link to="/marketing/tag/private" className="w-100 d-inline-block">
                    <span className="bullet bullet-sm bullet-danger me-1"></span>
                    Private
                  </Link>
                </ListGroupItem>
              </ListGroup>
            </PerfectScrollbar>
            <Modal
              isOpen={isCreateTicketModalOpen}
              toggle={() => setIsCreateTicketModalOpen(!isCreateTicketModalOpen)}
              className="modal-dialog-centered"
              size="lg"
            >
              <ModalHeader toggle={() => setIsCreateTicketModalOpen(!isCreateTicketModalOpen)}>
                Create A New Ticket
              </ModalHeader>
              <ModalBody>
                <TicketInfo
                  store={store}
                  dispatch={dispatch}
                  setIsCreateTicketModalOpen={setIsCreateTicketModalOpen}
                />
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
