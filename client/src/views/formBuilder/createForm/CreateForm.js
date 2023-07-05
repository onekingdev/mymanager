// React Imports
import { React, useState, useRef, useEffect, Fragment } from 'react';
import Breadcrumbs from '@components/breadcrumbs';

// Custom Components
import Wizard from '@components/wizard';
import FunnelInfomation from './funnelInformation';
import SelectFunnel from './selectFunnel';
import { useDispatch, useSelector } from 'react-redux';
import { getTemplatesAction } from '../store/action';
import { Button, Col, Row } from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom';

const CreateForm = () => {
  // Ref
  const ref = useRef(null);
  // State
  const [stepper, setStepper] = useState(null);

  const store = useSelector((state) => state.formEditor);
  const dispatch = useDispatch();
  const history = useHistory();

  // STATES
  const [form, setForm] = useState({
    name: '',
    memberType: 'leads',
    smartList: '',
    subCategory: '',
    formType: 'leads',
    formData: [{id:crypto.randomUUID(),step:'1',name:'Home',path:'home',html:'',css:''}],
    automateEntry: false,
    status: 'create',
    
  });

  useEffect(()=>{
    dispatch(getTemplatesAction())
  },[])

  const steps = [
    {
      id: 'info',
      title: 'Funnel Information',
      subtitle: 'add funnel information',
      content: (
        <FunnelInfomation
          stepper={stepper}
          type="wizard-modern"
          form={form}
          setForm = {setForm}
        />
      )
    },
    {
      id: 'template',
      title: 'Selected Template',
      subtitle: 'select template',
      content: (
        <SelectFunnel
          stepper={stepper}
          type="wizard-modern"
          form={form}
          setForm = {setForm}
          store={store}
          dispatch={dispatch}
        />
      )
    }
  ];

  const handleBackButtonClick = () => {
    history.goBack(); // Go back to the previous page
  };

  return (
    <Fragment>
      <Row>
        <Col md={11} className="invoice-child-header-wrapper">
          <Breadcrumbs
            breadCrumbTitle="Business Tools"
            breadCrumbParent="Business Tools"
            breadCrumbActive="Create Form"
          />
        </Col>
        <Col md={1} className='text-end'>
          <Button onClick={handleBackButtonClick} className="btn-sm" outline color="primary">
            Back
          </Button>
        </Col>
      </Row>

      <div className="modern-vertical-wizard">
        <Wizard
          type="modern-vertical"
          ref={ref}
          steps={steps}
          options={{
            linear: false
          }}
          instance={(el) => setStepper(el)}
        />
      </div>
    </Fragment>
  );
};

export default CreateForm;
