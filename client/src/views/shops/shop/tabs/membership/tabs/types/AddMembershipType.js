import React, { useState } from 'react';
import { Circle, Edit, MoreVertical } from 'react-feather';
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  UncontrolledDropdown
} from 'reactstrap';
import { addMembershipTypeAction, updateMembershipTypeAction } from '../../../../../store/action';

export default function AddMembershipType({ store, dispatch, open, toggle }) {
  const [form, setForm] = useState();
  const [editType, setEditType] = useState(false);
  const [selectedColor, setSelectedColor] = useState({
    label: 'primary',
    color: '#7367f0'
  });
  const [colors, setColors] = useState([
    {
      label: 'primary',
      color: '#7367f0'
    },
    {
      label: 'secondary',
      color: '#82868b'
    },
    {
      label: 'success',
      color: '#28c76f'
    },
    {
      label: 'info',
      color: '#00cfe8'
    },
    {
      label: 'warning',
      color: '#ff9f43'
    },
    {
      label: 'danger',
      color: '#ea5455'
    }
  ]);

  const handleEditType = (e, type) => {
    e.preventDefault();
    const payload = {
      type: e.target.type.value,
      shopId: store.shop._id
    };
    dispatch(updateMembershipTypeAction(type._id, payload));
  };
  const handleAddType = () => {
    const payload = {
      ...form,
      shopId: store.shop._id
    };
    dispatch(addMembershipTypeAction(payload));
  };

  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create New Type</ModalHeader>
      <ModalBody>
        <div>
          <Label>New Membership Type</Label>
          <div className="d-flex gap-2">
            <Input
              style={{ width: '71%' }}
              id="type"
              name="type"
              placeholder="add new"
              onChange={(e) => {
                setForm({ ...form, type: e.target.value });
              }}
            />
            <Button type="submit" size="sm" color="primary" onClick={handleAddType}>
              Add
            </Button>
          </div>
        </div>
        <div className="mb-2">
          <Label className="form-label" for="position">
            Label Color
          </Label>
          <div>
            {colors.map((e, index) => {
              return (
                <Circle
                  fill={e.color}
                  color={selectedColor.color === e.color ? 'red' : e.color}
                  onClick={() => {
                    setForm({ ...form, color: e.color });
                    setSelectedColor({ ...e });
                  }}
                />
              );
            })}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <h5
          style={{
            marginRight: 'auto',
            marginTop: '7px',
            marginBottom: '10px'
          }}
        >
          Available Types
        </h5>
        <Table size="sm">
          <thead>
            <tr>
              <th style={{ width: '20%' }}>No</th>
              <th style={{ width: '62%' }}>Membership Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {store?.membershipTypes &&
              store?.membershipTypes.map((x, idx) => {
                return (
                  <tr>
                    <td>{idx + 1}</td>
                    <td>
                      {editType ? (
                        <form onSubmit={(e) => handleEditType(e, x)}>
                          <Input bsSize="sm" id="type" name="type" placeholder={x.type} />
                        </form>
                      ) : (
                        <span>{x.type}</span>
                      )}
                    </td>
                    <td className="d-flex gap-2">
                      <UncontrolledDropdown>
                        <DropdownToggle tag="div" className="btn btn-sm">
                          <MoreVertical size={14} className="cursor-pointer" />
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={() => setEditType(!editType)} className="w-100">
                            <Edit size={14} className="me-50" />
                            <span className="align-middle">Edit</span>
                          </DropdownItem>

                          {/* <DropdownItem
                            className="w-100"
                            onClick={(e) => {
                                setDeleteModal({
                                    id: id,
                                    show: true
                                })
                            }}
                        >
                            <Trash2 size={14} className="me-50" />
                            <span className="align-middle">Delete</span>
                        </DropdownItem> */}
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>

        <Button className="mt-2" color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
