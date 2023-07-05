import React, { useRef, useState } from 'react'
import Wizard from '@components/wizard'
import AddPlanForm from './AddPlanForm';
import PermissionsForm from '../../permissions/PermissionsForm';

export default function WizardModernHorizontal({toggle,dispatch,store}) {
    // ** State
    const [stepper, setStepper] = useState(null);
    const [plan,setPlan] = useState()
    // ** Ref
    const ref = useRef(null)

    let steps =[
        {
            id: 'plan',
            title: 'Add Plan',
            subtitle: 'Add Plan Details',
            icon: '',
            content: <AddPlanForm stepper={stepper} type="modern-horizantal" plan={plan} setPlan={setPlan} store={store}/>
          },
          {
            id: 'Permissions',
            title: 'Add Permissions',
            subtitle: 'Add Permissions Details',
            icon: '',
            content: <PermissionsForm stepper={stepper} type="modern-horizantal" plan={plan} setPlan={setPlan} toggle={toggle} dispatch={dispatch} store={store} isEdit={false}/>
          },
    ]
  return (
    <div className="modern-horizontal-wizard">
    <Wizard
         type="modern-horizontal"
         ref={ref}
         steps={steps}
         options={{
             linear: false
         }}
         instance={(el) => setStepper(el)}
     />
 </div>
  )
}
