import React, { useEffect, useState } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { setPermissions } from '../../../utility/Utils';
export default function OrgLocationDropdown() {
  // ** Vars
  const organization = localStorage.getItem('organization');

  // ** States
  const [locations, setLocations] = useState([]);
  const [title, setTitle] = useState('Select Location');

  const handleChangeLocation = (loc) => {
    setTitle(loc.name);
    const org = JSON.parse(organization);
    const plan = org.plan[org.plan.length - 1];
    const planDetails = org.planDetails.find((x) => x._id === plan.planId);
    //let locPermissions = planDetails.permissions.filter(x=>x.)
    const locPermissions = planDetails.permissions.filter((item) => {
      return item.locationIds.indexOf(loc._id) === -1;
    });

    if (locPermissions.length > 0) {
      const newAbility = setPermissions(locPermissions);
      localStorage.setItem('organization', JSON.stringify(org));
      localStorage.setItem('loc', loc.name );

      const localUser = JSON.parse(localStorage.getItem('userData'));
      localStorage.setItem('userData', JSON.stringify({ ...localUser, ability: newAbility }));
      localStorage.setItem('expire', false);
      window.location.reload(false);
    } 
    
  };

  // ** Initial State
  useEffect(() => {
    if (organization) {
      setLocations(JSON.parse(organization).locations);
      if(localStorage.getItem('loc')){
        setTitle(localStorage.getItem('loc'))
      }
    }
  }, [organization]);
  return (
    <UncontrolledDropdown>
      <DropdownToggle caret color="outline-secondary">
        {title}
      </DropdownToggle>
      <DropdownMenu>
        {locations.map((x, idx) => {
          return (
            <DropdownItem className="w-100" key={idx} onClick={() => handleChangeLocation(x)}>
              {x.name}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
