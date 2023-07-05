import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { getOrgByIdAction, getOrgsAction, getPlansAction } from './../../store/action';
import Breadcrumbs from '@components/breadcrumbs';
import OrgAdminCard from './components/OrgAdminCard';
import OrgInfoCard from './components/OrgInfoCard';
import OrgStatus from './components/OrgStatus';
import OrgTabs from './components/OrgTabs';

export default function OrgDetails() {
  const [org, setOrg] = useState(null);
  const [active, setActive] = useState('1');
  const [title, setTitle] = useState('Overview');



  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
      setTitle(title)
    }
  };

  // ** Storage
  const store = useSelector((state) => state.organizations);
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrgByIdAction(id)).then((data) => {
      if (data) {
        if (data[0] !== null) {
          let plans = [];
          for (const p of data[0].planDetails) {
            plans.push({
              ...p,
              createdAt: data[0].plan.find((x) => x.planId === p._id)?.createdAt,
              updatedAt: data[0].plan.find((x) => x.planId === p._id)?.updatedAt,
              isSubscribed: data[0].plan.find((x) => x.planId === p._id)?.isSubscribed,
              organizationId: data[0].plan.find((x) => x.planId === p._id)?.organizationId,
              status: data[0].plan.find((x) => x.planId === p._id)?.status,
              startDate: data[0].plan.find((x) => x.planId === p._id)?.startDate,
              expireDate: data[0].plan.find((x) => x.planId === p._id)?.expireDate,
              paymentInfo: data[0].plan.find((x) => x.planId === p._id)?.paymentInfo
            });
          }
          setOrg({ ...data[0], plans: plans });
        }
      }
    });
    //dispatch(getOrgsAction());
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getOrgsAction());
    dispatch(getPlansAction());
  }, [dispatch]);

  const handleBackButtonClick = () => {
    history.goBack(); // Go back to the previous page
  };


  return (
    <div className="app-user-view w-100">
      <Row>
        <Col md={11} className="invoice-child-header-wrapper">
          <Breadcrumbs
            breadCrumbTitle={'Organizations'}
            breadCrumbParent="Organizations"
            breadCrumbActive="Details"
          />
        </Col>
        <Col md={1}>
          <Button onClick={handleBackButtonClick} className="btn-sm" outline color="primary">
            Back
          </Button>
        </Col>
      </Row>
      <Row>
        {org && org !== null && (
          <>
            <Col xl="4" lg="5">
              <OrgInfoCard selectedOrg={org} />
              <OrgAdminCard selectedOrg={org} dispatch={dispatch} />
              <OrgStatus
                cols={{ md: '6', sm: '6', xs: '12' }}
                selectedOrg={org}
                dispatch={dispatch}
              />
            </Col>
            <Col xl="8" lg="7">
              {store && (
                <OrgTabs
                  selectedOrg={org}
                  active={active}
                  toggleTab={toggleTab}
                  dispatch={dispatch}
                  store={store}
                  setSelectedOrg={setOrg}
                />
              )}
            </Col>
          </>
        )}
      </Row>
    </div>
  );
}
