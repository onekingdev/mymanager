import React from 'react';

// import KanbanBoard from '@src/views/apps/kanban';
import KanbanBoard from './KanbanBoard';
import '@src/assets/styles/contact/lead-kanban.scss';

const TaskBoard = (props) => {
  const {
    store,
    contactTypeId,
    contactTypeTitle,
    selectedLeadSource,
    selectedStage,
    setSelectedStage,
    leadStore,
    activeSidebar
  } = props;
  return (
    <div className="lead-application">
      <KanbanBoard
        store={store}
        contactTypeId={contactTypeId}
        contactTypeTitle={contactTypeTitle}
        selectedLeadSource={selectedLeadSource}
        selectedStage={selectedStage}
        setSelectedStage={setSelectedStage}
        activeSidebar={activeSidebar}
        leadStore={leadStore}
      />
    </div>
  );
};

export default TaskBoard;
