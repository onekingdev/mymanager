import React, { useEffect, useMemo, useState } from 'react';
import { UserX, UserCheck, ArrowLeft, ArrowRight } from 'react-feather';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input, Button } from 'reactstrap';
import { replyToEvent, getEventInfo } from '../../../store';
import { toCapitalize } from '../../../../../../utility/Utils';

import classnames from 'classnames';

const Rsvp = (props) => {
  const dispatch = useDispatch();

  const { stepper, replyContact, eventInfo, setReplyModal, contactEmail, contactId } = props;

  // ** State
  const [decision, setDecision] = useState(true);

  // ** Handlers
  const handleDecisionClick = (e) => {
    if (e.target.value) {
      setDecision(e.target.value);
    } else return;
  };
  const handleReplyClick = async () => {
    if (eventInfo.type == 'Public') {
      if (!replyContact?.email) {
        toast.error('You should fill out the form to reply');
        stepper.previous();
        return;
      }

      const res = await dispatch(
        replyToEvent({
          contactIdArr: [replyContact._id],
          eventId: eventInfo._id,
          status: decision
        })
      );
      if (res.payload) {
        toast.success('You successfully reply to this event');
      } else {
        toast.error('Something went wrong, please try again');
      }
    } else {
      if (!contactEmail) {
        toast.error('You are not invitee of this event');
        return;
      }
      const res = await dispatch(
        replyToEvent({
          contactIdArr: [contactId],
          eventId: eventInfo._id,
          status: decision
        })
      );
      if (res.payload || contactEmail == 'admin@private.com') {
        toast.success('You successfully reply to this event');
      } else {
        toast.error('Something went wrong, please try again');
      }
    }
    setReplyModal(false);
  };
  return (
    <>
      <div className="text-center">
        <h4 className="font-large-1 mb-50 text-white bg-primary py-50">
          To {toCapitalize(eventInfo.title)}
        </h4>
        <h6 className="mb-1">Confirm your decision</h6>
      </div>
      <div onClick={(e) => handleDecisionClick(e)}>
        <div className="mb-50">
          <Input type="radio" value={'going'} checked={decision == 'going'} />
          <span className="font-medium-1 ms-1">Yes, I will go</span>
        </div>
        <div className="mb-50">
          <Input type="radio" value={'notgoing'} checked={decision == 'notgoing'} />
          <span className="font-medium-1 ms-1">No, I won't go</span>
        </div>
        <div className="mb-2">
          <Input type="radio" value={'maybe'} checked={decision == 'maybe'} />
          <span className="font-medium-1 ms-1">Maybe, I will decide later</span>
        </div>
      </div>

      <div
        className="d-flex"
        style={
          eventInfo.type == 'Public'
            ? { justifyContent: 'space-between' }
            : { justifyContent: 'end' }
        }
      >
        {eventInfo.type == 'Public' && (
          <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
        )}
        <Button color="primary" className="btn-next" onClick={() => handleReplyClick()}>
          <span className="align-middle d-sm-inline-block d-none">Reply</span>
        </Button>
      </div>
    </>
  );
};
export default Rsvp;
