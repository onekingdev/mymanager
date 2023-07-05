// ** React Imports
import { useRef, useState, useEffect } from 'react';

// ** Custom Components
import Wizard from '@components/wizard';

// ** Steps
import GetTicket from './steps/GetTicket';
import Register from './steps/Register';
import Rsvp from './steps/Rsvp';

// ** Icons Imports
import { Clipboard, User, Flag } from 'react-feather';

const WizardModernHorizontal = (props) => {
  const { eventInfo, setReplyModal, contactEmail, contactId } = props;
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);
  const [replyContact, setReplyContact] = useState(null);

  let steps = [];

  if (eventInfo.type == 'Public' || contactEmail == 'admin@private.com') {
    if (eventInfo.checkoutType != 'none') {
      steps = [
        {
          id: 'register',
          title: 'Register',
          subtitle: 'Register To Event',
          icon: <User size={18} />,
          content: (
            <Register
              eventInfo={eventInfo}
              replyContact={replyContact}
              setReplyContact={setReplyContact}
              stepper={stepper}
              type="modern-horizontal"
            />
          )
        },
        {
          id: 'ticket',
          title: 'Ticket',
          subtitle: 'Get Ticket',
          icon: <Clipboard size={18} />,
          content: (
            <GetTicket
              customerId={contactId ? contactId : replyContact?._id}
              stepper={stepper}
              eventInfo={eventInfo}
              setReplyModal={setReplyModal}
              type="modern-horizontal"
            />
          )
        }
      ];
    } else {
      steps = [
        {
          id: 'register',
          title: 'Register',
          subtitle: 'Register To Event',
          icon: <User size={18} />,
          content: (
            <Register
              eventInfo={eventInfo}
              replyContact={replyContact}
              setReplyContact={setReplyContact}
              stepper={stepper}
              type="modern-horizontal"
            />
          )
        },
        {
          id: 'rsvp',
          title: 'RSVP',
          subtitle: 'RSVP Now',
          icon: <Flag size={18} />,
          content: (
            <Rsvp
              replyContact={replyContact}
              stepper={stepper}
              eventInfo={eventInfo}
              setReplyModal={setReplyModal}
              type="modern-horizontal"
            />
          )
        }
      ];
    }
  } else {
    if (eventInfo.checkoutType != 'none') {
      steps = [
        {
          id: 'ticket',
          title: 'Ticket',
          subtitle: 'Get Ticket',
          icon: <Clipboard size={18} />,
          content: (
            <GetTicket
              stepper={stepper}
              eventInfo={eventInfo}
              setReplyModal={setReplyModal}
              customerId={contactId ? contactId : replyContact._id}
              type="modern-horizontal"
            />
          )
        }
      ];
    } else {
      steps = [
        {
          id: 'rsvp',
          title: 'RSVP',
          subtitle: 'RSVP Now',
          icon: <Flag size={18} />,
          content: (
            <Rsvp
              replyContact={replyContact}
              stepper={stepper}
              setReplyModal={setReplyModal}
              eventInfo={eventInfo}
              contactEmail={contactEmail}
              contactId={contactId}
              type="modern-horizontal"
            />
          )
        }
      ];
    }
  }

  return (
    <div className="modern-horizontal-wizard reply-stepper">
      <Wizard
        type="modern-horizontal"
        ref={ref}
        steps={steps}
        options={{
          linear: false
        }}
        instance={(el) => setStepper(el)}
      />
    </div>
  );
};

export default WizardModernHorizontal;
