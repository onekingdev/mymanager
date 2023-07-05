import React from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle } from 'reactstrap'

import Chart from 'react-apexcharts'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { updateOrgAction } from '../../../store/action';

export default function OrgStatus({selectedOrg,dispatch}) {


  const MySwal = withReactContent(Swal);
  const handleDelete = async () => {
    const res = await MySwal.fire({
      title: 'Archive Organization',
      text: 'Are you sure you want to archive this organization? ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Archive',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    });
    if (res.value) {
      dispatch(updateOrgAction(selectedOrg._id, { isDeleted: true }));
    }
  };
 
  return (
    
    <Button color='danger' onClick={handleDelete}>{'Deactivate Organization'}</Button>
  )
}
