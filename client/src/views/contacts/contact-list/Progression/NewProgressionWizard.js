// ** React Imports
import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ** Custom Components
import Wizard from '@components/wizard';

import EventCalendar from './add-to-event/EventCalendar';
import FinalStatus from './progression/FinalStatus';
import ProgressionTemplate from './ProgressionTemplate';
import RankTable from './progression/RankTable';
import PromotionGuestTable from './add-to-event/ProgressionGuestTable';
import { useRTL } from '../../../../utility/hooks/useRTL';
import { updateEvent } from '../../../calendar/store';
import { contactRankListAction, progressionFetchAction } from '../../store/actions';

const calendarsColor = {
  Business: 'primary',
  Holiday: 'success',
  Personal: 'danger',
  Family: 'warning',
  ETC: 'info'
};

const NewProgressionWizard = ({ selectedRowDataProg, contactTypeTitle }) => {
  const dispatch = useDispatch();

  const userIdSelected = selectedRowDataProg?.map((item) => item?._id);
  const [rSelected, setRSelected] = useState(null);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [addSidebarOpen, setAddSidebarOpen] = useState(false);
  const [calendarApi, setCalendarApi] = useState(null);
  const [loading, setLoading] = useState(false); // Loading status for event calendar
  const [isRtl] = useRTL();
  const [inviteeList, setInviteeList] = useState([]);
  // ** Redux
  const contactTypeId = useSelector(
    (state) => state?.totalContacts?.contactTypeList?.filter((x) => x.name == 'Client')[0]?._id
  );
  const contactList = useSelector((state) => state?.totalContacts?.contactList?.list || []);
  const clientContactList = contactList?.filter((x) => x.contactType.indexOf(contactTypeId) > -1);
  const contactRankList = useSelector((state) => state?.totalContacts?.contactRankList);
  const noteData = useSelector((state) => state?.totalContacts?.notes?.data);
  const store = useSelector((state) => state.calendar);
  // ** Handlers
  const toggleSidebar = (val) => setLeftSidebarOpen(val);
  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen);

  const blankEvent = {
    title: '',
    start: '',
    end: '',
    allDay: false,
    url: '',
    extendedProps: {
      calendar: '',
      guests: [],
      location: '',
      description: ''
    }
  };

  // ** Ref
  const ref = useRef(null);
  // ** State
  const [stepper, setStepper] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState('');

  // ** Effects
  useEffect(() => {
    dispatch(contactRankListAction());
    dispatch(progressionFetchAction());
  }, []);
  const steps =
    rSelected == 1
      ? [
          {
            id: 'tction',
            title: 'Action',
            subtitle: 'Choose and Action',
            // icon: <Folder size={18} />,
            content: (
              <ProgressionTemplate
                userIdSelected={userIdSelected}
                rSelected={rSelected}
                setRSelected={setRSelected}
                stepper={stepper}
                type="wizard-modern"
              />
            )
          },
          {
            id: 'next',
            title: 'Next Step',
            subtitle: 'Complete the next task',
            content: (
              <RankTable
                stepper={stepper}
                userIdSelected={userIdSelected}
                selectedRows={selectedRowDataProg}
                inviteeList={inviteeList}
                setInviteeList={setInviteeList}
                type="wizard-modern"
              />
            )
          },
          {
            id: 'status',
            title: 'Status',
            subtitle: 'Report of Action Completed',
            content: (
              <FinalStatus
                selectedRows={selectedRowDataProg}
                inviteeList={inviteeList}
                stepper={stepper}
                clientContactList={clientContactList}
                contactRankList={contactRankList}
                noteData={noteData}
                type="wizard-modern"
              />
            )
          }
        ]
      : [
          {
            id: 'action',
            title: 'Action',
            subtitle: 'Choose and Action',
            // icon: <Folder size={18} />,
            content: (
              <ProgressionTemplate
                userIdSelected={userIdSelected}
                rSelected={rSelected}
                setRSelected={setRSelected}
                stepper={stepper}
                setLoading={setLoading}
                type="wizard-modern"
              />
            )
          },
          {
            id: 'next',
            title: 'Next Step',
            subtitle: 'Complete the next task',
            // icon: <FileText size={18} />,
            content: (
              <EventCalendar
                selectedRows={selectedRowDataProg}
                stepper={stepper}
                type="wizard-modern"
                isRtl={isRtl}
                store={store}
                dispatch={dispatch}
                blankEvent={blankEvent}
                calendarApi={calendarApi}
                selectedEventId={selectedEventId}
                setSelectedEventId={setSelectedEventId}
                updateEvent={updateEvent}
                toggleSidebar={toggleSidebar}
                calendarsColor={calendarsColor}
                setCalendarApi={setCalendarApi}
                handleAddEventSidebar={handleAddEventSidebar}
                loading={loading}
                setLoading={setLoading}
              />
            )
          },
          {
            id: 'payment',
            title: 'Status',
            subtitle: 'List of added contacts',
            // icon: <FileText size={18} />,
            content: (
              <PromotionGuestTable
                eventId={selectedEventId}
                selectedRows={selectedRowDataProg}
                contactRankList={contactRankList}
                stepper={stepper}
                noteData={noteData}
                type="wizard-modern"
              />
            )
          }
          // {
          //   id: 'status',
          //   title: 'Status',
          //   subtitle: 'Report of Action Completed',
          //   // icon: <FileText size={18} />,
          //   content: (
          //     <FinalStepperStatus
          //       selectedEventId={selectedEventId}
          //       selectedRows={selectedRowDataProg}
          //       stepper={stepper}
          //       // type="wizard-modern"
          //     />
          //   )
          // }
        ];

  return (
    <div className="modern-horizontal-wizard promote-horizontal-wizard">
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

export default NewProgressionWizard;
