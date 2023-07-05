import { useState, useEffect, useCallback } from 'react';
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Home,
  MoreVertical,
  Edit,
  Trash,
  Layers
} from 'react-feather';
import { useForm, Controller } from 'react-hook-form';
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Form,
  FormText,
  FormFeedback,
  ListGroup,
  ListGroupItem,
  UncontrolledDropdown
} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import { deleteJournalCategory } from '../../../../requests/myJournal/getMyJournal';

const DeleteConfirmModal = (props) => {
  const { showConfirmationModal, setShowConfirmationModal, setDeleteId, setSideBarUpdateData } =
    props;

  const handleDeleteConfirmation = () => {
    deleteJournalCategory(deleteId);
    setDeleteId(null);
    setShowConfirmationModal(false);
    setSideBarUpdateData(true);
    toast.success('Journal category deleted successfully!');
  };
  return (
    <Modal isOpen={showConfirmationModal} toggle={() => setShowConfirmationModal(false)} centered>
      <ModalHeader>Delete Confirmation</ModalHeader>
      <ModalBody>
        <div className="alert alert-danger p-2">
          {'Are you sure you want to delete the Journal Category?'}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" outline onClick={() => setShowConfirmationModal(false)}>
          No
        </Button>
        <Button color="primary" outline onClick={handleDeleteConfirmation}>
          Yes
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteConfirmModal;
