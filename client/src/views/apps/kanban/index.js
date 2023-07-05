// ** React Imports
import { useEffect, useState, useMemo } from 'react';

// ** Third Party Imports
import { Plus } from 'react-feather';
import { useForm, Controller } from 'react-hook-form';

// ** Reactstrap Imports
import { Button, Input, FormText } from 'reactstrap';

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';

// ** Actions
import { addBoard } from './store';
import { getSelectedWorkspaceData } from '../workspace/store';

// ** Kanban Component
import TaskSidebar from '../../tasks/task-list/TaskSidebar';
import KanbanBoards from './KanbanBoards';

// ** Styles
import '@styles/react/apps/app-kanban.scss';

const defaultValues = {
  boardTitle: ''
};

// const labelColorData = {
//   App: 'info',
//   UX: 'success',
//   Images: 'warning',
//   Forms: 'success',
//   'Code Review': 'danger',
//   'Charts & Maps': 'primary'
// };

const KanbanBoard = (props) => {
  const { store, labelColorData } = props;
  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddBoard, setShowAddBoard] = useState(false);

  // ** Hooks
  const dispatch = useDispatch();
  // const store = useSelector((state) => state.workspace);
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  // useMemo(() => {
  //   if (store) {
  //     let labelColorData = {};
  //     for (let i = 0; i < store.labels?.length; i++) {
  //       let { title, color } = store.labels[i];
  //       labelColorData[title] = color;
  //     }
  //     setLabelColors(labelColorData);
  //   } else setLabelColors({});
  // }, [store]);

  const handleAddBoardReset = () => {
    reset();
    setShowAddBoard(false);
  };

  const handleOpenAddBoard = () => {
    reset();
    setShowAddBoard(true);
  };

  const handleAddBoardFormSubmit = (data) => {
    dispatch(
      addBoard({
        title: data.boardTitle,
        id: data.boardTitle.toLowerCase().replace(/ /g, '-'),
        workspaceId: store.selectedWorkspace._id
      })
    );
    handleAddBoardReset();
  };

  const handleTaskSidebarToggle = () => setSidebarOpen(!sidebarOpen);

  const renderBoards = () => {
    if (store.boards) {
      return store.boards.map((board, index) => {
        const isLastBoard = store.boards[store.boards.length - 1]._id === board._id;
        return (
          <KanbanBoards
            store={store}
            board={board}
            labelColors={
              labelColorData
                ? labelColorData
                : {
                    App: 'info',
                    UX: 'success',
                    Images: 'warning',
                    Forms: 'success',
                    'Code Review': 'danger',
                    'Charts & Maps': 'primary'
                  }
            }
            isLastBoard={isLastBoard}
            key={`${board.id}-${index}`}
            index={`${board.id}-${index}`}
            handleTaskSidebarToggle={handleTaskSidebarToggle}
          />
        );
      });
    }
  };

  const renderAddBoardForm = () => {
    return showAddBoard ? (
      <form onSubmit={handleSubmit(handleAddBoardFormSubmit)}>
        <div className="mb-50">
          <Controller
            name="boardTitle"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Input
                autoFocus
                value={value}
                id="board-title"
                onChange={onChange}
                placeholder="Board Title"
                invalid={Boolean(errors.boardTitle)}
                aria-describedby="validation-add-board"
              />
            )}
          />
          {errors.boardTitle && (
            <FormText color="danger" id="validation-add-board">
              Please enter a valid Board Title
            </FormText>
          )}
        </div>
        <div>
          <Button
            style={{ float: 'left', width: '45%' }}
            color="primary"
            size="sm"
            type="submit"
            className="me-75"
          >
            Add
          </Button>
          <Button
            style={{ float: 'right', width: '45%' }}
            outline
            size="sm"
            color="primary"
            onClick={handleAddBoardReset}
          >
            Cancel
          </Button>
        </div>
      </form>
    ) : null;
  };

  useEffect(() => {
    dispatch(getSelectedWorkspaceData(store.selectedWorkspace._id));
  }, [dispatch]);

  return store.boards.length ? (
    <div className="app-kanban-wrapper">
      {/* <PerfectScrollbar className="kanban-board-horizontal-scroll"> */}
      {renderBoards()}

      {store.selectedWorkspace.title !== 'Personal' &&
      store.selectedWorkspace.title !== 'Business' ? (
        <div className="ms-1" style={{ minWidth: 150 }}>
          {!showAddBoard ? (
            <Button
              className="btn-icon btn float-center mt-1"
              onClick={handleOpenAddBoard}
              color="primary"
              outline
              style={{
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <Plus size={14} />
            </Button>
          ) : (
            renderAddBoardForm()
          )}
        </div>
      ) : null}
      <TaskSidebar
        labelColors={labelColorData}
        sidebarOpen={sidebarOpen}
        selectedTask={store.selectedTask}
        store={store}
        handleTaskSidebarToggle={handleTaskSidebarToggle}
      />
      {/* </PerfectScrollbar> */}
    </div>
  ) : (
    <div className="app-kanban-wrapper">
      <div className="ms-1" style={{ minWidth: 150 }}>
        {!showAddBoard ? (
          <Button
            size="sm"
            color="secondary"
            style={{ width: '100%', marginTop: '0.3rem' }}
            outline
            onClick={handleOpenAddBoard}
          >
            <Plus size={14} className="me-25" />
            Add Board
          </Button>
        ) : (
          renderAddBoardForm()
        )}
      </div>
    </div>
  );
};

export default KanbanBoard;
