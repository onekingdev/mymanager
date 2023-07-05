import React, { useState } from 'react';
import { MoreHorizontal, Plus, Users } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { setToDefaultReducer } from '../store/reducer';

export default function Sidebar({active,setActive,dispatch}) {
  // ** STATES
  const [style, setStyle] = useState({ display: 'none' });

  const history = useHistory()

  // ** FUNCTIONS
  const handleOpenCreate = ()=>{
    if(active==='2'){
      dispatch(setToDefaultReducer({isTemplate:true}))
    }
    else{
      dispatch(setToDefaultReducer({isTemplate:false}))
    }
    
    history.push('/form-funnel/create')
  }
  
  return (
    <div className="sidebar h-auto" style={{ maxWidth: '260px' }}>
      <div className="sidebar-content task-sidebar">
        <div className="task-app-menu">
          <ListGroup className="sidebar-menu-list" options={{ wheelPropagation: false }}>
            <div className="create-workspace-btn my-1">
              <Button color="primary" block outline onClick={handleOpenCreate}>
                <Plus size={14} className="me-25" />
                {active==='2'?'CREATE NEW':'CREATE NEW'}
              </Button>
            </div>

            <ListGroup className="sidebar-menu-list p-1" options={{ wheelPropagation: false }}>
              <ListGroupItem
                active ={active==='1'}
                onMouseEnter={(e) => {
                  setStyle({
                    display: 'block'
                  });
                }}
                onMouseLeave={(e) => {
                  setStyle({
                    display: 'none'
                  });
                }}
                onClick={()=>setActive('1')}
              >
                <div className="d-flex justify-content-between align-middle">
                  <div className="ws-name">
                    <span>My Forms&nbsp;&nbsp;_Funnels</span>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem
                onMouseEnter={(e) => {
                  setStyle({
                    display: 'block'
                  });
                }}
                onMouseLeave={(e) => {
                  setStyle({
                    display: 'none'
                  });
                }}
                onClick={()=>setActive('2')}
                active ={active==='2'}
              >
                <div className="d-flex justify-content-between align-middle">
                  <div className="ws-name">
                    <span>Templates</span>
                  </div>
                </div>
              </ListGroupItem>
              
              <ListGroupItem
                onMouseEnter={(e) => {
                  setStyle({
                    display: 'block'
                  });
                }}
                onMouseLeave={(e) => {
                  setStyle({
                    display: 'none'
                  });
                }}
                onClick={()=>setActive('4')}
                active ={active==='4'}
              >
                <div className="d-flex justify-content-between align-middle">
                  <div className="ws-name">
                    <span>Trash</span>
                  </div>
                </div>
              </ListGroupItem>
            </ListGroup>
          </ListGroup>
        </div>
      </div>
    </div>
  );
}
