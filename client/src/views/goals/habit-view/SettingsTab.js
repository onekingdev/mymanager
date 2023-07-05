import React, { Fragment } from 'react'
import EditGoal from '../goal-view/EditGoal'
import EditHabit from './EditHabit'

export default function SettingsTab({task}) {
  return (
    <Fragment>
        {task && task.type==='target'?(<EditGoal task={task}/>):(<EditHabit task={task}/>)}
    </Fragment>
  )
}
