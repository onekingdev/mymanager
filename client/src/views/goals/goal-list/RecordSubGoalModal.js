import React, { useState } from 'react'
import { Modal, ModalHeader,Row,Col, ModalBody, ModalFooter, Button, Input, Label } from 'reactstrap'
import { actionPlanAddAction, subGoalsAddAction, subGoalsEditAction } from '../../taskngoals/store/actions'
import { useDispatch } from 'react-redux'
import { generateProgressOfCurrentProgress } from '../helpers/renderProgressData'
import { toast } from 'react-toastify'
function RecordSubGoalModal({ toggle, modal, goal, parentId, workspaceId }) {
  const [progress, setProgress] = useState({})
  const dispatch = useDispatch();
  const checker = (goal) => {
    if (goal.progressType === "CompletedTasks" || goal.progressType === "SubGoals") {
      return (false)
    }
    if (goal.progressType === "AllTasks" || goal.progressType === "CurrentProgress") {
      return (true)
    }
    return (null);
  }
  const handleComplete = () => {
    const payload = { status: "Completed" }
    const id = goal?._id
    dispatch(subGoalsEditAction(id, payload, parentId))
    dispatch(actionPlanAddAction(parentId, workspaceId, {type:"completion",recordedValue:"Complete",label:"",parentGoalId:goal._id,title: goal?.name, action: "Completed",outcome:"Completed", status: "Completed" }))
    toggle()

  }
  const handleUpdate = () => {
    if (generateProgressOfCurrentProgress(goal, "check")) {
      if ((parseInt(goal?.currentProgress) - parseInt(progress.currentProgress)) <= parseInt(goal?.measureTo)) {
        const id = goal?._id;
        let payload = {};
        payload.currentProgress = parseInt(goal?.currentProgress) - parseInt(progress.currentProgress)
        if (payload.currentProgress < (parseInt(goal?.measureTo) - 10)) {
          toast.error("Please Record a Valid weight");
          return
        }
        payload.status = "Completed";
        dispatch(subGoalsEditAction(id, payload, parentId))
        dispatch(actionPlanAddAction(parentId, workspaceId, {type:"decrease",label:goal?.measureLabel,recordedValue:progress.currentProgress,parentGoalId:goal?._id, title: goal?.name, action: "Edit",outcome:payload.currentProgress, status: "Completed" }))
        toggle();
      }
      else {
        const id = goal?._id
        let payload = {};
        const myProgress = parseInt(goal?.currentProgress) - parseInt(progress.currentProgress)
        payload.currentProgress = myProgress
        dispatch(subGoalsEditAction(id, payload, parentId))
        dispatch(actionPlanAddAction(parentId, workspaceId, {type:"decrease",recordedValue:progress.currentProgress,label:goal?.measureLabel,parentGoalId:goal?._id, title: goal?.name, action: "Edit", outcome: myProgress }))
        toggle();
      }
    }
    else {
      if ((parseInt(progress.currentProgress) + parseInt(goal.currentProgress)) >= parseInt(goal?.measureTo)) {
        const id = goal?._id;
        let payload = {};
        payload.currentProgress = parseInt(progress.currentProgress) + parseInt(goal?.currentProgress);
        payload.status = "Completed";
        dispatch(subGoalsEditAction(id, payload, parentId))
        dispatch(actionPlanAddAction(parentId, workspaceId, {label:goal?.measureLabel,type:"increase",recordedValue:parseInt(progress.currentProgress),parentGoalId:goal?._id, title: goal?.name, action: "Edit",outcome:payload.currentProgress, status: "Completed" }))
        toggle();
      }
      else {
        const id = goal?._id
        let payload = {};
        payload.currentProgress = parseInt(progress.currentProgress) + parseInt(goal?.currentProgress);
        dispatch(subGoalsEditAction(id, payload, parentId))
        dispatch(actionPlanAddAction(parentId, workspaceId, {type:"increase",recordedValue:progress.currentProgress,label:goal?.measureLabel,parentGoalId:goal?._id, title: goal?.name, action: "Edit", outcome: parseInt(progress.currentProgress) + parseInt(goal.currentProgress) }))
        toggle();
      }

    }

  }
  return (
    <Modal isOpen={modal} centered={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>Record Progress</ModalHeader>
      <ModalBody>
        {goal && checker(goal) ? <>
          <Row className="mt-2">
            <Col>
              <h5>Goal: {goal.measureLabel==="$"?goal?.measureLabel+' '+goal?.measureTo:goal?.measureTo+' '+goal?.measureLabel} </h5>
            </Col>
            <Col>
              <h5>Started From: {goal.measureLabel==="$"?goal?.measureLabel+' '+goal?.measureFrom:goal?.measureFrom+' '+goal?.measureLabel}</h5>
            </Col>
          </Row>

          <p className="text-secondary mt-1">Current: {(goal.measureLabel==="$"?goal?.measureLabel+' '+goal?.currentProgress:goal?.currentProgress+' '+goal?.measureLabel)||0}</p>
          <Input placeholder={"Enter Achieved ~" + goal?.measureLabel} name="currentProgress" className="mt-3" type="number" onChange={(e) => setProgress({ [e.target.name]: e.target.value })}></Input></> :
          <h4>Mark this Goal as Complete!</h4>
        }
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        {goal && checker(goal) ?
          <Button color="primary" onClick={handleUpdate}>Update</Button> :
          <Button color="primary" onClick={handleComplete}>Complete</Button>
        }
      </ModalFooter>
    </Modal>
  )
}

export default RecordSubGoalModal