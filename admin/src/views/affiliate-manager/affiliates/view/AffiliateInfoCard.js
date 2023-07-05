import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";

import { Badge, Card, CardBody } from "reactstrap";
import { Fragment, useEffect, useRef, useState } from "react";

import AffiliateAvatar from "./AffiliateAvatar";
import { FiEye } from "react-icons/fi";
import { TbBadge } from "react-icons/tb";
import { statusColors } from "../../../../utility/affiliateUtils";

const AffiliateInfoCard = ({ selectedUser }) => {
  const photoRef = useRef();

  function onChoosePhoto() {
    photoRef?.current?.click();
  }

  function uploadPhoto({ file, id }) {
    const form = new FormData();
    form.append("file", file);
    form.append("id", id);
    //dispatch(uploadAvatarAction(form, id))
  }

  return (
    <Fragment>
      {/* upload photo */}

      <input
        type="file"
        onChange={(e) => {
          uploadPhoto({ file: e.target.files[0], id });
        }}
        hidden
        ref={photoRef}
      />

      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              <AffiliateAvatar
                selectedUser={selectedUser}
                onChoosePhoto={onChoosePhoto}
              />
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4 className="d-flex">
                    {selectedUser ? selectedUser.fullName : "Abdullah Shahbaz"}
                    <div className="ms-1">
                      <FiEye className="cic-eye-icon" />
                    </div>
                  </h4>
                  {selectedUser ? (
                    <Badge
                      className="text-capitalize"
                      color={statusColors[selectedUser.status]}
                    >
                      {selectedUser.status}
                    </Badge>
                  ) : (
                    <Badge
                      className="text-capitalize"
                      color={statusColors["active"]}
                    >
                      {"Active"}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <TbBadge className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">Level 2</h4>
                <small>Compensation Level</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">User Info</h4>
          <div className="info-container mb-3">
            {
              // TODO: fix this issue of selectedUser
              /*selectedUser*/ true ? (
                <ul className="list-unstyled">
                  <li className="mb-75">
                    <span className="fw-bolder me-25">Contact:</span>
                    <span>{selectedUser?.phone ?? "+923321026010"}</span>
                  </li>
                  <li className="mb-75">
                    <span className="fw-bolder me-25">Email:</span>
                    <span>
                      {selectedUser?.email ?? "abdullah_ghani@live.com"}
                    </span>
                  </li>
                  <li className="mb-75">
                    <span className="fw-bolder me-25">Address:</span>
                    <span>
                      {selectedUser?.address?.street &&
                        `${selectedUser?.address?.street},`}

                      {selectedUser?.address?.city &&
                        `${selectedUser?.address?.city},`}

                      {selectedUser?.address?.zipCode &&
                        `${selectedUser?.address?.zipCode},`}
                      {selectedUser?.address?.state &&
                        `${selectedUser?.address?.state},`}

                      {selectedUser?.address?.country &&
                        `${selectedUser?.address?.country}`}
                    </span>
                  </li>
                </ul>
              ) : null
            }
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default AffiliateInfoCard;
