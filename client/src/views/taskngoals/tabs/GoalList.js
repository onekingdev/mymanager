import React from 'react';

import TasksList from '../../goals/goal-list';

const GoalList = (props) => {
  const {store} = props;
  return (
    <div className="task-application">
      <TasksList store={store} />
    </div>
  );
};

export default GoalList;
