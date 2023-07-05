import React, { useRef, useState } from 'react'
import Wizard from '@components/wizard'

import AddPlanForm from '../create/AddPlanForm';
import PermissionsForm from '../../permissions/PermissionsForm';

export default function WizardModernHorizontal({toggle,dispatch,store,plan,setPlan}) {
    // ** State
    const [stepper, setStepper] = useState(null);

    // ** Ref
    const ref = useRef(null)

    let steps =[
        {
            id: 'plan',
            title: 'Plan Details',
            subtitle: 'Edit Plan Details',
            icon: '',
            content: <AddPlanForm stepper={stepper} type="modern-horizantal" plan={plan} setPlan={setPlan} store={store}/>
          },
          {
            id: 'Permissions',
            title: 'Permissions',
            subtitle: 'Edit Permissions Details',
            icon: '',
            content: <PermissionsForm stepper={stepper} type="modern-horizantal" plan={plan} setPlan={setPlan} toggle={toggle} dispatch={dispatch} store={store} isEdit={true}/>
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
