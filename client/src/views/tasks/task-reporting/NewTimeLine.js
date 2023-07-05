import { Fragment, useMemo, useState, useContext, useEffect } from 'react';

import Avatar from '@components/avatar';

import { Button, ButtonGroup, Input, Label, Badge } from 'reactstrap';
import { Check } from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { uploadTodoAnsFile, sendEmail } from './store/action';
import { todoFileUploadingInit, todoFileUploadingReset } from './store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import useMessage from '../../../lib/useMessage';
import { FiX } from 'react-icons/fi';
import moment from 'moment';

const NewTimeline = (props) => {
  // ** Props
  const {
    selectedWorkingCheckList,
    setSelectedWorkingCheckList,
    taskTab,
    checklistEditing,
    setCheckListEditing,
    setZoomPhotoState,
    socket,
    selectDate
  } = props;
  const { userData } = useSelector((state) => state.auth);
  const [currentUploadedImages, setCurrentUploadedImages] = useState([]);
  const uploadBtnName = {
    photo: 'UPLOAD PHOTO',
    qrCode: 'SCAN QR CODE',
    barCode: 'SCAN BARCODE'
  };

  function setTodoValue(todo, value) {
    console.log(todo, value);
    var AnsCheckList = [...selectedWorkingCheckList?.schedule[0]?.checkList];
    var fineExistingTodoIndex = Array.from(AnsCheckList).findIndex(
      (x) => String(x.checkListId) === String(todo?._id)
    );

    console.log(fineExistingTodoIndex);
    if (fineExistingTodoIndex > -1) {
      // AnsCheckList[fineExistingTodoIndex].ans =
      AnsCheckList[fineExistingTodoIndex] = {
        ...AnsCheckList[fineExistingTodoIndex],
        pre_ans: value,
        touched: true,
        _date: new Date()
      };
    } else {
      AnsCheckList.push({
        scheduleTaskId: selectedWorkingCheckList.schedule[0]._id,
        checkListId: todo?._id,
        pre_ans: value,
        _date: new Date()
      });
    }

    // switch (todo.proofType) {
    //   // case 'check':
    //   //   value === 'true' ? setCheckBoxState(true) : setCheckBoxState(false);
    //   //   break;
    //   // case 'yesNo':
    //   //   value === 'yes' ? setYesNNoState('yes') : setYesNNoState('no');
    //   //   break;
    //   // case 'ratingToFive':
    //   //   setRateFiveState(parseInt(value));
    //   //   break;
    //   case 'ratingToTen':
    //     setRateTenState(parseInt(value));
    //     break;
    //   default:
    //     break;
    // }

    // AnsCheckList
    // set value to props state
    setSelectedWorkingCheckList((p) => {
      return {
        ...p,
        schedule: [
          {
            ...p.schedule[0],
            checkList: AnsCheckList
          }
        ]
      };
    });
  }

  function columnValue(each) {
    let found = selectedWorkingCheckList?.schedule[0]?.checkList.find(
      (x) => x?.checkListId === each?._id
    );
    if (found) {
      return found.pre_ans;
    }
    return null;
  }

  const dispatch = useDispatch();

  const { todoFileUploading } = useSelector((state) => state.tasks);
  const { loading, success: uploadSuccess, todo, file } = todoFileUploading;

  const { success, error } = useMessage();

  useMemo(() => {
    if (loading) {
      document.body.style.cursor = 'wait';
    }
    if (uploadSuccess) {
      setTodoValue(todo, file?.url);
      document.body.style.cursor = 'arrow';
      success('Upload done ! please save all changes');

      // Send Upload Socket Notification
      socket.emit('uploadProof', {
        // channelId: selectedUser._id,
        selectedTask: selectedWorkingCheckList,
        todo,
        url: file?.url,
        employeeInfo: {
          email: userData?.email,
          fullName: userData?.fullName
        }
      });

      // Email exist
      // if (selectedWorkingCheckList.email && selectedWorkingCheckList.emailNotification) {
      //   // Send success email to client
      //   dispatch(
      //     sendEmail({
      //       from: userData?.email,
      //       fullName: userData?.fullName,
      //       to: selectedWorkingCheckList.email,
      //       taskName: selectedWorkingCheckList.taskName,
      //       subTaskName: todo.title,
      //       content: file?.url,
      //       isUpload: true,
      //       isComplete: false
      //     })
      //   );
      // }
      // Reset redux state
      dispatch(todoFileUploadingReset());
    }
  }, [uploadSuccess]);

  // File Upload
  function uploadPhoto(todo, file) {
    const form = new FormData();
    form.append('file', file);
    // Initialize Uplaoding

    dispatch(todoFileUploadingInit(todo));
    dispatch(uploadTodoAnsFile(form));
  }

  let list = selectedWorkingCheckList?.checkList;
  let listAns = selectedWorkingCheckList?.schedule[0]?.checkList;
  let currentDateTime = new Date();

  // Pre-processing list
  let newList = [];
  if (list && listAns) {
    for (let each of list) {
      let selSchedul = listAns.filter((x) => x.checkListId === each._id);
      let endDateTime = new Date(each.dateTime);
      endDateTime.setFullYear(currentDateTime.getFullYear());
      endDateTime.setMonth(currentDateTime.getMonth());
      endDateTime.setDate(currentDateTime.getDate());

      newList.push({
        ...each,
        _date: selSchedul.length > 0 ? selSchedul[0]._date : null,
        ans: selSchedul.length > 0 ? selSchedul[0].ans : null,
        pre_ans: selSchedul.length > 0 ? selSchedul[0].pre_ans : null,
        dueTo: endDateTime
      });
    }
  }

  function renderContent(todo, editingState) {
    switch (todo.proofType) {
      case 'check':
        return (
          <div style={{ paddingInlineEnd: '3rem' }}>
            <div
              className="mb-1"
              style={{ minHeight: editingState ? '0px' : todo.ans ? '20px' : '41px' }}
            >
              {editingState ? (
                <div className="form-check" style={{ minWidth: '120px' }}>
                  <Input
                    value={(columnValue(todo) || todo.ans) === 'true' || false}
                    checked={(columnValue(todo) || todo.ans) === 'true' ? true : false}
                    onClick={(e) => {
                      setTodoValue(todo, e.target.value === 'false' ? 'true' : 'false');
                      setCheckListEditing(true);
                    }}
                    type="checkbox"
                  />
                  {(columnValue(todo) || todo.ans) === 'true' ? ' Checked' : ' Unchecked'}
                </div>
              ) : todo.ans === 'true' ? (
                <Check size={80} style={{ float: 'right', fontWeight: 'bold', color: '#28c76f' }} />
              ) : (
                <FiX size={80} style={{ float: 'right', fontWeight: 'bold', color: '#ea5455' }} />
              )}
            </div>
          </div>
        );
      case 'yesNo':
        return (columnValue(todo) || todo.ans) && !editingState ? (
          <div style={{ fontSize: '24px', fontWeight: 800, paddingInlineEnd: '3.5rem' }}>
            {columnValue(todo)?.toUpperCase() || todo.ans.toUpperCase()}
          </div>
        ) : (
          <div
            className="mb-1"
            style={{ minHeight: editingState ? '0px' : todo.ans ? '20px' : '41px' }}
          >
            {/* {editingState ? ( */}
            <ButtonGroup style={{ float: editingState ? null : 'right' }}>
              <Button
                className={(columnValue(todo) || todo.ans) === 'yes' ? 'active' : ''}
                outline={(columnValue(todo) || todo.ans) === 'yes' ? false : true}
                onClick={(e) => {
                  setTodoValue(todo, 'yes');
                  // setYesNNoState('yes');
                  setCheckListEditing(true);
                }}
                color="primary"
                disabled={!editingState}
              >
                <span>Yes</span>
              </Button>
              <Button
                className={(columnValue(todo) || todo.ans) === 'no' ? 'active' : ''}
                outline={(columnValue(todo) || todo.ans) === 'no' ? false : true}
                onClick={(e) => {
                  setTodoValue(todo, 'no');
                  // setYesNNoState('no');
                  setCheckListEditing(true);
                }}
                color="primary"
                disabled={!editingState}
              >
                <span>No</span>
              </Button>
            </ButtonGroup>
          </div>
        );
      case 'input':
        return (
          <div className="mb-1">
            {editingState ? (
              <Input
                value={columnValue(todo) || todo.ans}
                onChange={(e) => {
                  console.log(e.target.value);
                  setTodoValue(todo, e.target.value);
                  setCheckListEditing(true);
                }}
                placeholder="Input Value"
              />
            ) : todo.ans ? (
              <div style={{ fontSize: '24px', fontWeight: 800, paddingInlineEnd: '3.5rem' }}>
                {todo.ans}
              </div>
            ) : (
              <Input placeholder="Input Value" disabled />
            )}
          </div>
        );
      case 'photo':
        return renderContentwithImage(editingState, todo);
      case 'qrCode':
        return (
          <div className="d-flex align-items-center">
            <Label
              onClick={(e) => {
                e.preventDefault();
                console.log(todo?.codeURL);
                if (editingState) {
                  if (todo?.codeURL) {
                    setZoomPhotoState(todo?.codeURL);
                    setTodoValue(todo, 'DONE');
                    setCheckListEditing(true);
                  } else {
                    error(
                      "QR Code doesn't assigned to this task. Please notify your client for this"
                    );
                  }
                }
              }}
              disabled={!editingState}
            >
              <a className={editingState ? 'btn btn-primary' : 'btn btn-primary disabled'}>
                {uploadBtnName[todo.proofType]}
              </a>
            </Label>
          </div>
        );
      case 'barCode':
        return (
          <div className="d-flex align-items-center">
            <Label
              onClick={(e) => {
                e.preventDefault();
                console.log(todo?.codeURL);
                if (editingState) {
                  if (todo?.codeURL) {
                    setZoomPhotoState(todo?.codeURL);
                    setTodoValue(todo, 'DONE');
                    setCheckListEditing(true);
                  } else {
                    error(
                      "Barcode doesn't assigned to this task. Please notify your client for this"
                    );
                  }
                }
              }}
              disabled={!editingState}
            >
              <a className={editingState ? 'btn btn-primary' : 'btn btn-primary disabled'}>
                {uploadBtnName[todo.proofType]}
              </a>
            </Label>
          </div>
        );
      case 'measurement':
        return (
          <div className="mb-1">
            {editingState ? (
              <Input
                value={columnValue(todo) || todo.ans}
                onChange={(e) => {
                  setTodoValue(todo, e.target.value);
                  setCheckListEditing(true);
                }}
                placeholder="Measurement Value"
              />
            ) : todo.ans ? (
              <div style={{ fontSize: '24px', fontWeight: 800, paddingInlineEnd: '3.5rem' }}>
                {todo.ans}
              </div>
            ) : (
              <Input placeholder="Measurement Value" disabled />
            )}
          </div>
        );
      case 'ratingToFive':
        return todo.ans && !editingState ? (
          <div
            className="d-flex flex-column align-items-center"
            style={{ paddingInlineEnd: '2.5rem' }}
          >
            <Badge
              key={`badge_${Math.floor(Math.random() * 1000 + Math.random() * 1000)}`}
              pill
              color="light-secondary"
              style={{ fontSize: '28px', fontWeight: 800 }}
            >
              {columnValue(todo)?.toUpperCase() || todo.ans?.toUpperCase()}
            </Badge>
            <Badge
              key={`badge_${Math.floor(Math.random() * 1000 + Math.random() * 1000)}`}
              pill
              color="light-primary"
            >
              5 RATING
            </Badge>
          </div>
        ) : (
          <ButtonGroup className="mb-1">
            <Button
              className={parseInt(columnValue(todo) || todo.ans) >= 1 ? 'active' : ''}
              onClick={(e) => {
                if (editingState) {
                  setTodoValue(todo, parseInt(columnValue(todo)) === 1 ? '' : '1');
                  setCheckListEditing(true);
                }
              }}
              outline={parseInt(columnValue(todo) || todo.ans) >= 1 ? false : true}
              disabled={editingState ? false : true}
              color="primary"
            >
              <span>1</span>
            </Button>
            <Button
              className={parseInt(columnValue(todo) || todo.ans) >= 2 ? 'active' : ''}
              onClick={(e) => {
                if (editingState) {
                  setTodoValue(todo, parseInt(columnValue(todo)) === 2 ? '' : '2');
                  setCheckListEditing(true);
                }
              }}
              outline={parseInt(columnValue(todo) || todo.ans) >= 2 ? false : true}
              disabled={editingState ? false : true}
              color="primary"
            >
              <span>2</span>
            </Button>
            <Button
              className={parseInt(columnValue(todo) || todo.ans) >= 3 ? 'active' : ''}
              onClick={(e) => {
                if (editingState) {
                  setTodoValue(todo, parseInt(columnValue(todo)) === 3 ? '' : '3');
                  setCheckListEditing(true);
                }
              }}
              outline={parseInt(columnValue(todo) || todo.ans) >= 3 ? false : true}
              disabled={editingState ? false : true}
              color="primary"
            >
              <span>3</span>
            </Button>
            <Button
              className={parseInt(columnValue(todo) || todo.ans) >= 4 ? 'active' : ''}
              onClick={(e) => {
                if (editingState) {
                  setTodoValue(todo, parseInt(columnValue(todo)) === 4 ? '' : '4');
                  setCheckListEditing(true);
                }
              }}
              outline={parseInt(columnValue(todo) || todo.ans) >= 4 ? false : true}
              disabled={editingState ? false : true}
              color="primary"
            >
              <span>4</span>
            </Button>
            <Button
              className={parseInt(columnValue(todo) || todo.ans) >= 5 ? 'active' : ''}
              onClick={(e) => {
                if (editingState) {
                  setTodoValue(todo, parseInt(columnValue(todo)) === 5 ? '' : '5');
                  setCheckListEditing(true);
                }
              }}
              outline={parseInt(columnValue(todo) || todo.ans) >= 5 ? false : true}
              disabled={editingState ? false : true}
              color="primary"
            >
              <span>5</span>
            </Button>
          </ButtonGroup>
        );
      case 'ratingToTen':
        return todo.ans && !editingState ? (
          <div
            className="d-flex flex-column align-items-center"
            style={{ paddingInlineEnd: '2.5rem' }}
          >
            <Badge
              key={`badge_${Math.floor(Math.random() * 1000 + Math.random() * 1000)}`}
              pill
              color="light-secondary"
              style={{ fontSize: '28px', fontWeight: 800 }}
            >
              {columnValue(todo)?.toUpperCase() || todo.ans?.toUpperCase()}
            </Badge>
            <Badge
              key={`badge_${Math.floor(Math.random() * 1000 + Math.random() * 1000)}`}
              pill
              color="light-primary"
              // style={{ fontSize: '28px', fontWeight: 800 }}
            >
              10 RATING
            </Badge>
          </div>
        ) : (
          <ButtonGroup className="mb-1">
            <Button
              className={parseInt(columnValue(todo) || todo.ans) >= 1 ? 'active' : ''}
              onClick={(e) => {
                if (editingState) {
                  setTodoValue(todo, parseInt(columnValue(todo)) === 1 ? '' : '1');
                  setCheckListEditing(true);
                }
              }}
              outline={parseInt(columnValue(todo) || todo.ans) >= 1 ? false : true}
              disabled={editingState ? false : true}
              color="primary"
              size="sm"
            >
              <span>1</span>
            </Button>
            <Button
              className={parseInt(columnValue(todo) || todo.ans) >= 2 ? 'active' : ''}
              onClick={(e) => {
                if (editingState) {
                  setTodoValue(todo, parseInt(columnValue(todo)) === 2 ? '' : '2');
                  setCheckListEditing(true);
                }
              }}
              outline={parseInt(columnValue(todo) || todo.ans) >= 2 ? false : true}
              disabled={editingState ? false : true}
              color="primary"
              size="sm"
            >
              <span>2</span>
            </Button>
            <Button
              className={parseInt(columnValue(todo) || todo.ans) >= 3 ? 'active' : ''}
              onClick={(e) => {
                if (editingState) {
                  setTodoValue(todo, parseInt(columnValue(todo)) === 3 ? '' : '3');
                  setCheckListEditing(true);
                }
              }}
              outline={parseInt(columnValue(todo) || todo.ans) >= 3 ? false : true}
              disabled={editingState ? false : true}
              color="primary"
              size="sm"
            >
              <span>3</span>
            </Button>
            <Button
              className={parseInt(columnValue(todo) || todo.ans) >= 4 ? 'active' : ''}
              onClick={(e) => {
                if (editingState) {
                  setTodoValue(todo, parseInt(columnValue(todo)) === 4 ? '' : '4');
                  setCheckListEditing(true);
                }
              }}
              outline={parseInt(columnValue(todo) || todo.ans) >= 4 ? false : true}
              disabled={editingState ? false : true}
              color="primary"
              size="sm"
            >
              <span>4</span>
            </Button>
            <Button
              className={parseInt(columnValue(todo) || todo.ans) >= 5 ? 'active' : ''}
              onClick={(e) => {
                if (editingState) {
                  setTodoValue(todo, parseInt(columnValue(todo)) === 5 ? '' : '5');
                  setCheckListEditing(true);
                }
              }}
              outline={parseInt(columnValue(todo) || todo.ans) >= 5 ? false : true}
              disabled={editingState ? false : true}
              color="primary"
              size="sm"
            >
              <span>5</span>
            </Button>
            <Button
              className={parseInt(columnValue(todo) || todo.ans) >= 6 ? 'active' : ''}
              onClick={(e) => {
                if (editingState) {
                  setTodoValue(todo, parseInt(columnValue(todo)) === 6 ? '' : '6');
                  setCheckListEditing(true);
                }
              }}
              outline={parseInt(columnValue(todo) || todo.ans) >= 6 ? false : true}
              disabled={editingState ? false : true}
              color="primary"
              size="sm"
            >
              <span>6</span>
            </Button>
            <Button
              className={parseInt(columnValue(todo) || todo.ans) >= 7 ? 'active' : ''}
              onClick={(e) => {
                if (editingState) {
                  setTodoValue(todo, parseInt(columnValue(todo)) === 7 ? '' : '7');
                  setCheckListEditing(true);
                }
              }}
              outline={parseInt(columnValue(todo) || todo.ans) >= 7 ? false : true}
              disabled={editingState ? false : true}
              color="primary"
              size="sm"
            >
              <span>7</span>
            </Button>
            <Button
              className={parseInt(columnValue(todo) || todo.ans) >= 8 ? 'active' : ''}
              onClick={(e) => {
                if (editingState) {
                  setTodoValue(todo, parseInt(columnValue(todo)) === 8 ? '' : '8');
                  setCheckListEditing(true);
                }
              }}
              outline={parseInt(columnValue(todo) || todo.ans) >= 8 ? false : true}
              disabled={editingState ? false : true}
              color="primary"
              size="sm"
            >
              <span>8</span>
            </Button>
            <Button
              className={parseInt(columnValue(todo) || todo.ans) >= 9 ? 'active' : ''}
              onClick={(e) => {
                if (editingState) {
                  setTodoValue(todo, parseInt(columnValue(todo)) === 9 ? '' : '9');
                  setCheckListEditing(true);
                }
              }}
              outline={parseInt(columnValue(todo) || todo.ans) >= 9 ? false : true}
              disabled={editingState ? false : true}
              color="primary"
              size="sm"
            >
              <span>9</span>
            </Button>
            <Button
              className={parseInt(columnValue(todo) || todo.ans) >= 10 ? 'active' : ''}
              onClick={(e) => {
                if (editingState) {
                  setTodoValue(todo, parseInt(columnValue(todo)) === 10 ? '' : '10');
                  setCheckListEditing(true);
                }
              }}
              outline={parseInt(columnValue(todo) || todo.ans) >= 10 ? false : true}
              disabled={editingState ? false : true}
              color="primary"
              size="sm"
            >
              <span>10</span>
            </Button>
          </ButtonGroup>
        );
      default:
        break;
    }
  }

  function renderContentwithImage(editingState, current_todo) {
    return (
      <div className="d-flex align-items-center">
        <div className="uploaded-proof-photo d-flex flex-column align-items-center justify-content-between">
          <img
            id={`${current_todo._id.toString()}-upload-photo`}
            style={{ cursor: 'pointer', borderRadius: '5px', marginInline: '1rem' }}
            src={current_todo.ans}
            height={'60px'}
            onClick={(e) => {
              e.preventDefault();
              setZoomPhotoState(current_todo.ans);
            }}
          />
          {current_todo.ans &&
            current_todo.ans !== current_todo.pre_ans &&
            current_todo.pre_ans && (
              <Badge
                key={`badge_${Math.floor(Math.random() * 1000 + Math.random() * 1000)}`}
                pill
                color="light-primary"
              >
                Origin
              </Badge>
            )}
        </div>
        {current_todo.pre_ans !== current_todo.ans && (
          <div className="uploaded-proof-photo d-flex flex-column align-items-center justify-content-between">
            <img
              id={`${current_todo._id.toString()}-upload-photo`}
              style={{ cursor: 'pointer', borderRadius: '5px', marginInline: '1rem' }}
              src={current_todo.pre_ans}
              height={'60px'}
              onClick={(e) => {
                e.preventDefault();
                setZoomPhotoState(current_todo.pre_ans);
              }}
            />
            {current_todo.ans &&
              current_todo.ans !== current_todo.pre_ans &&
              current_todo.pre_ans && (
                <Badge
                  key={`badge_${Math.floor(Math.random() * 1000 + Math.random() * 1000)}`}
                  pill
                  color="light-danger"
                >
                  New
                </Badge>
              )}
          </div>
        )}
        {current_todo.ans && !editingState ? null : (
          <div className="d-flex align-items-center">
            <Input
              accept="image/*"
              id={`upload-${current_todo._id}`}
              type="file"
              // capture="environment"
              onChange={(e) => {
                uploadPhoto(current_todo, e?.target?.files[0]);
                setCheckListEditing(true);
              }}
              placeholder={`Upload or scan ${current_todo.proofType}`}
              hidden={true}
              disabled={!editingState}
            />
            <Label htmlFor={`upload-${current_todo._id}`}>
              <a className={editingState ? 'btn btn-primary' : 'btn btn-primary disabled'}>
                {uploadBtnName[current_todo.proofType]}
              </a>
            </Label>
          </div>
        )}
      </div>
    );
  }

  function renderStafPhoto(todo) {
    const isTodoCompleted = selectedWorkingCheckList?.schedule[0]?.checkList.find(
      (x) => x?.checkListId === todo?._id
    );

    // if (!isTodoCompleted && selectedWorkingCheckList.assignee) {
    const { img, value, label } = selectedWorkingCheckList.assignee;
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

  function renderStaffNameAndDate(todo) {
    const isTodoCompleted = selectedWorkingCheckList?.schedule[0]?.checkList.find(
      (x) => x?.checkListId === todo?._id
    );

    const { label } = selectedWorkingCheckList?.assignee || '';
    if (!isTodoCompleted && selectedWorkingCheckList?.assignee) {
      return <>{label}</>;
    }
    return <>{`${label}-${moment(todo?._date).format('MMMM Do YYYY, h:mm:ss A')}`}</>;
  }

  return (
    <div className="checklist-all d-flex justify-content-start flex-column">
      <PerfectScrollbar
        className="checklist-scroll"
        // options={{ wheelPropagation: false }}
        containerRef={(ref) => {
          if (ref) {
            ref._getBoundingClientRect = ref.getBoundingClientRect;

            ref.getBoundingClientRect = () => {
              const original = ref._getBoundingClientRect();

              return {
                ...original,
                height: Math.floor(original.height)
              };
            };
          }
        }}
      >
        {newList?.map((each, index) => {
          return (
            <div
              key={`checklist_${Math.floor(Math.random() * 1000)} ${Math.floor(
                Math.random() * 1000
              )}`}
              className="checklist-item d-flex justify-content-between"
            >
              <div className="checklist-title-and-result">
                <div className="checklist-title d-flex align-items-center">
                  <div className="checklist-no">{index + 1}</div>
                  {each.title ? (
                    <div
                      className="titlename cursor-pointer"
                      style={{ fontSize: '15px', fontWeight: 'bold' }}
                    >
                      {each.title}
                    </div>
                  ) : null}
                </div>
                <div className="checklist-result">
                  {each?.ans ? (
                    <div className="d-flex">
                      <Badge
                        key={`badge_${Math.floor(Math.random() * 1000)} ${Math.floor(
                          Math.random() * 1000
                        )}`}
                        pill
                        color="light-primary"
                      >
                        {` COMPLETED - ${moment(each?._date).format('h:mm A')}`}
                      </Badge>
                    </div>
                  ) : (
                    <Badge
                      key={`badge_${Math.floor(Math.random() * 1000 + Math.random() * 1000)}`}
                      pill
                      color={
                        each.dueTo > currentDateTime &&
                        selectDate === currentDateTime.toLocaleDateString()
                          ? 'light-secondary'
                          : 'light-danger'
                      }
                    >
                      {each.dueTo > currentDateTime &&
                      selectDate === currentDateTime.toLocaleDateString()
                        ? ` PENDING - UNTIL ${moment(each?.dateTime).format('h:mm A')}`
                        : ` PAST DUE - ${moment(each?.dateTime).format('h:mm A')}`}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="checklist-content">
                {renderContent(each, selectedWorkingCheckList.completedEditor)}
              </div>
            </div>
          );
        })}
      </PerfectScrollbar>
    </div>
  );
};

export default NewTimeline;
