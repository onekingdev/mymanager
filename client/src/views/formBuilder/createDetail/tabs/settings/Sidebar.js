import React from 'react';
import { BsUiChecks } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { GiRank2 } from 'react-icons/gi';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default function Sidebar({ active, setActive,store }) {
  return (
    <div className="sidebar" style={{ maxWidth: '260px' }}>
      <div className="sidebar-content task-sidebar">
        <div className="task-app-menu">
          <ListGroup className="sidebar-menu-list" options={{ wheelPropagation: false }}>
            <h4 className='bg-light text-center p-1'>{store.form.name}</h4>
            <ListGroup className="sidebar-menu-list" options={{ wheelPropagation: false }}>
              <ListGroupItem active={active === '1'} onClick={() => setActive('1')}>
                <div className="d-flex justify-content-between align-middle">
                  <div className="ws-name">
                    <FiSettings className="font-medium-1 me-50" />
                    <span className="fs-6">OVERVIEW</span>
                  </div>
                </div>
              </ListGroupItem>
              <ListGroupItem active={active === '2'} onClick={() => setActive('2')}>
                <div className="d-flex justify-content-between align-middle">
                  <div className="ws-name">
                    <GiRank2 className="font-medium-1 me-50" />
                    <span className="fs-6">SEO</span>
                  </div>
                </div>
              </ListGroupItem>
              {/* <ListGroupItem active={active === '3'} onClick={() => setActive('3')}>
                <div className="d-flex justify-content-between align-middle">
                  <div className="ws-name">
                    <BsUiChecks className="font-medium-1 me-50" />
                    <span className="fs-6">FACEBOOK PIXEL</span>
                  </div>
                </div>
              </ListGroupItem> */}
            </ListGroup>
          </ListGroup>
        </div>
      </div>
      
    </div>
  );
}
