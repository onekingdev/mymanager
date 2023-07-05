// ** React Imports
import { Fragment, useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';

// ** Todo App Components
import Tasks from './Tasks';
import TaskSidebar from './TaskSidebar';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import {
  addBoard,
  fetchTasksApi,
  addTask,
  updateTask,
  reorderTasks,
  deleteTask
} from '../../apps/kanban/store';
import {
  fetchWorkspaceApi,
  getSelectedWorkspaceData,
  handleSelectTask
} from '../../apps/workspace/store';

// ** Styles
import '@src/assets/styles/task-list.scss';
import { Row, Col, Collapse } from 'reactstrap';

// const labelColors = {
//   App: 'info',
//   UX: 'success',
//   Images: 'warning',
//   Forms: 'success',
//   'Code Review': 'danger',
//   'Charts & Maps': 'primary'
// };

const TaskList = (props) => {
  const { labelColorData, selectedStatus } = props;
  // ** States
  const [collapse, setCollapse] = useState(false);
  const [mainSidebar, setMainSidebar] = useState(false);
  const [openTaskSidebar, setOpenTaskSidebar] = useState(false);

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => {
    return {
      ...state.workspace,
      ...state.label
    };
  });

  // ** Function to handle Left sidebar & Task sidebar
  const handleMainSidebar = () => setMainSidebar(!mainSidebar);
  const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar);
  const handleWorkspaceCollapse = () => setCollapse(!collapse);

  // ** Get Tasks on mount & based on dependency change
  useEffect(() => {
    dispatch(fetchTasksApi());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchWorkspaceApi());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="content-body">
        {store && (
          <Tasks
            collapse={collapse}
            store={store}
            tasks={store.tasks}
            labelColors={labelColorData}
            dispatch={dispatch}
            updateTask={updateTask}
            selectedWorkspace={store.selectedWorkspace}
            selectedStatus={selectedStatus}
            selectTask={handleSelectTask}
            // reOrderTasks={reorderTasks}
            handleMainSidebar={handleMainSidebar}
            handleTaskSidebar={handleTaskSidebar}
            handleWorkspaceCollapse={handleWorkspaceCollapse}
          />
        )}

        {store && (
          <TaskSidebar
            labelColors={labelColorData}
            store={store}
            sidebarOpen={openTaskSidebar}
            selectedTask={store.selectedTask}
            handleTaskSidebarToggle={handleTaskSidebar}
            // store={store}
            // addTask={addTask}
            // dispatch={dispatch}
            // open={openTaskSidebar}
            // updateTask={updateTask}
            // selectTask={handleSelectTask}
            // deleteTask={deleteTask}
            // handleTaskSidebar={handleTaskSidebar}
          />
        )}
      </div>
    </Fragment>
  );
};

export default TaskList;
