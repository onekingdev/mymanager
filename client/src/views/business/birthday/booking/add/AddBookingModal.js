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

const AddBookingModal = ({ setAddBooking, addBooking, row }) => {
  const toggleAddModal = (e) => {
    setAddBooking(!addBooking);
  };
  return (
    <Modal
      isOpen={addBooking}
      toggle={toggleAddModal}
      className="modal-dialog-centered ecommerce-application"
      size="lg"
      style={{ maxWidth: '1000px' }}
    >
      <WizardModernVertical setAddBooking={setAddBooking} row={row} />
    </Modal>
  );
};

export default AddBookingModal;
