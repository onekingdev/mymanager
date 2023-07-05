import React from 'react';
import { Card, Col, Input, Row } from 'reactstrap';
import RankTable from '../table/RankTable';
import RankProgramChart from "../chart/RankProgramChart"

function MemberStatistics() {
  return (
    <Card style={{ minHeight: '50vh' }}>
      <RankProgramChart />
      {/* <RankTable /> */}
    </Card>
  );
}

export default MemberStatistics;
