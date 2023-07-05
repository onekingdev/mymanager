// ** React Imports
import { useEffect, useState } from 'react';

// ** Third Party Imports
import { Plus } from 'react-feather';
import { useForm } from 'react-hook-form';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Swal from 'sweetalert2';
import { ReactSortable } from 'react-sortablejs';

// ** Reactstrap Imports
import { Button, Dropdown, DropdownItem, DropdownMenu, Fade, Input } from 'reactstrap';

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux';

import KanbanBoards from './KanbanBoards';
import AddNewTagModal from '../../tags/AddNewTagModal';
import { belongsToIngerval } from '../utility';
import AddLeadType from './AddLeadType';
import Sidebar from '../Sidebar';
import AddNewStage from './AddNewStage';
import { deleteContactAction, updateContactAction, reorderStageAction } from '../../store/actions';
import celebrateGIF from '@src/assets/images/lead-stage/celebrate.gif';
import winGIF from '@src/assets/images/lead-stage/win.gif';
import lostGIF from '@src/assets/images/lead-stage/lost.gif';
import { BiPlus } from 'react-icons/bi';
import { GoPlus } from 'react-icons/go';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { MdOutlineSwitchAccount } from 'react-icons/md';
import KanbanStage from './KanbanStage';
// ** Styles

const defaultValues = {
  boardTitle: ''
};

const labelColors = {
  App: 'info',
  UX: 'success',
  Images: 'warning',
  Forms: 'success',
  'Code Review': 'danger',
  'Charts & Maps': 'primary'
};

const footerRemove = 'remove',
  footerMove = 'move';

