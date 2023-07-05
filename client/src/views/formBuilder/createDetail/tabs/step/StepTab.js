import React, { Fragment, useState } from 'react';
import { Copy } from 'react-feather';
import { BsFillEyeFill } from 'react-icons/bs';
import { Button, Card, CardBody, Col, Input, InputGroup, InputGroupText, Row } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { cloneFormAction, createFormAction, deleteFormAction } from '../../../store/action';


import { toast } from 'react-toastify';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';


import EditModal from '../../../edit/EditModal';
import { getUserData } from '../../../../../auth/utils';



export default function StepTab({ store,step,dispatch }) {
    // ** STATES
    const [openEditor, setOpenEditor] = useState(false);
    const user = getUserData()
  // ** FUNCTIONS
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`https://mymanager.com/form-funnel/${store.form._id}&path=${step.path}`);
    toast.success('URL copied!');
  };

  const handleViewUrl = () => {
    window.open(`/form-funnel/${store.form._id}&path=${step.path}`);
  
  };
  const history = useHistory();
  // ** Toggle
  const toggleEditor = () => {
    localStorage.removeItem('gjsProject')
    setOpenEditor(!openEditor);
  };

  

  const handleClone = () => {
    const payload = {
      userId: getUserData().id,
      name: store.form.name,
      memberType: store.form.memberType,
      automateEntry: store.form.automateEntry,
      smartList: store.form.smartList,
      subCategory: store.form.subCategory,
      formType: store.form.formType,
      formData: [...store.form.formData],
      clonedFrom: store.form._id,
      isTemplate:store.form.isTemplate
    };
    dispatch(cloneFormAction(payload)).then(res=>{
      history.push(`/form-funnel/form-setting/${res}`)
    })
    
  };

  const MySwal = withReactContent(Swal);
  const handleDeleteForm = async () => {
    const result = await MySwal.fire({
      title: 'Delete?',
      text: 'When a Funnel deleted, it gets unaccessible. Are you sure you want to delete the funnel? ',
      icon: 'danger',
      showCancelButton: true,
      confirmButtonText: 'Delete anyway',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });
    if (result.value) {
      dispatch(deleteFormAction(store.form._id));
      history.push('/form-funnel');
    }
  };
  return (
    <Fragment>
      <div className="m-1">
        <div className="d-flex justify-content-between">
          <InputGroup size="md">
            <Input
              value={`https://mymanager.com/form-funnel/${store.form._id}&path=${step.path}`}
              disabled="true"
            />
            <InputGroupText>
              <Button color="link" className="p-0" onClick={handleCopyUrl}>
                <Copy />
              </Button>
            </InputGroupText>
          </InputGroup>
          <Button
            color="primary"
            className="ms-2"
            style={{ minWidth: '120px' }}
            onClick={handleViewUrl}
          >
            <BsFillEyeFill className="me-1" />
            View
          </Button>
        </div>
        <Card style={{ height: '100%', borderRadius: 10, marginTop: '1em' }} className={`shadow`}>
          <CardBody>
            <iframe
              scrolling="no"
              className="shadow-sm"
              style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                border: 'none',
                height: '400px',
                borderRadius: 10
              }}
              src={store?.form?.formData[0]?.html!==''?`/form-funnel/${store.form._id}&path=${step.path}`:`/logo.html`}
            />
          </CardBody>
        </Card>
        <Row>
          <Col className="d-flex flex-row-reverse">
            {user.id===store?.form?.userId? ( <Button color="danger"  onClick={handleDeleteForm}>
              REMOVE
            </Button>) : null }
           
            <Button color="outline-primary" className="me-2" onClick={handleClone}>
              CLONE
            </Button>
            {user.id===store?.form?.userId? ( <Button color="primary" className="me-2" onClick={toggleEditor}>
              EDIT PAGE
            </Button>) : null }
            
          </Col>
        </Row>
      </div>
       {(store && step) && (
        <EditModal toggle={toggleEditor} open={openEditor} store={store} dispatch={dispatch} step={step} />
      )}
    </Fragment>
  );
}
