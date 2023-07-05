// ** React Imports
import { useRef, useState } from 'react';

// ** Custom Components
import Wizard from '@components/wizard';



// ** Icons Imports
import { FileText, User, Image } from 'react-feather';
import DocumentDesAndTitle from './DocumentDesAndTitle';
import UploadDoc from './UploadDoc';


const FormUpload = ({task,setTask}) => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: 'document',
      title: 'Add Documents',
      subtitle: 'Upload or Browse Library',
      icon: <Image size={18} />,
      content: <UploadDoc stepper={stepper} type="modern-vertical" task={task} 
      setTask = {setTask}   />
    },
    {
      id: 'message',
      title: 'Add Task',
      subtitle: 'Add task details for employees',
      icon: <User size={18} />,
      content: <DocumentDesAndTitle stepper={stepper} type="modern-vertical" task={task} 
      setTask = {setTask}/>
    }
  ];

  return (
    <div className="modern-vertical-wizard" style={{ background: '#F7F7F7' }}>
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

export default FormUpload;
