// ** React Imports
import { useState, useEffect, Fragment } from 'react';

// ** Reactstrap Imports
import { Input, Row, Col, Button, FormText } from 'reactstrap';

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form';
import { Plus, MoreVertical } from 'react-feather';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux';

import KanbanContacts from './KanbanContacts';
import Sidebar from '../Sidebar';
// import { updateContactStageAction } from '../store/actions';
import { selectContactAction, updateContactAction, updateStageAction } from '../../store/actions';
import { MdOutlineSwitchAccount } from 'react-icons/md';
import { BsPlusLg } from 'react-icons/bs';
// ** Kanban Component
import AddLeadType from './AddLeadType';
import { FiSettings } from 'react-icons/fi';

const defaultValues = {
  taskTitle: ''
};

const KanbanBoards = (props) => {
  // ** Props
  const {
    store,
    board,
    index,
    labelColors,
    handleTaskSidebarToggle,
    leadStore,
    contactTypeTitle,
    itemDragging
  } = props;
  // ** States
  const totalContactStore = useSelector((state) => state.totalContacts);
  const [title, setTitle] = useState(board.title);
  const [showAddTask, setShowAddTask] = useState(null);
  const [eventLeadType, setEventLeadType] = useState('');
  const stages = useSelector((state) => state?.totalContacts?.stages);

  const [boardData, setBoardData] = useState(
    store == null ? [] : store.filter((data) => data.stage === board.title)
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    setBoardData(store == null ? [] : store.filter((data) => data.stage === board.title));
    // setBoardDataWarm(store == null ? [] : store.filter((data) => data.stage === 'warm'));
    // setBoardDataCold(store == null ? [] : store.filter((data) => data.stage === 'cold'));
  }, [store]);

  const handleAddTaskReset = () => {
    reset();
    setShowAddTask(null);
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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
          <Button color="primary" size="sm" type="submit" className="me-75">
            Add
          </Button>
          <Button outline size="sm" color="secondary" onClick={handleAddTaskReset}>
            Cancel
          </Button>
        </div>
      </form>
    ) : null;
  };

  return (
    <Fragment key={index}>
      <div
        className="p-0"
        style={{
          minWidth: '270px',
          height: '100%'
        }}
      >
        <div className="board-wrapper">
          <div
            style={{
              overflowY: 'auto',
              minHeight: itemDragging ? 'calc(100vh - 53rem)' : 'calc(100vh - 48rem)',
              marginInlineEnd: '1.5rem'
            }}
          >
            <Droppable droppableId={index}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {boardData.map((task, index) => (
                    <Draggable key={task?._id} draggableId={task?._id.toString()} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <KanbanContacts
                            key={task?._id}
                            task={task}
                            // toggleSidebar={toggleSidebar}
                            index={index}
                            labelColors={labelColors}
                            handleTaskSidebarToggle={handleTaskSidebarToggle}
                            isDragging={snapshot.isDragging}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {showAddTask === null || (showAddTask !== null && showAddTask !== board.id) ? (
                    <div className="task">
                      <Button
                        className="mt-1"
                        size="sm"
                        color="flat-secondary"
                        style={{ width: '100%' }}
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(selectContactAction({}));
                          toggleSidebar();
                        }}
                      >
                        <Plus size={14} className="me-25" />
                        <span className="align-middle">Add New Lead</span>
                      </Button>
                    </div>
                  ) : (
                    renderAddTaskForm()
                  )}
                </div>
              )}
            </Droppable>
          </div>
        </div>
        {/* </ReactSortable> */}
      </div>
      <Sidebar
        store={totalContactStore}
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        setSidebarOpen={setSidebarOpen}
        tableData={store}
        leadStore={leadStore}
        contactTypeTitle={contactTypeTitle}
        orderContactType={2}
      />
    </Fragment>
  );
};

export default KanbanBoards;
