// ** React Imports
import { Link, useParams } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Mail, Send, Edit2, Plus, Info, Trash, Home } from 'react-feather';

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem, Badge, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { useState } from 'react';
import { setNewAutomation } from './store/actions';
import { useDispatch } from 'react-redux';


const Sidebar = (props) => {
  // ** Props
  const {
    store,
    sidebarOpen,
    toggleCompose,
    getMails,
    resetSelectedMail,
    setSidebarOpen,
    setOpen
  } = props;

  // ** State Vars
  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);

  // ** Vars
  const params = useParams();

  const dispatch = useDispatch();
  // ** Functions To Handle Folder, Label & Compose
  const handleFolder = (folder) => {
    // dispatch(getMails({ ...store.params, folder }))
    dispatch(resetSelectedMail());
    // dispatch(resetSelectedTickets())
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
    if ((params.status && params.status === value) || (params.label && params.label === value)) {
      return true;
    } else {
      return false;
    }
  };

  const newAutomation = () => {
    dispatch(setNewAutomation());
    props.showGraph();
  };

  const [active, setActive] = useState('addnew')
  return (
    // <div
    //   className={classnames('sidebar-left', {
    //     show: sidebarOpen
    //   })}
    // >
    <div className="sidebar" >
      <div className="sidebar-content email-app-sidebar" >
        <div className="email-app-menu" style={{
          minHeight: '77vh',
          height: 'fit-content',
        }}>
          <div className="form-group-compose text-center compose-btn">
            <Button
              className="compose-email"
              color="primary"
              block
              onClick={() => newAutomation()}
            >
              Create Automation
            </Button>
          </div>
          <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
            <ListGroup tag="div" className="list-group-messages">

              <ListGroupItem
                tag={Link}
                // to='/apps/automation/all'
                // onClick={() => handleFolder('inbox')}
                action
                onClick={() => setActive('personal')}
                active={active === 'personal'}
              // active={!Object.keys(params).length || handleActiveItem('all')}
              >
                <Mail size={18} className="me-75" />
                <span className="align-middle">Personal</span>
              </ListGroupItem>
              <ListGroupItem
                tag={Link}
                // to='/apps/automation/draft'
                // onClick={() => handleFolder('sent')}
                action
                onClick={() => setActive('business')}
                active={active === 'business'}
              >
                <Send size={18} className="me-75" />
                <span className="align-middle">Business</span>
              </ListGroupItem>
              <ListGroupItem
                tag={Link}
                // to='/apps/automation/scheduled'
                // onClick={() => handleFolder('draft')}
                action
                onClick={() => setActive('others')}
                active={active === 'others'}
              >
                <Info size={18} className="me-75" />
                <span className="align-middle">Others</span>
              </ListGroupItem>
              {/* <h6 className="section-label mt-3 mb-1 px-2">Labels</h6>
              <div className="create-workspace-btn mt-1" style={{ width: '70%', margin: 'auto' }}>
                {active == "addnew" && <Button color="primary" block outline onClick={() => newAutomation()}>
                  <Plus size={14} className="me-25" />
                  New automation
                </Button>}
              </div> */}
            </ListGroup>
          </PerfectScrollbar>
        </div>
      </div>
    </div >
    // </div>
  );
};

export default Sidebar;
