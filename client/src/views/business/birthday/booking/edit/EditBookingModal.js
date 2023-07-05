// ** React Imports
import { Fragment } from 'react';
import {
  Col,
  FormFeedback,
  Input,
  Label,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  Button
} from 'reactstrap';
import '@styles/base/pages/app-ecommerce.scss';
// ** Components
import WizardModernVertical from './WizardModernVertical';

const EditBookingModal = ({ setEditBooking, editBooking, eventInfo }) => {
  const toggleEditModal = (e) => {
    setEditBooking(!editBooking);
  };
  return (
    <Modal
      isOpen={editBooking}
      toggle={toggleEditModal}
      className="modal-dialog-centered ecommerce-application"
      size="lg"
      style={{ maxWidth: '1000px' }}
    >
      <WizardModernVertical eventInfo={eventInfo} setEditBooking={setEditBooking} />
    </Modal>
  );
};

export default EditBookingModal;