const KanbanBoard = (props) => {
  // ** States
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

  const orderContactType = store?.contactTypeList?.map((x) => x._id)?.indexOf(contactTypeId);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isStageManagementOpen, setIsStageManagementOpen] = useState(false);
  const [stages, setStages] = useState(
    store?.stages?.map((x) => ({ id: x._id, title: x.value, color: x.color }))
  );

  const [sortedStages, setSortedStages] = useState(
    [...stages]
      .filter((stage) => stage.title !== 'WIN' && stage.title !== 'LOST')
      .sort((a, b) => {
        return a.order < b.order;
      })
  );

  const [itemDragging, setItemDragging] = useState(false); // dragging flag
  const [moveMenuOpen, setMoveMenuOpen] = useState(null); // contactId to move other contact type

  const [partContacts, setPartContacts] = useState(
    store?.contactList?.list?.filter((x) => x.contactType.indexOf(contactTypeId) > -1)
  );
  const [openNewTag, setOpenNewTag] = useState(false);

  const [celebrateGIFShow, setCelebrateGIFShow] = useState(false);
  const [winGIFShow, setWinGIFShow] = useState(false);
  const [lostGIFShow, setLostGIFShow] = useState(false);

  const loseId = stages.find((x) => x.title.toLowerCase() == 'lost')?.title;
  const winId = stages.find((x) => x.title.toLowerCase() == 'win')?.title;

  const toggleNewTag = () => setOpenNewTag(!openNewTag);

  // ** useEffect
  useEffect(() => {
    setPartContacts(
      store?.contactList?.list?.filter((x) => x.contactType.indexOf(contactTypeId) > -1)
    );
    setStages(store?.stages?.map((x) => ({ id: x._id, title: x.value, color: x.color })));
  }, [store]);

  useEffect(() => {
    if (
      orderContactType == 2 &&
      selectedStage?.stage?.value.toLowerCase() !== 'win' &&
      selectedStage?.stage?.value.toLowerCase() !== 'lost'
    ) {
      setPartContacts(
        store?.contactList?.list?.filter(
          (x) =>
            x?.contactType.indexOf(contactTypeId) > -1 &&
            belongsToIngerval(activeSidebar, x?.updatedAt) &&
            (selectedLeadSource?.value ? x?.leadSource == selectedLeadSource?.value : true) &&
            (selectedStage?.stage?.value ? x.stage == selectedStage?.stage?.value : true)
        )
        // ?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
      );
    } else {
      setPartContacts(
        store?.contactList?.list?.filter(
          (x) =>
            x?.contactType.indexOf(contactTypeId) > -1 &&
            belongsToIngerval(activeSidebar, x?.updatedAt)
        )
      );
    }
  }, [store, activeSidebar, selectedLeadSource, selectedStage]);

  useEffect(() => {
    setSortedStages(
      [...stages]
        .filter((stage) => stage.title !== 'WIN' && stage.title !== 'LOST')
        .sort((a, b) => {
          return a.order < b.order;
        })
    );
  }, [stages]);

  // ** Hooks
  const dispatch = useDispatch();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  const handleTaskSidebarToggle = () => setSidebarOpen(!sidebarOpen);

  console.log('sortedStages', sortedStages);

  const renderHeaders = () => {
    return (
      <div className="header-wrapper">
        <ReactSortable
          className="sortable-header"
          list={sortedStages}
          group="shared-group"
          setList={setSortedStages}
          onEnd={handleSortableEnd}
        >
          {sortedStages.map((stage) => (
            <KanbanStage stage={stage} store={partContacts} />
          ))}
        </ReactSortable>
        <div className="add-stage-lead-contact d-flex align-items-center">
          <Button
            className="btn-icon btn btn-flat-dark float-end"
            color="flat-dark"
            outline
            style={{
              cursor: 'pointer',
              position: 'relative',
              borderRadius: '50%',
              padding: '0.4rem'
            }}
            onClick={handleOpen}
          >
            <BsPlusCircleDotted size={24} />
          </Button>
        </div>
      </div>
    );
  };

  const renderBoards = () => {
    return sortedStages.map((stage, index) => {
      const isLastBoard = sortedStages[sortedStages.length - 1].id === stage.id;
      return stage.title.toLowerCase() == 'lost' || stage.title.toLowerCase() == 'win' ? null : (
        <KanbanBoards
          // toggleSidebar={toggleSidebar}
          store={partContacts}
          board={stage}
          labelColors={labelColors}
          isLastBoard={isLastBoard}
          key={`${stage.id}-${index}`}
          index={stage.title}
          handleTaskSidebarToggle={handleTaskSidebarToggle}
          contactTypeTitle={contactTypeTitle}
          leadStore={leadStore}
          itemDragging={itemDragging}
        />
      );
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSortableEnd = (event) => {
    const { oldIndex, newIndex } = event;
    if (oldIndex == newIndex) {
      return;
    }
    dispatch(reorderStageAction(oldIndex, newIndex));
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const MoveTaskToAnotherBoard = (contactId, stageId) => {
    const currentContact = partContacts.filter((x) => x._id == contactId)[0];
    const tmpContact = {
      ...currentContact,
      stage: stageId
    };
    if (currentContact.stage == stageId) {
      setItemDragging(false);
      return;
    }
    dispatch(updateContactAction(tmpContact)).then((res) => {
      if (res.status) {
        if (stageId.toLowerCase() == 'win') {
          setCelebrateGIFShow(true);
          setTimeout(() => {
            setWinGIFShow(true);
            setCelebrateGIFShow(false);
          }, 1700);
          setTimeout(() => {
            setWinGIFShow(false);
            setItemDragging(false);
          }, 5200);
        } else if (stageId.toLowerCase() == 'lost') {
          setLostGIFShow(true);
          setTimeout(() => {
            setLostGIFShow(false);
            setItemDragging(false);
          }, 5500);
        }
      } else {
        setItemDragging(false);
      }
    });
  };

  const handleOnDragStart = (result) => {
    if (result?.draggableId) {
      setItemDragging(true);
    }
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      setItemDragging(false);
      return; // Drop outside a droppable area
    }
    const contactId = result?.draggableId;
    const stageId = result?.destination?.droppableId;
    // console.log(result, contactId, stageId);
    if (stageId == footerRemove) {
      Swal.fire({
        title: 'Delete Contact',
        text: `Are you sure to delete this contact?`,
        icon: 'question',
        confirmButtonText: 'Delete',
        confirmButtonColor: '#d33',

        showCancelButton: true,
        cancelButtonText: 'Cancel',
        cancelButtonColor: '#3085d6',

        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-danger ms-1'
        },
        buttonsStyling: false
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteContactAction([contactId]));
        }
      });
      setItemDragging(false);
    } else if (stageId == footerMove) {
      setMoveMenuOpen(contactId);
      // setItemDragging(false);
    } else {
      MoveTaskToAnotherBoard(contactId, stageId);
      setItemDragging(false);
    }
  };

  const handleMoveContactClick = (moveToContactTypeId) => {
    const selectedContact = store?.contactList?.list?.find((x) => x._id == moveMenuOpen);
    const tmpContact = {
      ...selectedContact,
      contactType: [
        ...selectedContact?.contactType.filter((x) => x !== contactTypeId),
        moveToContactTypeId
      ]
    };
    dispatch(updateContactAction(tmpContact));
  };

  const handleMenuToggle = () => {
    setMoveMenuOpen(null);
    setItemDragging(false);
  };

  return stages.length ? (
    <div className="app-kanban-wrapper">
      {renderHeaders()}
      <DragDropContext onDragStart={handleOnDragStart} onDragEnd={handleOnDragEnd}>
        <div
          className="d-flex m-0"
          style={{
            height: 'calc(100% - 136px)'
          }}
        >
          <div
            className="d-flex m-0"
            style={{
              height: 'calc(100vh - 34.1rem)',
              width: '100%'
              // overflowY: 'hidden',
              // overflowX: itemDragging ? 'hidden' : 'auto'
              // zIndex: 4
            }}
          >
            {renderBoards()}
          </div>
        </div>
        {(celebrateGIFShow || winGIFShow || lostGIFShow) && (
          <Fade in={celebrateGIFShow || winGIFShow || lostGIFShow}>
            <div className="win-lost-animation-area">
              {celebrateGIFShow && (
                <>
                  <h2 className="mb-2">
                    Winner Winner Chicken Dinner! You are doing great! <br /> Keep it going! One
                    step closer to your goal!
                  </h2>
                  <img src={celebrateGIF} width={400} height={400} />
                </>
              )}
              {winGIFShow && (
                <>
                  <h2 className="mb-2">
                    Winner Winner Chicken Dinner! You are doing great! <br /> Keep it going! One
                    step closer to your goal!
                  </h2>
                  <img src={winGIF} width={400} height={400} />
                </>
              )}
              {lostGIFShow && (
                <>
                  <h2 className="mb-2">
                    Stop losing leads! Following up is the key to success! <br /> Lead lost? Fill up
                    your pipeline with more convert!
                  </h2>
                  <img src={lostGIF} width={400} height={400} />
                </>
              )}
            </div>
          </Fade>
        )}
        {
          <Fade
            in={itemDragging}
            // style={{ bottom: itemDragging ? '0px' : '10px', position: 'relative' }}
          >
            <div className="lead-footer">
              <Droppable droppableId={footerRemove}>
                {(provided, snapshot) => (
                  <div
                    className="droppable-area"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={
                      snapshot.isDraggingOver
                        ? {
                            backgroundColor: '#f0f0f0',
                            border: '2px solid #f0f0f0',
                            color: '#525252'
                          }
                        : {}
                    }
                  >
                    {/* {provided.placeholder} */}
                    <div>{'DELETE'}</div>
                  </div>
                )}
              </Droppable>
              <Droppable droppableId={loseId || 'lose'}>
                {(provided, snapshot) => (
                  <div
                    className="droppable-lose"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={
                      snapshot.isDraggingOver
                        ? {
                            backgroundColor: '#ea5455',
                            border: '2px solid #ea5455',
                            color: '#ffffff'
                          }
                        : {}
                    }
                  >
                    {/* {provided.placeholder} */}
                    <div>{'LOST'}</div>
                  </div>
                )}
              </Droppable>
              <Droppable droppableId={winId || 'win'}>
                {(provided, snapshot) => (
                  <div
                    className="droppable-win"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={
                      snapshot.isDraggingOver
                        ? {
                            backgroundColor: '#28c76f',
                            border: '2px solid #28c76f',
                            color: '#ffffff'
                          }
                        : {}
                    }
                  >
                    {/* {provided.placeholder} */}
                    <div>{'WIN'}</div>
                  </div>
                )}
              </Droppable>
              <Droppable droppableId={footerMove}>
                {(provided, snapshot) => (
                  <div
                    className="droppable-area"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={
                      snapshot.isDraggingOver
                        ? {
                            backgroundColor: '#f0f0f0',
                            border: '2px solid #f0f0f0',
                            color: '#525252'
                          }
                        : {}
                    }
                  >
                    <div>{'MOVE'}</div>
                    <Dropdown
                      isOpen={moveMenuOpen ? true : false}
                      toggle={handleMenuToggle}
                      style={{ marginTop: '-220px' }}
                    >
                      <DropdownMenu>
                        {store?.contactTypeList?.map((x) =>
                          x?._id == contactTypeId || x?.name == 'Member' ? null : (
                            <DropdownItem
                              key={x?._id}
                              id={x?._id}
                              tag={'span'}
                              className="w-100"
                              onClick={(e) => {
                                e.preventDefault();
                                handleMoveContactClick(e.target.id);
                              }}
                            >
                              {x?.name}
                            </DropdownItem>
                          )
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                )}
              </Droppable>
            </div>
          </Fade>
        }
      </DragDropContext>

      {store && store.tags && (
        <AddNewTagModal open={openNewTag} store={store} dispatch={dispatch} toggle={toggleNewTag} />
      )}

      <Sidebar
        store={store}
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        setSidebarOpen={setSidebarOpen}
        tableData={store}
        leadStore={leadStore}
        contactTypeTitle={contactTypeTitle}
        orderContactType={2}
      />
      <AddNewStage
        modalType={isStageManagementOpen}
        setModalType={setIsStageManagementOpen}
        leadStore={leadStore}
      />
      {isOpen && (
        <AddLeadType
          isOpen={isOpen} //
          setIsOpen={setIsOpen} //
          setIsStageManagementOpen={setIsStageManagementOpen} //
          toggleSidebar={toggleSidebar} //
        />
      )}
    </div>
  ) : null;
};

export default KanbanBoard;
