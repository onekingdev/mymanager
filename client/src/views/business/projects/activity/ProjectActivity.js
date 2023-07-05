// ** React Import
import { Fragment, useState } from 'react';

// ** Custom Components
import Sidebar from '@components/sidebar';

// ** Components Imports
import Activity from './Activity';
import LastSeen from './LastSeen';

//** Redux Imports
import { useDispatch } from 'react-redux';
import { projectActivities, projectLastSeen } from '../store/reducer';

// ** Reactstrap Imports
import {
  Col,
  Row,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  UncontrolledTooltip
} from 'reactstrap';

// ** Icons Imports
import { Eye } from 'react-feather';
import { BsUiChecks } from 'react-icons/bs';

// ** Styles
import '@styles/base/pages/page-projects.scss';

// ** APIs
import { getActivity_LastSeen } from '../../../../requests/projects/project';

const ProjectActivity = ({ workspaceID }) => {
  const dispatch = useDispatch();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState('1');

  const toggleSidebar = () => {
    console.log(workspaceID);
    getActivity_LastSeen(workspaceID).then((response) => {
      dispatch(projectActivities(response?.data?.latestActivitiese));
      dispatch(projectLastSeen(response?.data?.lastSeen));
    });
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <Fragment>
      <Button.Ripple className="btn-icon me-1" outline color="primary" onClick={toggleSidebar}>
        <Eye size={16} id={`Project-LastSeen-${workspaceID}`} />
        <UncontrolledTooltip placement="top" target={`Project-LastSeen-${workspaceID}`}>
          Last Seen & Activity
        </UncontrolledTooltip>
      </Button.Ripple>

      <Sidebar
        open={sidebarOpen}
        title="Activity & Last Seen"
        headerClassName="mb-1"
        contentClassName="pt-0"
        toggleSidebar={toggleSidebar}
        style={{ minWidth: '767px' }}
      >
        <Row style={{ width: '100%' }}>
          <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
            <Fragment>
              <Nav pills className="mb-2 tab-header">
                <NavItem>
                  <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                    <BsUiChecks className="font-medium-1 me-50" />
                    <span className="fs-6">Activity</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                    <Eye className="font-medium-1 me-50" />
                    <span className="fs-6">Last Seen</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </Fragment>
          </Col>
        </Row>

        <TabContent activeTab={active}>
          <TabPane tabId="1">
            <Activity />
          </TabPane>

          <TabPane tabId="2">
            <LastSeen />
          </TabPane>
        </TabContent>
      </Sidebar>
    </Fragment>
  );
};

export default ProjectActivity;
