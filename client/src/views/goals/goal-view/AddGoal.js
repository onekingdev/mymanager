import React, { Fragment, useState } from 'react';
import {
  Button,
  FormGroup,
  Input,
  Row,
  Col,
  Label,
  FormText,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
} from 'reactstrap';
import { goalsAddAction, subGoalsAddAction } from '../../taskngoals/store/actions';
import { useDispatch } from 'react-redux';
import Flatpickr from 'react-flatpickr';
import { toast } from 'react-toastify';
import '@styles/react/libs/editor/editor.scss';
export default function AddGoal({ task, toggle, type, workspaceId }) {
  //redux
  const dispatch = useDispatch();
  //states
  const [activeTab, setActiveTab] = useState('1');
  const [trackProgress, setTrackProgress] = useState("CompletedTasks");
  const [measuringEntity, setMeasuringEntity] = useState("")
  const [formData, setFormData] = useState();
  //funciton to handle input
  const handleInput = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, file: e.target.files[0] });
      return
    }
    if (e.target.name === "measureFrom") {
      setFormData({ ...formData, measureFrom: e.target.value, currentProgress: e.target.value })
    }
    else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }
  //function to dispatch API accordingly i.e. goal or subgoal
  const handleAdd = (e) => {
    e.preventDefault();

    if (formData.progressType === "CurrentProgress" && (measuringEntity != "Weight" && measuringEntity != "Amount")) {
      toast.error("Please Select Measuring Entity")
      return
    }
    if (formData.progressType === "CurrentProgress" && (formData.measureLabel === "Select" || !formData.measureLabel)) {
      toast.error("Please Select Measuring Label")
      return
    }

    if (!formData.startDate || !formData.endDate) {
      toast.error("Please Select Start Date and End Date")
      return
    }
    if (!formData.progressType) {
      toast.error("Please Select Progress Type")
      return
    }
    const payload = new FormData();
    formData.name != undefined && payload.append('name', formData.name);
    formData.startDate != undefined && payload.append('startDate', formData.startDate);
    formData.endDate != undefined && payload.append('endDate', formData.endDate);
    formData.progressType != undefined && payload.append('progressType', formData.progressType);
    formData.vision != undefined && payload.append('vision', formData.vision);
    formData.purpose != undefined && payload.append('purpose', formData.purpose);
    formData.obstacle != undefined && payload.append('obstacle', formData.obstacle);
    formData.resource != undefined && payload.append('resource', formData.resource);
    formData.file != undefined && payload.append('file', formData.file);
    payload.append('workSpace', workspaceId)

    // payload.append('file',file);
    if (trackProgress === "AllTasks" || trackProgress === "CurrentProgress") {
      formData.measureFrom != undefined && payload.append('measureFrom', formData.measureFrom)
      formData.measureTo != undefined && payload.append('measureTo', formData.measureTo)
      formData.measureLabel != undefined && payload.append('measureLabel', formData.measureLabel)
      measuringEntity === "Amount" && payload.append('currentProgress', 0)
      measuringEntity === "Amount" && payload.append('measureFrom', 0)
      measuringEntity === "Weight" && payload.append('currentProgress', formData.measureFrom)
    }
    { type === "sub" ? dispatch(subGoalsAddAction(task._id, workspaceId, "target", payload)) : dispatch(goalsAddAction(workspaceId, "target", payload)) }
    toggle(task)
  }
  //function to  
  const handleTrackProgressChanged = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setTrackProgress(e.target.value);
  };
  const calculateMinDate = (startDate) => {
    try {

      if (startDate) {
        const start = new Date(startDate);
        start.setDate(start.getDate() + 1);
        return start
      }
    }
    catch {
      return null
    }
  }
  return (
    <Fragment>
      {type === 'sub' ? (
        <ModalHeader toggle={() => toggle(task)}>Add A New Sub Goal For {task.name}</ModalHeader>
      ) : (
        <ModalHeader>Add A New Goal</ModalHeader>
      )}
      <ModalBody>
        <Form onSubmit={(e) => handleAdd(e)}>
          <Label>Goal Name</Label>
          <Input type="text" name="name" placeholder="What is your goal?" onChange={handleInput} required />
          <Label>Start Date</Label>
          {/* <Input name="startDate" min={type === "sub" && task?.startDate} max={type === "sub" && task?.endDate} onChange={handleInput} required type="date" /> */}
          <Flatpickr
            name="startDate"
            className="form-control"
            required
            onChange={(date, dateStr) => setFormData({ ...formData, "startDate": dateStr })}
            placeholder='MM/DD/YYYY'
            options={{
              dateFormat: "m-d-Y",
              minDate: type === "sub" && task?.startDate,
              maxDate: type === "sub" && task?.endDate
            }}
            id="default-picker"
          />
          <Label>End Date</Label>
          {/* <Input type="date" disabled={formData?.startDate === undefined} max={type === "sub" && task?.endDate} min={formData?.startDate} onChange={handleInput} required name="endDate" /> */}
          {/* <hr /> */}
          <Flatpickr
            name="endDate"
            className="form-control"
            required
            disabled={formData?.startDate === undefined}
            onChange={(date, dateStr) => setFormData({ ...formData, "endDate": dateStr })}
            placeholder='MM/DD/YYYY'
            options={{
              dateFormat: "m-d-Y",
              maxDate: type === "sub" && task?.endDate,
              minDate: formData?.startDate && calculateMinDate(formData?.startDate)
            }}
            id="default-picker"
          />
          <Label className='mt-2'>Track Progress By: </Label>
          <FormGroup onChange={handleTrackProgressChanged}>
            {
              type === "sub" &&
              <div className="mt-1">
                <Input type="radio" name="progressType" value={"CompletedTasks"} />
                <Label>{type === "sub" ? "By Completion" : "Total number of completed sub goals "} </Label>
              </div>
            }
            {type != "sub" &&
              <div className="mt-1">
                <Input type="radio" disabled={type === 'sub' && true} name="progressType" value={"SubGoals"} />{' '}
                <Label>Sub Goals - Complete all Sub Goals to Complete Goal.</Label>
              </div>
            }
            <div className="mt-1">
              <Input type="radio" name="progressType" value={"CurrentProgress"} />{' '}
              <Label>Record - Update your progress until you reach your desired Goal.</Label>
              {/* <span className="text-warning fs-6">
                {type != "sub" && "(Goal will be achieved by Recording your acheivements)"} </span> */}
            </div>
          </FormGroup>
          {['AllTasks', 'CurrentProgress'].includes(trackProgress) && (
            <div>
              <Label className="fw-bolder ">Enter Data Manually</Label>
              <Row >
                <Col >

                  <Label className=" ">Select Goal type</Label>
                  <Input type="select" onChange={(e) => { setMeasuringEntity(e.target.value); setFormData({ ...formData, measureLabel: "Select" }) }}>
                    <option>Select</option>
                    <option>Amount</option>
                    <option>Weight</option>
                  </Input>
                </Col>
                <Col>
                  <Label>Label</Label>
                  {measuringEntity === "Amount" ?
                    <Input value={formData?.measureLabel} className="my-auto pe-50" type="select" name="measureLabel" onChange={handleInput}>
                      <option>Select</option>
                      <option disabled={measuringEntity === "Weight"}>$</option>
                      <option value=" " disabled={measuringEntity === "Weight"}>Numeric</option>
                    </Input> :
                    <Input value={formData?.measureLabel} className="my-auto pe-50" type="select" name="measureLabel" onChange={handleInput}>
                      <option>Select</option>
                      <option >lbs</option>
                      <option >kgs</option>
                    </Input>
                  }
                  {/* <Input type="text" onChange={handleInput} required name="measureLabel" placeholder="$, lbs, kg " /> */}
                </Col>
              </Row>
              <div className="d-flex justify-content-start mt-1">
                {measuringEntity === "Weight" &&
                  <div className='me-1' >
                    <Label className='pe-50'>From:</Label>
                    <Input type="number" name="measureFrom" onChange={handleInput} required style={{ maxWidth: "100px" }} placeholder={1} />
                  </div>}

                <div className='' >
                  <Label className='me-50'>{measuringEntity === "Amount" ? "Target Goal" : "To"}</Label>
                  <Input type="number" name="measureTo" onChange={handleInput} required style={{ maxWidth: "100px" }} placeholder="100" />
                </div>
                <div className=" ms-1 pt-1">

                  <p className="mt-2">{formData?.measureLabel != "Select" && formData?.measureLabel}</p>
                </div>

              </div>

            </div>
          )}
          {/* {
            trackProgress === "CurrentProgress" && (
              <>
                <div className="mt-2">
                  <Label >Current Progress {formData?.currentProgress}</Label>
                </div>
                <div>
                  <Input type="range" value={formData?.currentProgress} min={formData.measureFrom && formData?.measureFrom} max={formData.measureFrom && formData?.measureTo} disabled={!formData?.measureFrom || !formData?.measureTo} onChange={handleInput} required name="currentProgress" style={{ maxWidth: "200px" }} />
                </div>
              </>
            )
          } */}

          <hr />
          <span>Optional</span>


          <div>
            <Nav tabs>
              <NavItem>
                <NavLink active={activeTab === '1'} onClick={() => setActiveTab('1')}>
                  Vision
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activeTab === '2'} onClick={() => setActiveTab('2')}>
                  Purposes
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activeTab === '3'} onClick={() => setActiveTab('3')}>
                  Obstacles
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={activeTab === '4'} onClick={() => setActiveTab('4')}>
                  Resources
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Input placeholder='What is your vision in this Goal?' name="vision" onChange={handleInput} type="textarea" />
              </TabPane>
              <TabPane tabId="2">
                <Input placeholder='What is the purpose of this Goal?' name="purpose" onChange={handleInput} type="textarea" />
              </TabPane>
              <TabPane tabId="3">
                <Input placeholder='What is the obstacle you must overcome to achieve this Goal?' name="obstacle" onChange={handleInput} type="textarea" />
              </TabPane>
              <TabPane tabId="4">
                <Input placeholder='Who should you seek to help you achieve this Goal?' name="resource" onChange={handleInput} type="textarea" />
              </TabPane>
            </TabContent>
            <hr />
            <Label>Upload Picture</Label>
            <br />
            <Label>Picture</Label>
            <Input name="image" type="file" onChange={handleInput} />
            <FormText>Could you provide a smaller-sized image, please? </FormText>

          </div>
          <div className="d-flex mt-1 justify-content-end">
            <Button type="submit" color="primary">Save</Button>
          </div>
        </Form>
      </ModalBody>

    </Fragment >
  );
}
