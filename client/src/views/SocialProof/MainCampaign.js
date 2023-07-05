import React, { useState } from 'react';
import { Plus } from 'react-feather';
import { TabContent, TabPane } from 'reactstrap';
import { useHistory } from 'react-router-dom';
// ** CUSTOME COMPONENTS
import CampaignTable from './CampaignTable';
import Pixel from './createForm/Pixel';
import {
  NavLink,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  ModalFooter,
  Button,
  ListGroup,
  ListGroupItem,
  FormFeedback
} from 'reactstrap';
import { createAddCampaign } from '../../requests/userproof';
export default function MainCampaign() {
  // ** STATES
  const [style, setStyle] = useState({ display: 'none' });
  const [active, setActive] = useState('1');
  const [newCampaign, setNewCampaign] = useState(false);
  const [campaign_name, setCampaignName] = useState('');
  const [createNewValidation, setCreateNewValidation] = useState(true);
  const [takeCampaign, setTakeCampaign] = useState([]);
  const history = useHistory();

  const handleAddCampaignSubmit = () => {
    setNewCampaign(!newCampaign);
    history.push('/camgaign-edit');

    const payload = {
      campaign_name
    };
    createAddCampaign(payload).then((response) => {
      setCampaignName('');
    });

    localStorage.setItem('CampaignName', campaign_name);
  };
  const handleOpenAddCampaign = (e) => {
    e.preventDefault();
    setNewCampaign(true);
  };

  const handleCampaign = (e) => {
    setCampaignName(e.target.value);
    console.log(takeCampaign);
    setCreateNewValidation(
      takeCampaign.filter((x) => x.campaign_name === e.target.value).length === 0
    );
  };
  return (
    <div className="tasks-border">
      <div className="sidebar" style={{ maxWidth: '260px' }}>
        <div className="sidebar-content task-sidebar">
          <div className="task-app-menu">
            <ListGroup className="sidebar-menu-list" options={{ wheelPropagation: false }}>
              <div className="create-workspace-btn my-1">
                <Button color="primary" block outline onClick={handleOpenAddCampaign}>
                  <Plus size={14} className="me-25" />
                  <Modal
                    isOpen={newCampaign}
                    toggle={() => setNewCampaign(!newCampaign)}
                    className="modal-dialog-centered"
                  >
                    <ModalHeader toggle={() => setNewCampaign(!newCampaign)}>
                      Build & launch a new campaign
                    </ModalHeader>
                    <ModalBody>
                      <div>
                        <Input
                          id="newWorkspaceTitle"
                          name="newWorkspaceTitle"
                          value={campaign_name}
                          type="text"
                          placeholder="My Campaign"
                          onChange={handleCampaign}
                          valid={createNewValidation}
                          invalid={!createNewValidation}
                        />
                        <FormFeedback valid={createNewValidation}>
                          {createNewValidation
                            ? 'Sweet! That Campaign is available.'
                            : 'Oh no! That Campaign is already taken.'}
                        </FormFeedback>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        onClick={handleAddCampaignSubmit}
                        disabled={!createNewValidation || !campaign_name}
                      >
                        Next
                      </Button>
                      <Button color="secondary" onClick={() => setNewCampaign(!newCampaign)}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                  New Campaign
                </Button>
              </div>

              <ListGroup className="sidebar-menu-list p-1" options={{ wheelPropagation: false }}>
                <ListGroupItem
                  onMouseEnter={(e) => {
                    setStyle({
                      display: 'block'
                    });
                  }}
                  onMouseLeave={(e) => {
                    setStyle({
                      display: 'none'
                    });
                  }}
                  onClick={() => setActive('1')}
                  tag={NavLink}
                  active={active === '1'}
                >
                  <div className="d-flex justify-content-between align-middle">
                    <div className="ws-name">
                      <span>Campaign</span>
                    </div>
                  </div>
                </ListGroupItem>

                <ListGroupItem
                  onMouseEnter={(e) => {
                    setStyle({
                      display: 'block'
                    });
                  }}
                  onMouseLeave={(e) => {
                    setStyle({
                      display: 'none'
                    });
                  }}
                  tag={NavLink}
                  active={active === '2'}
                  onClick={() => setActive('2')}
                >
                  <div className="d-flex justify-content-between align-middle">
                    <div className="ws-name">
                      <span>Pixel</span>
                    </div>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </ListGroup>
          </div>
        </div>
      </div>
      <div className="tasks-area" style={{ maxWidth: '100%', width: '100%' }}>
        <TabContent activeTab={active}>
          <TabPane tabId="1">
            <CampaignTable
              active={active}
              setActive={setActive}
              setTakeCampaign={setTakeCampaign}
            />
          </TabPane>
          <TabPane tabId="2">
            <Pixel active={active} setActive={setActive} />
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
}
