import { useState } from 'react';

import {
  Button,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import Select, { components } from 'react-select'; //eslint-disable-line

import { addBoard, addTask, deleteTask } from '../apps/kanban/store';

import { selectThemeColors } from '@utils';
import { useSelector } from 'react-redux';
import { deleteWorkspace } from '../apps/workspace/store';

const headerTxt = {
  addBoard: 'Create A New Status',
  addTask: 'Create A New Task',
  deleteTask: 'Delete Task',
  deleteWorkspace: 'Delete Workspace'
};

const bodyTxt = {
  addBoard: 'Status Name',
  addTask: 'Task Title',
  deleteTask: 'Really delete the task(s)?',
  deleteWorkspace: 'Really delete this workspace?'
};

const confirmBtnTxt = {
  addBoard: 'Create',
  addTask: 'Create',
  deleteTask: 'Delete',
  deleteWorkspace: 'Delete'
};

const NewModal = (props) => {
  const {
    store,
    dispatch,
    modalType,
    deleteTaskArr,
    setDeleteTaskArr,
    setModalType,
    deleteWorkspace
  } = props;
  const { tasks, boards } = useSelector((state) => state.workspace);

  const [createNewValidation, setCreateNewValidation] = useState(true);
  const [modalOpen, setModalOpen] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [boardId, setBoardId] = useState(null);

  const handleInputTitle = (e) => {
    e.preventDefault();
    const inputTxt = e.target.value;
    setNewTitle(inputTxt);
    switch (modalType) {
      case 'addStatus':
        setCreateNewValidation(
          boards.filter((x) => x.title.toLowerCase() == inputTxt.toLowerCase())?.length == 0
        );
        break;
      case 'addTask':
        setCreateNewValidation(
          tasks.filter((x) => x.title.toLowerCase() == inputTxt.toLowerCase())?.length == 0
        );
        break;
      case 3:
        break;
      case 4:
        break;
      default:
        break;
    }
  };

  const confirmBtnClicked = () => {
    switch (modalType) {
      case 'addStatus':
        dispatch(
          addBoard({
            title: newTitle,
            id: newTitle.toLowerCase().replace(/ /g, '-'),
            workspaceId: store.selectedWorkspace._id
          })
        );
        break;
      case 'addTask':
        if (boardId) {
          dispatch(
            addTask({
              title: newTitle,
              boardId: boardId.value,
              workspaceId: store.selectedWorkspace._id
            })
          );
        } else {
          setCreateNewValidation(false);
          return;
        }
        break;
      case 'deleteTask':
        dispatch(
          deleteTask({
            tasks: deleteTaskArr,
            workspaceId: store.selectedWorkspace._id
          })
        );
        setDeleteTaskArr([]);
        break;
      case 'deleteWorkspace':
        dispatch(deleteWorkspace({ id: store.selectedWorkspace._id }));
        break;
      default:
        break;
    }
    setModalType(null);
  };

  const cancleBtnClicked = () => {
    setCreateNewValidation(true);
    setModalType(null);
  };

  const BoardComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          <p className="mb-0">{data.label}</p>
        </div>
      </components.Option>
    );
  };

  const boardOptions = store.boards.map((x) => {
    return { value: x._id, label: x.title };
  });

  return (
    <Modal isOpen={modalType} toggle={() => cancleBtnClicked()} className="modal-dialog-centered">
      <ModalHeader toggle={() => cancleBtnClicked()}>{headerTxt[modalType]}</ModalHeader>
      <ModalBody>
        <div>
          <Label>{bodyTxt[modalType]}</Label>

          {modalType == 'deleteWorkspace' ? null : modalType == 'deleteTask' ? (
            deleteTaskArr.map((x) => {
              return (
                <div>
                  <Label> - {x.title}</Label>
                </div>
              );
            })
          ) : (
            <Input
              type="text"
              id={`newModal${modalType}`}
              name={`newModal${modalType}`}
              placeholder=""
              onChange={handleInputTitle}
              valid={createNewValidation}
              invalid={!createNewValidation}
            />
          )}
          {modalType == 'addTask' ? (
            <div>
              <Label className="mt-1">Select Status</Label>
              <Select
                id="board-title"
                value={boardId}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={boardOptions}
                theme={selectThemeColors}
                onChange={(data) => {
                  setBoardId(data);
                  setCreateNewValidation(true);
                }}
                components={{ Option: BoardComponent }}
                valid={createNewValidation && newTitle !== ''}
                invalid={!createNewValidation}
              />
            </div>
          ) : null}
          <FormFeedback valid={createNewValidation}>
            {createNewValidation
              ? 'Sweet! That name is available.'
              : 'Oh no! Please input correct data.'}
          </FormFeedback>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={confirmBtnClicked}
          disabled={modalType && modalType.includes('add') && (!createNewValidation || !newTitle)}
        >
          {confirmBtnTxt[modalType]}
        </Button>
        <Button color="secondary" onClick={cancleBtnClicked}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default NewModal;
