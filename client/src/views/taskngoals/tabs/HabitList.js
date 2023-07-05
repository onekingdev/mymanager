import React from 'react';

import TasksList from '../../goals/habit-list';

const HabitList = (props) => {
  
  const {store,workspaceId} = props;

  return (
    <div className="task-application">
      <TasksList workspaceId={workspaceId} store={store} />
    </div>
  );
};

export default HabitList;
