// ** React Imports
import { Fragment, useMemo, useState, useEffect, useContext } from 'react';

// ** Custom Components
import Timeline from './NewTimeLine';
// import Timeline from '@components/timeline';
import Avatar from '@components/avatar';

// ** Reactstrap Imports
import { Button, Row, UncontrolledTooltip } from 'reactstrap';

// ** Icons Imports
import { Check, Edit3 } from 'react-feather';

// ** Timeline Data
import useTodoList from './useTodoList';

import { saveTodosAnsAction, sendEmail } from './store/action';
import { useDispatch, useSelector } from 'react-redux';
import useMessage from '../../../lib/useMessage';
import { saveTaskListTodosReset } from './store/reducer';
import ImageZoom from './ImageZoom';
import FreezeTask from './FreezeTask';

import { SocketContext } from '../../../utility/context/Socket';
import { RiAlarmWarningFill } from 'react-icons/ri';

const BasicTimeline = (props) => {
  const dispatch = useDispatch();
  const [countAns, setCountAns] = useState(0);
  const [checklistEditing, setCheckListEditing] = useState(false);
  const [zoomPhotoState, setZoomPhotoState] = useState(null);
  const [freezeTaskModal, setFreezeTaskModal] = useState(false);
  const [sendFTRQ, setSendFTRQ] = useState(false);

  const { selectedWorkingCheckList, setSelectedWorkingCheckList, taskTab, selectDate } = props;
  const { userData } = useSelector((state) => state.auth);
  const socket = useContext(SocketContext);

  const { saveTaskListTodos } = useSelector((state) => state.tasks);

  const { loading, success } = saveTaskListTodos;
  const { error, success: successMsg } = useMessage();
  useMemo(() => {
    if (success) {
      // reset
      dispatch(saveTaskListTodosReset());
      // show message
      successMsg('Check List saved !');
    }
  }, [success]);

  useEffect(() => {
    setCheckListEditing(false);
  }, [dispatch]);

  function saveCheckList(count) {
    if (count && !selectedWorkingCheckList.completedEditor) {
      setSelectedWorkingCheckList((p) => {
        return {
          ...p,
          completedEditor: true
        };
      });
      // setCountAns(0);
    } else {
      let tmpCheckList = selectedWorkingCheckList?.schedule[0]?.checkList;
      let count = 0;
      tmpCheckList = tmpCheckList.map((x) => {
        if (x.pre_ans || x.ans) count++;
        return x.pre_ans ? { ...x, ans: x.pre_ans } : x;
      });
      let tmpWorkingCheckList = {
        ...selectedWorkingCheckList,
        schedule: [
          {
            ...selectedWorkingCheckList.schedule[0],
            checkList: tmpCheckList
          }
        ]
      };
      setSelectedWorkingCheckList((p) => {
        return {
          ...p,
          completedEditor: false,
          schedule: [
            {
              ...p.schedule[0],
              checkList: tmpCheckList
            }
          ]
        };
      });
      setCheckListEditing(false);
      dispatch(saveTodosAnsAction({ ...tmpWorkingCheckList, selectDate }));
      socket.emit('taskUpdated', { ...selectedWorkingCheckList, tmpCheckList });
      if (
        count == selectedWorkingCheckList?.checkList?.length &&
        selectedWorkingCheckList.emailNotification
      ) {
        console.log(selectedWorkingCheckList.title);
        dispatch(
          sendEmail({
            from: userData?.email,
            fullName: userData?.fullName,
            to: selectedWorkingCheckList.email,
            taskName: selectedWorkingCheckList.taskName,
            subTaskName: '',
            content: '',
            isUpload: false,
            isComplete: true
          })
        );
      }
    }
  }

  function renderStafPhoto(data) {
    const { img, value, label } = data;
    if (img === '') {
      return (
        <Avatar
          content={label}
          color={genBadgeColor(label)}
          imgHeight="38"
          imgWidth="38"
          initials
        />
      );
    } else {
      return <Avatar img={img} imgHeight="38" imgWidth="38" initials />;
    }
    // }
  }

  function genBadgeColor(str) {
    let tmpValue = 0;
    Array.from(str).forEach((x, index) => {
      tmpValue += x.codePointAt(0) * (index + 1);
    });
    const stateNum = tmpValue % 6,
      states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary'
      ];
    return states[stateNum];
  }

  return (
    <Fragment>
      {selectedWorkingCheckList ? (
        <div className="basic-time-line">
          <div className="task-title d-flex justify-content-between mb-0">
            <div className="d-flex align-items-center">
              <h4 className="m-1">{selectedWorkingCheckList?.taskName}</h4>
            </div>
            <div className="d-flex justify-content-between">
              {userData?.role == 'employee' ? (
                <>
                  <Button.Ripple
                    onClick={(countAns) => saveCheckList(countAns)}
                    color="success"
                    outline
                    disabled={
                      loading ||
                      (selectedWorkingCheckList.completedEditor && !checklistEditing) ||
                      selectedWorkingCheckList?.freeze.length ||
                      sendFTRQ
                    }
                    style={{ height: '40px', marginTop: '3px' }}
                  >
                    {selectedWorkingCheckList.completedEditor ? (
                      checklistEditing ? (
                        <Check size={14} />
                      ) : (
                        <Edit3 size={14} />
                      )
                    ) : (
                      <Edit3 size={14} />
                    )}
                    <span className="align-middle ms-25">
                      {loading
                        ? 'Saving...'
                        : selectedWorkingCheckList.completedEditor
                        ? checklistEditing
                          ? 'Submit'
                          : 'Edit'
                        : 'Edit'}
                    </span>
                  </Button.Ripple>

                  <div id="freezebtn" style={{ marginLeft: '10px' }}>
                    <Button.Ripple
                      color="danger"
                      outline
                      style={{ height: '40px', marginTop: '3px' }}
                      className="d-flex"
                      onClick={(e) => {
                        e.preventDefault();
                        setFreezeTaskModal(true);
                        setSendFTRQ(true);
                      }}
                      disabled={selectedWorkingCheckList?.freeze.length || sendFTRQ}
                    >
                      <RiAlarmWarningFill size={16} />
                      <div style={{ marginTop: '2px', marginLeft: '5px' }}>Freeze</div>
                    </Button.Ripple>
                  </div>
                  <UncontrolledTooltip target="freezebtn" placement="bottom">
                    {selectedWorkingCheckList?.freeze[0]?.status
                      ? 'Task freeze request accepted'
                      : 'Task freeze request already sent'}
                  </UncontrolledTooltip>
                </>
              ) : (
                <div className="d-flex align-items-center">
                  {renderStafPhoto(selectedWorkingCheckList.assignee)}
                  <h5 style={{ margin: '0 5px' }}>{selectedWorkingCheckList?.assignee?.label}</h5>
                </div>
              )}
            </div>
          </div>
          <Timeline
            selectedWorkingCheckList={selectedWorkingCheckList}
            setSelectedWorkingCheckList={setSelectedWorkingCheckList}
            taskTab={taskTab}
            checklistEditing={checklistEditing}
            setCheckListEditing={setCheckListEditing}
            setZoomPhotoState={setZoomPhotoState}
            socket={socket}
            selectDate={selectDate}
          />
        </div>
      ) : (
        <div className="basic-time-line d-flex justify-content-center">
          <div className="d-flex align-items-center">
            <img style={{ width: '100px', height: '100px' }} src="/empty.svg" alt="" />
            <br />
            <br />
            <span style={{ paddingLeft: 15 }}>No active task</span>
          </div>
        </div>
      )}
      <ImageZoom srcUrl={zoomPhotoState} setIsOpen={setZoomPhotoState} />
      <FreezeTask
        isOpen={freezeTaskModal}
        setIsOpen={setFreezeTaskModal}
        data={selectedWorkingCheckList}
        setSendFTRQ={setSendFTRQ}
      />
    </Fragment>
  );
};

export default BasicTimeline;
