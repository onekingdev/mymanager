import React from 'react';
import { useState } from 'react';
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import PermissionForm from './PermissionForm';
import { updateOrgLocationAction } from '../../store/action';

export default function EditLocationModal({ toggle, open, location, org ,dispatch }) {
  const [tab, setTab] = useState('1');
    const[loc,setLoc] = useState(location)
  const handleInputChanged = (e)=>{
    setLoc({...loc,[e.target.name]:e.target.value})
  } 
  const handleEditLocation = ()=>{
    dispatch(updateOrgLocationAction(location.organizationId,location._id,loc))
  }
  return (
    <Modal toggle={toggle} isOpen={open} size='lg'>
      <ModalHeader toggle={toggle}>Edit Location Details</ModalHeader>
      <ModalBody>
        <Nav tabs>
          <NavItem>
            <NavLink active={tab === '1'} onClick={() => setTab('1')}>
              Location Details
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active={tab === '2'} onClick={() => setTab('2')}>
              Permissions
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={tab}>
          <TabPane tabId="1">
            <div>
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter Org Name"
                  onChange={handleInputChanged}
                  value={loc.name}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="text"
                  name="email"
                  placeholder="Enter Org Email"
                  onChange={handleInputChanged}
                  value={loc.email}
                />
              </div>
              <div>
                <Label>Contact</Label>
                <Input
                  type="number"
                  name="contact"
                  placeholder="Enter Org Contact Number"
                  onChange={handleInputChanged}
                  value={loc.contact}
                />
              </div>
              <div>
                <Label>Full Address</Label>
                <Input
                  type="text"
                  name="address"
                  placeholder="Enter Org Full Address"
                  onChange={handleInputChanged}
                  value={loc.address}
                />
              </div>
              <Button color="primary" className='mt-1' onClick={handleEditLocation}>Save</Button>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <PermissionForm dispatch={dispatch} toggle={toggle} org={org} location={location} />
          </TabPane>
        </TabContent>
      </ModalBody>
    </Modal>
  );
}
