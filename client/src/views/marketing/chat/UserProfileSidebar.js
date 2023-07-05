import Avatar from '@components/avatar';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png';

// ** Reactstrap Imports
import { X, Mail, PhoneCall, Clock, Tag, Star, Image, Trash, Slash } from 'react-feather';
import { Badge } from 'reactstrap';
const UserProfileSidebar = (props) => {
  // ** Props
  const { user, handleUserSidebarRight, userSidebarRight } = props;
  return (
    <div className={classnames('user-profile-sidebar', { show: userSidebarRight === true })}>
      <header className="user-profile-header">
        <span className="close-icon" onClick={handleUserSidebarRight}>
          <X size={14} />
        </span>
        <div className="header-profile-sidebar p-relative">
          {user.photo ? (
            <Avatar img={user.photo} className="box-shadow-1 avatar-border" size="xl" />
          ) : (
            <Avatar
              color={'primary'}
              img={defaultAvatar}
              className="box-shadow-1 avatar-border"
              size="xl"
              initials
            />
          )}
          <div className="position-absolute" style={{ top: '50px', right: '40%' }}>
            {user.status ? (
              <></>
            ) : (
              <Badge color="primary" className="badge-up">
                New
              </Badge>
            )}
          </div>
          <h4 className="chat-user-name">{user.fullName}</h4>
          <span className="user-post">{user.role}</span>
        </div>
      </header>
      <PerfectScrollbar
        className="user-profile-sidebar-area"
        options={{ wheelPropagation: false }}
      >
        <h6 className="section-label mb-1">About</h6>
        <p>{user.about}</p>
        <div className="personal-info">
          <h6 className="section-label mb-1 mt-3">Personal Information</h6>
          <ul className="list-unstyled">
            <li className="mb-1">
              <Mail className="me-75" size={17} />
              <span className="align-middle">{user.email ? user.email : ''}</span>
            </li>
            <li className="mb-1">
              <PhoneCall className="me-50" size={17} />
              <span className="align-middle">{user.phone ? user.phone : 'unknown'}</span>
            </li>
            <li>
              <Clock className="me-50" size={17} />
              <span className="align-middle"> Mon - Fri 10AM - 8PM</span>
            </li>
          </ul>
        </div>
        <div className="more-options">
          <h6 className="section-label mb-1 mt-3">Options</h6>
          <ul className="list-unstyled">
            <li className="cursor-pointer mb-1">
              <Tag className="me-50" size={17} />
              <span className="align-middle">Add to contact</span>
            </li>
            <li className="cursor-pointer mb-1">
              <Star className="me-50" size={17} />
              <span className="align-middle">Add to ticket</span>
            </li>
            <li className="cursor-pointer mb-1">
              <Image className="me-50" size={17} />
              <span className="align-middle">Block contact</span>
            </li>
            <li className="cursor-pointer mb-1">
              <Trash className="me-50" size={17} />
              <span className="align-middle"> Delete Contact</span>
            </li>
            <li className="cursor-pointer">
              <Slash className="me-75" size={17} />
              <span className="align-middle">Block Contact</span>
            </li>
          </ul>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default UserProfileSidebar;
