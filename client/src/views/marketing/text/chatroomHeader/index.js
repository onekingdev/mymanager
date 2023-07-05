import React, { memo, useState, useEffect } from 'react';
import Avatar from '@components/avatar';
import { useSelector, useDispatch } from 'react-redux';
import { MoreVertical, PhoneCall, Search, Video } from 'react-feather/dist';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { handelCallModel, GetCallHistory } from '../../../depositfunds/store';
import Voice from '../../../depositfunds/voice';
import states from '../../../depositfunds/states';

function ChatRoomHeader() {
  const { userData } = useSelector((state) => state.auth);
  const { ActiveContact } = useSelector((state) => state.text);
  const { openCallModel } = useSelector((state) => state.deposit);
  const dispatch = useDispatch();
  //** Vars
  const userAvatar = (ActiveContact && ActiveContact?.photo) || null;

  const [shortName, setShortName] = useState('');
  const [stateCall, setStateCall] = useState(states.CONNECTING);

  // ** Effects

  useEffect(() => {
    dispatch(handelCallModel(false));
  }, []);

  useEffect(() => {
    if (ActiveContact) {
      if (ActiveContact?.fullName) {
        const nameOrArr = String(ActiveContact?.fullName).split(' ');
        const firstPart = nameOrArr.length > 0 ? nameOrArr[0] : '';
        const lastPart = nameOrArr.length > 1 ? nameOrArr[1] : '';
        setShortName(
          `${firstPart[0].toUpperCase()} ${lastPart[0] ? lastPart[0].toUpperCase() : ''}`
        );
      }
    } //
    return () => {};
  }, [ActiveContact]);

  // ** Handlers

  const toggleModal = async () => {
    dispatch(handelCallModel(!openCallModel));
  };

  const recordMessage = () => {
    setStateCall(states.READY);
    toggleModal();
  };
  return (
    <div className="border">
      {ActiveContact && (
        <div className="d-flex align-items-center justify-content-between m-1">
          <div className="d-flex align-items-center">
            <div className="d-flex">
              {userAvatar ? (
                <Avatar img={userAvatar} imgHeight="40" imgWidth="40" status="online" />
              ) : (
                <>
                  <Avatar
                    color="primary"
                    imgHeight="40"
                    imgWidth="40"
                    status="online"
                    content={shortName || 'N/A'}
                  />
                </>
              )}
            </div>
            <p className="d-flex pl-1 mb-0" style={{ paddingLeft: 10 }}>
              {ActiveContact?.fullName}
            </p>
          </div>
          <div className="d-flex align-items-center">
            {ActiveContact?.phone ? (
              <>
                <PhoneCall
                  size={18}
                  className="cursor-pointer d-sm-block d-none me-1"
                  onClick={(e) => recordMessage()}
                />
                <Video size={18} className="cursor-pointer d-sm-block d-none me-1" />
                <Search size={18} className="cursor-pointer d-sm-block d-none" />
                <UncontrolledDropdown className="more-options-dropdown">
                  <DropdownToggle className="btn-icon" color="transparent" size="sm">
                    <MoreVertical size="18" />
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      View Contact
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Mute Notifications
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Block Contact
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Clear Chat
                    </DropdownItem>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      Report
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
      <Voice
        openCallModel={openCallModel}
        toggleModal={toggleModal}
        stateCall={stateCall}
        setStateCall={setStateCall}
      />
    </div>
  );
}

export default memo(ChatRoomHeader);
