
import { Handle, Position } from 'react-flow-renderer';
import { useDispatch, useSelector } from 'react-redux';
import { setOnEditableContactAction, setOnShowAddNewActionSideBarAction, setDetailId, setAddedParentAction, setActions } from '../../store/actions';
import sendEmailSvg from '../../../../../assets/images/svg/send_email.svg';
import sendTextSvg from '../../../../../assets/images/svg/send_text.svg';
import automationSvg from '../../../../../assets/images/svg/automation.svg';
import followUpSvg from '../../../../../assets/images/svg/follow_up.svg';
import watchedVideoSvg from '../../../../../assets/images/svg/watched_video.svg';
import contactConditionSvg from '../../../../../assets/images/svg/contact_condition.svg';
import { datatablesSlice } from '../../../../tables/data-tables/store';
import { useEffect, useState } from 'react';
import { onChildRemoved } from 'firebase/database';
import { Popover, PopoverBody } from 'reactstrap'
import { date } from 'yup';


const handleStyle = { left: 10 };

function CustomNode({ data, isConnectable }) {

  const [isCondition, setIsCondition] = useState(false);
  const actions = useSelector(state => state.automation.selectedAutomation.actions);
  const automationData = useSelector(state => state.automation.selectedAutomation);
  const showDetailId = useSelector(state => state.automation.showDetailId)
  const isConditionEmail = () => {
    if (data.actionType == 'email') {
      const childIndex = actions.findIndex(item => item.parentId == data.id && item.actionType == 'condition')
      if (childIndex != -1) {
        setIsCondition(true)
      }
    }
  }
  useEffect(() => {
    isConditionEmail()
  }, [])
  const dispatch = useDispatch();

  const editContact = () => {
    dispatch(setOnEditableContactAction())
  }
  const addNewNode = () => {

    dispatch(setOnShowAddNewActionSideBarAction())
    dispatch(setAddedParentAction(data))
  }
  let allBranches = []
  function getAllBranch(id) {
    let children = actions.filter(item => item.parentId == id)
    if (children.lenth == 0) {
      return allBranches;
    } else {
      children.map(child => {
        allBranches.push(child.id)
        getAllBranch(child.id)
      })
    }

  }

  const Start = () => {
    return (
      <>
        {automationData.activationUpon.uponType != undefined ? automationData.activationUpon.uponType : "START"}
        {automationData.activationUpon.uponType != undefined && <p style={{ marginBottom: '0px', fontSize: '11px', textAlign: 'center', color: 'rgb(242, 132, 34)' }}>{automationData.activateTime.isImmediately ? "Send Immediately" : 'Send ' + automationData.activateTime.time + ' ' + automationData.activateTime.unit + ' ' + automationData.activateTime.type.toLowerCase()}</p>}
      </>
    )
  }
  const deleteCondition = () => {
    getAllBranch(data.id)
    // console.log(allBranches)
    const updatedActions = []
    actions.map(item => {
      const index = allBranches.findIndex(child => child == item.id)
      if (index == -1) {
        updatedActions.push(item)
      }
    })

    let updatedCurrent;
    let _confirmProgression = {
      isPercentConfirm: false,
      percentage: 0
    }

    let finalActions;
    const currentIndex = updatedActions.findIndex(_action => _action.id == data.id);
    const currentAction = updatedActions[currentIndex]
    updatedCurrent = { ...currentAction, isLast: true, confirmProgress: _confirmProgression }
    finalActions = [
      ...updatedActions.slice(0, currentIndex),
      updatedCurrent,
      ...updatedActions.slice(currentIndex + 1)
    ]
    dispatch(setActions(finalActions))

  }

  const showOption = (e) => {
    dispatch(setDetailId(e));
  }
  return (
    <div style={{ padding: 'auto', alignItems: 'center' }}>
      <Handle type="target" position={Position.Top}
        style={{
          background: 'transparent',
          borderRadius: '0px',
          width: '12px',
          height: '12px',
        }} />

      <div style={{ borderRadius: '50%', margin: 'auto', padding: "auto", width: '110px', height: '55px', cursor: 'pointer' }} >

        <div style={{ margin: 'auto', padding: 'auto' }} >
          {data.actionType == 'email' && data.attachments.length == 0 && (
            <img src={sendEmailSvg} id={data.id} onClick={(e) => showOption(e.target.id)} alt="email" style={{ position: 'absolute', marginLeft: '-28px' }} height="50" width="165" />
          )}
          {data.actionType == 'email' && data.attachments.length > 0 && <img src={watchedVideoSvg} onClick={(e) => showOption(e.target.id)} id={data.id} alt="email" style={{ position: 'absolute', marginLeft: '-28px' }} height="50" width="165" />}
          {data.actionType == 'text' && (
            <img src={sendTextSvg} id={data.id} onClick={(e) => showOption(e.target.id)} alt="text" height="50" width="165" style={{ position: 'absolute', marginLeft: '-28px' }} />
          )}
          {data.actionType == 'notification' && (
            <img src={followUpSvg} id={data.id} onClick={(e) => showOption(e.target.id)} alt="note" height="50" width="165" style={{ position: 'absolute', marginLeft: '-28px' }} />
          )}
          {data.actionType == 'automation' && (
            <img src={automationSvg} id={data.id} onClick={(e) => showOption(e.target.id)} alt="automation" height="50" width="165" style={{ position: 'absolute', marginLeft: '-28px' }} />
          )}

          {data.actionType == 'condition' && data.condition == "yes" && (
            <div style={{ position: 'absolute', marginLeft: '35px' }} >
              <div style={{
                padding: '2px 6px',
                width: '44px',
                textAlign: 'center',
                margin: 'auto',
                marginTop: '10px',
                background: 'green',
                borderRadius: '5px',
                color: 'aliceblue'
              }} >YES</div>

            </div>
          )}
          {data.actionType == 'condition' && data.condition == "no" && (
            <div style={{ position: 'absolute', marginLeft: '35px' }} >
              <div style={{
                padding: '2px 6px',
                width: '44px',
                textAlign: 'center',
                margin: 'auto',
                marginTop: '10px',
                background: 'red',
                borderRadius: '5px',
                color: 'aliceblue'
              }} >NO</div>

            </div>
          )}
          {data.actionType == 'editContact' && (
            <img src={contactConditionSvg} alt="condition" height="50" width="165" style={{ position: 'absolute', marginLeft: '-28px' }} onClick={() => editContact()} />
          )}


        </div>

      </div>
      <div>
        {data.actionType != 'condition' && <><p style={{ marginBottom: '0px', textAlign: 'center', fontWeight: 'bold' }}>{data.actionType == 'editContact' ? <Start /> : data.actionType.toUpperCase()}</p>
          {data.actionType == 'editContact' ? <p style={{ marginBottom: '0px', fontSize: '11px', textAlign: 'center', color: 'transparent' }}></p> : <p style={{ marginBottom: '0px', fontSize: '11px', textAlign: 'center', color: 'rgb(242, 132, 34)' }}>{data.duration.time} {data.duration.unit} after</p>}</>}

      </div>
      {isCondition ?
        <>
          <div style={{ position: 'absolute', width: '50px', height: '40px', background: 'white', borderRadius: " 50%", zIndex: "999", left: '20px', top: '150px' }}>
            Watched Video?
            {data.confirmProgress.isPercentConfirm ?
              <div style={{
                position: 'absolute',
                background: '#174ae7',
                left: '18px',
                color: 'white',
                padding: '2px 4px',
                borderRadius: '3px',
                top: '45px'
              }}>{data.confirmProgress.percentage}%</div> : ''}
          </div>
          <div style={{ cursor: 'pointer', position: 'absolute', width: '20px', height: '20px', background: '#9a9a9a', borderRadius: " 50%", zIndex: "999", left: '80px', top: '130px' }} onClick={() => deleteCondition()}>
            <p style={{ position: 'absolute', color: 'white', fontSize: '18px', left: '4px' }}>X</p>
          </div>
        </>
        : <>
          {data.actionType == "condition" ? <div style={{ cursor: 'pointer', position: 'absolute', width: '20px', height: '20px', background: 'white', border: '2px solid #b1b1b7', borderRadius: " 50%", zIndex: "999", left: '46px', top: '100px' }} onClick={() => addNewNode()}>
            <p style={{ position: 'absolute', fontSize: '27px', top: '-2px' }}>+</p>
          </div> : <div style={{ cursor: 'pointer', position: 'absolute', width: '20px', height: '20px', background: 'white', border: '2px solid #b1b1b7', borderRadius: " 50%", zIndex: "999", left: '46px', top: '125px' }} onClick={() => addNewNode()}>
            <p style={{ position: 'absolute', fontSize: '27px', top: '-2px' }}>+</p>
          </div>}
        </>}

      <Handle type="source" position={Position.Bottom} style={{ background: '#b1b1b7' }} id="b" />
      {(data.isLast || (data.actionType == "editContact" && data.isLast)) && <div style={{ position: 'absolute', marginTop: '4px', left: '55px', borderLeft: '1px dashed #b1b1b7', height: '45px' }} ></div>}
    </div>
  );
}

export default CustomNode;
