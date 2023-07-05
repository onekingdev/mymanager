import React, { useState, useEffect } from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { Edit, Copy, Trash, User, MoreVertical } from 'react-feather';
import { Link } from 'react-router-dom';
//**timeline component
import AvatarGroup from '@components/avatar-group';
import { format } from 'date-fns';
// ** Store & Actions
import { removeSmartListItem, getDataItem, updateSmartListItem } from '../store';
import { setSmartListAction, setSmartListRankingInitial } from '../../progressiontab/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Modaldata from './Modaldata';
import { setSmartList } from '../../progressiontab/store/reducer';

function Card(props) {
  const [itemmodal, setItemmodal] = useState(false);
  const toggleitemmodal = () => setItemmodal(!itemmodal);
  const [modalData, setModalData] = useState({});
  const _progression = useSelector((state) => state.progression.smartListRanking);

  const { title, date, tag, contactType, leadSource, status, progression, itemId, listId } = props;
  const dispatch = useDispatch();

  const changeTab = (index) => {
    setModalData(index);
  };

  const removeItem = () => {
    dispatch(
      removeSmartListItem({
        listId: listId,
        itemId: itemId
      })
    );
    dispatch(
      getDataItem({
        listId: listId
      })
    );
  };

  const btnUpdateSmartListItem = () => {
    let contactType = [],
      status = [],
      leadSource = [],
      tag = [],
      other = '',
      category = [],
      otherShop = [];
    if (modalData?.contactType.length > 0) {
      modalData?.contactType.map((item) => contactType.push(item.value));
    }
    if (modalData?.status.length > 0) {
      modalData?.status.map((item) => status.push(item.value));
    }
    if (modalData?.leadSource.length > 0) {
      modalData?.leadSource.map((item) => leadSource.push(item.value));
    }
    if (modalData?.tag.length > 0) {
      modalData?.tag.map((item) => tag.push(item.value));
    }
    // if (modalData.other.length > 0) {
    //   other = modalData.other[0].value;
    // }
    // if (modalData.category.length > 0) {
    //   modalData.category.map((item) => category.push(item.value));
    // }
    // if (modalData.otherShop.length > 0) {
    //   modalData.otherShop.map((item) => otherShop.push(item.value));
    // }

    dispatch(
      updateSmartListItem({
        itemId: itemId,
        value: {
          title: modalData.title,
          contactType: contactType,
          status: status,
          leadSource: leadSource,
          tag: tag,
          progression: _progression
        }
      })
    );
    dispatch(
      getDataItem({
        listId: listId
      })
    );
    dispatch(setSmartListRankingInitial());
    setItemmodal(!itemmodal);
  };

  const onCancel = () => {
    dispatch(setSmartListRankingInitial());
    setItemmodal(!itemmodal);
  };

  useEffect(() => {
    dispatch(setSmartListAction(progression));
  }, []);

  return (
    <>
      <div>
        <Modal isOpen={itemmodal} toggle={toggleitemmodal} size="lg">
          <ModalHeader toggle={toggleitemmodal}>Roles</ModalHeader>
          <ModalBody className="p-3">
            <Modaldata
              changeTab={changeTab}
              title={title}
              status={status}
              contactType={contactType}
              leadSource={leadSource}
              tag={tag}
              progression={progression}
              itemId={itemId}
              listId={listId}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="btn btn-outline-danger" onClick={onCancel}>
              Cancle
            </Button>{' '}
            <Button color="btn btn-primary" onClick={btnUpdateSmartListItem}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <div className="card-body p-2">
        <div className="d-flex justify-content-between">
          <h4 className="text-primary">{title}</h4>
          <UncontrolledDropdown className="chart-dropdown">
            <DropdownToggle color="" className="bg-transparent btn-sm border-0 p-50">
              <MoreVertical size={18} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem className="w-100">
                <User size={18} className="cursor-pointer" /> &nbsp; Contacts
              </DropdownItem>
              <DropdownItem className="w-100" onClick={toggleitemmodal}>
                <Edit size={18} className="cursor-pointer" /> &nbsp; Edit
              </DropdownItem>
              <DropdownItem className="w-100" onClick={removeItem}>
                <Trash size={18} className="cursor-pointer" /> &nbsp; Delete
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <br />
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="">
            Date <br />
            <small className="text-muted">{format(new Date(date), 'MM/dd/yy')}</small>
          </h6>
          {/* <h6 className="">{creteria}</h6> */}
        </div>
      </div>
    </>
  );
}

export default Card;
