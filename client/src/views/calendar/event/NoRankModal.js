import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const NoRankModal = ({ toggle, noRankModal }) => {
  const history = useHistory();
  const handleYesClick = () => {
    history.push('/setting/4');
  };
  return (
    <Modal isOpen={noRankModal} toggle={toggle} size="sm" centered>
      <ModalBody>
        <div className="fw-bolder">
          <h3 className="mb-0">There is no available rank in that category.</h3>
          <h3>Do you want to create ranks?</h3>
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
            handleYesClick();
          }}
        >
          Yes
        </Button>{' '}
      </ModalFooter>
    </Modal>
  );
};

export default NoRankModal;
