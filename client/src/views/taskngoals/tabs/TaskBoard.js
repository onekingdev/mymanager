import React from 'react';

import KanbanBoard from '../../apps/kanban';

const TaskBoard = (props) => {
  const { store } = props;
  const labelColorData = {};
  if (store) {
    for (let i = 0; i < store.labels?.length; i++) {
      const { title, color } = store.labels[i];
      labelColorData[title] = color;
    }
  }
  return (
    <div className="kanban-application">
      <KanbanBoard store={store} labelColorData={labelColorData} />
    </div>
  );
};

export default TaskBoard;
