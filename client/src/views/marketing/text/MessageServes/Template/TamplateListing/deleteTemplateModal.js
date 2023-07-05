import React, { memo } from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import { deleteTemplate } from '../../../../../apps/text/store';
import { useDispatch } from 'react-redux';
const DeleteTemplateModal = (props) => {
  const { selectedTemplate, deleteToggle, isDeleteOpen, activeMainFolder, activeSubMainFolder } =
    props;

  const dispatch = useDispatch();

  const handleDeleteTemplate = () => {
    dispatch(
      deleteTemplate({
        templateId: selectedTemplate._id,
        folderId: activeMainFolder._id,
        subfolderId: activeSubMainFolder?._id
      })
    );
    deleteToggle();
  };
  return (
    <Modal toggle={deleteToggle} centered isOpen={isDeleteOpen}>
      <ModalBody>
        <div>
          <h3>Are you sure to Delete ?</h3>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button size="sm" onClick={(e) => deleteToggle()}>
          No
        </Button>
        <Button
          // disabled={deleteLoading}
          size="sm"
          color="primary"
          onClick={() => {
            handleDeleteTemplate();
          }}
        >
          Yes
        </Button>{' '}
      </ModalFooter>
    </Modal>
  );
};
export default memo(DeleteTemplateModal);
