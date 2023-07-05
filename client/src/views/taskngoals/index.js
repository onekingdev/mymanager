// ** React Imports
import { Fragment, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane, Card } from 'reactstrap';
// ** Icons Imports
import { CheckCircle } from 'react-feather';
import { GiRank2 } from 'react-icons/gi';
import Breadcrumbs from '@components/breadcrumbs';
import { BsUiChecks } from 'react-icons/bs';
import { toast } from 'react-toastify';

import { Button, Col, Collapse, Row } from 'reactstrap';

// ** User Components
import TaskReporting from './tabs/TaskReporting';
import TaskList from './tabs/TaskList';
import TaskBoard from './tabs/TaskBoard';
import WorkspaceSidebar from './tabs/WorkspaceSidebar';

import WorkspaceTitleBar from './tabs/WorkspaceTitlebar';
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkspaceApi, getSelectedWorkspaceData, addWorkspace } from '../apps/workspace/store';

import { fetchLabelsApi } from '../tasks/label-management/store';

// ** Styles
import '@src/assets/styles/tasks.scss';
// import '@src/assets/styles/dark-layout.scss';

//import GoalList from './tabs/GoalList';
import HabitList from './tabs/HabitList';
import JournalMain from '../apps/newjournal/JournalMain';
import { AbilityContext } from '../../utility/context/Can';
import GoalsWorkspaceSidebar from './tabs/GoalsWorkspaceSidebar';
import { fetchGoalWorkspaceAction } from './store/actions';

