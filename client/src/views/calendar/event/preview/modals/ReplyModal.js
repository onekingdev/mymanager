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
// ** Components
import WizardModernHorizontal from './WizardModernHorizontal';

const ReplyModal = ({ setReplyModal, replyModal, eventInfo, contactEmail, contactId }) => {
  const toggleReplyModal = (e) => {
    setReplyModal(!replyModal);
  };
  return (
    <Modal
      isOpen={replyModal}
      toggle={toggleReplyModal}
      className="modal-dialog-centered"
      size="lg"
      style={{ maxWidth: '1000px' }}
    >
      <WizardModernHorizontal
        eventInfo={eventInfo}
        setReplyModal={setReplyModal}
        contactEmail={contactEmail}
        contactId={contactId}
      />
    </Modal>
  );
};

export default ReplyModal;
