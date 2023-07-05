import { Fragment, useMemo, useState, useContext, useEffect } from 'react';

import Avatar from '@components/avatar';

import { Button, ButtonGroup, Input, Label, Tooltip } from 'reactstrap';

import {
  AlignLeft,
  Calendar,
  Camera,
  Check,
  CheckSquare,
  MinusSquare,
  Square,
  Star
} from 'react-feather';

import { uploadTodoAnsFile, sendEmail } from './store/action';
import { todoFileUploadingInit, todoFileUploadingReset } from './store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import useMessage from '../../../lib/useMessage';
import moment from 'moment';
import { FiMinus, FiMoreHorizontal, FiX } from 'react-icons/fi';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { VscArrowBoth } from 'react-icons/vsc';
import { AiOutlineBarcode, AiOutlineQrcode } from 'react-icons/ai';
import { TiSortNumerically } from 'react-icons/ti';
import { RiNumber0, RiNumber1, RiNumber5 } from 'react-icons/ri';

const useTodoList = ({
  selectedWorkingCheckList,
  setSelectedWorkingCheckList,
  taskTab,
  checklistEditing,
  setCheckListEditing,
  setZoomPhotoState,
  socket
}) => {
  const [todoList, setTodoList] = useState([]);
  // const [zoomPhotoState, setZoomPhotoState] = useState(null);

  // const [checkBoxState, setCheckBoxState] = useState(false);
  // const [yesNnoState, setYesNNoState] = useState('');
  // const [rateFiveState, setRateFiveState] = useState(0);
  // const [rateTenState, setRateTenState] = useState(0);

  const { userData } = useSelector((state) => state.auth);

  const uploadBtnName = {
    photo: 'UPLOAD PHOTO',
    qrCode: 'SCAN QR CODE',
    barCode: 'SCAN BARCODE'
  };

  useMemo(() => {
    if (taskTab !== '') {
      setTodoList([]);
    }
  }, [taskTab]);

  function setTodoValue(todo, value) {
    var AnsCheckList = [...selectedWorkingCheckList?.schedule[0]?.checkList];
    var fineExistingTodoIndex = Array.from(AnsCheckList).findIndex(
      (x) => String(x.checkListId) === String(todo?._id)
    );

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

  const { success } = useMessage();

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
      if (selectedWorkingCheckList.email) {
        // Send success email to client
        dispatch(
          sendEmail({
            from: userData?.email,
            fullName: userData?.fullName,
            to: selectedWorkingCheckList.email,
            taskName: selectedWorkingCheckList.taskName,
            subTaskName: todo.title,
            content: file?.url,
            isUpload: true,
            isComplete: false
          })
        );
      }
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

  // function TodosMethod(each, state) {
  //   const name = each?.proofType;
  //   if (name === 'check') {
  //     return state ? (
  //       <Input
  //         value={columnValue(each) || 'false'}
  //         checked={columnValue(each) === 'true' ? true : false}
  //         onClick={(e) => {
  //           setTodoValue(each, e.target.value === 'false' ? 'true' : 'false');
  //           setCheckListEditing(true);
  //         }}
  //         type="checkbox"
  //       />
  //     ) : (
  //       <>
  //         <MinusSquare size={20} />
  //         {'Unchecked'}
  //       </>
  //     );
  //   }

  //   if (name === 'yesNo') {
  //     return (
  //       <>
  //         <ButtonGroup className="mb-1">
  //           <Button
  //             className={columnValue(each) === 'yes' ? 'active' : ''}
  //             onClick={(e) => {
  //               setTodoValue(each, 'yes');
  //               setCheckListEditing(true);
  //             }}
  //             outline={columnValue(each) === 'yes' ? false : true}
  //             color="primary"
  //             disabled={!state}
  //           >
  //             <span>Yes</span>
  //           </Button>
  //           <Button
  //             className={columnValue(each) === 'no' ? 'active' : ''}
  //             onClick={(e) => {
  //               setTodoValue(each, 'no');
  //               setCheckListEditing(true);
  //             }}
  //             outline={columnValue(each) === 'no' ? false : true}
  //             color="primary"
  //             disabled={!state}
  //           >
  //             <span>No</span>
  //           </Button>
  //         </ButtonGroup>
  //       </>
  //     );
  //   }

  //   if (name === 'input') {
  //     return (
  //       <Input
  //         value={columnValue(each) || ''}
  //         onChange={(e) => {
  //           setTodoValue(each, e.target.value);
  //           setCheckListEditing(true);
  //         }}
  //         disabled={!state}
  //       />
  //     );
  //   }

  //   if (name === 'photo') {
  //     return (
  //       <Input
  //         onChange={(e) => {
  //           uploadPhoto(each, e?.target?.files[0]);
  //           setCheckListEditing(true);
  //         }}
  //         type="file"
  //         disabled={!state}
  //       />
  //     );
  //   }

  //   if (name === 'qrCode') {
  //     return (
  //       <Input
  //         accept="image/*"
  //         id="upload-qrcode"
  //         type="file"
  //         capture="environment"
  //         onChange={(e) => {
  //           uploadPhoto(each, e?.target?.files[0]);
  //           setCheckListEditing(true);
  //         }}
  //         placeholder="Upload or scan QR Code"
  //         disabled={!state}
  //       />
  //     );
  //   }

  //   if (name === 'barCode') {
  //     return (
  //       <Input
  //         accept="image/*"
  //         id="upload-barcode"
  //         type="file"
  //         capture="environment"
  //         onChange={(e) => {
  //           uploadPhoto(each, e?.target?.files[0]);
  //           setCheckListEditing(true);
  //         }}
  //         placeholder="Upload or scan Barcode"
  //         disabled={!state}
  //       />
  //     );
  //   }

  //   if (name === 'measurement') {
  //     return (
  //       <Input
  //         value={columnValue(each) || ''}
  //         onChange={(e) => {
  //           setTodoValue(each, e.target.value);
  //           setCheckListEditing(true);
  //         }}
  //         placeholder="Measurement Value"
  //         disabled={!state}
  //       />
  //     );
  //   }

  //   if (name === 'ratingToFive') {
  //     return (
  //       <ButtonGroup className="mb-1">
  //         <Button
  //           className={parseInt(columnValue(each)) >= 1 ? 'active' : ''}
  //           onClick={(e) => {
  //             setTodoValue(each, columnValue(each) === '1' ? '' : '1');
  //             setCheckListEditing(true);
  //           }}
  //           outline={parseInt(columnValue(each)) >= 1 ? false : true}
  //           color="primary"
  //           disabled={!state}
  //         >
  //           <span>1</span>
  //         </Button>
  //         <Button
  //           className={parseInt(columnValue(each)) >= 2 ? 'active' : ''}
  //           onClick={(e) => {
  //             setTodoValue(each, columnValue(each) === '2' ? '' : '2');
  //             setCheckListEditing(true);
  //           }}
  //           outline={parseInt(columnValue(each)) >= 2 ? false : true}
  //           color="primary"
  //           disabled={!state}
  //         >
  //           <span>2</span>
  //         </Button>
  //         <Button
  //           className={parseInt(columnValue(each)) >= 3 ? 'active' : ''}
  //           onClick={(e) => {
  //             setTodoValue(each, columnValue(each) === '3' ? '' : '3');
  //             setCheckListEditing(true);
  //           }}
  //           outline={parseInt(columnValue(each)) >= 3 ? false : true}
  //           color="primary"
  //           disabled={!state}
  //         >
  //           <span>3</span>
  //         </Button>
  //         <Button
  //           className={parseInt(columnValue(each)) >= 4 ? 'active' : ''}
  //           onClick={(e) => {
  //             setTodoValue(each, columnValue(each) === '4' ? '' : '4');
  //             setCheckListEditing(true);
  //           }}
  //           outline={parseInt(columnValue(each)) >= 4 ? false : true}
  //           color="primary"
  //           disabled={!state}
  //         >
  //           <span>4</span>
  //         </Button>
  //         <Button
  //           className={parseInt(columnValue(each)) >= 5 ? 'active' : ''}
  //           onClick={(e) => {
  //             setTodoValue(each, columnValue(each) === '5' ? '' : '5');
  //             setCheckListEditing(true);
  //           }}
  //           outline={parseInt(columnValue(each)) >= 5 ? false : true}
  //           color="primary"
  //           disabled={!state}
  //         >
  //           <span>5</span>
  //         </Button>
  //       </ButtonGroup>
  //     );
  //   }

  //   if (name === 'ratingToTen') {
  //     return (
  //       <ButtonGroup className="mb-1">
  //         <Button
  //           className={parseInt(columnValue(each)) >= 1 ? 'active' : ''}
  //           onClick={(e) => {
  //             setTodoValue(each, columnValue(each) === '1' ? '' : '1');
  //             setCheckListEditing(true);
  //           }}
  //           outline={parseInt(columnValue(each)) >= 1 ? false : true}
  //           color="primary"
  //           size="sm"
  //           disabled={!state}
  //         >
  //           <span>1</span>
  //         </Button>
  //         <Button
  //           className={parseInt(columnValue(each)) >= 2 ? 'active' : ''}
  //           onClick={(e) => {
  //             setTodoValue(each, columnValue(each) === '2' ? '' : '2');
  //             setCheckListEditing(true);
  //           }}
  //           outline={parseInt(columnValue(each)) >= 2 ? false : true}
  //           color="primary"
  //           size="sm"
  //           disabled={!state}
  //         >
  //           <span>2</span>
  //         </Button>
  //         <Button
  //           className={parseInt(columnValue(each)) >= 3 ? 'active' : ''}
  //           onClick={(e) => {
  //             setTodoValue(each, columnValue(each) === '3' ? '' : '3');
  //             setCheckListEditing(true);
  //           }}
  //           outline={parseInt(columnValue(each)) >= 3 ? false : true}
  //           color="primary"
  //           size="sm"
  //           disabled={!state}
  //         >
  //           <span>3</span>
  //         </Button>
  //         <Button
  //           className={parseInt(columnValue(each)) >= 4 ? 'active' : ''}
  //           onClick={(e) => {
  //             setTodoValue(each, columnValue(each) === '4' ? '' : '4');
  //             setCheckListEditing(true);
  //           }}
  //           outline={parseInt(columnValue(each)) >= 4 ? false : true}
  //           color="primary"
  //           size="sm"
  //           disabled={!state}
  //         >
  //           <span>4</span>
  //         </Button>
  //         <Button
  //           className={parseInt(columnValue(each)) >= 5 ? 'active' : ''}
  //           onClick={(e) => {
  //             setTodoValue(each, columnValue(each) === '5' ? '' : '5');
  //             setCheckListEditing(true);
  //           }}
  //           outline={parseInt(columnValue(each)) >= 5 ? false : true}
  //           color="primary"
  //           size="sm"
  //           disabled={!state}
  //         >
  //           <span>5</span>
  //         </Button>
  //         <Button
  //           className={parseInt(columnValue(each)) >= 6 ? 'active' : ''}
  //           onClick={(e) => {
  //             setTodoValue(each, columnValue(each) === '6' ? '' : '6');
  //             setCheckListEditing(true);
  //           }}
  //           outline={parseInt(columnValue(each)) >= 6 ? false : true}
  //           color="primary"
  //           size="sm"
  //           disabled={!state}
  //         >
  //           <span>6</span>
  //         </Button>
  //         <Button
  //           className={parseInt(columnValue(each)) >= 7 ? 'active' : ''}
  //           onClick={(e) => {
  //             setTodoValue(each, columnValue(each) === '7' ? '' : '7');
  //             setCheckListEditing(true);
  //           }}
  //           outline={parseInt(columnValue(each)) >= 7 ? false : true}
  //           color="primary"
  //           size="sm"
  //           disabled={!state}
  //         >
  //           <span>7</span>
  //         </Button>
  //         <Button
  //           className={parseInt(columnValue(each)) >= 8 ? 'active' : ''}
  //           onClick={(e) => {
  //             setTodoValue(each, columnValue(each) === '8' ? '' : '8');
  //             setCheckListEditing(true);
  //           }}
  //           outline={parseInt(columnValue(each)) >= 8 ? false : true}
  //           color="primary"
  //           size="sm"
  //           disabled={!state}
  //         >
  //           <span>8</span>
  //         </Button>
  //         <Button
  //           className={parseInt(columnValue(each)) >= 9 ? 'active' : ''}
  //           onClick={(e) => {
  //             setTodoValue(each, columnValue(each) === '9' ? '' : '9');
  //             setCheckListEditing(true);
  //           }}
  //           outline={parseInt(columnValue(each)) >= 9 ? false : true}
  //           color="primary"
  //           size="sm"
  //           disabled={!state}
  //         >
  //           <span>9</span>
  //         </Button>
  //         <Button
  //           className={parseInt(columnValue(each)) >= 10 ? 'active' : ''}
  //           onClick={(e) => {
  //             setTodoValue(each, columnValue(each) === '10' ? '' : '10');
  //             setCheckListEditing(true);
  //           }}
  //           outline={parseInt(columnValue(each)) >= 10 ? false : true}
  //           color="primary"
  //           size="sm"
  //           disabled={!state}
  //         >
  //           <span>10</span>
  //         </Button>
  //       </ButtonGroup>
  //     );
  //   }

  //   return <>{name}</>;
  //   // <Input type="file" />
  // }

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

    // // if has Answer but employee Id null ... mark as admin
    // if (isTodoCompleted && isTodoCompleted.employeeId === null) {
    //   return (
    //     <>{`${userData?.fullName}-${moment(todo?._date).format('MMMM Do YYYY, h:mm:ss A')}`}</>
    //   );
    // }

    // if (!isTodoCompleted._id) {
    //   return <></>;
    // }

    // // Else Render Employee
    // return (
    //   <>
    //     {`${isTodoCompleted?.employee[0]?.fullName}-${moment(todo?._date).format(
    //       'MMMM Do YYYY, h:mm:ss a'
    //     )}`}
    //   </>
    // );
  }

  function renderStaffDesignation(todo) {
    const isTodoCompleted = selectedWorkingCheckList?.schedule[0]?.checkList.find(
      (x) => x?.checkListId === todo?._id
    );

    if (!isTodoCompleted) {
      return <></>;
    }

    // if has Answer but employee Id null ... mark as admin
    if (isTodoCompleted && isTodoCompleted.employeeId === null) {
      return <>Admin</>;
    }

    if (!isTodoCompleted._id) {
      return <></>;
    }

    // Else Render Employee
    return <>{isTodoCompleted?.employee[0]?.position}</>;
  }

  // ** renderStaffPhoto completed
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

    // return (
    //   <Avatar
    //     content={userData?.fullName}
    //     color={genBadgeColor(userData?.fullName)}
    //     imgHeight="38"
    //     imgWidth="38"
    //     initials
    //   />
    // );

    // // if has Answer but employee Id null ... mark as admin
    // if (isTodoCompleted && isTodoCompleted.employeeId === null) {
    //   const color = genBadgeColor(userData?.fullName);
    //   return (
    //     <Avatar content={userData?.fullName} color={color} imgHeight="38" imgWidth="38" initials />
    //   );
    // }

    // if (!isTodoCompleted._id) {
    //   return <></>;
    // }

    // // Else Render Employee
    // let nameArr = String(isTodoCompleted?.employee[0]?.fullName).split(' ');

    // let nameLastPart = '';
    // if (nameArr[1]) {
    //   nameLastPart = nameArr[1].length > 0 ? nameArr[1][0] : '';
    // }

    // return <Avatar content={`${nameArr[0][0]} ${nameLastPart}`} imgHeight="38" imgWidth="38" />;
  }

  function renderContentwithImage(editingState, current_todo) {
    return editingState ? (
      <div className="d-flex align-items-end justify-content-between">
        <div>
          <div className="mb-1">
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
            />
            <Label htmlFor={`upload-${current_todo._id}`}>
              <a className="btn btn-success">{uploadBtnName[current_todo.proofType]}</a>
            </Label>
          </div>
          <div className="d-flex align-items-center">
            {renderStafPhoto(current_todo)}
            <div className="ms-50">
              <h6 className="mb-0">{renderStaffNameAndDate(current_todo)}</h6>
            </div>
          </div>
        </div>
        <div className="uploaded-proof-photo">
          {current_todo.ans ? (
            <img
              id={`${current_todo._id.toString()}-upload-photo`}
              src={current_todo.ans}
              height={'60px'}
              onMouseEnter={setZoomPhotoState(current_todo.ans)}
              onMouseLeave={setZoomPhotoState(null)}
            />
          ) : (
            <img
              id={`${current_todo._id.toString()}-upload-photo`}
              src={current_todo._id === todo?._id ? file?.url : null}
              height={'60px'}
              onMouseEnter={setZoomPhotoState(current_todo.ans)}
              onMouseLeave={setZoomPhotoState(null)}
            />
          )}
        </div>
      </div>
    ) : (
      <div className="d-flex align-items-end justify-content-between">
        <div className="d-flex align-items-center">
          {renderStafPhoto(current_todo)}
          <div className="ms-50">
            <h6 className="mb-0">{renderStaffNameAndDate(current_todo)}</h6>
          </div>
        </div>
        <div className="uploaded-proof-photo">
          <img
            id={`${current_todo._id.toString()}-upload-photo`}
            style={{ cursor: 'pointer', borderRadius: '5px' }}
            src={current_todo.ans}
            height={'60px'}
            // onMouseEnter={setZoomPhotoState(current_todo.ans)}
            // onMouseLeave={setZoomPhotoState(null)}
            onClick={(e) => {
              e.preventDefault();
              setZoomPhotoState(current_todo.ans);
            }}
          />
        </div>
      </div>
    );
  }

  function renderContent(todo, editingState) {
    switch (todo.proofType) {
      case 'check':
        return (
          <>
            <div
              className="mb-1"
              style={{ minHeight: editingState ? '0px' : todo.ans ? '20px' : '41px' }}
            >
              {editingState ? (
                <div className="form-check">
                  <Input
                    value={columnValue(todo) || todo.ans}
                    checked={(columnValue(todo) || todo.ans) === 'true' ? true : false}
                    onClick={(e) => {
                      setTodoValue(todo, e.target.value === 'false' ? 'true' : 'false');
                      setCheckListEditing(true);
                    }}
                    type="checkbox"
                  />
                  {checkBoxState ? ' Checked' : ' Unchecked'}
                </div>
              ) : todo.ans === 'true' ? (
                <Check size={80} style={{ float: 'right', fontWeight: 'bold', color: '#28c76f' }} />
              ) : (
                <FiX size={80} style={{ float: 'right', fontWeight: 'bold', color: '#a5a5a5' }} />
              )}
            </div>
            {/* {todo.ans ? ( */}
            <div className="d-flex align-items-center">
              {renderStafPhoto(todo)}
              <div className="ms-50">
                <h6 className="mb-0">{renderStaffNameAndDate(todo)}</h6>
              </div>
            </div>
            {/* // ) : null} */}
          </>
        );
      case 'yesNo':
        return (
          <>
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
              {/* ) : todo.ans === 'yes' ? (
                <Check size={80} style={{ float: 'right', fontWeight: 'bold', color: '#28c76f' }} />
              ) : (
                <FiX size={80} style={{ float: 'right', fontWeight: 'bold', color: '#a5a5a5' }} />
              )} */}
            </div>
            {/* {todo.ans ? ( */}
            <div className="d-flex align-items-center">
              {renderStafPhoto(todo)}
              <div className="ms-50">
                <h6 className="mb-0">{renderStaffNameAndDate(todo)}</h6>
              </div>
            </div>
            {/* ) : null} */}
          </>
        );
      case 'input':
        return (
          <>
            <div className="mb-1" style={{ width: '30%' }}>
              {editingState ? (
                <Input
                  value={columnValue(todo) || todo.ans}
                  onChange={(e) => {
                    setTodoValue(todo, e.target.value);
                    setCheckListEditing(true);
                  }}
                  placeholder="Input Value"
                />
              ) : todo.ans ? (
                <>{todo.ans}</>
              ) : (
                <Input placeholder="Input Value" disabled />
              )}
            </div>
            {/* {todo.ans ? ( */}
            <div className="d-flex align-items-center">
              {renderStafPhoto(todo)}
              <div className="ms-50">
                <h6 className="mb-0">{renderStaffNameAndDate(todo)}</h6>
              </div>
            </div>
            {/* ) : null} */}
          </>
        );
      case 'photo':
        return renderContentwithImage(editingState, todo);
      case 'qrCode':
        return renderContentwithImage(editingState, todo);
      case 'barCode':
        return renderContentwithImage(editingState, todo);
      case 'measurement':
        return (
          <>
            <div className="mb-1" style={{ width: '30%' }}>
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
                <>{todo.ans}</>
              ) : (
                <Input placeholder="Measurement Value" disabled />
              )}
            </div>
            {/* {todo.ans ? ( */}
            <div className="d-flex align-items-center">
              {renderStafPhoto(todo)}
              <div className="ms-50">
                <h6 className="mb-0">{renderStaffNameAndDate(todo)}</h6>
              </div>
            </div>
            {/* ) : null} */}
          </>
        );
      case 'ratingToFive':
        return (
          <>
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
            {/* {renderRating(rateFiveState, todo.proofType)} */}
            {/* {todo.ans ? ( */}
            <div className="d-flex align-items-center">
              {renderStafPhoto(todo)}
              <div className="ms-50">
                <h6 className="mb-0">{renderStaffNameAndDate(todo)}</h6>
              </div>
            </div>
            {/* ) : null} */}
          </>
        );
      case 'ratingToTen':
        return (
          <>
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

            {/* {todo.ans ? ( */}
            <div className="d-flex align-items-center">
              {renderStafPhoto(todo)}
              <div className="ms-50">
                <h6 className="mb-0">{renderStaffNameAndDate(todo)}</h6>
              </div>
            </div>
            {/* ) : null} */}
          </>
        );
      default:
        break;
    }
  }

  function renderTitle(todo) {
    const { proofType, title, dateTime } = todo;
    switch (proofType) {
      case 'check':
        return (
          <div className="cursor-pointer">
            {/* <Check size={20} className="mb-30" /> */}
            {title}
            {/* {' - '}
            {moment(dateTime).format('MMMM Do YYYY, h:mm:ss A')} */}
          </div>
        );
      case 'yesNo':
        return (
          <div className="cursor-pointer">
            {/* <VscArrowBoth size={20} className="mb-30" /> */}
            {title}
            {/* {' - '}
            {moment(dateTime).format('MMMM Do YYYY, h:mm:ss A')} */}
          </div>
        );
      case 'input':
        return (
          <div className="cursor-pointer">
            {/* <AlignLeft size={20} className="mb-30" /> */}
            {title}
            {/* {' - '}
            {moment(dateTime).format('MMMM Do YYYY, h:mm:ss A')} */}
          </div>
        );
      case 'photo':
        return (
          <div className="cursor-pointer">
            {/* <Camera size={20} className="mb-30" /> */}
            {title}
            {/* {' - '}
            {moment(dateTime).format('MMMM Do YYYY, h:mm:ss A')} */}
          </div>
        );
      case 'qrCode':
        return (
          <div className="cursor-pointer">
            {/* <AiOutlineQrcode size={20} className="mb-30" /> */}
            {title}
            {/* {' - '}
            {moment(dateTime).format('MMMM Do YYYY, h:mm:ss A')} */}
          </div>
        );
      case 'barCode':
        return (
          <div className="cursor-pointer">
            {/* <AiOutlineBarcode size={20} className="mb-30" /> */}
            {title}
            {/* {' - '}
            {moment(dateTime).format('MMMM Do YYYY, h:mm:ss A')} */}
          </div>
        );
      case 'measurement':
        return (
          <div className="cursor-pointer">
            {/* <TiSortNumerically size={20} className="mb-30" /> */}
            {title}
            {/* {' - '}
            {moment(dateTime).format('MMMM Do YYYY, h:mm:ss A')} */}
          </div>
        );
      case 'ratingToFive':
        return (
          <div className="cursor-pointer">
            {/* <RiNumber5 size={20} className="mb-30" /> */}
            {title}
            {/* {' - '}
            {moment(dateTime).format('MMMM Do YYYY, h:mm:ss A')} */}
          </div>
        );
      case 'ratingToTen':
        return (
          <div className="cursor-pointer">
            {/* <RiNumber1 size={20} className="mb-30" /> */}
            {/* <RiNumber0 size={20} className="mb-30" style={{ marginLeft: '-8px' }} /> */}
            {title}
            {/* {' - '}
            {moment(dateTime).format('MMMM Do YYYY, h:mm:ss A')} */}
          </div>
        );
      default:
        break;
    }
  }

  useMemo(() => {
    // setTodoList(demo)
    if (selectedWorkingCheckList) {
      // checkList
      let list = selectedWorkingCheckList?.checkList;
      let listAns = selectedWorkingCheckList?.schedule[0]?.checkList;

      // Pre-processing list
      let newList = [];
      if (list.length > 0 && listAns) {
        for (let each of list) {
          let selSchedul = listAns.filter((x) => x.checkListId === each._id);
          newList.push({
            ...each,
            _date: selSchedul.length > 0 ? selSchedul[0]._date : null,
            ans: selSchedul.length > 0 ? selSchedul[0].ans : null
          });
        }
      }
      if (newList.length > 0) {
        let data = [];
        let serial = 0;
        for (let each of newList) {
          serial++;
          if (!selectedWorkingCheckList.completedEditor) {
            // switch (each.proofType) {
            //   // case 'check':
            //   //   each.ans === 'true' ? setCheckBoxState(true) : setCheckBoxState(false);
            //   //   break;
            //   // case 'yesNo':
            //   //   each.ans === 'yes' ? setYesNNoState('yes') : setYesNNoState('no');
            //   //   break;
            //   // case 'ratingToFive':
            //   //   setTodoValue(each, each.ans);
            //   //   break;
            //   case 'ratingToTen':
            //     setRateTenState(parseInt(each.ans));
            //     break;
            //   default:
            //     break;
            // }
          }
          data.push({
            title: each ? renderTitle(each) : null,
            icon: <span>{serial}</span>,
            // content: !each.ans
            //   ? renderContent(each, selectedWorkingCheckList.completedEditor)
            //   : null,
            // (
            //   <div style={{ width: '36%' }}>
            //     {TodosMethod(each, selectedWorkingCheckList.completedEditor)}
            //   </div>
            // )
            meta: each?.ans ? (
              <div style={{ color: '#28c76f', fontWeight: 'bold' }}>
                {/* <Check size={20} /> */}
                {' COMPLETED'}
              </div>
            ) : (
              <div style={{ color: '#42a5f5', fontWeight: 'bold' }}>{' PENDING'}</div>
            ),
            customContent: renderContent(each, selectedWorkingCheckList.completedEditor)
          });
        }

        // After Finish List Draw List
        setTodoList(data);
      } else {
        setTodoList([]);
      }
    }
  }, [selectedWorkingCheckList]);

  useMemo(() => {
    setTimeout(() => {
      // console.clear()
    }, [1000]);
  }, []);

  return {
    todoList
  };
};

export default useTodoList;
