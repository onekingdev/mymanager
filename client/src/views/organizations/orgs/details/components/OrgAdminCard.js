import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import { getOrgAdminAction } from '../../../store/action';

export default function OrgAdminCard({ selectedOrg, dispatch }) {
  const [orgAdmin, setOrgAdmin] = useState(null);
  useEffect(() => {
    if (selectedOrg && selectedOrg?._id) {
      dispatch(getOrgAdminAction(selectedOrg._id)).then((res) => {
        setOrgAdmin(res[0])
      });
    }
  }, [selectedOrg]);
  return (
    <Card>
      <CardBody>
        <h4>Admin of Organization</h4>
        {orgAdmin && orgAdmin !== null && (
          <table>
            <tr>
              <td>Name</td>
              <td>{orgAdmin?.firstName} {orgAdmin?.lastName}</td>
            </tr>
            
            <tr>
              <td>Gender</td>
              <td>{orgAdmin?.gender}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{orgAdmin.auths?.phone}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{orgAdmin.auths?.email}</td>
            </tr>
            {orgAdmin?.address && (
                <tr>
                <td>Address</td>
                <td>{`${orgAdmin?.address?.street} ${orgAdmin?.address?.city} ${orgAdmin?.address?.state} ${orgAdmin?.address?.zipCode} ${orgAdmin?.address?.country}`}</td>
              </tr>
            )}
          </table>
        )}
      </CardBody>
    </Card>
  );
}
