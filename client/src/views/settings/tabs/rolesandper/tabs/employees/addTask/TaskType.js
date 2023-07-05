// ** React Imports
import { useRef, useState } from 'react';

// ** Custom Components
import Wizard from '@components/wizard';

// ** Steps
// import Template from './steps/Template'
// import GoalInfo from './steps/GoalInfo'

// ** Icons Imports
// import { FileText, Folder } from 'react-feather'
import ProgressionTemplate from '../component/PregressionTemplate';
// import RankTable from './SignDocument';
import FormUpload from './FormUpload';
import DocumentDesAndTitle from './DocumentDesAndTitle';
import { useRTL } from '../../../../../../../utility/hooks/useRTL';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'reactstrap';
import EmployeeRoles from './EmployeeRoles';

const calendarsColor = {
  Business: 'primary',
  Holiday: 'success',
  Personal: 'danger',
  Family: 'warning',
  ETC: 'info'
};

const TaskType = ({task,setTask,toggle}) => {
  const dispatch = useDispatch();
  const [rSelected, setRSelected] = useState(null);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [addSidebarOpen, setAddSidebarOpen] = useState(false);
  const [calendarApi, setCalendarApi] = useState(null);
  const [isRtl] = useRTL();
  const store = useSelector((state) => state.calendar);
  const toggleSidebar = (val) => setLeftSidebarOpen(val);
  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen);


  // ** Ref
  const ref = useRef(null);
  // ** State
  const [stepper, setStepper] = useState(null);



  const steps = [
    {
      id: 'action',
      title: 'Action',
      subtitle: 'Choose an Action',
      // icon: <Folder size={18} />,
      content: (
        <ProgressionTemplate
          rSelected={rSelected}
          setRSelected={setRSelected}
          stepper={stepper}
          type="wizard-modern"
          task={task}
          setTask = {setTask}
        />
      )
    },
    {
      id: 'role',
      title: 'Employee Roles',
      subtitle: 'Choose Employee Role to Assign',
      // icon: <Folder size={18} />,
      content: (
        <EmployeeRoles stepper={stepper} task={task}
        setTask = {setTask}/>
      )
    },
    {
      id: 'next',
      title: 'Next Step',
      subtitle: 'Complete the next task',
      // icon: <FileText size={18} />,
      content:
        rSelected === 'form' ? (
          <FormUpload stepper={stepper} type="wizard-modern" task={task}
          setTask = {setTask} toggle={toggle}/>
        ) : (
          <DocumentDesAndTitle stepper={stepper} type="wizard-modern" task={task}
          setTask = {setTask} toggle={toggle}/>
        )
    }
  ];

  return (
    <div className="modern-horizontal-wizard permissionAndRoles">
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

export default TaskType;
