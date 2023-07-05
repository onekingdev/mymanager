import { useRef, useState } from 'react';
import { FileText, User, MapPin, Image, Tool, Film, Radio } from 'react-feather';
import Wizard from '@components/wizard';
import CreateVideo from './video/CreateVideo';
import CreateVoice from './video/CreateVoice';
import NewVideo from './video/NewVideo';
import Personality from './video/Personality';
import { getUserData } from '../../../../utility/Utils';

const addMyAi = () => {
  const ref = useRef(null);
  const [stepper, setStepper] = useState(null);
  const eventForm = new FormData();
  eventForm.append('userId', getUserData().id);

  const steps = [
    {
      id: 'video-title',
      title: 'Video title',
      subtitle: 'video title',
      icon: <FileText size={18} />,
      content: <NewVideo size={18} eventForm={eventForm} stepper={stepper} type="modern-vertical"/>
    },
    {
      id: 'speech-recognition',
      title: "Speech Recognition",
      subtitle: "Speech Recogntion",
      icon: <Radio size={18} />,
      content: <CreateVoice size={18} eventForm={eventForm} stepper={stepper} type="modern-vertical"/>
    },  
    {
      id: 'personality',
      title: 'Personality',
      subtitle: 'Add Personality',
      icon: <User size={18} />,
      content: <Personality size={18} eventForm={eventForm} stepper={stepper} type="modern-vertical"/>
    },
    {
      id: 'create-video',
      title: 'Create Video',
      subtitle: 'create-video',
      icon: <Film size={18} />,
      content: <CreateVideo size={18} eventForm={eventForm} stepper={stepper} type="modern-vertical"/>
    }
  ];
  return (
    <div className="modern-vertical-wizard">
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

export default addMyAi;
