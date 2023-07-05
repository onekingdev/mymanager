import React, { Fragment, useState } from 'react';
import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  Form,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import { goalsEditAction } from '../../taskngoals/store/actions';
import { useDispatch } from 'react-redux';
import Flatpickr from 'react-flatpickr';
import '@styles/react/libs/editor/editor.scss';

export default function EditGoal({ task, open, toggle, type }) {
  const dispatch = useDispatch();
  // ** STATES
  const [activeTab, setActiveTab] = useState('1');
  const [editedData, setEditedData] = useState(task)
  const handleInput = (e) => {
    if (e.target.name === 'file') {
      setEditedData({ ...editedData, file: e.target.files[0] });
    }
    if (e.target.name === "measureFrom") {
      setEditedData({ ...editedData, measureFrom: e.target.value, currentProgress: e.target.value })
    }
    else {
      setEditedData({ ...editedData, [e.target.name]: e.target.value })

    }
  }
  const handleAdd = (e) => {
    e.preventDefault();
    const payload = new FormData();
    editedData?.name != undefined && payload.append('name', editedData?.name);
    editedData?.startDate != undefined && payload.append('startDate', editedData?.startDate);
    editedData?.endDate != undefined && payload.append('endDate', editedData?.endDate);
    editedData?.progressType != undefined && payload.append('progressType', editedData?.progressType);
    editedData?.vision != undefined && payload.append('vision', editedData?.vision);
    editedData?.purpose != undefined && payload.append('purpose', editedData?.purpose);
    editedData?.obstacle != undefined && payload.append('obstacle', editedData?.obstacle);
    editedData?.resource != undefined && payload.append('resource', editedData?.resource);
    editedData?.file != undefined && payload.append('file', editedData?.file);
    // payload.append('file',file);
    if (editedData?.progressType === "AllTasks" || editedData?.progressType === "CurrentProgress") {
      editedData?.measureFrom != undefined && payload.append('measureFrom', editedData?.measureFrom)
      editedData?.measureTo != undefined && payload.append('measureTo', editedData?.measureTo)
      editedData?.measureLabel != undefined && payload.append('measureLabel', editedData?.measureLabel)
      editedData?.progressType === "CurrentProgress" && editedData.currentProgress ?
        payload.append('currentProgress', editedData?.currentProgress) :
        payload.append('currentProgress', editedData?.measureFrom)
    }
    dispatch(goalsEditAction(editedData?._id, editedData?.workSpace, payload))
  }
  return (
    <Fragment>
      <ModalHeader toggle={toggle}>Edit <span className='primary'>Goal-</span> {task.name}</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleAdd}>
          <Label>Goal Name</Label>
          <Input type="text" required name="name" placeholder="What is your goal?" onChange={handleInput} value={editedData?.name} />
          <Label>Start Date</Label>
          <Flatpickr
            name="startDate"
            className="form-control"
            required
            value={editedData.startDate}
            onChange={(date, dateStr) => setEditedData({ ...editedData, "startDate": dateStr })}
            placeholder='MM/DD/YYYY'
            options={{
              dateFormat: "m-d-Y",
            }}
            id="default-picker"
          />
          <Label>End Date</Label>
          <Flatpickr
            name="endDate"
            className="form-control"
            required
            value={task?.endDate}
            onChange={(date, dateStr) => setEditedData({ ...editedData, "endDate": dateStr })}
            placeholder='MM/DD/YYYY'
            options={{
              dateFormat: "m-d-Y",
            }}
            id="default-picker"
          />

          <hr />
          {/* <Label>Track Progress By: </Label>
          <FormGroup onChange={handleInput}>
            <div className="mt-1">
              <Input type="radio" checked={editedData.progressType === "CompletedTasks"} name="progressType" value={"CompletedTasks"} />{' '}
              <Label>Total number of completed tasks</Label>
            </div>
            <div>
              <Input type="radio" checked={editedData.progressType === "SubGoals"} name="progressType" value={"SubGoals"} />{' '}
              <Label>Total progress from all sub goals</Label>
            </div> 
           <div>
              <Input disabled type="radio" checked={editedData.progressType === "AllTasks"} name="progressType" value={"AllTasks"} />{' '}
              <Label>Total outcome from all tasks</Label>
            </div> 
            <div className="mt-1">
              <Input type="radio" checked={editedData.progressType === "CurrentProgress"} name="progressType" value={"CurrentProgress"} />{' '}
              <Label>Manually updating current progress</Label>
            </div>
          </FormGroup>
          {['AllTasks', 'CurrentProgress'].includes(editedData?.progressType) && (
            <div>
              <div className="d-flex justify-content-between">
                <div className='d-flex justify-content-start'>
                  <Label className='my-auto pe-50'>Measure From:</Label>
                  <Input required  type="number" value={editedData?.measureFrom} name="measureFrom" onChange={handleInput} style={{ maxWidth: "100px" }} defaultValue={1} />
                </div>
                <div className='d-flex justify-content-start'>
                  <Label className='my-auto pe-50'>to</Label>
                  <Input required  type="number" value={editedData?.measureTo} name="measureTo" onChange={handleInput} style={{ maxWidth: "100px" }} defaultValue={100} />
                </div>
              </div>
              <Label>Measure Label</Label>
              <Input required  name="measureLabel" value={editedData?.measureLabel} onChange={handleInput} type="text" placeholder="$, lbs, kg " />
            </div>
          )}
          {
            editedData?.progressType === 'CurrentProgress' && (
              <>
                <div className="mt-2" >
                  <Label >Current Progress  {editedData?.currentProgress}</Label>
                </div>
                <div>
                  <Input type="range" value={editedData?.currentProgress} min={editedData.measureFrom && editedData?.measureFrom} max={editedData.measureFrom && editedData?.measureTo} name="currentProgress" onChange={handleInput} style={{ maxWidth: "200px" }} />
                </div>
              </>
            )
          }  */}
          <hr />
          optional
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
                <Input name="vision" placeholder='What is your vision in this Goal?' onChange={handleInput} value={editedData?.vision} type="textarea" />
              </TabPane>
              <TabPane tabId="2">
                <Input name="purpose" placeholder='What is the purpose of this Goal?' onChange={handleInput} value={editedData?.purpose} type="textarea" />
              </TabPane>
              <TabPane tabId="3">
                <Input name="obstacle" placeholder='What is the obstacle you must overcome to achieve this Goal?'  onChange={handleInput} value={editedData?.obstacle} type="textarea" />
              </TabPane>
              <TabPane tabId="4">
                <Input name="resource" placeholder='Who should you seek to help you achieve this Goal?' onChange={handleInput} value={editedData?.resource} type="textarea" />
              </TabPane>
            </TabContent>
            <hr />
            <Label>Picture</Label>
            <Input name="file" onChange={handleInput} type="file" />
            {/* <Label>Parent Goal</Label>
            <Input type="select">
              <option>Goal 1</option>
              <option>Goal 2</option>
              <option>Goal 3</option>
            </Input> */}
          </div>
          <div className="d-flex justify-content-end px-1 mt-2">
            <Button type="submit" color="primary">Save</Button>
          </div>
        </Form>
      </ModalBody>
    </Fragment>
  );
}
