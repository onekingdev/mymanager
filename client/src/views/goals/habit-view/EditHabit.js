import React, { Fragment, useState } from 'react';
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Form,
  TabContent,
  TabPane
} from 'reactstrap';
import { goalsEditAction } from '../../taskngoals/store/actions';
import { useDispatch } from 'react-redux';
import '@styles/react/libs/editor/editor.scss';
import Flatpickr from 'react-flatpickr';
export default function EditHabit({ task, toggle, type }) {
  // ** STATES
  const [activeTab, setActiveTab] = useState('1');
  const dispatch = useDispatch();

  const [habitPayload, setHabitPayload] = useState(task)
  const isFrequencyAvailable = () => {
    if (habitPayload?.frequency === 'Every week' || habitPayload?.frequency === 'Every month') {
      return true;
    }
  }
  const onHabitSubmit = (e) => {
    e.preventDefault();
    // dispatch(goalsAddAction(workspaceId, "habit", habitPayload,))
    // toggle();
    dispatch(goalsEditAction(habitPayload?._id, habitPayload?.workSpace, habitPayload))

  }
  const handleInput = (e) => {
    setHabitPayload({ ...habitPayload, [e.target.name]: e.target.value })

  }

  return (
    <Fragment>
      <ModalHeader toggle={toggle}>Edit Habit</ModalHeader>
      <ModalBody>
        <Form onSubmit={onHabitSubmit}>
          <Label className="">Habit Name</Label>
         
          <Input name="name" type="text" onChange={handleInput} placeholder="What is your new habit?" value={habitPayload?.name} />
          <Label className="mt-2">Start Date</Label>
          <Flatpickr
            name="startDate"
            className="form-control mb"
            required
            value={habitPayload?.startDate}
            onChange={(date, dateStr) => setHabitPayload({ ...habitPayload, "startDate": dateStr })}
            placeholder='MM/DD/YYYY'
            options={{
              dateFormat: "m-d-Y",
            }}
            id="default-picker"
          />
          <Label  className="mt-2">Frequency</Label>
          <Input name="frequency" onChange={handleInput} value={habitPayload?.frequency} type="select" >
            <option>Every day</option>
            <option>Every week</option>
          </Input>
          {isFrequencyAvailable() ? (
            <>
              <Label className="mt-2">Days per {habitPayload?.frequency.slice(6)}   </Label>
              {habitPayload?.frequency === 'Every week' && <Input required name="daysFrequency" value={habitPayload.daysFrequency} onChange={handleInput} type="number" />}
              {habitPayload?.frequency === 'Every month' && <Input required name="daysFrequency" value={habitPayload.daysFrequency} onChange={handleInput} type="number" />}
            </>
          ) : null}
          <Label  className="mt-2">Repetation</Label> {habitPayload?.frequency === 'Every week' || habitPayload?.frequency === 'Every month' ? (
            <>
              <Label> {"(" + habitPayload?.frequency.slice(6) + "s)"}</Label>
            </>
          ) :<Label>{"(days)"}</Label>}
          <div className='d-flex justify-content-between '>
            <Input type='text' disabled value={habitPayload?.repetition || 21} required className="w-100 my-auto me-50" />
            <Input className="my-auto" name="repetition" type="range" value={habitPayload?.repetition} max={100} color="primary" step="1" onChange={handleInput} required />

          </div>
          {/* <Label>Goal</Label>
          <Input type="select">
            <option>Goal 1</option>
            <option>Goal 2</option>
            <option>Goal 3</option>
          </Input> */}
          {/* <Label>Category</Label>
          <Input type="select">
            <option>Personal</option>
            <option>Business</option>
          </Input> */}
          <div className="d-flex justify-content-end px-1 mt-2">
            <Button type="submit" color="primary">Save Habit</Button>
          </div>
        </Form>
      </ModalBody>

    </Fragment>
  );
}
