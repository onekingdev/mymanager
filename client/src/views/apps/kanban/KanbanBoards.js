// ** React Imports
import { useState, useEffect, Fragment } from 'react';

// ** Reactstrap Imports
import {
  Input,
  Button,
  FormText,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// ** Third Party Imports
import { ReactSortable } from 'react-sortablejs';
import { useForm, Controller } from 'react-hook-form';
import { Plus, MoreVertical } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';

// ** Redux Imports
import { useDispatch } from 'react-redux';

// ** Actions
import {
  addTask,
  clearTasks,
  updateBoardTitle,
  deleteBoard,
  reorderTasks,
  updateTaskStatus
} from './store';

import KanbanTasks from './KanbanTasks';
import Swal from 'sweetalert2';
import { MdOutlineSwitchAccount } from 'react-icons/md';
// ** Kanban Component

const defaultValues = {
  taskTitle: ''
};

const KanbanBoard = (props) => {
  // ** Props
  const { board, index, store, labelColors, handleTaskSidebarToggle } = props;

  // ** States
  const [title, setTitle] = useState('');
  const [showAddTask, setShowAddTask] = useState(null);
  const [mouseDownState, setMouseDownState] = useState(true);
  const [selectTaskId, setSelectTaskId] = useState('');
  const [prevSortTaskInfo, setPrevSortTaskInfo] = useState({});
  const [addedData, setAddedData] = useState([]);

  // ** Hooks
  const dispatch = useDispatch();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  useEffect(() => {
    setTitle(board.title);
  }, [board.title]);

  useEffect(() => {
    setMouseDownState(window.mouseDownState);
  }, [window.mouseDownState]);
  useEffect(() => {
    window.selectTaskId = selectTaskId;
  }, [selectTaskId]);

  const handleAddTaskReset = () => {
    reset();
    setShowAddTask(null);
  };

  const handleOpenAddTask = () => {
    reset();
    setShowAddTask(board.id);
  };

  const handleClearTasks = (e) => {
    e.preventDefault();
    dispatch(
      clearTasks({
        boardId: board._id,
        workspaceId: store.selectedWorkspace._id
      })
    );
  };

  const handleDeleteBoard = () => {
    Swal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to delete the task board?',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete anyway',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          deleteBoard({
            id: board._id,
            workspaceId: store.selectedWorkspace._id
          })
        );
        Swal.fire('Deleted!', 'The task(s) have been deleted.', 'success');
      }
    });
  };

  const handleAddTaskFormSubmit = (data) => {
    // const param = {
    //   title: data.taskTitle,
    //   boardId: board._id,
    //   workspaceId: store.selectedWorkspace._id
    // };
    // dispatch(addTask(param));
    // handleAddTaskReset();
    const param = {
      title: data.taskTitle,
      boardId: board._id,
      workspaceId: store.selectedWorkspace._id
    };
    dispatch(addTask(param));
    handleAddTaskReset();

    // Update the state with the new added data and its length
    setAddedData([...addedData, data.taskTitle]);
  };

  const handleUpdateBoardTitle = (event) => {
    if (event.key === 'Enter') {
      setTitle(event.target.value);
      dispatch(
        updateBoardTitle({
          title: event.target.value,
          id: board.id,
          workspaceId: store.selectedWorkspace._id
        })
      );
      event.target.blur();
    }
  };

  const renderAddTaskForm = () => {
    return board.id === showAddTask ? (
      <form onSubmit={handleSubmit(handleAddTaskFormSubmit)}>
        <div className="mb-1">
          <Controller
            name="taskTitle"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Input
                autoFocus
                rows="2"
                value={value}
                type="textarea"
                id="task-title"
                onChange={onChange}
                placeholder="Add Content"
                invalid={errors.taskTitle && true}
                aria-describedby="validation-add-task"
              />
            )}
          />
          {errors.taskTitle && (
            <FormText color="danger" id="validation-add-task">
              Please enter a valid Task Title
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
            onClick={handleAddTaskReset}
          >
            Cancel
          </Button>
        </div>
      </form>
    ) : null;
  };

  const sortTaskOnSameBoard = (ev) => {
    const taskId = ev.item.dataset.taskId;
    const boardId = ev.item.dataset.boardId;
    const targetTask = store.tasks.filter((x) => x.boardId == boardId)[ev.newIndex];
    if (targetTask) {
      const targetTaskId = store.tasks.filter((x) => x.boardId == boardId)[ev.newIndex]._id;

      setSelectTaskId(taskId);
      dispatch(
        reorderTasks({
          taskId,
          targetTaskId,
          workspaceId: store.selectedWorkspace._id
        })
      );
    } else {
      return;
    }
  };

  const MoveTaskToAnotherBoard = (ev) => {
    dispatch(
      updateTaskStatus({
        taskId: ev.item.dataset.taskId,
        boardId: ev.item.dataset.boardId,
        newBoardId: ev.to.classList[1].replace('board-', ''),
        workspaceId: store.selectedWorkspace._id
      })
    );
  };

  const matchedBoard = store.boards.find((x) => x._id == board._id);
  const matchedTasks = store.tasks.filter((task) => task.boardId === matchedBoard._id);
  const dataLength = matchedTasks.length;

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return; // Drop outside a droppable area
    }

    const { source, destination } = result;

    // Perform necessary logic based on the drag and drop result
    // Update your state or dispatch actions here
  };

  return (
    <Fragment key={index}>
      <div className="p-0">
        <div className="board-wrapper">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="board-droppable">
              {(provided) => (
                <div
                  className="board-title d-flex align-items-center justify-content-between"
                  style={{
                    borderBottom: '1px solid #ebe9f1',
                    height: '60px',
                    background: 'rgb(245 244 244)'
                  }}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="align-items-center board-header">
                    <Input
                      className="board-title border-0 bg-transparent input-lg task-field"
                      value={title}
                      onChange={(e) => handleUpdateBoardTitle(e)}
                      onKeyPress={(e) => handleUpdateBoardTitle(e)}
                    />
                    <div className="cursor-default mb-1" style={{ marginLeft: '15px' }}>
                      <MdOutlineSwitchAccount size={16} className="me-1" />
                      {dataLength} Tasks
                    </div>
                  </div>

                  <UncontrolledDropdown className="more-options-dropdown">
                    <DropdownToggle className="btn-icon" color="transparent" size="sm">
                      <MoreVertical size={20} />
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem href="/" onClick={handleClearTasks}>
                        Clear Tasks
                      </DropdownItem>
                      {store.selectedWorkspace.title !== 'Personal' &&
                      store.selectedWorkspace.title !== 'Business' ? (
                        <DropdownItem
                          href="/"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteBoard();
                          }}
                        >
                          Delete Board
                        </DropdownItem>
                      ) : null}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  {renderAddTaskForm()}
                  <svg
                    class="arrow"
                    width="16"
                    height="56"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <path class="arrow__right" fill="#F7F7F7" d="M0 0h16v56H0z"></path>
                      <path class="arrow__border" fill="#E5E5E5" d="M1 0l8 28-8 28H0V0z"></path>
                      <path class="arrow__left" fill="#F7F7F7" d="M0 1l8 27-8 27z"></path>
                    </g>
                  </svg>
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="kanban-task-list">
            <PerfectScrollbar
              className="kanban-task-scroll"
              options={{ wheelPropagation: false }}
              containerRef={(ref) => {
                if (ref) {
                  ref._getBoundingClientRect = ref.getBoundingClientRect;

                  ref.getBoundingClientRect = () => {
                    const original = ref._getBoundingClientRect();

                    return {
                      ...original,
                      height: Math.floor(original.height)
                    };
                  };
                }
              }}
            >
              <ReactSortable
                list={store.tasks}
                group="shared-group"
                setList={() => null}
                animation={150}
                onEnd={sortTaskOnSameBoard}
                onAdd={MoveTaskToAnotherBoard}
                className={`tasks-wrapper board-${board._id}`}
                overFlow="auto"
              >
                {store.tasks.map((task, index) => {
                  if (task.boardId === board._id) {
                    return (
                      <KanbanTasks
                        task={task}
                        index={index}
                        labelColors={labelColors}
                        key={`${task.boardId}-${index}`}
                        handleTaskSidebarToggle={handleTaskSidebarToggle}
                      />
                    );
                  } else {
                    return <Fragment key={`${task.boardId}-${index}`}></Fragment>;
                  }
                })}
              </ReactSortable>
              {showAddTask === null || (showAddTask !== null && showAddTask !== board.id) ? (
                <Button
                  className="mt-1"
                  size="sm"
                  color="flat-secondary"
                  style={{ width: '100%' }}
                  onClick={handleOpenAddTask}
                >
                  <Plus size={14} className="me-25" />
                  Add New Task
                </Button>
              ) : (
                renderAddTaskForm()
              )}
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default KanbanBoard;
