import React from 'react'
import { Input, Label } from 'reactstrap'

export default function RecordGoal({task}) {
  return (
    <div>
        <h5>Record your accomplishment on <span>Target</span> {task.name}</h5>
        <Label>What did you achive today?</Label>
        <Input type='text'/>
    </div>
  )
}
