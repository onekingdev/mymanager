/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Row, Col } from 'reactstrap';
import Breadcrumbs from '@components/breadcrumbs';

// ** custom import
import Funnels from './Funnels';


// ** STYLES
import '@src/assets/styles/tasks.scss';
// import '@src/assets/styles/dark-layout.scss';

// ** DATA COMPONENTS
import { getFormsAction } from './store/action';
import { getUserData } from '../../auth/utils';


const FormBuilder = () => {
  // ** States
  const [active, setActive] = useState('1');

  // ** DATA 
  const dispatch = useDispatch()

  // ** READ INITIAL DATA
  useEffect(()=>{
    const {id} = getUserData()
    if(id){
        dispatch(getFormsAction())
    }
    else{
        // login
    }
    
  },[])

  return (
    <>
      <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
          <Funnels active={active} setActive={setActive} dispatch={dispatch}/>
        </Col>
      </Row>
    </>
  );
};
export default FormBuilder;
