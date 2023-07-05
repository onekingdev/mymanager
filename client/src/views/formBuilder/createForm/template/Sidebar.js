import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, Plus, Users } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

export default function Sidebar({active,setActive, collapse,handleCollapse}) {
  // ** STATES
  const [style, setStyle] = useState({ display: 'none' });

  const history = useHistory()

  // ** FUNCTIONS
  const handleOpenCreate = ()=>{
    
  }
  
  return (
    <div className="sidebar" style={{ maxWidth: '260px' }}>
      <div className="sidebar-content task-sidebar">
        <div className="task-app-menu">
          <ListGroup className="sidebar-menu-list" options={{ wheelPropagation: false }}>
          {/* <div className="p-1 d-flex justify-content-between align-items-center">
              
              <Button className="btn-icon" color="flat-dark" onClick={handleCollapse}>
                {collapse ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
              </Button>
            </div> */}
            {/* <div className="create-workspace-btn my-1">
              <Button color="primary" block  onClick={handleOpenCreate}>
                <Plus size={14} className="me-25" />
                Add Template
              </Button>
            </div> */}

            <ListGroup className="sidebar-menu-list" options={{ wheelPropagation: false }}>
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
                    <span>All Templates</span>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem
                active ={active==='2'}
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
              >
                <div className="d-flex justify-content-between align-middle">
                  <div className="ws-name">
                    <span>My Organization</span>
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
                onClick={()=>setActive('3')}
                active ={active==='3'}
              >
                <div className="d-flex justify-content-between align-middle">
                  <div className="ws-name">
                    <span>My Templates</span>
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
