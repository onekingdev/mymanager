import React, { useEffect, useRef, useState } from 'react';
import { BiBuilding } from 'react-icons/bi';
import {
  Button,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';

import { addNewOrgAction } from '../../store/action';
import { setOrgs } from '../../store/reducer';
import NewOrgForm from './NewOrgForm';
import Wizard from '@components/wizard';
import { CreditCard, Mail } from 'react-feather';
import AddPlanForm from '../../plans/create/AddPlanForm';
import PermissionsForm from '../../permissions/PermissionsForm';
import SendActivation from '../../users/SendActivation';

export default function CreateOrgModal({ open, toggle, store, dispatch }) {
  const [stepper, setStepper] = useState(null);
  const [org,setOrg] = useState({})
  const ref = useRef();
  const steps = [
    {
      id: 'org',
      title: 'Organization Details',
      subtitle: 'Add Organization Details',
      icon: <BiBuilding />,
      content: <NewOrgForm dispatch={dispatch} stepper={stepper} type="modern-horizontal" org={org} setOrg={setOrg} />
    },
    {
      id: 'email',
      title: 'Send Email',
      subtitle: 'Send Activation Email',
      icon: <Mail />,
      content: <SendActivation toggle={toggle} dispatch={dispatch} stepper={stepper} type="modern-horizontal" org={org} setOrg={setOrg}/>
    }
  ];

  return (
    <Modal isOpen={open} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Create an Organization</ModalHeader>
      <ModalBody>
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
      </ModalBody>
    </Modal>
  );
}
