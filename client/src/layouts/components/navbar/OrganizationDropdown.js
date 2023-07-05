import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { getUserData } from '../../../auth/utils';

import { setPermissions } from '../../../utility/Utils';
import {
  createOrganizationSubscription,
  getOrgByPath
} from '../../../views/organizations/store/api';
import PaymentModal from './orgPayment/PaymentModal';
import { useDispatch } from 'react-redux';
import { createOrgSubscriptionForUserAction } from '../../../views/organizations/store/action';

export default function OrganizationDropdown({ user }) {
  // ** State
  const [orgs, setOrgs] = useState([]);

  const [plan, setPlan] = useState();
  const [planDetails, setPlanDetails] = useState();

  const [title, setTitle] = useState('Personal');
  const [selectedOrg, setSelectedOrg] = useState();

  const [openPayment, setOpenPayment] = useState(false);
  const togglePaymentModal = () => setOpenPayment(!openPayment);

  const organization = localStorage.getItem('organization');

  const dispatch = useDispatch();
  // ** Function
  const handleChangeToPersonal = () => {
    localStorage.removeItem('organization');
    //rewrite with user plan permissions
    const user = getUserData();
    const newAbility = setPermissions(user.plan.permissions);
    const localUser = JSON.parse(localStorage.getItem('userData'));
    localStorage.setItem('userData', JSON.stringify({ ...localUser, ability: newAbility }));

    setTitle('Personal');
    window.location.href = 'https://me.mymanager.com/';
  };
  const handleChangeOrganization = async (o) => {
    //get org
    let org = await getOrgByPath(o.path);
    let plan = org.data[0].plan[org.data[0].plan.length - 1];
    let planDetails = org.data[0].planDetails.find((x) => x._id === plan.planId);
    setPlan(plan);
    setPlanDetails(planDetails);
    if (planDetails.pricePerMonth === 0) {
      //free plan for organization
      const newAbility = setPermissions(planDetails.permissions);
      localStorage.setItem('organization', JSON.stringify(org.data[0]));
      const localUser = JSON.parse(localStorage.getItem('userData'));
      localStorage.setItem('userData', JSON.stringify({ ...localUser, ability: newAbility }));
      window.location.href = `https://${org.data[0].path}.mymanager.com/`;
    } else {
      if (planDetails.payByUser === true) {
        let userPlan = org.data[0].plan.find(
          (x) => x.userId === getUserData().id && x.planId === planDetails._id
        );
        if (userPlan === undefined) {
          //create plan for user
          const payload = {
            userId: getUserData().id,
            organizationId: org.data[0]._id,
            paymentInfo: [],
            planId: planDetails._id,
            status: 'waiting',
            upgraded: false
          };
          dispatch(createOrgSubscriptionForUserAction(payload)).then((res) => {
            plan = res;

            setPlan(res);
          });
        } else {
          plan = userPlan;
          setPlan(plan);
        }
      }

      switch (plan.status) {
        case 'waiting':
          const trialExp = new Date(plan.updatedAt).setDate(
            new Date(plan.updatedAt).getDate() + planDetails?.trialTime
          );
          const now = new Date();
          if (trialExp > now) {
            // go to organization
            const newAbility = setPermissions(planDetails.permissions);
            localStorage.setItem('organization', JSON.stringify(org.data[0]));
            const localUser = JSON.parse(localStorage.getItem('userData'));
            localStorage.setItem('userData', JSON.stringify({ ...localUser, ability: newAbility }));
            localStorage.setItem('expire', false);
            window.location.href = `https://${org.data[0].path}.mymanager.com/`;
          } else {
            // payment then go to organization
            // const newAbility = setPermissions(planDetails.permissions);
            // localStorage.setItem('organization', JSON.stringify(org.data[0]));
            // const localUser = JSON.parse(localStorage.getItem('userData'));
            // localStorage.setItem('userData', JSON.stringify({ ...localUser, ability: newAbility }));
            // localStorage.setItem('expire',true)
            setSelectedOrg(org.data[0]);
            togglePaymentModal();
          }
          break;
        case 'suspended':
          toast.error('Your organization plan is suspended! please contact support');
          break;
        case 'active':
          const newAbility = setPermissions(planDetails.permissions);
          localStorage.setItem('organization', JSON.stringify(org.data[0]));
          const localUser = JSON.parse(localStorage.getItem('userData'));
          localStorage.setItem('userData', JSON.stringify({ ...localUser, ability: newAbility }));
          window.location.href = `https://${org.data[0].path}.mymanager.com/`;
          break;

        default:
          toast.error('No status found for your organization. please contact support');
          break;
      }
    }
  };
  useEffect(() => {
    if (user && user?.organizations) {
      setOrgs(user?.organizations);
    }
  }, []);
  useEffect(() => {
    if (organization) {
      let o = JSON.parse(organization);
      setTitle(o.name);
    }
  }, [organization]);
  return (
    <>
      <UncontrolledDropdown className="me-50">
        <DropdownToggle caret color="outline-secondary">
          {title}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem className="w-100" onClick={handleChangeToPersonal}>
            Personal
          </DropdownItem>
          {orgs?.map((o, idx) => {
            return (
              <DropdownItem key={idx} className="w-100" onClick={() => handleChangeOrganization(o)}>
                {o.name}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </UncontrolledDropdown>
      {selectedOrg && plan && planDetails && (
        <PaymentModal
          toggle={togglePaymentModal}
          open={openPayment}
          org={selectedOrg}
          plan={plan}
          planDetails={planDetails}
          dispatch={dispatch}
        />
      )}
    </>
  );
}
