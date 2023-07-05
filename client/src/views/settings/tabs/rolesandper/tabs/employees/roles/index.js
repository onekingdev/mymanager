import React, { Fragment, useState, useEffect } from 'react';
import { Edit, Trash } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import AvatarGroup from '../../../../../../../@core/components/avatar-group';
import RoleDeleteModal from './RoleDeleteModal';
import RoleModal from './RoleModal';
import {
  rolesFetchAction,
  rolesEditAction,
  rolesAddAction,
  rolesDeleteAction
} from '../../../store/actions';

const avatarGroupArr = [
  {
    imgWidth: 25,
    imgHeight: 25,
    title: 'Billy Hopkins',
    placement: 'bottom',
    img: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default
  }
];

export default function Roles() {
  // ** States
  const [activecard, setActivecard] = useState();
  const [permissions, setPermissions] = useState({ dashboard: false });
  const [permissionName, setPermissionName] = useState();
  const [disabled, setDisabled] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: '' });
  const [editable, setEditable] = useState({ permissions: [], status: false });
  const [itemmodal, setItemmodal] = useState(false);

  const dispatch = useDispatch();
  const store = useSelector((state) => state.roles);
  const rolesList = store?.rolesList;

  // ** Tooglers
  const toggleitemmodal = () => setItemmodal(!itemmodal);

  // ** Functions
  useEffect(() => {
    dispatch(rolesFetchAction());
  }, []);

  return (
    <Fragment>
      <div className="app-user-list">
        <Row>
          {rolesList?.map((item, i) => (
            <>
              <Col lg="4" sm="6">
                <div
                  className={`card border ${activecard === i ? 'border border-primary' : ''}`}
                  onClick={() => {
                    setActivecard(i);
                    setPermissionName(item?.roleName);
                    setPermissions(item.permissions[0]);
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <AvatarGroup data={avatarGroupArr} size="sm" />
                      <div className="d-flex justify-content-between">
                        <div></div>
                        <div>
                          <h3>{item?.roleName}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between ">
                      <div classname="d-flex justify-content-between">
                        <span
                          className="text-primary m-1 cursor-pointer"
                          onClick={() => {
                            toggleitemmodal();
                            setDisabled(true);
                          }}
                        >
                          View
                        </span>
                        <span className="text-danger cursor-pointer">
                          <Trash
                            onClick={() => {
                              setDeleteModal({
                                show: !deleteModal.show,
                                id: item?._id,
                                roleName: item?.roleName
                              });
                            }}
                            size={15}
                          ></Trash>
                          <Edit
                            onClick={() => {
                              toggleitemmodal();
                              setDisabled(false);
                              setEditable({ permissions: item?.permissions, status: true });
                            }}
                            size={15}
                            className="ms-1"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </>
          ))}
          <Col lg="4">
            <div className="card p-1">
              <Button
                className="m-1"
                onClick={() => {
                  toggleitemmodal();
                  setPermissions({ dashboard: false });
                  setPermissionName();
                  setDisabled(false);
                  setEditable({ permissions: [], status: false });
                }}
                color="primary"
              >
                Add Role
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <RoleDeleteModal
        setDeleteModal={setDeleteModal}
        deleteModal={deleteModal}
        rolesDeleteAction={rolesDeleteAction}
        dispatch={dispatch}
      />
      <RoleModal
        itemmodal={itemmodal}
        toggleitemmodal={toggleitemmodal}
        permissions={permissions}
        setPermissionName={setPermissionName}
        setPermissions={setPermissions}
        rolesEditAction={rolesEditAction}
        permissionName={permissionName}
        disabled={disabled}
        rolesAddAction={rolesAddAction}
        editable={editable}
        dispatch={dispatch}
      />
    </Fragment>
  );
}
