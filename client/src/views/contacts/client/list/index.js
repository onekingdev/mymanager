import { Fragment, useEffect } from 'react';

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';

// ** User List Component
// import Table from './clientTable';
import Table from '../../contact-list/contactTable';

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap';

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather';

// ** Styles
import '@styles/react/apps/app-users.scss';
import { useSelector } from 'react-redux';

const Client = () => {
  const ClientContactTypeTitle = useSelector(
    (state) => state?.totalContacts?.contactTypeList[0]?.name
  );
  const store = useSelector((state) => state?.totalContacts);
  const contactTypeId = useSelector(
    (state) =>
      state?.totalContacts?.contactTypeList?.filter((x) => x.name == ClientContactTypeTitle)[0]?._id
  );

  const contactList = useSelector((state) => state?.totalContacts?.contactList?.list || []);

  const clientContactList = contactList?.filter((x) => x.contactType.indexOf(contactTypeId) > -1);

  const totalCount = clientContactList?.length;
  const activeCount = clientContactList?.filter((x) => x.status == 'active').length;
  const pastDueCount = clientContactList?.filter((x) => x.isPastDue).length;
  const formerCount = clientContactList?.filter((x) => x.isFormer).length;

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle={ClientContactTypeTitle}
        breadCrumbParent="Contacts"
        breadCrumbActive={ClientContactTypeTitle}
      />
      <div className="app-user-list">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle={`Total ${ClientContactTypeTitle}`}
              icon={<User size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{totalCount || 0}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle={`Active ${ClientContactTypeTitle}`}
              icon={<UserPlus size={20} />}
              renderStats={<h3 className="fw-bolder mb-75"> {activeCount || 0}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle={`Past Due ${ClientContactTypeTitle}`}
              icon={<UserCheck size={20} />}
              renderStats={<h3 className="fw-bolder mb-75"> {pastDueCount || 0}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle={`Former ${ClientContactTypeTitle}`}
              icon={<UserX size={20} />}
              renderStats={<h3 className="fw-bolder mb-75"> {formerCount || 0}</h3>}
            />
          </Col>
        </Row>
        <Table
          store={store}
          contactTypeId={contactTypeId}
          contactTypeTitle={ClientContactTypeTitle}
        />
      </div>
    </Fragment>
  );
};

export default Client;
