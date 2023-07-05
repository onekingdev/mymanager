import React, { useState } from 'react';
import { Lock, Plus, Trash, X } from 'react-feather';
import { useParams } from 'react-router-dom';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { updateFormDataAction } from '../../../store/action';
import NewStepModal from './NewStepModal';
import { getUserData } from '../../../../../auth/utils';

export default function Sidebar({ active, setActive, dispatch, store }) {
  // ** STATE
  const [openNewStep, setOpenNewStep] = useState(false);
  const [style,setStyle] = useState('0')

  const user = getUserData()
  const {id} = useParams()
  // ** TOGGLERS
  const toggleNewStep = () => setOpenNewStep(!openNewStep);

  const mySwal = withReactContent(Swal);

  const handleDeleteStep = async(e,stepId) =>{
    e.stopPropagation()
    const res = await mySwal.fire({
      title: 'Delete?',
      text: 'Are you sure you want to delete this step in funnel?',
      icon: 'danger',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    })
    if(res.value){
      let formData = store.form.formData;
      formData = formData.filter(x=>x.id !== stepId)
      
      dispatch(updateFormDataAction(id,formData))
    }
    
  }

  return (
    <div className="sidebar" style={{ maxWidth: '260px' }}>
      <div className="sidebar-content task-sidebar">
        <div className="task-app-menu">
          <ListGroup className="sidebar-menu-list" options={{ wheelPropagation: false }}>
            {user?.id===store?.form?.userId ? (<div className="create-workspace-btn my-1">
              <Button color="primary" block outline onClick={toggleNewStep}>
                <Plus size={14} className="me-25" />
                New Step
              </Button>
            </div>):null}
            
            <ListGroup className="sidebar-menu-list" options={{ wheelPropagation: false }}>
              {store.form &&  store?.form?.formData?.map((x, idx) => {
                return (
                  <ListGroupItem
                    key={idx}
                    active={active === x.id}
                      onMouseEnter={() => {
                        setStyle(x.id);
                      }}
                      onMouseLeave={() => {
                        setStyle('0');
                      }}
                    onClick={() => setActive(x.id)}
                  >
                    <div className="d-flex justify-content-between align-middle p-2">
                      <div className="ws-name">
                        <span> {x.name}</span>
                      </div>
                      <div  className={`${style===x.id?'d-block':'d-none'} text-secondary`}>
                        {user.id===store?.form?.userId ? (<Trash size={16} onClick={(e)=>handleDeleteStep(e,x.id)}/>): <Lock size={14} className='text-muted'/>}
                      
                      </div>
                    </div>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </ListGroup>
        </div>
      </div>
      <NewStepModal toggle={toggleNewStep} open={openNewStep} store={store} dispatch={dispatch} />
    </div>
  );
}
