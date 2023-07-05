import React from 'react';
import { Card } from 'reactstrap';
import IncomeProgramChart from '../chart/IncomeProgramChart';

function MemberStatistics() {
  return (
    <Card style={{height: "74vh"}}>
      <IncomeProgramChart />
    </Card>
  );
}

export default MemberStatistics;
