// React Imports
import { React, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// Custom Components
import Wizard from '@components/wizard';
import SetGoal from './createForm/SetGoal';
import Notification from './createForm/Notification';
import CaptureData from './createForm/CaptureData';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import * as Icon from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
import '../../assets/styles/SocialProof.scss';

const EditCampaign = (tabId) => {
  // Ref
  const ref = useRef(null);
  // history
  const history = useHistory();
  // State
  const [stepper, setStepper] = useState();
  const [campaignName, setCampaignName] = useState('');
  useEffect(() => {
    setCampaignName(localStorage.getItem('CampaignName'));
    // console.log('first', tabId);
  }, []);
  const steps = [
    {
      id: 'goal',
      title: 'Goal',
      subtitle: 'Create and Set',
      content: <SetGoal stepper={stepper} type="wizard-modern" />
    },
    {
      id: 'notification',
      title: 'Notification',
      subtitle: 'Select customer visuals',
      content: <Notification stepper={stepper} type="wizard-modern" />
    },
    {
      id: 'connect',
      title: 'Connect Pixel',
      subtitle: 'Add web pages and verify',
      content: <CaptureData stepper={stepper} type="wizard-modern" />
    }
  ];
  // const UpdateGoals = async (e) => {
  //   let payload = {
  //     category_goal,
  //     goal_name,
  //     value,
  //     url
  //   };
  //   e.preventDefault();
  //   await editGoalData(payload, editId).then((response) => {
  //     console.log(response);
  //     GetAllData();
  //     setEditModal(!editModal);
  //   });
  // };
  return (
    <>
      <PerfectScrollbar className="main-menu-content" options={{ wheelPropagation: false }}>
        <Container>
          <Row>
            <Col md="6">
              <Icon.ChevronLeft
                size={22}
                className=" fonticon-wrap"
                onClick={() => history.goBack()}
              />
              <div className="inputMainDiv1 inputMainDiv2">
                <span className="spanData"></span>
                <Input
                  type="text"
                  value={campaignName}
                  className="inputData d-inline-block int-sdw"
                  onChange={(e) => setCampaignName(e.target.value)}
                  style={{ width: `${campaignName.length}ch +2ch` }}
                />
              </div>
            </Col>
            <Col md="6">
              <div className="ft-1">
                <Button
                  size={22}
                  className=" fonticon-wrap"
                  color="primary"
                  onClick={() => history.push('/submit')}
                >
                  Publish Changes
                </Button>
              </div>
            </Col>
            <Col md="12">
              <div className="modern-horizontal-wizard">
                <Wizard
                  type="modern-horizontal"
                  ref={ref}
                  steps={steps}
                  options={{
                    linear: false
                  }}
                  instance={(el) => {
                    setStepper(el);
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </PerfectScrollbar>
    </>
  );
};

export default EditCampaign;
