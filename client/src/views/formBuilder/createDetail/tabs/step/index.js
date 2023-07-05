/* eslint-disable no-unused-vars */
// ** React Imports
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Row, Col, TabContent, TabPane } from 'reactstrap';

// ** CUSTOM COMPONENTS
import Sidebar from './Sidebar';
import EditModal from '../../../edit/EditModal';
import StepTab from './StepTab';

const FormStep = ({ dispatch, store }) => {
  // ** States
  const [activeStep, setActiveStep] = useState();

  useEffect(()=>{
   if(store && store.form._id && store.form._id!==''){
    setActiveStep(store.form.formData[0].id)
   }
  },[store])
  
  return (
    <>
      {store && (
        <Row style={{ width: '100%', margin: '0px', padding: '0px' }}>
          <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }} style={{ padding: '0px' }}>
            <div className="tasks-border">
              <Sidebar
                active={activeStep}
                setActive={setActiveStep}
                dispatch={dispatch}
                store={store}
              />
              <div className="tasks-area" style={{ maxWidth: '100%', width: '100%' }}>
                <TabContent activeTab={activeStep}>
                  {store.form &&  store?.form?.formData?.map((x) => {
                    return (
                      <TabPane tabId={x.id}>
                        <StepTab store={store} step={x} dispatch={dispatch}/>
                      </TabPane>
                    );
                  })}
                </TabContent>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default FormStep;
