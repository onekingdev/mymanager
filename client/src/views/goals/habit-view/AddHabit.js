import React, { Fragment, useState } from 'react';
import {
  Button,
  Input,
  Label,
  Form,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import { goalsAddAction } from '../../taskngoals/store/actions';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import '@styles/react/libs/editor/editor.scss';
import Flatpickr from 'react-flatpickr';

export default function AddHabit({ task, toggle, workspaceId, type }) {
  const dispatch = useDispatch();
  // ** STATES
  const [habitPayload, setHabitPayload] = useState({ frequency: "Every day", repetition: "21", workSpace: workspaceId })
  const handleInput = (e) => {
    setHabitPayload({ ...habitPayload, [e.target.name]: e.target.value })
  }
  const isFrequencyAvailable = () => {
    if (habitPayload?.frequency === 'Every week' || habitPayload?.frequency === 'Every month') {
      return true;
    }
  }
  const onHabitSubmit = (e) => {
    e.preventDefault();
    if (!habitPayload.startDate) {
      toast.error("Please Select Start Date")
      return
    }
    if (habitPayload.frequency === "Every week") {
      habitPayload?.daysFrequency < 1 || habitPayload.daysFrequency > 7 ? toast.error("Enter days between 1 to 7") : (dispatch(goalsAddAction(workspaceId, "habit", habitPayload,)), toggle())
      return
    }
    if (habitPayload.frequency === "Every month") {
      habitPayload?.daysFrequency < 1 || habitPayload.daysFrequency > 30 ? toast.error("Enter days between 1 to 30") : (dispatch(goalsAddAction(workspaceId, "habit", habitPayload,)), toggle())
      return
    }
    dispatch(goalsAddAction(workspaceId, "habit", habitPayload,))
    toggle();
  }
  return (
    <Fragment>
      {type === 'sub' ? (
        <ModalHeader toggle={toggle}>Add A New Sub Habit For {task.name}</ModalHeader>
      ) : (
        <ModalHeader toggle={toggle}>Add A New Habit</ModalHeader>
      )}
      <ModalBody>
        <Form onSubmit={onHabitSubmit}>
          <Label>Habit Name</Label>
          <Input name="name" type="text" placeholder="What is your new habit?" onChange={handleInput} required />
          <Label>Start Date</Label>
          <Flatpickr
            name="startDate"
            className="form-control mb"
            required
            onChange={(date, dateStr) => setHabitPayload({ ...habitPayload, "startDate": dateStr })}
            placeholder='MM/DD/YYYY'
            options={{
              dateFormat: "m-d-Y",
            }}
            id="default-picker"
          />
          <Label>Frequency</Label>
          <Input name="frequency" type="select" onChange={handleInput} required >
            <option>Every day</option>
            <option>Every week</option>
            {/* <option>Every month</option> */}
          </Input>
          {isFrequencyAvailable() ? (
            <>
              <Label>Days per {habitPayload?.frequency.slice(6)}   </Label>
              {habitPayload?.frequency === 'Every week' && <Input required name="daysFrequency" onChange={handleInput} type="number" />}
              {habitPayload?.frequency === 'Every month' && <Input required name="daysFrequency" onChange={handleInput} type="number" />}
            </>
          ) : null}
          <Label>Repetation</Label> {habitPayload?.frequency === 'Every week' || habitPayload?.frequency === 'Every month' ? (
            <>
              <Label> {"(" + habitPayload?.frequency.slice(6) + ")"}   </Label>
            </>
          ) : null}
          <Input type='text' disabled value={habitPayload?.repetition || 21} required />
          <Input name="repetition" className='my-1' type="range" defaultValue={21} max={100} color="primary" step="1" value={habitPayload?.repetition} onChange={handleInput} required />
          <div className="d-flex justify-content-end mt-2">
            <Button type="submit" color="primary">Save Habit</Button>
          </div>
        </Form>
      </ModalBody>


    </Fragment>
  );
}
