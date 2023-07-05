import React, { useState } from 'react';
import { Edit, MoreVertical, Trash2 } from 'react-feather';
import { toast } from 'react-toastify';
import {
  DropdownToggle,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  Input
} from 'reactstrap';

import { useGetLeadPosition } from '../../../requests/contacts/lead-contacts';

const PositionTableRow = ({ position, i, id, setDeleteModal }) => {
  // toggle lead position input field and lead position title
  const [editPosition, setEditPosition] = useState(false);

  const { data: positions } = useGetLeadPosition();
  // pass delete lead position data as id
  /* const { mutate } = useDeleteLeadPosition()

    const handleDeletePosition = (id) => {

        // pass delete lead position id 
        mutate(id)

        // refetch lead position data
        setTimeout(() => {
            refetch()
        }, 100)
    } */

  // handle edit lead position
  const handleEditPosition = (e) => {
    e.preventDefault();

    const positionName = e.target.position.value;
    const payload = { position: positionName };

    const isPositionExist = positions.find(
      (p) => p.position.toLowerCase() === positionName.toLowerCase()
    );

    if (isPositionExist) {
      // toggle lead position input field and lead position title
      setEditPosition(!editPosition);
      return toast.error('This position already exists');
    } else if (
      positionName.toLowerCase() === 'owner' ||
      positionName.toLowerCase() === 'assistant' ||
      positionName.toLowerCase() === 'billing'
    ) {
      setEditPosition(!editPosition);
      return toast.error('This position already exists');
    } else if (!id) {
      setEditPosition(!editPosition);
      return toast.warning("It's a default position. You can't edit this");
    } else {
      setEditPosition(!editPosition);

      // pass id and edited value to db

      // refetch lead position data
    }
  };

  return (
    <tr>
      <th scope="row">{i + 1}</th>
      <td>
        {editPosition ? (
          <form onSubmit={handleEditPosition}>
            <Input bsSize="sm" id="position" name="position" placeholder={position} />
          </form>
        ) : (
          <span>{position}</span>
        )}
      </td>
      <td className="d-flex gap-2">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => setEditPosition(!editPosition)} className="w-100">
              <Edit size={14} className="me-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>

            <DropdownItem
              className="w-100"
              onClick={(e) => {
                setDeleteModal({
                  id: id,
                  show: true
                });
              }}
            >
              <Trash2 size={14} className="me-50" />
              <span className="align-middle">Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
};

export default PositionTableRow;
