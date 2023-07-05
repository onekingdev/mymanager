import React, { Fragment, useEffect, useState } from 'react'

import { Copy, User, UserCheck, UserPlus, UserX } from 'react-feather';

import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';
import { Col, Row } from 'reactstrap';


export default function TopStats({store}) {
  const [totalUsers,setTotalUsers] = useState(0)

  useEffect(()=>{
    if(store){
      let users=0;
      for (const org of store.myOrgs) {
        users = users + org.userCount
      }
      setTotalUsers(users)
    }
  },[store])

  return (
    <Fragment>
    <div className="app-user-list">
     <Row>
     <Col lg="3" sm="6">
     <StatsHorizontal
             color="primary"
             statTitle="Total Users"
             icon={<User size={20} />}
             renderStats={<h3 className="fw-bolder mb-75">{totalUsers}</h3>}
           />
     </Col>
     <Col lg="3" sm="6">
     <StatsHorizontal
             color="danger"
             statTitle="Organizations"
             icon={<UserPlus size={20} />}
             renderStats={<h3 className="fw-bolder mb-75">{store?.myOrgs?.filter(x=>x.isDeleted===false)?.length}</h3>}
           />
     </Col>
     <Col lg="3" sm="6">
     <StatsHorizontal
             color="success"
             statTitle="Personal Plans"
             icon={<UserCheck size={20} />}
             renderStats={<h3 className="fw-bolder mb-75">{store?.plans?.filter(x=>x.type==='personal').length}</h3>}
           />
     </Col>
     <Col lg="3" sm="6">
     <StatsHorizontal
             color="warning"
             statTitle="Organization Plans"
             icon={<UserX size={20} />}
             renderStats={<h3 className="fw-bolder mb-75">{store?.plans?.filter(x=>x.type==='business').length}</h3>}
           />
     </Col>
     </Row>
    </div>
   
   </Fragment>
  )
}