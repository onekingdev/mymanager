// ** Custom Components
import Timeline from '@components/timeline';

// ** Reactstrap Imports
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap';

// ** Timeline Data
// import { basicData } from './onboardingStep';
import FollowingCard from './view/FollowingCard';
import Schedule, { basicData } from './view/Schedule';

const OnBoarding = () => {
  return (
    <Row style={{ position: 'relative', top: '-100px', margin: '10px' }}>
      <Col md={4}>
        <Card className="p-1 dashboard-timeline">
          {/* <Schedule /> */}

          <div className="p-1">
            <h4>Welcome to Mymanager</h4>
            <h5 style={{ marginTop: '10px' }}>
              Complete the following steps to learn how to activate your manager
            </h5>
          </div>
          <Timeline data={basicData} />
        </Card>
      </Col>
      <Col md={8}>
        <FollowingCard />
      </Col>
    </Row>
  );
};

export default OnBoarding;
