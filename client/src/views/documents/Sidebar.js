// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Mail, Send, Edit2, Folder, Plus, Trash, Columns } from 'react-feather';

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem, Badge, InputGroup, Input } from 'reactstrap';
import SelectTemplateModal from './SelectTemplateModal';
import { AbilityContext } from '../../utility/context/Can';

const Sidebar = ({
  store,
  sidebarOpen,
  toggleCompose,
  dispatch,
  getDocs,
  resetSelectedMail,
  setSidebarOpen
}) => {
  const [addFolderHide, setAddFolderHide] = useState(false);
  const [isTemplate, setIsTemplate] = useState(false);
  const toggleIsTemplate = () => setIsTemplate(!isTemplate);

  const ability = useContext(AbilityContext);

  // ** Vars
  const params = useParams();

  // ** Functions To Handle Folder, Label & Compose
  const handleFolder = (folder) => {
    dispatch(getDocs({ ...store.params, folder, label: '' }));
    dispatch(resetSelectedMail());
  };

  const handleNewFolderAdd = () => {
    setAddFolderHide(!addFolderHide);
  };

  const handleLabel = (label) => {
    dispatch(getDocs({ ...store.params, label }));
    dispatch(resetSelectedMail());
  };

  const handleComposeClick = () => {
    toggleCompose();
    setSidebarOpen(false);
  };

  // ** Functions To Active List Item
  const handleActiveItem = (value) => {
    if ((params.folder && params.folder === value) || (params.label && params.label === value)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Fragment>
      <div>
        <div
          className={classnames('sidebar-left', {
            show: sidebarOpen
          })}
        >
          <div className="sidebar">
            <div className="sidebar-content email-app-sidebar" >
              <div className="email-app-menu">
                <div className="form-group-compose text-center compose-btn">
                  {ability.can('write', 'documents') && 
                   <Button
                   className="compose-email"
                   color="primary"
                   block
                   tag={Link}
                   to="/document/create/doc/document"
                 >
                   Create Doc
                 </Button>
                  }
                 
                  {ability.can('write', 'documents/templates') && (
                    <Button
                      className="compose-email mt-50"
                      color="primary"
                      block
                      outline
                      onClick={toggleIsTemplate}
                    >
                      Create Template
                    </Button>
                  )}
                </div>
                <PerfectScrollbar
                  className="sidebar-menu-list"
                  options={{ wheelPropagation: false }}
                >
                  <ListGroup tag="div" className="list-group-messages">
                    <ListGroupItem
                      tag={Link}
                      to="/documents/inbox"
                      onClick={() => handleFolder('inbox')}
                      action
                      active={handleActiveItem('inbox')}
                      style={handleActiveItem('inbox') ? { backgroundColor: '#000' } : {}}
                    >
                      <Mail size={18} className="me-75" />
                      <span className="align-middle">Inbox</span>
                      {store.docsMeta.inbox ? (
                        <Badge className="float-end" color="light-primary" pill>
                          {store.docsMeta.inbox}
                        </Badge>
                      ) : null}
                    </ListGroupItem>
                    <ListGroupItem
                      tag={Link}
                      to="/documents/sent"
                      onClick={() => handleFolder('sent')}
                      action
                      active={handleActiveItem('sent')}
                      className={handleActiveItem('sent') ? 'list-group-item-active' : ''}
                    >
                      <Send size={18} className="me-75" />
                      <span className="align-middle">Sent</span>
                      {store.docsMeta.sent ? (
                        <Badge className="float-end" color="light-primary" pill>
                          {store.docsMeta.sent}
                        </Badge>
                      ) : null}
                    </ListGroupItem>
                    <ListGroupItem
                      tag={Link}
                      to="/documents/draft"
                      onClick={() => handleFolder('draft')}
                      action
                      active={handleActiveItem('draft')}
                      className={handleActiveItem('draft') ? 'list-group-item-active' : ''}
                    >
                      <Edit2 size={18} className="me-75" />
                      <span className="align-middle">Draft</span>
                      {store.docsMeta.draft ? (
                        <Badge className="float-end" color="light-warning" pill>
                          {store.docsMeta.draft}
                        </Badge>
                      ) : null}
                    </ListGroupItem>
                    <ListGroupItem
                      tag={Link}
                      to="/documents/voided"
                      onClick={() => handleFolder('voided')}
                      action
                      active={handleActiveItem('voided')}
                    >
                      <Trash size={18} className="me-75" />
                      <span className="align-middle">Voided</span>
                      {store.docsMeta.voided ? (
                        <Badge className="float-end" color="light-danger" pill>
                          {store.docsMeta.voided}
                        </Badge>
                      ) : null}
                    </ListGroupItem>
                    <ListGroupItem
                      tag={Link}
                      to="/documents/templates"
                      onClick={() => handleFolder('template')}
                      action
                      active={handleActiveItem('template')}
                    >
                      <Columns size={18} className="me-75" />
                      <span className="align-middle">Templates</span>
                      {store.docsMeta.templates ? (
                        <Badge className="float-end" color="light-info" pill>
                          {store.docsMeta.templates}
                        </Badge>
                      ) : null}
                    </ListGroupItem>
                  </ListGroup>
                  <h6 className="section-label mt-3 mb-1 px-2">Status</h6>
                  <ListGroup tag="div" className="list-group-labels">
                    <ListGroupItem
                      tag={Link}
                      to="/documents/label/waiting"
                      onClick={() => handleLabel('waiting')}
                      active={handleActiveItem('waiting')}
                      action
                    >
                      <span className="bullet bullet-sm bullet-warning me-1"></span>
                      Waiting
                      {store.docsMeta.waiting ? (
                        <Badge className="float-end" color="light-primary" pill>
                          {store.docsMeta.waiting}
                        </Badge>
                      ) : null}
                    </ListGroupItem>
                    <ListGroupItem
                      tag={Link}
                      to="/documents/label/viewed"
                      onClick={() => handleLabel('viewed')}
                      active={handleActiveItem('viewed')}
                      action
                    >
                      <span className="bullet bullet-sm bullet-primary me-1"></span>
                      Viewed
                      {store.docsMeta.viewed ? (
                        <Badge className="float-end" color="light-primary" pill>
                          {store.docsMeta.viewed}
                        </Badge>
                      ) : null}
                    </ListGroupItem>
                    <ListGroupItem
                      tag={Link}
                      to="/documents/label/completed"
                      onClick={() => handleLabel('completed')}
                      active={handleActiveItem('completed')}
                      action
                    >
                      <span className="bullet bullet-sm bullet-success me-1"></span>
                      Completed
                      {store.docsMeta.completed ? (
                        <Badge className="float-end" color="light-primary" pill>
                          {store.docsMeta.completed}
                        </Badge>
                      ) : null}
                    </ListGroupItem>
                  </ListGroup>
                </PerfectScrollbar>
              </div>
              <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
                <ListGroup tag="div" className="list-group-messages">
                  <ListGroupItem
                    tag={Link}
                    to="/documents/inbox"
                    onClick={() => handleFolder('inbox')}
                    action
                    active={handleActiveItem('inbox')}
                  >
                    <Mail size={18} className="me-75" />
                    <span className="align-middle">Inbox</span>
                    {store.docsMeta.inbox ? (
                      <Badge className="float-end" color="light-primary" pill>
                        {store.docsMeta.inbox}
                      </Badge>
                    ) : null}
                  </ListGroupItem>
                  <ListGroupItem
                    tag={Link}
                    to="/documents/sent"
                    onClick={() => handleFolder('sent')}
                    action
                    active={handleActiveItem('sent')}
                  >
                    <Send size={18} className="me-75" />
                    <span className="align-middle">Sent</span>
                    {store.docsMeta.sent ? (
                      <Badge className="float-end" color="light-primary" pill>
                        {store.docsMeta.sent}
                      </Badge>
                    ) : null}
                  </ListGroupItem>
                  <ListGroupItem
                    tag={Link}
                    to="/documents/draft"
                    onClick={() => handleFolder('draft')}
                    action
                    active={handleActiveItem('draft')}
                  >
                    <Edit2 size={18} className="me-75" />
                    <span className="align-middle">Draft</span>
                    {store.docsMeta.draft ? (
                      <Badge className="float-end" color="light-warning" pill>
                        {store.docsMeta.draft}
                      </Badge>
                    ) : null}
                  </ListGroupItem>
                  <ListGroupItem
                    tag={Link}
                    to="/documents/voided"
                    onClick={() => handleFolder('voided')}
                    action
                    active={handleActiveItem('voided')}
                  >
                    <Trash size={18} className="me-75" />
                    <span className="align-middle">Voided</span>
                    {store.docsMeta.voided ? (
                      <Badge className="float-end" color="light-danger" pill>
                        {store.docsMeta.voided}
                      </Badge>
                    ) : null}
                  </ListGroupItem>
                  <ListGroupItem
                    tag={Link}
                    to="/documents/templates"
                    onClick={() => handleFolder('template')}
                    action
                    active={handleActiveItem('template')}
                  >
                    <Columns size={18} className="me-75" />
                    <span className="align-middle">Templates</span>
                    {store.docsMeta.templates ? (
                      <Badge className="float-end" color="light-info" pill>
                        {store.docsMeta.templates}
                      </Badge>
                    ) : null}
                  </ListGroupItem>
                </ListGroup>
                <h6 className="section-label mt-3 mb-1 px-2">Status</h6>
                <ListGroup tag="div" className="list-group-labels">
                  <ListGroupItem
                    tag={Link}
                    to="/documents/label/waiting"
                    onClick={() => handleLabel('waiting')}
                    active={handleActiveItem('waiting')}
                    action
                  >
                    <span className="bullet bullet-sm bullet-warning me-1"></span>
                    Waiting
                    {store.docsMeta.waiting ? (
                      <Badge className="float-end" color="light-primary" pill>
                        {store.docsMeta.waiting}
                      </Badge>
                    ) : null}
                  </ListGroupItem>
                  <ListGroupItem
                    tag={Link}
                    to="/documents/label/viewed"
                    onClick={() => handleLabel('viewed')}
                    active={handleActiveItem('viewed')}
                    action
                  >
                    <span className="bullet bullet-sm bullet-primary me-1"></span>
                    Viewed
                    {store.docsMeta.viewed ? (
                      <Badge className="float-end" color="light-primary" pill>
                        {store.docsMeta.viewed}
                      </Badge>
                    ) : null}
                  </ListGroupItem>
                  <ListGroupItem
                    tag={Link}
                    to="/documents/label/completed"
                    onClick={() => handleLabel('completed')}
                    active={handleActiveItem('completed')}
                    action
                  >
                    <span className="bullet bullet-sm bullet-success me-1"></span>
                    Completed
                    {store.docsMeta.completed ? (
                      <Badge className="float-end" color="light-primary" pill>
                        {store.docsMeta.completed}
                      </Badge>
                    ) : null}
                  </ListGroupItem>
                </ListGroup>
              </PerfectScrollbar>
            </div>
          </div>
          <SelectTemplateModal open={isTemplate} toggle={toggleIsTemplate} />
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
