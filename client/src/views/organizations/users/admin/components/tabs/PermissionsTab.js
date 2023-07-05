import React, { Fragment, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Button, Col, Input, Row } from 'reactstrap';
import PermissionsForm from '../../../../permissions/PermissionsForm';


export default function PermissionsTab({selectedOrg,setSelectedOrg,dispatch}) {

  return (
    <div style={{overflowY:"scroll !important", height:"100px"}}>
      <PermissionsForm dispatch={dispatch} isEdit={true} selectedOrg={selectedOrg} setSelectedOrg={setSelectedOrg} plan={selectedOrg.planDetails[selectedOrg.planDetails.length - 1]}/>
    </div>
  )
}
