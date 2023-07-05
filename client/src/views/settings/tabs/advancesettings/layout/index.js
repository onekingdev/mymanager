// ** React Imports
import { Fragment, useState, useEffect } from 'react';
// ** Custom Components
import { AiOutlinePlus } from 'react-icons/ai';

// ** User List Component
import DataTable from 'react-data-table-component';
// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  Row,
  Col,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
// ** Styles
// import '@styles/react/apps/app-users.scss'
import '@styles/react/apps/app-kanban.scss';
import Card from './Card';
import Modaldata from './Modaldata';
import Description from './Description';
import { setSmartListRankingInitial } from '../../progressiontab/store/actions';
// ** Store & Actions
import { getDataItem, createSmartListItem } from '../store';
import { useDispatch, useSelector } from 'react-redux';

const Layout = (props) => {
  const [descriptiondetails, setDescriptiondetails] = useState();
  const [showdetails, setShowdetails] = useState(false);
  const expandcard = (item) => {
    setDescriptiondetails(item);
    setShowdetails(true);
  };
  const dispatch = useDispatch();
  const store = useSelector((state) => state.smartList);

  const [activecard, setActivecard] = useState('');
  const [itemmodal, setItemmodal] = useState(false);
  const toggleitemmodal = () => setItemmodal(!itemmodal);
  const [modalData, setModalData] = useState({});
  const _progression = useSelector((state) => state.progression.smartListRanking);
  const saveSmartListItem = () => {
    let contactType = [],
      status = [],
      leadSource = [],
      tag = [],
      progression = [],
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

    if (modalData?.other.length > 0) {
      other = modalData?.other[0].value;
    }
    if (modalData?.category.length > 0) {
      modalData?.category.map((item) => category.push(item.value));
    }
    if (modalData?.otherShop.length > 0) {
      modalData?.otherShop.map((item) => otherShop.push(item.value));
    }

    dispatch(
      createSmartListItem({
        listId: store.listId,
        title: modalData.title,
        contactType: contactType,
        status: status,
        leadSource: leadSource,
        tag: tag,
        progression: _progression
      })
    );
    dispatch(
      getDataItem({
        listId: store.listId
      })
    );
    dispatch(setSmartListRankingInitial());
    setItemmodal(!itemmodal);
  };
  const changeTab = (index) => {
    setModalData(index);
  };
  useEffect(() => {
    dispatch(
      getDataItem({
        listId: store.listId
      })
    );
  }, [store.listId]);

  const onCancel = () => {
    dispatch(setSmartListRankingInitial());
    setItemmodal(!itemmodal);
  };
  return !showdetails ? (
    <>
      <div>
        <Modal isOpen={itemmodal} toggle={toggleitemmodal} size="lg">
          <ModalHeader toggle={toggleitemmodal}>Roles</ModalHeader>
          <ModalBody className="p-3">
            <Modaldata
              changeTab={changeTab}
              title=""
              contactType={[]}
              status={[]}
              leadSource={[]}
              tag={[]}
              progression={[]}
              other=""
              category={[]}
              otherShop={[]}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="btn btn-outline-danger" onClick={onCancel}>
              Cancel
            </Button>{' '}
            <Button color="btn btn-primary" onClick={saveSmartListItem}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <Fragment>
        <div className="app-user-list p-1">
          <Row>
            {store.smartListsItem.map((item, index) => (
              <Col lg="4" sm="6">
                <div
                  className={`card border${
                    activecard === item._id ? ' border border-primary' : ''
                  }`}
                  // onClick={() => {
                  //   setActivecard(item._id);
                  //   expandcard(item);
                  // }}
                >
                  <Card
                    togglemodal={toggleitemmodal}
                    title={item.title}
                    date={item.createdAt}
                    status={item.status}
                    contactType={item.contactType}
                    leadSource={item.leadSource}
                    tag={item.tag}
                    progression={item.progression}
                    itemId={item._id}
                    listId={store.listId}
                    item={item}
                  />
                </div>
              </Col>
            ))}
            <Col lg="4" sm="6">
              <div className="card w-100 p-1 ">
                <div className="card-body text-center p-3 w-100 ">
                  <button onClick={toggleitemmodal} className="btn btn-primary ">
                    Add New Item
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Fragment>
    </>
  ) : (
    <Description setShowdetails={setShowdetails} descriptiondetails={descriptiondetails} />
  );
};

export default Layout;
