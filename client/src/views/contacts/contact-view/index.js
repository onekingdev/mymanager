// ** React Imports
import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';

// ** Store & Actions
// import { getUser } from '../store'
import { useSelector, useDispatch } from 'react-redux';

// ** Reactstrap Imports
import { Row, Col, Alert, Spinner, Button } from 'reactstrap';
import Breadcrumbs from '@components/breadcrumbs';

// ** User View Components
import UserTabs from './Tabs';
import Connections from './Connections';
import UserInfoCard from './UserInfoCard';
import Employeestatus from './tabs/overview/Employeestatus';

import { contactNoteFetchAction, selectContactAction } from '../store/actions';

// ** Styles
import '@styles/react/apps/app-users.scss';

const ContactView = () => {
  // ** Hooks
  const { id, mode } = useParams();
  const [contact, setContact] = useState(null);

  // ** Store Vars
  const store = useSelector((state) => state?.totalContacts);

  const selectedContact = useSelector(
    (state) => state?.totalContacts?.contactList?.list?.filter((x) => x._id == id)[0]
  );

  const contactTypeList = store?.contactTypeList;

  const dispatch = useDispatch();

  // First Check User Details on Store
  useMemo(() => {
    if (id && contactTypeList) {
      if (
        selectedContact?.contactType.indexOf(contactTypeList[mode]?._id) > -1 &&
        selectedContact
      ) {
        setContact(selectedContact);
      }
    }
  }, [id, mode, store, selectedContact]);

  // ** Get suer on mount
  useEffect(() => {
    dispatch(selectContactAction(selectedContact));
    dispatch(contactNoteFetchAction(id));
  }, [dispatch, id]);

  const [active, setActive] = useState('1');

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  const history = useHistory();
  const handleBackButtonClick = () => {
    history.goBack(); // Go back to the previous page
  };

  const renderAdditionalCard = () => {
    switch (mode) {
      case '1':
        return (
          <>
            <Employeestatus cols={{ md: '6', sm: '6', xs: '12' }} />
            <Connections selectedUser={contact} />
          </>
        );
      case '2':
        return <Connections selectedUser={contact} />;
      case '4':
        return <Connections selectedUser={contact} />;
      default:
        break;
    }
  };

  return contact !== null && contact !== undefined ? (
    <div className="app-user-view">
      <Row>
        <Col md={11} className="invoice-child-header-wrapper">
          <Breadcrumbs
            breadCrumbTitle={'Contact'}
            breadCrumbParent="Contact"
            breadCrumbActive="Details"
          />
        </Col>
        <Col md={1}>
          <Button onClick={handleBackButtonClick} className="btn-sm" outline color="primary">
            Back
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard
            selectedUser={contact}
            store={store}
            notes={store?.notes?.data}
            mode={mode}
          />
          {renderAdditionalCard()}
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs
            selectedUser={contact}
            active={active}
            toggleTab={toggleTab}
            notes={store?.notes?.data}
            mode={mode}
            dispatch={dispatch}
          />
        </Col>
      </Row>
    </div>
  ) : !store.notes.success ? (
    <Spinner />
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">User not found</h4>
      <div className="alert-body">
        User with id: {id} doesn't exist. Check list of all Users:{' '}
        <Link to="/contacts/clients/list">Client List</Link>
      </div>
    </Alert>
  );
};
export default ContactView;
