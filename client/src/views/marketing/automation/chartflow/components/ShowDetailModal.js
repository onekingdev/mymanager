import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { initDetailId, setUpdateActions, setEditActionId, setEditActionType } from '../../store/actions';
import AddNotification from './addNewSideBars/AddNotification'
import { data } from 'jquery';
const ShowDetailModal = (props) => {

  const actionId = props.actionId;
  const [action, setAction] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const selectedAutomation = useSelector(state => state.automation.selectedAutomation)
  const dispatch = useDispatch();
  const toggleModal = (id) => {
    dispatch(initDetailId())
  };

  const toggleSidebar = () => setOpenModal(!openModal);

  useEffect(() => {
    const currentAction = selectedAutomation.actions.find(item => item.id == actionId)
    setAction(currentAction)
  }, [actionId])

  const deleteAction = (id) => {
    let updatedActions = selectedAutomation.actions.filter(item => item.id != id);
    let _data = [];

    updatedActions.map(item => {
      if (item.parentId == action.id) {
        item = { ...item, parentId: action.parentId }
      }
      _data.push(item)
    })

    if (action.isLast) {
      let lastActionIndex = _data.findIndex(item => item.id == action.parentId)
      let lastAction = _data.find(item => item.id == action.parentId)
      lastAction = { ...lastAction, isLast: true }
      _data[lastActionIndex] = lastAction
    }
    dispatch(setUpdateActions(_data))
  }

  const editAction = (id) => {
    setOpenModal(true);
    dispatch(setEditActionType(action.actionType))
    dispatch(setEditActionId(id));
  }


  return (
    <div>
      <Modal
        isOpen={actionId != ''}
        toggle={() => toggleModal(actionId)}
        className='modal-dialog-centered'
        modalClassName='primary'
        key={actionId}
      >
        {actionId != '' && action != null && <><ModalHeader toggle={() => toggleModal(actionId)}>{action.actionType.toUpperCase()}</ModalHeader>
          <ModalBody>
            <div className='mt-1'>
              <span>
                Type: <b>{action.actionType}</b>
              </span>
            </div>
            {action.actionType == 'email' && <div className='mt-1'>
              <span>
                Title: <b>{action.subject}</b>
              </span>
            </div>}
            {action.actionType == "notification" &&
              <>
                <div className='mt-1'>
                  <span>
                    Method: <b>{action.method}</b>
                  </span>
                </div>
                <div className='mt-1'>
                  <span>
                    TO: <b>{action.to.type}</b>
                  </span>
                </div>
              </>
            }

            {
              action.actionType == 'automation' &&
              <div className='mt-1'>
                <span>
                  Automation Name: <b>{action.automationName.value}</b>
                </span>
              </div>
            }
            <div className='mt-1'>
              <span>
                TimeDelay: <b>{action.duration.time} {action.duration.unit}</b>
              </span>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' outline onClick={() => toggleModal(actionId)}>
              Cancel
            </Button>
            <Button color='success' outline onClick={() => deleteAction(actionId)}>
              Delete
            </Button>
            <Button color='info' outline onClick={() => editAction(actionId)}>
              Edit
            </Button>
          </ModalFooter>
        </>}

      </Modal>
    </div>
  )

}

export default ShowDetailModal;