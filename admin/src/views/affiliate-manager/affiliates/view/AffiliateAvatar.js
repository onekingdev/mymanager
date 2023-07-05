import React, { useState } from "react";
import {
  avatarCSSStyles,
  avatarContentStyles,
  states,
} from "../../../../utility/affiliateUtils";

import Avatar from "@components/avatar";

const AffiliateAvatar = ({ selectedUser, onChoosePhoto }) => {
  const [color, _] = useState(states[Math.floor(Math.random() * 6)]);

  return selectedUser && selectedUser?.photo?.length ? (
    <div onClick={onChoosePhoto} className="cic-dp">
      <img
        height="110"
        width="110"
        alt="user-avatar"
        src={selectedUser.photo}
        className="img-fluid rounded mt-3 mb-2"
      />
      <div className="cic-photo-edit">
        <FiEdit2 className="cic-photo-edit-icon" />
      </div>
    </div>
  ) : (
    <Avatar
      onClick={onChoosePhoto}
      initials
      color={color}
      className="rounded mt-3 mb-2"
      content={selectedUser?.fullName ?? "Abdullah Shahbaz"}
      contentStyles={avatarContentStyles}
      style={avatarCSSStyles}
    />
  );
};

export default AffiliateAvatar;
