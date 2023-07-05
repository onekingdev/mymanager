import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import GoalTabs from './details/GoalTabs';

import SummaryCard from './details/SummaryCard';



export default function Details() {
const [myGoal,setMyGoal] = useState(null)
const params = useParams();
const store = useSelector(state=>state.myGoals)
useEffect(()=>{
   // console.log(params)
setMyGoal(store.goals.find(x=>x._id.toString() === params.id))
},[])
  return (
    <div >
    <Row>
      <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
        <SummaryCard task={myGoal}/>
      </Col>
      <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
        <GoalTabs  task={myGoal}/>
      </Col>
    </Row>
  </div>
  )
}
