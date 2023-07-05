
import GoalTabs from './GoalTabs';
import StatsCard from './StatsCard';
import SummaryCard from './SummaryCard';

export default function GoalDetails() {
  // ** States
  const [activeTab, setActiveTab] = useState('1');
  const toggleTab = (val) => setActiveTab(val);
  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <SummaryCard />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <StatsCard cols={{ md: '3', sm: '6', xs: '12' }}/>
          <GoalTabs active={activeTab} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  );
}
