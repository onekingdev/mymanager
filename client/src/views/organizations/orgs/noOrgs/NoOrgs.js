import React, { useState } from 'react';
import { Plus } from 'react-feather';
import { Button, Card, CardBody } from 'reactstrap';
import CreateOrgModal from '../create/CreateOrgModal';

import img from './../../../../assets/images/illustration/personalization.svg'
export default function NoOrgs({store,dispatch}) {
  const [openCreate, setOpenCreate] = useState(false);

  const toggleCreate = ()=> setOpenCreate(!openCreate);

  return (
   <>
   <Card>
    <CardBody>
    <div style={{minHeight:'65vh'}}>
    <div className='d-flex justify-content-between'>
       <h2 className='my-auto'>Welcome to My Organizations</h2>
       <div>
        <Button color='primary'  >
            <Plus/> Add Location
        </Button>
       </div>
       </div>
    <div className="d-flex justify-content-center my-auto" >
      <div>
        <img src={img} style={{width:"45vw"}}/>
      </div>
      <div className="text-center my-auto">
        <p className='mt-5'>Looks Like You Have No Organization</p>
        <h5>Let's Create One</h5>
        <Button color="primary" className="mt-2" onClick={toggleCreate}>
          Setup an Organization
        </Button>
      </div>
    </div>
      <CreateOrgModal open={openCreate} toggle={toggleCreate} store={store} dispatch={dispatch}/>
    </div>
    </CardBody>
   </Card>
   </>
  );
}
