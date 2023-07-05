import React from 'react';

import TasksList from '../../tasks/task-list';

const TaskListTAB = (props) => {
  const { store, selectedStatus } = props;
  const labelColorData = {};
  if (store) {
    for (let i = 0; i < store.labels?.length; i++) {
      const { title, color } = store.labels[i];
      labelColorData[title] = color;
    }
  }
  return (
    <div className="task-application">
      <TasksList store={store} selectedStatus={selectedStatus} labelColorData={labelColorData} />
    </div>
  );
};

export default TaskListTAB;
