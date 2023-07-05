import { useState } from 'react';
import { Row, Col } from 'reactstrap';

// ** STYLES
import '@src/assets/styles/tasks.scss';

import MainCampaign from '../MainCampaign';

const SideTab = () => {
  // ** States
  const [active, setActive] = useState('1');

  return (
    <>
      <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
          <MainCampaign active={active} setActive={setActive} />
        </Col>
      </Row>
    </>
  );
};
export default SideTab;
