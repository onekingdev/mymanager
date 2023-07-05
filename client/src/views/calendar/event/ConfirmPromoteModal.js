import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { confirm } from 'react-confirm-box';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { contactRankListAction } from '../../contacts/store/actions';
import * as api from '../../contacts/store/api';
function ConfirmPromoteModal({
  toggle,
  confirmPromoteModal,
  isBulk,
  stepper,
  promoteBulk,
  promoteSingle,
  setPendingSign,
  setToggleClearRows,
  toggledClearRows
}) {
  const dispatch = useDispatch();

  const handlePromoteClick = () => {
    if (isBulk) {
      if (promoteBulk?.clientProgressions?.length) {
        setPendingSign(true);
        api
          .promoteClientProgressionFromEventApi(promoteBulk)
          .then((value) => {
            if (value?.data?.updatedClientRanks?.length > 0) {
              setPendingSign(false);
              try {
                dispatch(contactRankListAction());
              } catch (err) {}
              toast.success('Client is promoted');
            } else {
              setPendingSign(false);
              dispatch(contactRankListAction());
              toast.error('Sorry! There is no rank in this category');
            }
          })
          .catch((err) => {
            setPendingSign(false);
            dispatch(contactRankListAction());
    
            toast.error('Something went wrong');
          });
      } else {
        toast.error('There are no promotable contacts');
      }
      setToggleClearRows(!toggledClearRows);
      toggle();
    } else {
      if (
        promoteSingle?.clientProgressions?.length > 0 &&
        promoteSingle.clientProgressions[0].contactId
      ) {
        api
          .promoteClientProgressionFromEventApi(promoteSingle)
          .then((value) => {
            if (value?.data?.updatedClientRanks?.length > 0) {
              setPendingSign(false);
              try {
                dispatch(contactRankListAction());
              } catch (err) {}
              toast.success('Client is promoted');
            } else {
              setPendingSign(false);
              dispatch(contactRankListAction());
              toast.error('Sorry! There is no rank in this category');
            }
            setToggleClearRows(!toggledClearRows);
            toggle();
          })
          .catch((err) => {
            setPendingSign(false);
            dispatch(contactRankListAction());

            toast.error('Something went wrong');
          });
      } else {
        toast.error('There are no promotable contacts');
      }
      toggle();
    }
    if (stepper) stepper.next();
  };
  return (
    <Modal isOpen={confirmPromoteModal} toggle={toggle} size="sm" centered>
      <ModalBody>
        <div>
          <h3 className="mb-0 fw-bolder">
            {stepper
              ? 'Are you sure you want to promote all possible contacts?'
              : 'Are you sure you want to promote selected contacts?'}
          </h3>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          size="sm"
          onClick={() => {
            toggle();
          }}
        >
          No
        </Button>
        <Button
          size="sm"
          color="primary"
          onClick={() => {
            handlePromoteClick();
          }}
        >
          Yes
        </Button>{' '}
      </ModalFooter>
    </Modal>
  );
}

export default ConfirmPromoteModal;
