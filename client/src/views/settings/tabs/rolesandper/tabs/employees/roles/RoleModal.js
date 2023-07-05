import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';
import { Edit } from 'react-feather';
import { getDefaultElementsAction } from '../../../../../../organizations/store/action';
import EditPlanElementModal from '../../../../../../organizations/elements/EditPlanElementModal';

export default function RoleModal({
  itemmodal,
  toggleitemmodal,
  setPermissionName,
  rolesEditAction,
  permissionName,
  disabled,
  rolesAddAction,
  editable,
  dispatch
}) {
  const [permissions, setPermissions] = useState([]);
  const [openEditElement, setOpenEditElement] = useState(false);

  const toggleEditElement = () => setOpenEditElement(!openEditElement);

  const [selectedElement, setSelectedElement] = useState(null);
  //get init data
  useEffect(() => {
    dispatch(getDefaultElementsAction()).then((data) => {
      let ps = [];
      for (const element of data) {
        ps.push({
          elementTitle: element.elementTitle,
          elementParent: element.elementParent,
          navLink: element.navLink,
          read: false,
          write: false,
          update: false,
          delete: false,
          defaultId: element.id,
          _id: element._id
        });
      }
      setPermissions(ps);
    });
  }, []);
  useEffect(() => {
    if (editable.status === true) {
      setPermissions(editable.permissions);
    } else return;
  }, [editable]);
  // ** Handlers
  const handlePermissionSubmit = (e) => {
    e.preventDefault();
    let permissionArray = [];
    let finalPayload = {};
    permissionArray = permissions;
    finalPayload = { roleName: permissionName, permissions: permissionArray };
    editable.status
      ? dispatch(rolesEditAction(finalPayload, editable?.id))
      : dispatch(rolesAddAction(finalPayload));
    setPermissionName();
    toggleitemmodal();
  };
  // const handlePermissionInput = (e) => {
  //   setPermissions({ ...permissions, [e.target.name]: e.target.checked });
  // };

  const handleOnChange = (e, row) => {
    let p = permissions;
    p = permissions.map((x) => {
      let i = x;
      if (i.defaultId === row.defaultId) {
        i = { ...i, [e.target.name]: e.target.checked };
        if (e.target.name === 'read' && e.target.checked === false) {
          i = { ...i, read: false, write: false, delete: false, update: false };
        }
      }
      return i;
    });
    setPermissions(p);
  };

  const rowPreDisabled = (row) =>
    permissions.filter((x) => x.elementParent === row.defaultId).length === 0;

  const ExpandedRow = (data) => {
    let p = permissions.filter((x) => x.elementParent === data.data.defaultId);

    return (
      <>
        <Card>
          <DataTable
            striped
            noHeader
            responsive
            className="react-dataTable"
            columns={columns}
            data={p}
          />
        </Card>
      </>
    );
  };

  const columns = [
    {
      name: 'MODULE',
      selector: (row) => row.elementTitle,
      width: '20%',
      cell: (row) => (
        <div className="d-flex justify-content-between w-100">
          <span>{row.elementTitle}</span>
          <Edit
            size={18}
            className="text-secondary"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setSelectedElement(row);
              toggleEditElement();
            }}
          />
        </div>
      )
    },
    {
      name: 'READ',
      selector: (row) => row.read,
      width: '20%',
      cell: (row) => (
        <Input
          type="checkbox"
          checked={row?.read}
          name="read"
          onChange={(e) => handleOnChange(e, row)}
        />
      )
    },
    {
      name: 'WRITE',
      selector: (row) => row.write,
      width: '20%',
      cell: (row) => (
        <Input
          type="checkbox"
          checked={row?.write}
          name="write"
          onChange={(e) => handleOnChange(e, row)}
        />
      )
    },
    {
      name: 'UPDATE',
      selector: (row) => row.update,
      width: '20%',
      cell: (row) => (
        <Input
          type="checkbox"
          checked={row?.update}
          name="update"
          onChange={(e) => handleOnChange(e, row)}
        />
      )
    },
    {
      name: 'DELETE',
      selector: (row) => row.delete,
      width: '20%',
      cell: (row) => (
        <Input
          type="checkbox"
          checked={row?.delete}
          name="delete"
          onChange={(e) => handleOnChange(e, row)}
        />
      )
    }
  ];

  return (
    <Modal isOpen={itemmodal} toggle={toggleitemmodal} size="lg">
      <ModalHeader toggle={toggleitemmodal}>Roles</ModalHeader>
      <Form onSubmit={handlePermissionSubmit} className="p-2">
        <ModalBody>
          <FormGroup>
            <Label for="userRole">Role</Label>
            <Input
              id="userRole"
              value={permissionName}
              onChange={(e) => setPermissionName(e.target.value)}
              name="roleName"
              placeholder="Please Enter Role Name"
              type="text"
              required
              disabled={disabled}
            />
          </FormGroup>
          <h3>{editable.status ? 'Edit Role Permission' : 'Role Permission'}</h3>
          <div className="list-group task-task-list-wrapper">
            <DataTable
              striped
              noHeader
              responsive
              className="react-dataTable"
              columns={columns}
              data={permissions?.length && permissions.filter((x) => x.elementParent === null)}
              expandableRows
              expandableRowDisabled={rowPreDisabled}
              expandableRowsComponent={ExpandedRow}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="btn btn-outline-danger" onClick={toggleitemmodal}>
            Cancle
          </Button>{' '}
          <Button color="btn btn-primary" type="submit" disabled={disabled}>
            {editable.status ? 'Save Edit' : 'Save New Role'}
          </Button>
        </ModalFooter>
      </Form>
      {selectedElement !== null && (
        <EditPlanElementModal
          open={openEditElement}
          toggle={toggleEditElement}
          element={selectedElement}
          dispatch={dispatch}
        />
      )}
    </Modal>
  );
}
