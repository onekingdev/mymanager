// ** React Imports
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

// ** Reactstrap Imports
import { Button } from 'reactstrap';

// ** icons Imports
import { ArrowLeft } from 'react-feather';

// ** Components
import TaskListTabs from './TaskListTabs';
import AddTaskSidebar from './AddTaskSidebar';

const LeftSidebar = (props) => {
  const [taskSidebarOpen, setTaskSidebarOpen] = useState(false);
  const [addTaskSiderState, setAddTaskSiderState] = useState(false);

  // ** Function to toggle add task sidebar
  const toggleAddTaskSidebar = () => setTaskSidebarOpen(!taskSidebarOpen);

  const buildProps = {
    open: taskSidebarOpen,
    toggleSidebar: toggleAddTaskSidebar,
    addTaskSiderState: addTaskSiderState,
    setAddTaskSiderState: setAddTaskSiderState,
    ...props
  };

  return (
    <Fragment>
      <div className="mb-2 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Link to="/tasksAndGoals">
            <ArrowLeft size={20} />
          </Link>
          <h5 className="ms-1 mb-0">Tasks</h5>
        </div>
        <Button
          color="primary"
          onClick={() => {
            toggleAddTaskSidebar();
            setAddTaskSiderState(true);
          }}
        >
          New Task
        </Button>
        <AddTaskSidebar {...buildProps} />
      </div>
      <div className="list-tabs">
        <TaskListTabs {...buildProps} />
      </div>
    </Fragment>
  );
};

export default LeftSidebar;
