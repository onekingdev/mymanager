// ** React Imports
import { useState, useEffect } from 'react';
// ** Reactstrap Imports
import { TabContent, TabPane, Card, Collapse, Button } from 'reactstrap';
// ** Icons Imports
import { Col, Row } from 'reactstrap';

// ** User Components
// import TaskTable from '../leadsTable';
import Table from '../contactTable';

import TaskBoard from './TaskBoard';
import LeadSourcesSidebar from './LeadSourcesSidebar';
import WorkspaceTitleBar from './WorkspaceTitlebar';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkspaceApi, getSelectedWorkspaceData } from '@src/views/apps/workspace/store';

// ** Styles
import '@src/assets/styles/contact/lead-table.scss';
// import '@src/assets/styles/dark-layout.scss';
import { ChevronRight } from 'react-feather';

const TaskAndGoalsTabs = () => {
  const LeadContactTypeTitle = 'Lead';

  const [active, setActive] = useState(localStorage.getItem('LeadToggleIndex') || '2');
  const [activeSidebar, setActiveSidebar] = useState(null);

  const [previousSidebar, setPreviousSidebar] = useState('');
  const [selectedLeadSource, setSelectedLeadSource] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);

  const [collapse, setCollapse] = useState(false);
  // ** Store Vars
  const dispatch = useDispatch();

  const store = useSelector((state) => state?.totalContacts);
  const contactTypeId = useSelector(
    (state) =>
      state?.totalContacts?.contactTypeList?.filter((x) => x.name == LeadContactTypeTitle)[0]?._id
  );

  const workspaceStore = useSelector((state) => {
    return {
      ...state.workspace,
      ...state.label
    };
  });

  useEffect(() => {
    dispatch(fetchWorkspaceApi()).then((res) => {
      if (res && res.payload && res.payload.length > 0) {
        dispatch(getSelectedWorkspaceData(res.payload[0]._id));
      }
    });
    // dispatch(fetchLabelsApi());
  }, [dispatch]);

  useEffect(() => {
    setPreviousSidebar(activeSidebar);
  }, [activeSidebar]);

  const handleWorkspaceCollapse = () => setCollapse(!collapse);

  const leadStore = useSelector((state) => {
    return {
      tags: state.totalContacts?.tags,
      stages: state.totalContacts?.stages,
      leadSources: state.totalContacts?.leadSource
    };
  });

  const toggleTab = (tab) => {
    if (activeSidebar !== tab) {
      setActiveSidebar(tab);
    }
  };

  const activeLeadSource = leadStore?.leadSources?.find(
    (tag, index) => (index + 1).toString() === activeSidebar
  );

  const previousLeadSource = leadStore?.leadSources?.find(
    (tag, index) => (index + 1).toString() === previousSidebar
  );

  return (
    <Card>
      <div className="project-right" style={{ float: 'left !important' }}>
        <div className="content-wrapper">
          <div div className="content-body">
            <div
              className="lead-border"
              // style={{ display: 'flex', height: 'calc(100vh - 16rem)', width: '100%' }}
            >
              <div
                className={`${
                  collapse ? null : 'project-workspace-container project-lead-container'
                } set-collapse`}
              >
                <Collapse className="h-100" isOpen={!collapse} horizontal={true}>
                  <LeadSourcesSidebar
                    toggleTab={toggleTab}
                    collapse={collapse}
                    active={activeSidebar}
                    leadStore={leadStore}
                    store={store}
                    contactTypeId={contactTypeId}
                    selectedLeadSource={selectedLeadSource}
                    setSelectedLeadSource={setSelectedLeadSource}
                    handleWorkspaceCollapse={handleWorkspaceCollapse}
                    selectedStage={selectedStage}
                    setSelectedStage={setSelectedStage}
                    activeSidebar={activeSidebar}
                    setActiveSidebar={setActiveSidebar}
                  />
                </Collapse>
              </div>
              <div className={`cus-container`}>
                <WorkspaceTitleBar
                  activeLeadName={activeLeadSource || previousLeadSource}
                  leadStore={leadStore}
                  handleWorkspaceCollapse={handleWorkspaceCollapse}
                  collapse={collapse}
                  active={active}
                  setActive={setActive}
                />
                <TabContent activeTab={active}>
                  <TabPane tabId="1">{/* <TaskReporting /> */}</TabPane>
                  <TabPane tabId="2">
                    <Table
                      store={store}
                      contactTypeId={contactTypeId}
                      contactTypeTitle={LeadContactTypeTitle}
                      selectedLeadSource={selectedLeadSource}
                      selectedStage={selectedStage}
                      activeSidebar={activeSidebar}
                      // setActiveSidebar={setActiveSidebar}
                    />
                  </TabPane>
                  <TabPane tabId="3">
                    <TaskBoard
                      store={store}
                      contactTypeId={contactTypeId}
                      contactTypeTitle={LeadContactTypeTitle}
                      selectedLeadSource={selectedLeadSource}
                      selectedStage={selectedStage}
                      setSelectedStage={setSelectedStage}
                      activeSidebar={activeSidebar}
                      leadStore={leadStore}
                    />
                  </TabPane>
                  <TabPane tabId="4">{/* <TaskManagement /> */}</TabPane>
                </TabContent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default TaskAndGoalsTabs;
