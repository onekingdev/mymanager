// ** React Imports
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// ** Custom Components
import Wizard from '@components/wizard';

// ** Steps
import Title from './steps/Title';
import Banner from '../../../../calendar/event/edit/steps/Banner';
import Host from '../../../../calendar/event/edit/steps/Host';
import Venue from '../../../../calendar/event/edit/steps/Venue';
import Detail from '../../../../calendar/event/edit/steps/Detail';
import PreviewTemplate from './steps/PreviewTemplate';
// ** Util Functions
import { getUserData } from '../../../../../utility/Utils';

// ** Icons Imports
import { FileText, User, MapPin, Image, Tool } from 'react-feather';

const WizardModernVertical = ({ eventInfo, setEditBooking }) => {
  const dispatch = useDispatch();
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  // ** Form Data
  const eventForm = new FormData();
  eventForm.append('userId', getUserData().id);
  const steps = [
    {
      id: 'event-title',
      title: 'Event Title',
      subtitle: 'Give A Title',
      icon: <FileText size={18} />,
      content: (
        <Title
          eventForm={eventForm}
          stepper={stepper}
          eventInfo={eventInfo}
          type="modern-vertical"
        />
      )
    },
    {
      id: 'Banner',
      title: 'Event Banner',
      subtitle: 'Upload An Event Banner',
      icon: <Image size={18} />,
      content: (
        <Banner
          eventForm={eventForm}
          stepper={stepper}
          eventInfo={eventInfo}
          type="modern-vertical"
        />
      )
    },
    {
      id: 'host-info',
      title: 'Host Info',
      subtitle: 'Add Host Info',
      icon: <User size={18} />,
      content: (
        <Host
          eventForm={eventForm}
          stepper={stepper}
          eventInfo={eventInfo}
          type="modern-vertical"
        />
      )
    },
    {
      id: 'venue',
      title: 'Venue',
      subtitle: 'Add Address',
      icon: <MapPin size={18} />,
      content: (
        <Venue
          eventForm={eventForm}
          stepper={stepper}
          eventInfo={eventInfo}
          type="modern-vertical"
        />
      )
    },
    {
      id: 'detail',
      title: 'Event Detail',
      subtitle: 'Add text and image for more detail',
      icon: <MapPin size={18} />,
      content: (
        <Detail
          eventForm={eventForm}
          stepper={stepper}
          eventInfo={eventInfo}
          type="modern-vertical"
        />
      )
    },
    {
      id: 'template',
      title: 'Template',
      subtitle: 'Select Event Theme',
      icon: <Tool size={18} />,
      content: (
        <div className="content-body">
          <PreviewTemplate
            eventForm={eventForm}
            stepper={stepper}
            eventInfo={eventInfo}
            activeView="grid"
            setEditBooking={setEditBooking}
          />
        </div>
      )
    }
  ];

  return (
    <div className="modern-vertical-wizard birth-event-stepper">
      <Wizard
        type="modern-vertical"
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

export default WizardModernVertical;