const TaskAndGoalsTabs = () => {
  const ability = useContext(AbilityContext);
  const { tabIndex } = useParams();
  const [active, setActive] = useState('1');
  const [title, setTitle] = useState('Journal');
  const [collapse, setCollapse] = useState(false);
  const [toggleListOrBoard, setToggleListOrBoard] = useState(true);
  const [toggleGoalHabit, setToggleGoalHabit] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState({});

  // ** Store Vars
  const dispatch = useDispatch();
  const goalsStore = useSelector((state) => state.goals);
  const goalWorkspace = useSelector((state) => state.goals.activeWorkspace);
  const goalWorkspaceList = useSelector((state) => state.goals.goalWorkspace);
  const store = useSelector((state) => {
    return {
      ...state.workspace,
      ...state.label,
      ...state.myGoals
    };
  });

  useEffect(() => {
    if (
      localStorage.getItem('TaskAndGoalsTab') == 4 &&
      ability.can('read', 'tasksAndGoals/reporting')
    ) {
      setActive('4');
      setTitle('Reporting');
    } else {
      if (ability.can('read', 'tasksAndGoals/journal')) {
        setActive('1');
        setTitle('Journal');
      } else if (ability.can('read', 'tasksAndGoals/tasks')) {
        setActive('2');
        setTitle('Tasks');
      } else if (ability.can('read', 'tasksAndGoals/goals')) {
        setActive('3');
        setTitle('Goals');
      } else if (ability.can('read', 'tasksAndGoals/reporting')) {
        setActive('4');
        setTitle('Reporting');
      }
    }
  }, []);

  useEffect(() => {
    if (tabIndex) {
      setActive(tabIndex);
    } else setActive('1');
  }, [tabIndex]);
  useEffect(() => {
    dispatch(fetchWorkspaceApi()).then((res) => {
      if (res.payload) {
        dispatch(getSelectedWorkspaceData(res.payload[0]._id));
      }
    });
    dispatch(fetchGoalWorkspaceAction('initialFetch'));
    dispatch(fetchLabelsApi());
  }, [dispatch]);
  useEffect(() => {
    goalsStore.goalsAddSuccess && toast.success('Added Successfully');
    goalsStore.goalsDeleteSuccess && toast.success('Deleted Successfully');
    goalsStore.goalsEditSuccess && toast.success('Updated Successfully');
    goalsStore.actionPlanAddSuccess && toast.success('Success');
  }, [goalsStore]);

  const toggleTab = (tab) => {
    localStorage.setItem('TaskAndGoalsTab', tab);
    if (tab === '1') {
      let taskArea = document.getElementsByClassName('tasks-area')[0];
      taskArea.style.width = '100%';
      taskArea.style.maxWidth = '100%';
    }
    if (active !== tab) {
      setActive(tab);
    }
  };

  const setToggleLB = () => {
    setToggleListOrBoard(!toggleListOrBoard);
  };

  const setToggleGH = () => {
    setToggleGoalHabit(!toggleGoalHabit);
  };

  const handleWorkspaceCollapse = () => {
    let sidebar = document.getElementsByClassName('sidebar')[0];
    let taskArea = document.getElementsByClassName('tasks-area')[0];
    if (sidebar.style.maxWidth == '260px') {
      sidebar.style.maxWidth = 0;
      taskArea.style.maxWidth = '100%';
      taskArea.style.width = '100%';
    } else {
      sidebar.style.maxWidth = '260px';
      taskArea.style.maxWidth = 'calc(100% - 260px)';
      taskArea.style.width = 'calc(100% - 260px)';
    }
    setCollapse(!collapse);
  };

  return (
    <Fragment>
      <Row
        style={{ width: '100%', margin: '0px', padding: '0px' }}
        className="invoice-child-header-wrapper"
      >
        <Breadcrumbs
          breadCrumbTitle={'Tasks & Goals'}
          breadCrumbParent="Tasks & Goals"
          breadCrumbActive={title}
        />
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
          <Fragment>
            <Nav pills className="mb-2 tab-header">
              {ability.can('read', 'tasksAndGoals/journal') && (
                <NavItem>
                  <NavLink
                    active={active === '1'}
                    onClick={() => {
                      setActive('1');
                      setTitle('Journal');
                      localStorage.removeItem('TaskAndGoalsTab');
                    }}
                  >
                    <GiRank2 className="font-medium-1 me-50" />
                    <span className="fs-6">Journal</span>
                  </NavLink>
                </NavItem>
              )}

              {ability.can('read', 'tasksAndGoals/tasks') && (
                <NavItem>
                  <NavLink
                    active={active === '2'}
                    onClick={() => {
                      setActive('2');
                      setTitle('Tasks');
                      localStorage.removeItem('TaskAndGoalsTab');
                    }}
                  >
                    <GiRank2 className="font-medium-1 me-50" />
                    <span className="fs-6">Tasks</span>
                  </NavLink>
                </NavItem>
              )}

              {ability.can('read', 'tasksAndGoals/goals') && (
                <NavItem>
                  <NavLink
                    active={active === '3'}
                    onClick={() => {
                      setActive('3');
                      setTitle('Goals');
                      localStorage.removeItem('TaskAndGoalsTab');
                    }}
                  >
                    <CheckCircle className="font-medium-1 me-50" />
                    <span className="fs-6">Goals</span>
                    {/* <Link to="/goals">
                    <CheckCircle className="font-medium-1 me-50" />
                    <span className="fs-6">Goals</span>
                  </Link> */}
                  </NavLink>
                </NavItem>
              )}
              {ability.can('read', 'tasksAndGoals/reporting') && (
                <NavItem>
                  <NavLink
                    active={active === '4'}
                    onClick={() => {
                      setActive('4');
                      localStorage.setItem('TaskAndGoalsTab', 4);
                      setTitle('Reporting');
                    }}
                  >
                    <BsUiChecks className="font-medium-1 me-50" />
                    <span className="fs-6">Reporting</span>
                  </NavLink>
                </NavItem>
              )}
            </Nav>
            <div className="tasks-border">
              {active == '2' ? (
                <WorkspaceSidebar
                  collapse={collapse}
                  store={store}
                  addWorkspace={addWorkspace}
                  handleWorkspaceCollapse={handleWorkspaceCollapse}
                  dispatch={dispatch}
                  selectedStatus={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                />
              ) : (
                active == '3' && (
                  <GoalsWorkspaceSidebar
                    collapse={collapse}
                    workSpaces={goalWorkspaceList}
                    handleWorkspaceCollapse={handleWorkspaceCollapse}
                    dispatch={dispatch}
                    activeWorkspace={goalWorkspace}
                  />
                )
              )}

              <div
                className="tasks-area"
                style={
                  ['2', '3'].includes(active)
                    ? { maxWidth: 'calc(100% - 260px)', width: 'calc(100% - 260px)' }
                    : { maxWidth: '100%', width: '100%' }
                }
              >
                {active == '2' && (
                  <WorkspaceTitleBar
                    workspace={store.selectedWorkspace}
                    handleWorkspaceCollapse={handleWorkspaceCollapse}
                    collapse={collapse}
                    setToggle={setToggleLB}
                    toggleListOrBoard={toggleListOrBoard}
                    optionLabels={['List', 'Board']}
                    selectedTab={active}
                  />
                )}
                {active == '3' && (
                  <WorkspaceTitleBar
                    workspace={goalWorkspace}
                    handleWorkspaceCollapse={handleWorkspaceCollapse}
                    collapse={collapse}
                    setToggle={setToggleLB}
                    toggleListOrBoard={toggleListOrBoard}
                    optionLabels={['List', 'Board']}
                    selectedTab={active}
                  />
                )}
                <TabContent activeTab={active} style={{ overflow: 'hidden' }}>
                  {ability.can('read', 'tasksAndGoals/journal') && (
                    <TabPane tabId="1">
                      <JournalMain style={{ height: '500px' }} />
                    </TabPane>
                  )}

                  <TabPane tabId="2">
                    {toggleListOrBoard ? (
                      <TaskList store={store} selectedStatus={selectedStatus} />
                    ) : (
                      <TaskBoard store={store} selectedStatus={selectedStatus} />
                    )}
                  </TabPane>
                  <TabPane tabId="3">
                    <HabitList workspaceId={goalWorkspace} store={store} />
                  </TabPane>
                  <TabPane tabId="4">
                    <TaskReporting />
                  </TabPane>
                </TabContent>
              </div>
            </div>
          </Fragment>
        </Col>
      </Row>
    </Fragment>
  );
};
export default TaskAndGoalsTabs;
