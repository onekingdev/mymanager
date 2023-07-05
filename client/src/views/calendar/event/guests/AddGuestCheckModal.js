import React, { useState, useRef, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { customInterIceptors } from '../../../../lib/AxiosProvider';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Table,
  Form
} from 'reactstrap';

import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getEventInfo } from '../store';
import useMessage from '../../../../lib/useMessage';
import GuestsModalTableRow from './GuestsModalTableRow';
import { removeAllGuests } from '../store';
import { remove } from 'firebase/database';

const AddGuestCheckModal = ({ modal, setModal, toggle, guestsData, setGuestsData }) => {
  const API = customInterIceptors();
  const eventId = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSendEmail, setIsSendEmail] = useState(false);

  const handleCheck = (e) => {
    setIsSendEmail(!isSendEmail);
  };
  const addGuests = async () => {
    if (guestsData.length == 0) {
      toast.error('Select Guests!');
    } else {
      let payload = guestsData.map((guest) => {
        return { id: guest.id, email: guest.email };
      });
      const response = await API.post(`event/add-guests`, {
        data: payload,
        _id: eventId.eventId,
        sendEmailChecked: isSendEmail
      }).catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });

      if (response.status == 404) {
        toast.error(response.data.msg);
      }

      if (response.status == 200) {
        toast.success('OK! Guests added successfully');
        history.push(`/event-details/${eventId.eventId}`);
      }
    }
    dispatch(removeAllGuests());
    setGuestsData([]);
  };

  return (
    <form>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Invitation</ModalHeader>
        <ModalBody>
          <div>
            <Form onSubmit={(e) => e.preventDefault()}>
              <h6 className="form-label mt-2 mb-2" for="position">
                Contacts below will be invited to attend this event.
              </h6>
              {guestsData.map((guest, index) => {
                return <GuestsModalTableRow guest={guest} />;
              })}
            </Form>
            <div className="d-flex align-items-centers pt-1">
              <Input type="checkbox" name="isSendEmail" onChange={handleCheck} />
              <span className="ms-1">Send email invitation</span>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={addGuests}>
            Add Guests
          </Button>
        </ModalFooter>
      </Modal>
    </form>
  );
};

export default AddGuestCheckModal;
